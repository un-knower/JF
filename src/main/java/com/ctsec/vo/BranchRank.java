package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/20.
 */
public class BranchRank {

    /**
     * 营业部分类
     */
    private String category_id;

    /**
     * 日期
     */
    private String init_date;

    /**
     * 年
     */
    private String init_year;

    /**
     * 营业部名称
     */
    private String branch_name;

    /**
     * 资产总额排名
     */
    private String asset_rank;

    /**
     * 资产总额
     */
    private String asset;

    /**
     * 资产总额排名
     */
    private String amount_rank;

    /**
     * 交易金额
     */
    private String amount;

    public String getByKey(String key) {
        switch (key) {
            case "asset_rank":
                return this.getAsset_rank();
            case "asset":
                return this.getAsset();
            case "amount_rank":
                return this.getAmount_rank();
            case "amount":
                return this.getAmount();
        }
        return "";
    }


    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getInit_year() {
        return init_year;
    }

    public void setInit_year(String init_year) {
        this.init_year = init_year;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public String getAsset_rank() {
        return asset_rank;
    }

    public void setAsset_rank(String asset_rank) {
        this.asset_rank = asset_rank;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getAmount_rank() {
        return amount_rank;
    }

    public void setAmount_rank(String amount_rank) {
        this.amount_rank = amount_rank;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
