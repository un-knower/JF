package com.ctsec.service;

import com.ctsec.vo.MarketLine;
import com.ctsec.vo.Polyline;
import com.ctsec.vo.StockFundMarginTrading;

import java.util.List;

/**
 * 融资融券信息获取服务接口层
 *
 * Created by luchisheng on 2017/11/10.
 */
public interface MarginTradingService {

    /**
     * 按日获取融资融券余额市场总量
     * @param endDate 日期
     * @param preEndDate 比较日期
     * @return 融资融券按日余额市场总量
     */
    List<StockFundMarginTrading> getDayMarginTrading01(String endDate, String preEndDate);

    List<MarketLine> getMarginTrading11(String paramDate, String dateType);

}
