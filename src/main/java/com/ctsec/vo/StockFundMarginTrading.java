package com.ctsec.vo;

/**
 * 股基、股票、基金、融资融券交易信息
 *
 * Created by luchisheng on 2017/11/7.
 */
public class StockFundMarginTrading {

    /**
     * 排序编号
     */
    private Integer sort_id;

    /**
     * 信息名称
     */
    private String name;

    /**
     * 指标值
     */
    private String detail;

    /**
     * 环比
     */
    private String mom;

    public Integer getSort_id() {
        return sort_id;
    }

    public void setSort_id(Integer sort_id) {
        this.sort_id = sort_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getMom() {
        return mom;
    }

    public void setMom(String mom) {
        this.mom = mom;
    }
}
