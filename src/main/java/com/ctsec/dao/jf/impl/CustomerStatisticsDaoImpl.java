package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.CustomerStatisticsDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.CustomerStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 客户统计数据访问实现层
 *
 * Created by luchisheng on 2017/12/11.
 */

@Repository("CustomerStatisticsDao")
public class CustomerStatisticsDaoImpl implements CustomerStatisticsDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<CustomerStatistics> selectCustomerStatistics(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(CustomerStatistics.class));
    }

}
