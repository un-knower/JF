package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.BranchDevelopmentDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.BranchDevelopment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/22.
 */

@Repository("BranchDevelopmentDao")
public class BranchDevelopmentDaoImpl implements BranchDevelopmentDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchDevelopment> selectBranchDevelopment(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchDevelopment.class));
    }

}
