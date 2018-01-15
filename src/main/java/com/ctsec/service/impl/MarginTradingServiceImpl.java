package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.MarginTradingDao;
import com.ctsec.service.MarginTradingService;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.Polyline;
import com.ctsec.vo.StockFundMarginTrading;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * 融资融券信息获取服务实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Service("marginTradingService")
public class MarginTradingServiceImpl implements MarginTradingService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("MarginTradingDao")
    private MarginTradingDao marginTradingDao;

    @Override
    public List<StockFundMarginTrading> getDayMarginTrading01(String endDate, String preEndDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_MARGIN_BY_DAY_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, preEndDate);
        return marginTradingDao.selectMarginTrading01(sqlQuery);
    }

    @Override
    public List<MarketLine> getMarginTrading11(String paramDate, String dateType) {
        String sqlQuery;
        if("D".equals(dateType)) {
            sqlQuery = sqlQueryConfig.getSEL_MARKET_MARGIN_BY_DAY_11();
        }else if("M".equals(dateType)){
            sqlQuery = sqlQueryConfig.getSEL_MARKET_MARGIN_BY_MONTH_11();
        }else {
            sqlQuery = sqlQueryConfig.getSEL_MARKET_MARGIN_BY_YEAR_11() ;
        }
        sqlQuery = MessageFormat.format(sqlQuery, paramDate);
        return marginTradingDao.selectMarginTrading11(sqlQuery);
    }

}
