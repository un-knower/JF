package com.ctsec.service;

import java.util.List;

/**
 * 日期参数获取服务接口层
 *
 * Created by luchisheng on 2017/11/9.
 */
public interface ParamDateService {

    /**
     * 获取上一个日期
     * 日：昨天；月：上个月今天；年：去年今天
     * @param date 日期
     * @param dateType 日期类型，年、月、日
     * @return 上一个日期
     */
    String getPreDay(String date, String dateType);

    String getKPIRightFromDay(String date, String dateType, String index);

    String getKPIRightToDay(String date, String dateType);

    String getTradingInfoPreDay(String date, String dateType);

    /**
     * 获取用于融资融券接口的起始日期
     * 月：这个月第一天；年：今年第一天
     * @param date 日期
     * @param dateType 日期类型，年、月
     * @return 融资融券接口的起始日期
     *
     * 分支机构机构现状也用这个日期
     */
    String getMarginFromDay(String date, String dateType);

    /**
     * 获取用于融资融券接口的终止日期
     * 昨天
     * @param date 日期
     * @return 融资融券接口的终止日期
     */
    String getMarginToDay(String date);

    /**
     * 获取用于折线图接口的起始日期
     * 日：今年第一天；月：过去三年第一天；年：20100101
     * @param date 日期
     * @param dateType 日期类型，年、月、日
     * @return 折线图接口的起始日期
     */
    String getPolylineFromDay(String date, String dateType);

    /**
     * 获取用于折线图接口的终止日期
     * 日：昨天；月：上个月最后一天；年：去年最后一天
     * @param date 日期
     * @param dateType 日期类型，年、月、日
     * @return 折线图接口的终止日期
     */
    String getPolylineToDay(String date, String dateType);

    /**
     * 获取当前日期对应的交易日
     * 当前日期是交易日，返回原值；不是，返回上个交易日
     * @param date 日期
     * @return 当前日期对应的交易日
     */
    String getTradingDay(String date);

    /**
     * 获取当前日期对应的上一个交易日
     * 获取当前日期的PreDay，再取对应交易日
     * @param date 日期
     * @param dateType 日期类型，年、月、日
     * @return 当前日期对应的上一个交易日
     */
    String getPreTradingDay(String date, String dateType);

    /**
     * 按日获取一段时间内的交易日
     * 本年的所有交易日
     * @param fromDate 日期
     * @param toDate 日期
     * @return 一段时间内的按日交易日
     */
    List<String> getDayTradingDay(String fromDate, String toDate);

    /**
     * 按月获取一段时间内的交易日
     * 这段日期中所有月份的最后一个交易日
     * @param fromDate 日期
     * @param toDate 日期
     * @return 一段时间内的按月交易日
     */
    List<String> getMonthTradingDay(String fromDate, String toDate);

    /**
     * 按年获取一段时间内的交易日
     * 所有年份的最后一个交易日
     * @param fromDate 日期
     * @param toDate 日期
     * @return 一段时间内的按年交易日
     */
    List<String> getYearTradingDay(String fromDate, String toDate);

    /**
     * 获取用于折线图一段时间内的交易日
     * @param date 日期
     * @param dateType 日期类型，年、月、日
     * @return 用于折线图一段时间内的交易日
     */
    String getRangeTradingDay(String date, String dateType);

    /**
     * 获取当前日期
     * @return 当前日期
     */
    String getClearDate();

    /**
     * 获取用于KPI的当前月份
     * @param date 日期
     * @return 用于KPI的当前月份
     */
    String getKpiCurrentMonth(String date);

    /**
     * 获取用于KPI的上一月份
     * @param date 日期
     * @return 获取用于KPI的上一月份
     */
    String getKpiLastMonth(String date);

    /**
     * 获取用于KPI的今年第一个月
     * @param date 日期
     * @return 获取用于KPI的今年第一个月
     */
    String getKpiMinMonth(String date);

    /**
     * 获取用于KPI的去年这个月
     * @param date 日期
     * @return 获取用于KPI的去年这个月
     */
    String getKpiLastYearMonth(String date);

    /**
     * 获取用于KPI的去年第一个月
     * @param date 日期
     * @return 获取用于KPI的去年第一个月
     */
    String getKpiLastMinMonth(String date);

    /**
     * 获取用于KPI的去年最后一个月
     * @param date 日期
     * @return 获取用于KPI的去年最后一个月
     */
    String getKpiLastMaxMonth(String date);

    String getStatusInFromDay(String date, String dateType);

    String getReportPreTradingDay(String date, String dateType);

    String getReportFromDay(String date, String dateType);

}
