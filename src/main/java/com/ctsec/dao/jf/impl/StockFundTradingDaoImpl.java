package com.ctsec.dao.jf.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ctsec.dao.jf.StockFundTradingDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.MarketLine;
import com.ctsec.vo.StockFundMarginTrading;

/**
 * 股基交易信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/10.
 */

@Repository("StockFundTradingDao")
public class StockFundTradingDaoImpl implements StockFundTradingDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<StockFundMarginTrading> selectStockFundTrading01(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(StockFundMarginTrading.class));
    }

    @Override
    public List<MarketLine> selectStockFundTrading11(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(MarketLine.class));
    }
}
