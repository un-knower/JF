package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.MarketBranchDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.MarketBranch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */

@Repository("MarketBranchDao")
public class MarketBranchDaoImpl implements MarketBranchDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<MarketBranch> selectMarketBranch(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(MarketBranch.class));
    }

}
