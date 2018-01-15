package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.BranchPerformanceDao;
import com.ctsec.service.BranchPerformanceService;
import com.ctsec.vo.BranchPerformance;
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
 * Created by luchisheng on 2017/12/26.
 */

@Service("branchPerformanceService")
public class BranchPerformanceServiceImpl implements BranchPerformanceService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("BranchPerformanceDao")
    private BranchPerformanceDao branchPerformanceDao;

    @Override
    public List<BranchPerformance> getBranchPerformance01(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_PERFORMANCE_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return branchPerformanceDao.selectBranchPerformance(sqlQuery);
    }

    @Override
    public List<BranchPerformance> getBranchPerformance02(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_PERFORMANCE_02();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return branchPerformanceDao.selectBranchPerformance(sqlQuery);
    }

    @Override
    public List<BranchPerformance> getBranchPerformance03(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_PERFORMANCE_03();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return branchPerformanceDao.selectBranchPerformance(sqlQuery);
    }

    @Override
    public Map<String, Object> mapping(List<BranchPerformance> branchPerformanceList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (BranchPerformance branchPerformance: branchPerformanceList) {
            String tradeYearId = branchPerformance.getTrade_year();
            List<HashedMap> value = new ArrayList<>();
            if (xAxisData.contains(tradeYearId)) {
                value = (List<HashedMap>) seriesData.get(tradeYearId);
            }
            else {
                xAxisData.add(tradeYearId);
            }
            HashedMap item = new HashedMap();
            for (String valueName: valueNameList) {
                item.put(valueName, branchPerformance.getByKey(valueName));
            }
            value.add(item);
            seriesData.put(tradeYearId, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return this.rankMapping(result);
    }

   private Map<String, Object> rankMapping(Map<String, Object> performanceMap) {
        ArrayList xAxisData = (ArrayList) performanceMap.get("xAxisData");
        HashMap<String, Object> seriesData = (HashMap<String, Object>) performanceMap.get("seriesData");
        Integer max = 0;
        for (Object xAxis: xAxisData) {
            Integer x = Integer.valueOf(xAxis.toString());
            if (x > max)
                max = x;
        }
        List<String> orderList = new ArrayList<>();
        ArrayList maxSeries = (ArrayList) seriesData.get(max.toString());

        for (Object SeriesItem: maxSeries) {
            HashedMap item = (HashedMap) SeriesItem;
            orderList.add(item.get("subcompany_name").toString());
        }
        Map<String, Object> newSeriesData = new HashMap<>();
        for (int i = 0; i < orderList.size(); i++) {
            Map<String, Object> newItemMap = new HashMap<>();
            for (Object keySet: seriesData.keySet()) {
                String key = keySet.toString();
                ArrayList itemList = (ArrayList) seriesData.get(key);
                Boolean bool = false;
                for (Object item: itemList) {
                    HashedMap hashedMap = (HashedMap) item;
                    if (hashedMap.get("subcompany_name").toString().equals(orderList.get(i))) {
                        newItemMap.put(key, item);
                        bool = true;
                        break;
                    }
                }
                if (!bool) {
                    BranchPerformance item = new BranchPerformance();
                    newItemMap.put(key, item);
                }
            }
            Integer j = i + 1;
            newSeriesData.put(j.toString(), newItemMap);
        }
        Map<String, Object> newValueMap = new HashMap<>();
        newValueMap.put("xAxisData", xAxisData);
        newValueMap.put("seriesData", newSeriesData);
        return newValueMap;
    }

}
