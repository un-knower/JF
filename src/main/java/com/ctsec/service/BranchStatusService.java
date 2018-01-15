package com.ctsec.service;

import com.ctsec.vo.BranchStatus;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/21.
 */
public interface BranchStatusService {

    List<BranchStatus> getBranchStatus(String fromDate, String toDate);

    List<BranchStatus> getDayBranchStatusIn(String endDate, String category);

    List<BranchStatus> getMonthBranchStatusIn(String endDate, String category);

    List<BranchStatus> getYearBranchStatusIn(String endDate, String category);

    Map<String, Object> mapping(List<BranchStatus> branchStatusList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
