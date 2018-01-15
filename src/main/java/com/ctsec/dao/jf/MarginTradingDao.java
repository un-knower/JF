package com.ctsec.dao.jf;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.Polyline;
import com.ctsec.vo.StockFundMarginTrading;

import java.util.List;

/**
 * 融资融券交易信息数据访问接口层
 * 通过KAP对融资融券信息查询
 *
 * Created by luchisheng on 2017/11/10.
 */

public interface MarginTradingDao {

    /**
     * 查询融资融券交易信息概览
     * @param sqlQuery SQL语句
     * @return 融资融券交易信息列表
     */
    List<StockFundMarginTrading> selectMarginTrading01(String sqlQuery);

    /**
     * 查询全国及公司融资融券余额变化、市占率变化
     * @param sqlQuery SQL语句
     * @return 融资融券余额变化、市占率变化折线图
     */
    List<MarketLine> selectMarginTrading11(String sqlQuery);

}
