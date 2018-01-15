package com.ctsec.service.impl;

import com.ctsec.dao.jf.ReportTestMapper;
import com.ctsec.vo.ReportTestData;
import com.ctsec.service.ReportTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by luchisheng on 2017/11/15.
 */

@Service("reportTestService")
@Deprecated
public class ReportTestServiceImpl implements ReportTestService {

    @Autowired
    private ReportTestMapper reportTestMapper;

    @Override
    public List<ReportTestData> getReportTest(String branchIds, String fromDate, String toDate) {
        return reportTestMapper.selectAllByBranchId(branchIds, fromDate, toDate);
    }
}
