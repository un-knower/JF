package com.ctsec.dao.jf;

import com.ctsec.vo.TradingDay;

import java.util.List;

/**
 * 各种日期参数信息数据访问接口层
 * 通过Kap对各种日期参数信息查询
 *
 * Created by luchisheng on 2017/11/14.
 */
public interface ParamDateDao {

    /**
     * 获取一段时间之内的所有交易日
     * @param sqlQuery SQL语句
     * @return 交易日列表
     */
    List<TradingDay> selectTradingDay(String sqlQuery);

    /**
     * 获取系统日期
     * @param sqlQuery SQL语句
     * @return 系统日期
     */
    List<TradingDay> selectClearDate(String sqlQuery);
}
