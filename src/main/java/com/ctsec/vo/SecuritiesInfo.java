package com.ctsec.vo;

/**
 * 证券信息
 *
 * Created by luchisheng on 2017/11/17.
 */
public class SecuritiesInfo {

    /**
     * 证券代码
     */
    private String stock_code;

    /**
     * 证券代码|证券名称
     */
    private String stock_name;

    /**
     * 证券市场
     * （1 = 上海; 2 = 深圳; 9 = 新三板）
     */
    private String exchange_type;

    public String getStock_code() {
        return stock_code;
    }

    public void setStock_code(String stock_code) {
        this.stock_code = stock_code;
    }

    public String getStock_name() {
        return stock_name;
    }

    public void setStock_name(String stock_name) {
        this.stock_name = stock_name;
    }

    public String getExchange_type() {
        return exchange_type;
    }

    public void setExchange_type(String exchange_type) {
        this.exchange_type = exchange_type;
    }
}
