package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/14.
 */
public class KPIRight {

    /**
     * 日期
     */
    private String init_date;

    /**
     * 当日股基交易量
     */
    private String sf_amount;

    /**
     * 股基交易量日环比
     */
    private String sf_amount_rate;

    /**
     * 股基交易量市占率
     */
    private String sf_amount_market_rate;

    /**
     * 累计股基交易量市占率
     */
    private String all_sf_amount_market_rate;

    /**
     * 股基交易市占率日环比(百分点)
     */
    private String sf_market_rate_hb;

    /**
     * 股票佣金费率
     */
    private String stock_commission_rate;

    /**
     * 股票佣金费率日环比
     */
    private String stock_commission_rate_hb;

    /**
     * 佣金收入
     */
    private String commission;

    /**
     * 佣金收入日环比
     */
    private String commission_rate;

    /**
     * 客户资产
     */
    private String asset;

    /**
     * 客户资产日环比
     */
    private String asset_rate;

    /**
     * 两融余额
     */
    private String margin_balance;

    /**
     * 两融余额日环比
     */
    private String margin_balance_rate;

    /**
     * 两融余额市占率
     */
    private String margin_balance_market_rate;

    /**
     * 新开户数
     */
    private String open_cust_num;

    /**
     * 新开户数日环比
     */
    private String open_cust_num_rate;

    /**
     * 月份
     */
    private String month_id;

    /**
     * 当月股基交易量
     */
    private String sf_amount_mth;

    /**
     * 股基交易量月环比 / 股基交易量年同比
     */
    private String sf_amount_mth_rate;

    /**
     * 股基交易量市占率
     */
    private String sf_amount_market_mth_rate;

    /**
     * 股基交易市占率月环比(百分点) / 股基交易市占率年同比
     */
    private String sf_amount_market_mth_rate_hb;

    /**
     * 股票佣金费率
     */
    private String stock_commission_mth_rate;

    /**
     * 股票佣金费率月环比 / 股票佣金费率年同比
     */
    private String stock_commission_mth_rate_hb;

    /**
     * 当月佣金收入 / 累计佣金收入
     */
    private String commission_mth;

    /**
     * 佣金收入环比 / 佣金收入年同比
     */
    private String commission_mth_rate;

    /**
     * 当月日均资产 / 当年日均资产
     */
    private String avg_asset_mth;

    /**
     * 当月日均资产环比 / 当年日均资产年同比
     */
    private String avg_asset_mth_rate;

    /**
     * 客户期末资产
     */
    private String last_asset_mth;

    /**
     * 客户期末资产环比
     */
    private String last_asset_mth_rate;

    /**
     * 融资融券余额
     */
    private String last_margin_balance_mth;

    /**
     * 融资融券余额环比
     */
    private String last_margin_balance_mth_rate;

    /**
     * 当月新开户数环比 / 当年新开户数年同比
     */
    private String open_cust_num_mth_rate;

    /**
     * 年
     */
    private String year_id;

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getSf_amount() {
        return sf_amount;
    }

    public void setSf_amount(String sf_amount) {
        this.sf_amount = sf_amount;
    }

    public String getSf_amount_rate() {
        return sf_amount_rate;
    }

    public void setSf_amount_rate(String sf_amount_rate) {
        this.sf_amount_rate = sf_amount_rate;
    }

    public String getSf_amount_market_rate() {
        return sf_amount_market_rate;
    }

    public void setSf_amount_market_rate(String sf_amount_market_rate) {
        this.sf_amount_market_rate = sf_amount_market_rate;
    }

    public String getAll_sf_amount_market_rate() {
        return all_sf_amount_market_rate;
    }

    public void setAll_sf_amount_market_rate(String all_sf_amount_market_rate) {
        this.all_sf_amount_market_rate = all_sf_amount_market_rate;
    }

    public String getSf_market_rate_hb() {
        return sf_market_rate_hb;
    }

    public void setSf_market_rate_hb(String sf_market_rate_hb) {
        this.sf_market_rate_hb = sf_market_rate_hb;
    }

    public String getStock_commission_rate() {
        return stock_commission_rate;
    }

    public void setStock_commission_rate(String stock_commission_rate) {
        this.stock_commission_rate = stock_commission_rate;
    }

    public String getStock_commission_rate_hb() {
        return stock_commission_rate_hb;
    }

    public void setStock_commission_rate_hb(String stock_commission_rate_hb) {
        this.stock_commission_rate_hb = stock_commission_rate_hb;
    }

    public String getCommission() {
        return commission;
    }

    public void setCommission(String commission) {
        this.commission = commission;
    }

    public String getCommission_rate() {
        return commission_rate;
    }

