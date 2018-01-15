package com.ctsec.service;

import java.util.List;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 股基交易数据服务接口层
 *
 * Created by luchisheng on 2017/11/10.
 */
public interface StockFundTradingService {

    /**
     * 获取股基交易信息概览
     * @param endDate 日期
     * @param preEndDate 比较日期
     * @return 返回股基交易信息概览刘表
     */
    List<StockFundMarginTrading> getStockFundTrading01(String endDate, String preEndDate);

    /**
     * 获取全国及公司股基总市值变化
     * @param paramDate 日期
     * @return 返回全国及公司股基总市值变化列表
     */
    List<MarketLine> getStockFundTrading11(String paramDate, String dateType);

}
