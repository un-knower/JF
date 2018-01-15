package com.ctsec.vo;

/**
 * 交易日信息
 *
 * Created by luchisheng on 2017/11/14.
 */
public class TradingDay {

    /**
     * 当前日期
     */
    private String day_id;

    /**
     * 是否交易日【1 = 是 ；0 = 否】
     */
    private String trade_mark;

    /**
     * 对应交易日
     */
    private String trade_day_id;

    /**
     * 系统日期
     */
    private String clear_date;

    public String getDay_id() {
        return day_id;
    }

    public void setDay_id(String day_id) {
        this.day_id = day_id;
    }

    public String getTrade_mark() {
        return trade_mark;
    }

    public void setTrade_mark(String trade_mark) {
        this.trade_mark = trade_mark;
    }

    public String getTrade_day_id() {
        return trade_day_id;
    }

    public void setTrade_day_id(String trade_day_id) {
        this.trade_day_id = trade_day_id;
    }

    public String getClear_date() {
        return clear_date;
    }

    public void setClear_date(String clear_date) {
        this.clear_date = clear_date;
    }
}
