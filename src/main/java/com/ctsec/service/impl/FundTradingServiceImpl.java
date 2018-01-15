package com.ctsec.service.impl;

import java.text.MessageFormat;
import java.util.List;

import com.ctsec.vo.MarketLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.FundTradingDao;
import com.ctsec.service.FundTradingService;
import com.ctsec.vo.FundMarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 基金交易数据服务实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Service("fundTradingService")
public class FundTradingServiceImpl implements FundTradingService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("FundTradingDao")
    private FundTradingDao fundTradingDao;

    @Override
    public List<StockFundMarginTrading> getFundTrading01(String endDate, String preEndDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_FUND_BY_DATE_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, preEndDate);
        return fundTradingDao.selectFundTrading01(sqlQuery);
    }

    @Override
    public List<MarketLine> getFundTrading11(String paramDate, String dateType) {
    	String sqlQuery;
    	if("D".equals(dateType)) {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_FUND_BY_DATE_11();
    	}else if("M".equals(dateType)){
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_FUND_BY_DATE_12();
    	}else {
    		sqlQuery = sqlQueryConfig.getSEL_MARKET_FUND_BY_DATE_13();
    	}
        sqlQuery = MessageFormat.format(sqlQuery, paramDate);
        return fundTradingDao.selectFundTrading11(sqlQuery);
    }

}
