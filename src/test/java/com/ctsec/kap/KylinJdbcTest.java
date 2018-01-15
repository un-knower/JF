package com.ctsec.kap;

import org.apache.kylin.jdbc.Driver;
import org.junit.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class KylinJdbcTest {

    @Test
    public void testKylin() throws Exception {
        Driver driver = (Driver) Class.forName("org.apache.kylin.jdbc.Driver").newInstance();
        Properties info = new Properties();
//        info.put("user", "ADMIN");
//        info.put("password", "KYLIN");
//        Connection conn = driver.connect("jdbc:kylin://172.15.1.81:7070/learn_kylin", info);
        info.put("user", "ctuser");
        info.put("password", "ctzq123456!");
        Connection conn = driver.connect("jdbc:kylin://172.18.1.135:30001/test", info);

        Statement state = conn.createStatement();
        ResultSet resultSet = state.executeQuery("select EXCHANGE_TYPE, count(*) from HIS_DELIVER group by EXCHANGE_TYPE");
//        ResultSet resultSet = state.executeQuery("SELECT count(*) FROM DIM_DATE");
        System.out.println("type\tsum");
//        System.out.println("COUNTRY\tNAME");
        while(resultSet.next()) {
            System.out.println(resultSet.getString(1) + "\t" + resultSet.getString(2));
        }
    }

}
