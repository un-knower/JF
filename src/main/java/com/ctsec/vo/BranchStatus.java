package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/21.
 */
public class BranchStatus {

    /**
     * 日期
     */
    private String init_date;

    /**
     * 月份
     */
    private String init_month;

    /**
     * 年份
     */
    private String init_year;

    /**
     * 营业部数
     */
    private String branch_num;

    /**
     * 分类
     */
    private String category_id;

    /**
     * 部均佣金
     */
    private String avg_commission;

    /**
     * 部均资产
     */
    private String avg_asset;

    /**
     * 部均交易金额
     */
    private String avg_amount;

    /**
     * 部均开户数
     */
    private String avg_cust_num;

    /**
     * 佣金
     */
    private String commission;

    /**
     * 资产
     */
    private String asset;

    /**
     * 交易金额
     */
    private String amount;

    /**
     * 开户数
     */
    private String open_cust_num;

    /**
     * 营业部名称
     */
    private String name;

    public String getByKey(String key) {
        switch (key) {
            case "name":
                return this.getName();
            case "open_cust_num":
                return this.getOpen_cust_num();
            case "commission":
                return this.getCommission();
            case "amount":
                return this.getAmount();
            case "asset":
                return this.getAsset();
        }
        return "";
    }

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getInit_month() {
        return init_month;
    }

    public void setInit_month(String init_month) {
        this.init_month = init_month;
    }

    public String getInit_year() {
        return init_year;
    }

    public void setInit_year(String init_year) {
        this.init_year = init_year;
    }

    public String getBranch_num() {
        return branch_num;
    }

    public void setBranch_num(String branch_num) {
        this.branch_num = branch_num;
    }

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getAvg_commission() {
        return avg_commission;
    }

    public void setAvg_commission(String avg_commission) {
        this.avg_commission = avg_commission;
    }

    public String getAvg_asset() {
        return avg_asset;
    }

    public void setAvg_asset(String avg_asset) {
        this.avg_asset = avg_asset;
    }

    public String getAvg_amount() {
        return avg_amount;
    }

    public void setAvg_amount(String avg_amount) {
        this.avg_amount = avg_amount;
    }

    public String getAvg_cust_num() {
        return avg_cust_num;
    }

    public void setAvg_cust_num(String avg_cust_num) {
        this.avg_cust_num = avg_cust_num;
    }

    public String getCommission() {
        return commission;
    }

    public void setCommission(String commission) {
        this.commission = commission;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getOpen_cust_num() {
        return open_cust_num;
    }

    public void setOpen_cust_num(String open_cust_num) {
        this.open_cust_num = open_cust_num;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
