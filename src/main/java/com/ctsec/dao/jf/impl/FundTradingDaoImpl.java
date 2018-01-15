package com.ctsec.dao.jf.impl;

import java.util.List;

import com.ctsec.vo.MarketLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ctsec.dao.jf.FundTradingDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.FundMarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 基金交易信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Repository("FundTradingDao")
public class FundTradingDaoImpl implements FundTradingDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<StockFundMarginTrading> selectFundTrading01(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(StockFundMarginTrading.class));
    }

    @Override
    public List<MarketLine> selectFundTrading11(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(MarketLine.class));
    }
}
