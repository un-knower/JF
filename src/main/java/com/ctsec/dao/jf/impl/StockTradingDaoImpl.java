package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.StockTradingDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.Polyline;
import com.ctsec.vo.StockFundMarginTrading;
import com.ctsec.vo.StockMarketLine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 股票交易信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Repository("StockTradingDao")
public class StockTradingDaoImpl implements StockTradingDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<StockFundMarginTrading> selectStockTrading01(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(StockFundMarginTrading.class));
    }

    @Override
    public List<MarketLine> selectStockTrading11(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(MarketLine.class));
    }

}
