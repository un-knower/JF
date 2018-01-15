package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.BranchRankDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.BranchRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */

@Repository("BranchRankDao")
public class BranchRankDaoImpl implements BranchRankDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchRank> selectBranchRank(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchRank.class));
    }

}
