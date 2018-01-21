package com.ctsec.util;

import java.sql.*;

public class KylinServerManager {

    private static final String URL = AppPropertyUtil.getProperty("datasource.kylin.url");
    private static final String USER = AppPropertyUtil.getProperty("datasource.kylin.userName");
    private static final String PASSWORD = AppPropertyUtil.getProperty("datasource.kylin.password");

    static {
        try {
            Class.forName("org.apache.kylin.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("加载Kylin数据库驱动失败！");
        }
    }
    /**
     * 获取Connection
     *
     * @return
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public static Connection getConnection() throws SQLException {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            System.out.println("获取Kylin连接失败！");
            throw e;
        }
        return conn;
    }
    /**
     * 关闭ResultSet
     * @param rs
     */
    public static void closeResultSet(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
    }
    /**
     * 关闭Statement
     * @param stmt
     */
    public static void closeStatement(Statement stmt) {
        if (stmt != null) {
            try {
                stmt.close();
            }
            catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }
    /**
     * 关闭ResultSet、Statement
     * @param rs
     * @param stmt
     */
    public static void closeStatement(ResultSet rs, Statement stmt) {
        closeResultSet(rs);
        closeStatement(stmt);
    }
    /**
     * 关闭PreparedStatement
     * @param pstmt
     * @throws SQLException
     */
    public static void fastcloseStmt(PreparedStatement pstmt) throws SQLException
    {
        pstmt.close();
    }
    /**
     * 关闭ResultSet、PreparedStatement
     * @param rs
     * @param pstmt
     * @throws SQLException
     */
    public static void fastcloseStmt(ResultSet rs, PreparedStatement pstmt) throws SQLException
    {
        rs.close();
        pstmt.close();
    }
    /**
     * 关闭ResultSet、Statement、Connection
     * @param rs
     * @param stmt
     * @param con
     */
    public static void closeConnection(ResultSet rs, Statement stmt, Connection con) {
        closeResultSet(rs);
        closeStatement(stmt);
        closeConnection(con);
    }
    /**
     * 关闭Statement、Connection
     * @param stmt
     * @param con
     */
    public static void closeConnection(Statement stmt, Connection con) {
        closeStatement(stmt);
        closeConnection(con);
    }
    /**
     * 关闭Connection
     * @param con
     */
    public static void closeConnection(Connection con) {
        if (con != null) {
            try {
                con.close();
            }
            catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

}
