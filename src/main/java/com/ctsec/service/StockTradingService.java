package com.ctsec.service;

import java.util.List;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;
import com.ctsec.vo.StockMarketLine;

/**
 * 股基交易数据服务接口层
 *
 * Created by luchisheng on 2017/11/10.
 */
public interface StockTradingService {

    /**
     * 获取股票交易信息概览
     * @param endDate 日期
     * @param preEndDate 比较日期
     * @return 返回股票交易信息概览刘表
     */
    List<StockFundMarginTrading> getStockTrading01(String endDate, String preEndDate);

    /**
     * 获取全国及公司沪深两市股票总市值趋势
     * @param paramDate 日期
     * @return 全国及公司沪深两市股票总市值趋势列表
     */
    List<MarketLine> getStockTrading11(String paramDate, String dateType);

}
