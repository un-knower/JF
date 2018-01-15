package com.ctsec.dao.jf;

import java.util.List;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 股基交易信息数据访问实现层
 * 通过KAP对股基交易信息查询
 *
 * Created by luchisheng on 2017/11/10.
 */
public interface StockFundTradingDao {

    /**
     * 查询股基交易信息概览
     * @param sqlQuery SQL语句
     * @return 股基交易信息概览列表
     */
    List<StockFundMarginTrading> selectStockFundTrading01(String sqlQuery);

    /**
     * 查询全国及公司股基总市值变化
     * @param sqlQuery SQL语句
     * @return 股基交易折线图数据列表
     */
    List<MarketLine> selectStockFundTrading11(String sqlQuery);

}
