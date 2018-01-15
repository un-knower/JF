package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.BranchStatusDao;
import com.ctsec.service.BranchStatusService;
import com.ctsec.vo.BranchStatus;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/21.
 */

@Service("branchStatusService")
public class BranchStatusServiceImpl implements BranchStatusService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("BranchStatusDao")
    private BranchStatusDao branchStatusDao;

    @Override
    public List<BranchStatus> getBranchStatus(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_STATUS_BY_DATE();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return branchStatusDao.selectBranchStatus(sqlQuery);
    }

    @Override
    public List<BranchStatus> getDayBranchStatusIn(String endDate, String category) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_STATUS_IN_BY_DAY();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, category);
        return branchStatusDao.selectBranchStatus(sqlQuery);
    }

    @Override
    public List<BranchStatus> getMonthBranchStatusIn(String endDate, String category) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_STATUS_IN_BY_MONTH();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, category);
        return branchStatusDao.selectBranchStatus(sqlQuery);
    }

    @Override
    public List<BranchStatus> getYearBranchStatusIn(String endDate, String category) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_STATUS_IN_BY_YEAR();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, category);
        return branchStatusDao.selectBranchStatus(sqlQuery);
    }

    @Override
    public Map<String, Object> mapping(List<BranchStatus> branchStatusList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (BranchStatus branchStatus: branchStatusList) {
            String dayId = branchStatus.getInit_date();
            String monthId = branchStatus.getInit_month();
            String yearId = branchStatus.getInit_year();
            String xData;
            if (dayId != null)
                xData = dayId;
            else if (monthId != null)
                xData = monthId;
            else
                xData = yearId;
            List<HashedMap> value = new ArrayList<>();
            if (xAxisData.contains(xData)) {
                value = (List<HashedMap>) seriesData.get(xData);
            }
            else {
                xAxisData.add(xData);
            }
            HashedMap branchItem = new HashedMap();
            for (String valueName: valueNameList) {
                branchItem.put(valueName, branchStatus.getByKey(valueName));
            }
            value.add(branchItem);
            seriesData.put(xData, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
