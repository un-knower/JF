package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.CustomerStatisticsDao;
import com.ctsec.service.CustomerStatisticsService;
import com.ctsec.vo.CustomerStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * 客户统计信息服务实现层
 *
 * Created by luchisheng on 2017/12/11.
 */

@Service("customerStatisticsService")
public class CustomerStatisticsServiceImpl implements CustomerStatisticsService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("CustomerStatisticsDao")
    private CustomerStatisticsDao CustomerStatisticsDao;

    @Override
    public List<CustomerStatistics> getCustomerStatistics01(String endDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_STATISTICS_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, prodCode);
        return CustomerStatisticsDao.selectCustomerStatistics(sqlQuery);
    }

    @Override
    public List<CustomerStatistics> getCustomerStatistics02(String endDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_STATISTICS_02();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, prodCode);
        return CustomerStatisticsDao.selectCustomerStatistics(sqlQuery);
    }

}
