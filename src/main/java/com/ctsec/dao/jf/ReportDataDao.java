package com.ctsec.dao.jf;

import com.ctsec.vo.ReportData;

import java.util.List;

/**
 * 经营报表数据信息数据访问接口层
 * 通过KAP对经营报表数据信息查询
 *
 * Created by luchisheng on 2017/11/20.
 */

public interface ReportDataDao {

    /**
     * 获取经营报表数据信息
     * @param sqlQuery SQL语句
     * @return 数据报表数据信息列表
     */
    List<ReportData> selectReportData(String sqlQuery);

}
