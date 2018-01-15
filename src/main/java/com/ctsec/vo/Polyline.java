package com.ctsec.vo;

/**
 * 股基、股票、基金、融资融券交易折线图
 *
 * Created by luchisheng on 2017/11/13.
 */
public class Polyline {

    /**
     * 分类名称
     */
    private String category;

    /**
     * 截止日期
     */
    private String endDate;

    /**
     * 金额
     */
    private String money;

    /**
     * 上海金额
     */
    private String shMoney;

    /**
     * 深圳金额
     */
    private String szMoney;

    /**
     * 股转金额
     */
    private String gzMoney;

    /**
     * 总金额
     */
    private String totalMoney;

    /**
     * 市场比率
     */
    private String marketRate;

    public String getByKey(String key) {
        String value = "";
        switch (key) {
            case "money":{
                value = this.getMoney();
                break;
            }
            case "shMoney":{
                value = this.getShMoney();
                break;
            }
            case "szMoney":{
                value = this.getSzMoney();
                break;
            }
            case "gzMoney":{
                value = this.getGzMoney();
                break;
            }
            case "totalMoney":{
                value = this.getTotalMoney();
                break;
            }
            case "marketRate":{
                value = this.getMarketRate();
                break;
            }
        }
        return value;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getShMoney() {
        return shMoney;
    }

    public void setShMoney(String shMoney) {
        this.shMoney = shMoney;
    }

    public String getSzMoney() {
        return szMoney;
    }

    public void setSzMoney(String szMoney) {
        this.szMoney = szMoney;
    }

    public String getGzMoney() {
        return gzMoney;
    }

    public void setGzMoney(String gzMoney) {
        this.gzMoney = gzMoney;
    }

    public String getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(String totalMoney) {
        this.totalMoney = totalMoney;
    }

    public String getMarketRate() {
        return marketRate;
    }

    public void setMarketRate(String marketRate) {
        this.marketRate = marketRate;
    }
}
