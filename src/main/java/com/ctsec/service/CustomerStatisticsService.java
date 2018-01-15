package com.ctsec.service;

import com.ctsec.vo.CustomerStatistics;

import java.util.List;

/**
 * 客户统计信息服务接口层
 *
 * Created by luchisheng on 2017/12/11.
 */
public interface CustomerStatisticsService {

    /**
     * 获取按资产区间统计客户数量&按资产区间统计客户资产分布&按资产区间客户数量及资产分布统计
     * @param endDate 统计时间
     * @param prodCode 产品编号
     * @return 按资产区间统计客户数量&按资产区间统计客户资产分布&按资产区间客户数量及资产分布统计列表
     */
    List<CustomerStatistics> getCustomerStatistics01(String endDate, String prodCode);

    /**
     * 获取按产品份额区间统计客户数量&按产品份额区间统计客户资产分布&按产品份额区间客户数量及资产分布统计
     * @param endDate 统计时间
     * @param prodCode 产品编号
     * @return 按产品份额区间统计客户数量&按产品份额区间统计客户资产分布&按产品份额区间客户数量及资产分布统计列表
     */
    List<CustomerStatistics> getCustomerStatistics02(String endDate, String prodCode);

}
