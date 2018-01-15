package com.ctsec.dao.jf;

import java.util.List;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;
import com.ctsec.vo.StockMarketLine;

/**
 * 股票交易信息数据访问实现层
 * 通过KAP对股票交易信息查询
 *
 * Created by luchisheng on 2017/11/10.
 */

public interface StockTradingDao {

    /**
     * 查询股票交易信息概览
     * @param sqlQuery SQL语句
     * @return 股票交易信息概览列表
     */
    List<StockFundMarginTrading> selectStockTrading01(String sqlQuery);

    /**
     * 查询全国及公司沪深两市股票总市值趋势
     * @param sqlQuery SQL语句
     * @return 股票交易折线图数据列表
     */
    List<MarketLine> selectStockTrading11(String sqlQuery);

}
