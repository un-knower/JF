package com.ctsec.kap;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class HiveJdbcTest {

    public static void main(String args[]) {

        try {
            Class.forName("org.apache.hive.jdbc.HiveDriver");

            Connection conn = DriverManager.getConnection("jdbc:hive2://172.15.1.80:10000/kapmiddle", "", "");

            Statement st = conn.createStatement();

            String sql = "SELECT * FROM kylin_country";

            ResultSet rs = st.executeQuery(sql);

            while (rs.next()) {

                System.out.println(rs.getString(1) + "     " + rs.getString(4)
                        + rs.getString(2) + "     " + rs.getString(3));
            }

        } catch (ClassNotFoundException e) {

            e.printStackTrace();
        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

}
