package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.MarketBranchDao;
import com.ctsec.service.MarketBranchService;
import com.ctsec.vo.MarketBranch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */

@Service("marketBranchService")
public class MarketBranchServiceImpl implements MarketBranchService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("MarketBranchDao")
    private MarketBranchDao marketBranchDao;

    @Override
    public List<MarketBranch> getMarketBranch(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_BRANCH_BY_MONTH();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return marketBranchDao.selectMarketBranch(sqlQuery);
    }

    @Override
    public List<MarketBranch> getMarketBranchIn(String secuName, String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_MARKET_BRANCH_IN_BY_MONTH();
        sqlQuery = MessageFormat.format(sqlQuery, secuName, endDate);
        return marketBranchDao.selectMarketBranch(sqlQuery);
    }

}
