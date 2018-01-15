package com.ctsec.dao.jf;

import java.util.List;

import com.ctsec.vo.FundMarketLine;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 基金交易信息数据访问接口层
 * 通过KAP对基金交易数据信息查询
 *
 * Created by luchisheng on 2017/11/10.
 */
public interface FundTradingDao {

    /**
     * 查询基金交易信息概览
     * @param sqlQuery SQL语句
     * @return 基金交易信息概览列表
     */
    List<StockFundMarginTrading> selectFundTrading01(String sqlQuery);

    /**
     * 查询全国及公司沪深两市基金总市值趋势
     * @param sqlQuery SQL语句
     * @return 基金交易折线图数据列表
     */
    List<MarketLine> selectFundTrading11(String sqlQuery);

}
