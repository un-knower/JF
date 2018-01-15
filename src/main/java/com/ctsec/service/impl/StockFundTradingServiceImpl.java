package com.ctsec.service.impl;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.StockFundTradingDao;
import com.ctsec.service.StockFundTradingService;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 股基交易数据服务实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Service("stockFundTradingService")
public class StockFundTradingServiceImpl implements StockFundTradingService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("StockFundTradingDao")
    private StockFundTradingDao stockFundTradingDao;

    @Override
    public List<StockFundMarginTrading> getStockFundTrading01(String endDate, String preEndDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_FUND_BY_DATE_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, preEndDate);
        return stockFundTradingDao.selectStockFundTrading01(sqlQuery);
    }

    @Override
    public List<MarketLine> getStockFundTrading11(String paramDate, String dateType) {
    	String sqlQuery;
    	if("D".equals(dateType)) {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_FUND_BY_DATE_11();
    	}else if("M".equals(dateType)){
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_FUND_BY_DATE_12();
    	}else {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_FUND_BY_DATE_13();
    	}
        sqlQuery = MessageFormat.format(sqlQuery, paramDate);
        return stockFundTradingDao.selectStockFundTrading11(sqlQuery);
    }
}
