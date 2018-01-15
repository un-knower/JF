package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.ReportDataDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.ReportData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 经营报表数据信息数据访问接口层
 *
 * Created by luchisheng on 2017/11/20.
 */

@Repository("ReportDataDao")
public class ReportDataDaoImpl implements ReportDataDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<ReportData> selectReportData(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(ReportData.class));
    }
}
