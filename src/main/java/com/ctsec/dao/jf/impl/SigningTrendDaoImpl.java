package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.SigningTrendDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.SigningTrend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/14.
 */

@Repository("SigningTrendDao")
public class SigningTrendDaoImpl implements SigningTrendDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<SigningTrend> selectSigningTrend(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(SigningTrend.class));
    }

}