    public void setCommission_rate(String commission_rate) {
        this.commission_rate = commission_rate;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getAsset_rate() {
        return asset_rate;
    }

    public void setAsset_rate(String asset_rate) {
        this.asset_rate = asset_rate;
    }

    public String getMargin_balance() {
        return margin_balance;
    }

    public void setMargin_balance(String margin_balance) {
        this.margin_balance = margin_balance;
    }

    public String getMargin_balance_rate() {
        return margin_balance_rate;
    }

    public void setMargin_balance_rate(String margin_balance_rate) {
        this.margin_balance_rate = margin_balance_rate;
    }

    public String getMargin_balance_market_rate() {
        return margin_balance_market_rate;
    }

    public void setMargin_balance_market_rate(String margin_balance_market_rate) {
        this.margin_balance_market_rate = margin_balance_market_rate;
    }

    public String getOpen_cust_num() {
        return open_cust_num;
    }

    public void setOpen_cust_num(String open_cust_num) {
        this.open_cust_num = open_cust_num;
    }

    public String getOpen_cust_num_rate() {
        return open_cust_num_rate;
    }

    public void setOpen_cust_num_rate(String open_cust_num_rate) {
        this.open_cust_num_rate = open_cust_num_rate;
    }

    public String getMonth_id() {
        return month_id;
    }

    public void setMonth_id(String month_id) {
        this.month_id = month_id;
    }

    public String getSf_amount_mth() {
        return sf_amount_mth;
    }

    public void setSf_amount_mth(String sf_amount_mth) {
        this.sf_amount_mth = sf_amount_mth;
    }

    public String getSf_amount_mth_rate() {
        return sf_amount_mth_rate;
    }

    public void setSf_amount_mth_rate(String sf_amount_mth_rate) {
        this.sf_amount_mth_rate = sf_amount_mth_rate;
    }

    public String getSf_amount_market_mth_rate() {
        return sf_amount_market_mth_rate;
    }

    public void setSf_amount_market_mth_rate(String sf_amount_market_mth_rate) {
        this.sf_amount_market_mth_rate = sf_amount_market_mth_rate;
    }

    public String getSf_amount_market_mth_rate_hb() {
        return sf_amount_market_mth_rate_hb;
    }

    public void setSf_amount_market_mth_rate_hb(String sf_amount_market_mth_rate_hb) {
        this.sf_amount_market_mth_rate_hb = sf_amount_market_mth_rate_hb;
    }

    public String getStock_commission_mth_rate() {
        return stock_commission_mth_rate;
    }

    public void setStock_commission_mth_rate(String stock_commission_mth_rate) {
        this.stock_commission_mth_rate = stock_commission_mth_rate;
    }

    public String getStock_commission_mth_rate_hb() {
        return stock_commission_mth_rate_hb;
    }

    public void setStock_commission_mth_rate_hb(String stock_commission_mth_rate_hb) {
        this.stock_commission_mth_rate_hb = stock_commission_mth_rate_hb;
    }

    public String getCommission_mth() {
        return commission_mth;
    }

    public void setCommission_mth(String commission_mth) {
        this.commission_mth = commission_mth;
    }

    public String getCommission_mth_rate() {
        return commission_mth_rate;
    }

    public void setCommission_mth_rate(String commission_mth_rate) {
        this.commission_mth_rate = commission_mth_rate;
    }

    public String getAvg_asset_mth() {
        return avg_asset_mth;
    }

    public void setAvg_asset_mth(String avg_asset_mth) {
        this.avg_asset_mth = avg_asset_mth;
    }

    public String getAvg_asset_mth_rate() {
        return avg_asset_mth_rate;
    }

    public void setAvg_asset_mth_rate(String avg_asset_mth_rate) {
        this.avg_asset_mth_rate = avg_asset_mth_rate;
    }

    public String getLast_asset_mth() {
        return last_asset_mth;
    }

    public void setLast_asset_mth(String last_asset_mth) {
        this.last_asset_mth = last_asset_mth;
    }

    public String getLast_asset_mth_rate() {
        return last_asset_mth_rate;
    }

    public void setLast_asset_mth_rate(String last_asset_mth_rate) {
        this.last_asset_mth_rate = last_asset_mth_rate;
    }

    public String getLast_margin_balance_mth() {
        return last_margin_balance_mth;
    }

    public void setLast_margin_balance_mth(String last_margin_balance_mth) {
        this.last_margin_balance_mth = last_margin_balance_mth;
    }

    public String getLast_margin_balance_mth_rate() {
        return last_margin_balance_mth_rate;
    }

    public void setLast_margin_balance_mth_rate(String last_margin_balance_mth_rate) {
        this.last_margin_balance_mth_rate = last_margin_balance_mth_rate;
    }

    public String getOpen_cust_num_mth_rate() {
        return open_cust_num_mth_rate;
    }

    public void setOpen_cust_num_mth_rate(String open_cust_num_mth_rate) {
        this.open_cust_num_mth_rate = open_cust_num_mth_rate;
    }

    public String getYear_id() {
        return year_id;
    }

    public void setYear_id(String year_id) {
        this.year_id = year_id;
    }
}
