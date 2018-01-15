package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.BranchStatusDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.BranchStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/21.
 */

@Repository("BranchStatusDao")
public class BranchStatusDaoImpl implements BranchStatusDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchStatus> selectBranchStatus(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchStatus.class));
    }

}
