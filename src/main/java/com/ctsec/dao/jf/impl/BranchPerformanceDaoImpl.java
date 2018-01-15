package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.BranchPerformanceDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.BranchPerformance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/26.
 */

@Repository("BranchPerformanceDao")
public class BranchPerformanceDaoImpl implements BranchPerformanceDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchPerformance> selectBranchPerformance(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchPerformance.class));
    }

}
