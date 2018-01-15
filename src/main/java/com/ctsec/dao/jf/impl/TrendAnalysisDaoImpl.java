package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.TrendAnalysisDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.TrendAnalysis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 趋势分析信息数据访问实现层
 *
 * Created by luchisheng on 2017/11/28.
 */

@Repository("TrendAnalysisDao")
public class TrendAnalysisDaoImpl implements TrendAnalysisDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<TrendAnalysis> selectTrendAnalysis(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(TrendAnalysis.class));
    }

}
