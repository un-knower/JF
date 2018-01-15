package com.ctsec.service;

import java.util.List;

import com.ctsec.vo.FundMarketLine;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 基金交易数据服务接口层
 *
 * Created by luchisheng on 2017/11/10.
 */

public interface FundTradingService {

    /**
     * 获取基金交易信息概览
     * @param endDate 日期
     * @param preEndDate 比较日期
     * @return 返回基金交易信息概览刘表
     */
    List<StockFundMarginTrading> getFundTrading01(String endDate, String preEndDate);

    /**
     * 获取全国及公司沪深两市基金总市值趋势
     * @param paramDate 日期
     * @return 返回全国及公司沪深两市基金总市值列表
     */
    List<MarketLine> getFundTrading11(String paramDate, String dateType);

}
