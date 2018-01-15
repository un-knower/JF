package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.StockTradingDao;
import com.ctsec.service.StockTradingService;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.Polyline;
import com.ctsec.vo.StockFundMarginTrading;
import com.ctsec.vo.StockMarketLine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * 股基交易数据服务实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Service("stockTradingService")
public class StockTradingServiceImpl implements StockTradingService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("StockTradingDao")
    private StockTradingDao stockTradingDao;

    @Override
    public List<StockFundMarginTrading> getStockTrading01(String endDate, String preEndDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_BY_DATE_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, preEndDate);
        return stockTradingDao.selectStockTrading01(sqlQuery);
    }

    @Override
    public List<MarketLine> getStockTrading11(String paramDate, String dateType) {
    	String sqlQuery = null;
    	if("D".equals(dateType)) {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_BY_DATE_11();
    	}else if("M".equals(dateType)){
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_BY_DATE_12();
    	}else {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_STOCK_BY_DATE_13();
    	}
        sqlQuery = MessageFormat.format(sqlQuery, paramDate);
        return stockTradingDao.selectStockTrading11(sqlQuery);
    }
}
