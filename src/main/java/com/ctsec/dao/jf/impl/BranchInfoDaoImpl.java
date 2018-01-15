package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.BranchInfoDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.BranchInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 分支机构信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/14.
 */

@Repository("BranchInfoDao")
public class BranchInfoDaoImpl implements BranchInfoDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchInfo> selectBranchFilter(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchInfo.class));
    }
}
