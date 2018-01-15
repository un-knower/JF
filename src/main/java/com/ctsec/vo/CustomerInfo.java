package com.ctsec.vo;

/**
 * 客户号信息
 *
 * Created by luchisheng on 2017/11/22.
 */
public class CustomerInfo {

    /**
     * 客户号
     */
    private String cust_no;

    /**
     * 客户名称
     */
    private String cust_name;

    /**
     * 客户号 |  客户名称
     */
    private String customer;

    public String getCust_no() {
        return cust_no;
    }

    public void setCust_no(String cust_no) {
        this.cust_no = cust_no;
    }

    public String getCust_name() {
        return cust_name;
    }

    public void setCust_name(String cust_name) {
        this.cust_name = cust_name;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }
}
