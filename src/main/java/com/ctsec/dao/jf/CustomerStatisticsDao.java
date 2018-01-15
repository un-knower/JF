package com.ctsec.dao.jf;

import com.ctsec.vo.CustomerStatistics;

import java.util.List;

/**
 * 客户统计数据访问接口层
 * 通过KAP对客户统计数据信息查询
 *
 * Created by luchisheng on 2017/12/11.
 */
public interface CustomerStatisticsDao {

    /**
     * 查询客户统计信息概览
     * @param sqlQuery SQL语句
     * @return 客户统计信息概览列表
     */
    List<CustomerStatistics> selectCustomerStatistics(String sqlQuery);

}
