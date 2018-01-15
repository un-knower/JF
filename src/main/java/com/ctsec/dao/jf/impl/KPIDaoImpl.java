package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.KPIDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.KPILeft;
import com.ctsec.vo.KPIRight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 关键指标数据访问实现层
 *
 * Created by luchisheng on 2017/11/23.
 */

@Repository("kpiDao")
public class KPIDaoImpl implements KPIDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<KPILeft> selectKPILeft(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(KPILeft.class));
    }

    @Override
    public List<KPIRight> selectKPIRight(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(KPIRight.class));
    }

}
