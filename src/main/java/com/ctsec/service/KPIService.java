package com.ctsec.service;

import com.ctsec.vo.KPILeft;
import com.ctsec.vo.KPIRight;

import java.util.List;

/**
 * 关键指标数据服务接口层
 *
 * Created by luchisheng on 2017/11/23.
 */
public interface KPIService {

    /**
     * 获取关键指标左侧数据
     * @return 关键指标左侧数据
     */
    List<KPILeft> getKPILeft();

    /**
     * 按日获取关键指标右侧数据
     * @return 关键指标右侧数据
     */
    List<KPIRight> getDayKPIRight();

    /**
     * 按月获取关键指标右侧数据-不含客户资产及融资融券等期末值字段
     * @return 关键指标右侧数据
     */
    List<KPIRight> getMonthKPIRight01();

    /**
     * 按月获取关键指标右侧数据-客户资产及融资融券等期末值字段
     * @return 关键指标右侧数据
     */
    List<KPIRight> getMonthKPIRight02();

    /**
     * 按年获取关键指标右侧数据-不含客户资产及融资融券等期末值字段
     * @return 关键指标右侧数据
     */
    List<KPIRight> getYearKPIRight01();

    /**
     * 按年获取关键指标右侧数据-客户资产及融资融券等期末值字段
     * @return 关键指标右侧数据
     */
    List<KPIRight> getYearKPIRight02();

    List<KPIRight> getKPIRight03(String fromDate, String toDate, String fromDate1, String toDate1);
}
