package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.ParamDateDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.TradingDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 各种日期参数信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/14.
 */

@Repository("ParamDateDao")
public class ParamDateDaoImpl implements ParamDateDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<TradingDay> selectTradingDay(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(TradingDay.class));
    }

    @Override
    public List<TradingDay> selectClearDate(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(TradingDay.class));
    }
}
