package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/26.
 */
public class BranchPerformance {

    /**
     * 分公司名称
     */
    private String subcompany_name;

    /**
     * 年份
     */
    private String trade_year;

    /**
     * 排名
     */
    private String profit_rank;

    /**
     * 利润
     */
    private String profit;

    /**
     * 利润同比变动
     */
    private String profit_yoy;

    /**
     * 考核利润
     */
    private String profit_index;

    /**
     * 利润达成率
     */
    private String profit_complete_rate;

    /**
     * 交易金额市占率
     */
    private String market_rate;

    /**
     * 市占率同比变动
     */
    private String market_rate_yoy;

    /**
     * 市占率达成率
     */
    private String market_rate_complete_rate;

    /**
     * 市占率排名
     */
    private String market_rate_rank;

    public String getByKey(String key) {
        switch (key) {
            case "subcompany_name":
                return this.getSubcompany_name();
            case "market_rate":
                return this.getMarket_rate();
            case "market_rate_rank":
                return this.getMarket_rate_rank();
            case "profit":
                return this.getProfit();
            case "profit_yoy":
                return this.getProfit_yoy();
            case "profit_rank":
                return this.getProfit_rank();
        }
        return "";
    }

    public String getSubcompany_name() {
        return subcompany_name;
    }

    public void setSubcompany_name(String subcompany_name) {
        this.subcompany_name = subcompany_name;
    }

    public String getTrade_year() {
        return trade_year;
    }

    public void setTrade_year(String trade_year) {
        this.trade_year = trade_year;
    }

    public String getProfit_rank() {
        return profit_rank;
    }

    public void setProfit_rank(String profit_rank) {
        this.profit_rank = profit_rank;
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

    public String getProfit_index() {
        return profit_index;
    }

    public void setProfit_index(String profit_index) {
        this.profit_index = profit_index;
    }

    public String getProfit_complete_rate() {
        return profit_complete_rate;
    }

    public void setProfit_complete_rate(String profit_complete_rate) {
        this.profit_complete_rate = profit_complete_rate;
    }

    public String getMarket_rate() {
        return market_rate;
    }

    public void setMarket_rate(String market_rate) {
        this.market_rate = market_rate;
    }

    public String getMarket_rate_yoy() {
        return market_rate_yoy;
    }

    public void setMarket_rate_yoy(String market_rate_yoy) {
        this.market_rate_yoy = market_rate_yoy;
    }

    public String getMarket_rate_complete_rate() {
        return market_rate_complete_rate;
    }

    public void setMarket_rate_complete_rate(String market_rate_complete_rate) {
        this.market_rate_complete_rate = market_rate_complete_rate;
    }

    public String getMarket_rate_rank() {
        return market_rate_rank;
    }

    public void setMarket_rate_rank(String market_rate_rank) {
        this.market_rate_rank = market_rate_rank;
    }
}
