package com.ctsec.dao.jf;

import com.ctsec.vo.ReportTestData;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 经营报表样例数据信息数据访问接口层
 * 通过Mysql对经营报表样例数据查询
 *
 * Created by luchisheng on 2017/11/15.
 */

@Deprecated
public interface ReportTestMapper {

    /**
     * 获取所有经营报表样例数据
     * @return 经营报表样例数据信息列表
     */
    List<ReportTestData> selectAll();

    /**
     * 分支机构Id、报表时间区间条件筛选下，获取经营报表样例数据
     * @param branchIds 分支机构Id
     * @param fromDate 报表起始时间
     * @param toDate 报表终止时间
     * @return 经营报表样例数据信息列表
     */
    List<ReportTestData> selectAllByBranchId(@Param("branchIds") String branchIds,
                                             @Param("fromDate") String fromDate,
                                             @Param("toDate") String toDate);
}