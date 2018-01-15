package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/22.
 */
public class BranchDevelopment {

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
     * 类型
     */
    private String category_id;

    /**
     * 交易年
     */
    private String trade_year;

    /**
     * 普通客户
     */
    private String common_cust_num;

    /**
     * 潜力客户
     */
    private String potential_cust_num;

    /**
     * 核心客户
     */
    private String core_cust_num;

    /**
     * vip客户
     */
    private String vip_cust_num;

    /**
     * vip白金客户
     */
    private String vip_platina_cust_num;

    /**
     * vip钻石客户
     */
    private String vip_diamond_cust_num;

    /**
     * VIP超钻客户
     */
    private String vip_super_diamond_cust_num;

    /**
     * 月份描述
     */
    private String month_desc;

    /**
     * 总收入
     */
    private String total_income;

    /**
     * 手续费净收入
     */
    private String service_income;

    /**
     * 手续费净收入比例
     */
    private String service_income_rate;

    /**
     * 利差收入减存管费
     */
    private String interest_income;

    /**
     * 利差收入减存管费比例
     */
    private String interest_income_rate;

    /**
     * 信用业务收入
     */
    private String margin_service_income;

    /**
     * 信用业务收入比例
     */
    private String margin_service_income_rate;

    /**
     * 综合业务收入
     */
    private String inte_service_income;

    /**
     * 综合业务收入比例
     */
    private String inte_service_income_rate;

    /**
     * 年利润
     */
    private String profit;

    /**
     * 年利润同比
     */
    private String profit_yoy;

    /**
     * 年利润排名
     */
    private String profit_rank;

    public String getByKey(String key) {
        switch (key) {
            case "branch_name":
                return this.getBranch_name();
            case "asset":
                return this.getAsset();
            case "amount":
                return this.getAmount();
            case "open_cust_num":
                return this.getOpen_cust_num();
            case "common_cust_num":
                return this.getCommon_cust_num();
            case "potential_cust_num":
                return this.getPotential_cust_num();
            case "core_cust_num":
                return this.getCore_cust_num();
            case "vip_cust_num":
                return this.getVip_cust_num();
            case "vip_platina_cust_num":
                return this.getVip_platina_cust_num();
            case "vip_diamond_cust_num":
                return this.getVip_diamond_cust_num();
            case "vip_super_diamond_cust_num":
                return this.getVip_super_diamond_cust_num();
            case "profit":
                return this.getProfit();
            case "profit_yoy":
                return this.getProfit_yoy();
            case "profit_rank":
                return this.getProfit_rank();
        }
        return "";
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

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getTrade_year() {
        return trade_year;
    }

    public void setTrade_year(String trade_year) {
        this.trade_year = trade_year;
    }

    public String getCommon_cust_num() {
        return common_cust_num;
    }

    public void setCommon_cust_num(String common_cust_num) {
        this.common_cust_num = common_cust_num;
    }

    public String getPotential_cust_num() {
        return potential_cust_num;
    }

    public void setPotential_cust_num(String potential_cust_num) {
        this.potential_cust_num = potential_cust_num;
    }

    public String getCore_cust_num() {
        return core_cust_num;
    }

    public void setCore_cust_num(String core_cust_num) {
        this.core_cust_num = core_cust_num;
    }

    public String getVip_cust_num() {
        return vip_cust_num;
    }

    public void setVip_cust_num(String vip_cust_num) {
        this.vip_cust_num = vip_cust_num;
    }

    public String getVip_platina_cust_num() {
        return vip_platina_cust_num;
    }

    public void setVip_platina_cust_num(String vip_platina_cust_num) {
        this.vip_platina_cust_num = vip_platina_cust_num;
    }

    public String getVip_diamond_cust_num() {
        return vip_diamond_cust_num;
    }

    public void setVip_diamond_cust_num(String vip_diamond_cust_num) {
        this.vip_diamond_cust_num = vip_diamond_cust_num;
    }

    public String getVip_super_diamond_cust_num() {
        return vip_super_diamond_cust_num;
    }

    public void setVip_super_diamond_cust_num(String vip_super_diamond_cust_num) {
        this.vip_super_diamond_cust_num = vip_super_diamond_cust_num;
    }

    public String getMonth_desc() {
        return month_desc;
    }

    public void setMonth_desc(String month_desc) {
        this.month_desc = month_desc;
    }

    public String getTotal_income() {
        return total_income;
    }

    public void setTotal_income(String total_income) {
        this.total_income = total_income;
    }

    public String getService_income() {
        return service_income;
    }

    public void setService_income(String service_income) {
        this.service_income = service_income;
    }

    public String getService_income_rate() {
        return service_income_rate;
    }

    public void setService_income_rate(String service_income_rate) {
        this.service_income_rate = service_income_rate;
    }

    public String getInterest_income() {
        return interest_income;
    }

    public void setInterest_income(String interest_income) {
        this.interest_income = interest_income;
    }

    public String getInterest_income_rate() {
        return interest_income_rate;
    }

    public void setInterest_income_rate(String interest_income_rate) {
        this.interest_income_rate = interest_income_rate;
    }

    public String getMargin_service_income() {
        return margin_service_income;
    }

    public void setMargin_service_income(String margin_service_income) {
        this.margin_service_income = margin_service_income;
    }

    public String getMargin_service_income_rate() {
        return margin_service_income_rate;
    }

    public void setMargin_service_income_rate(String margin_service_income_rate) {
        this.margin_service_income_rate = margin_service_income_rate;
    }

    public String getInte_service_income() {
        return inte_service_income;
    }

    public void setInte_service_income(String inte_service_income) {
        this.inte_service_income = inte_service_income;
    }

    public String getInte_service_income_rate() {
        return inte_service_income_rate;
    }

    public void setInte_service_income_rate(String inte_service_income_rate) {
        this.inte_service_income_rate = inte_service_income_rate;
    }

    public String getProfit() {
        return profit;
    }

    public void setProfit(String profit) {
        this.profit = profit;
    }

    public String getProfit_yoy() {
        return profit_yoy;
    }

    public void setProfit_yoy(String profit_yoy) {
        this.profit_yoy = profit_yoy;
    }

    public String getProfit_rank() {
        return profit_rank;
    }

    public void setProfit_rank(String profit_rank) {
        this.profit_rank = profit_rank;
    }
}
