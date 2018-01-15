package com.ctsec.vo;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */
public class MarketBranch {

    /**
     * 月份
     */
    private String init_month;

    /**
     * 排名
     */
    private String c_order;

    /**
     * 证券公司名称
     */
    private String secu_name;

    /**
     * 营业部数量
     */
    private String c_branch;

    /**
     * 新增营业部数量
     */
    private String c_branch_add;

    /**
     * 营业部名称
     */
    private String branch_name;

    /**
     * 营业部地址
     */
    private String branch_address;

    public String getInit_month() {
        return init_month;
    }

    public void setInit_month(String init_month) {
        this.init_month = init_month;
    }

    public String getC_order() {
        return c_order;
    }

    public void setC_order(String c_order) {
        this.c_order = c_order;
    }

    public String getSecu_name() {
        return secu_name;
    }

    public void setSecu_name(String secu_name) {
        this.secu_name = secu_name;
    }

    public String getC_branch() {
        return c_branch;
    }

    public void setC_branch(String c_branch) {
        this.c_branch = c_branch;
    }

    public String getC_branch_add() {
        return c_branch_add;
    }

    public void setC_branch_add(String c_branch_add) {
        this.c_branch_add = c_branch_add;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public String getBranch_address() {
        return branch_address;
    }

    public void setBranch_address(String branch_address) {
        this.branch_address = branch_address;
    }
}
