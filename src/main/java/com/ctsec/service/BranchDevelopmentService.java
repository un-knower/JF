package com.ctsec.service;

import com.ctsec.vo.BranchDevelopment;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/22.
 */
public interface BranchDevelopmentService {

    List<BranchDevelopment> getDayBranchDevelopment01(String endDate);

    List<BranchDevelopment> getYearBranchDevelopment01(String endDate);

    Map<String, Map<String, Object>> developmentMapping01(List<BranchDevelopment> branchDevelopments, List<String> valueNameList);

    List<BranchDevelopment> getBranchDevelopment02(String endDate);

    Map<String, Object> developmentMapping02(List<BranchDevelopment> branchDevelopments, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

    List<BranchDevelopment> getBranchDevelopment03(String fromDate, String toDate);

    Map<String, List<BranchDevelopment>> developmentMapping03(List<BranchDevelopment> branchDevelopments);

    List<BranchDevelopment> getBranchDevelopment0401(String endDate);

    List<BranchDevelopment> getBranchDevelopment0402(String endDate);

    Map<String, Object> developmentMapping04(Map<String, Map<String, Object>> developmentMap);

}
