package com.ctsec.vo;

/**
 * K线指数
 *
 * Created by luchisheng on 2017/11/14.
 */
public class KLineIndex {

    /**
     * 指数类型
     * 【000001=上证/399001=深圳/399005=创业板/399006中小板】
     */
    private String secu_code;

    /**
     * 日期
     */
    private Integer init_date;

    /**
     * 开盘
     */
    private Double open_price;

    /**
     * 最高
     */
    private Double high_price;

    /**
     * 最低
     */
    private Double low_price;

    /**
     * 收盘
     */
    private Double close_price;

    public String getSecu_code() {
        return secu_code;
    }

    public void setSecu_code(String secu_code) {
        this.secu_code = secu_code;
    }

    public Integer getInit_date() {
        return init_date;
    }

    public void setInit_date(Integer init_date) {
        this.init_date = init_date;
    }

    public Double getOpen_price() {
        return open_price;
    }

    public void setOpen_price(Double open_price) {
        this.open_price = open_price;
    }

    public Double getHigh_price() {
        return high_price;
    }

    public void setHigh_price(Double high_price) {
        this.high_price = high_price;
    }

    public Double getLow_price() {
        return low_price;
    }

    public void setLow_price(Double low_price) {
        this.low_price = low_price;
    }

    public Double getClose_price() {
        return close_price;
    }

    public void setClose_price(Double close_price) {
        this.close_price = close_price;
    }
}
