package com.ctsec.service;

import com.ctsec.vo.ReportTestData;

import java.util.List;

/**
 * Created by luchisheng on 2017/11/15.
 */

@Deprecated
public interface ReportTestService {

    List<ReportTestData> getReportTest(String branchIds, String fromDate, String toDate);

}
