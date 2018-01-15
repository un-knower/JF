package com.ctsec.service;

import com.ctsec.vo.BranchPerformance;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/26.
 */
public interface BranchPerformanceService {

    List<BranchPerformance> getBranchPerformance01(String endDate, String branchId);

    List<BranchPerformance> getBranchPerformance02(String endDate, String branchId);

    List<BranchPerformance> getBranchPerformance03(String endDate, String branchId);

    Map<String, Object> mapping(List<BranchPerformance> branchPerformanceList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
