package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.KLineIndexDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.KLineIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * K线指数数据访问实现层
 *
 * Created by luchisheng on 2017/11/8.
 */

@Repository("kLineIndexDao")
public class KLineIndexDaoImpl implements KLineIndexDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<KLineIndex> selectDayKLine(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(KLineIndex.class));
    }

}
