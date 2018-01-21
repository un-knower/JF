package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.BranchDevelopmentDao;
import com.ctsec.service.BranchDevelopmentService;
import com.ctsec.vo.BranchDevelopment;
import io.swagger.models.auth.In;
import org.apache.commons.collections.IterableMap;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.*;

/**
 * Created by luchisheng on 2017/12/22.
 */

@Service("branchDevelopmentService")
public class BranchDevelopmentServiceImpl implements BranchDevelopmentService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("BranchDevelopmentDao")
    private BranchDevelopmentDao branchDevelopmentDao;

    @Override
    public List<BranchDevelopment> getDayBranchDevelopment01(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_01_BY_DAY();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public List<BranchDevelopment> getYearBranchDevelopment01(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_01_BY_YEAR();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public Map<String, Map<String, Object>> developmentMapping01(List<BranchDevelopment> branchDevelopments, List<String> valueNameList) {
        Map<String, Map<String, Object>> mappingMap = new HashMap<>();
        List<BranchDevelopment> listZX = new ArrayList<>();
        List<BranchDevelopment> listA = new ArrayList<>();
        List<BranchDevelopment> listB = new ArrayList<>();
        List<BranchDevelopment> listC = new ArrayList<>();
        List<BranchDevelopment> listD = new ArrayList<>();
        List<BranchDevelopment> listX = new ArrayList<>();
        List<BranchDevelopment> listE = new ArrayList<>();
        for (BranchDevelopment branchDevelopment: branchDevelopments) {
            String categoryId = branchDevelopment.getCategory_id();
            switch (categoryId) {
                case "ZX": {
                    listZX.add(branchDevelopment);
                    break;
                }
                case "A": {
                    listA.add(branchDevelopment);
                    break;
                }
                case "B": {
                    listB.add(branchDevelopment);
                    break;
                }
                case "C": {
                    listC.add(branchDevelopment);
                    break;
                }
                case "D": {
                    listD.add(branchDevelopment);
                    break;
                }
                case "E": {
                    listE.add(branchDevelopment);
                    break;
                }
                case "X": {
                    listX.add(branchDevelopment);
                    break;
                }
            }
        }
        mappingMap.put("ZX", mapping01(listZX, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("A", mapping01(listA, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("B", mapping01(listB, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("C", mapping01(listC, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("D", mapping01(listD, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("E", mapping01(listE, new ArrayList<>(), new HashMap<>(), valueNameList));
        mappingMap.put("X", mapping01(listX, new ArrayList<>(), new HashMap<>(), valueNameList));
        return mappingMap;
    }

    private Map<String, Object> mapping01(List<BranchDevelopment> branchDevelopments, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        Set<String> branchSet = new HashSet<>();

        for (BranchDevelopment branchDevelopment: branchDevelopments) {
            String branchName = branchDevelopment.getBranch_name();
            branchSet.add(branchName);
        }

        for (BranchDevelopment branchDevelopment: branchDevelopments) {
            String dateId = branchDevelopment.getInit_date();
            String yearId = branchDevelopment.getInit_year();
            String tradeYearId = branchDevelopment.getTrade_year();
            String xData;
            if (dateId != null)
                xData = dateId;
            else if (yearId != null)
                xData = yearId;
            else if (tradeYearId != null)
                xData = tradeYearId;
            else
                xData = "";
            Map<String, HashedMap> value = new HashMap<>();
            if (xAxisData.contains(xData)) {
                value = (Map<String, HashedMap>) seriesData.get(xData);
            }
            else {
                xAxisData.add(xData);
                for (String branch: branchSet)
                   value.put(branch, new HashedMap());
            }
            HashedMap item = new HashedMap();
            for (String valueName: valueNameList) {
                item.put(valueName, branchDevelopment.getByKey(valueName));
            }

            value.put(branchDevelopment.getBranch_name(), item);
            seriesData.put(xData, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        for ( Map.Entry<String, Object> entry: seriesData.entrySet()) {
            Map<String, HashedMap> temp = (Map<String,HashedMap>) entry.getValue();
            seriesData.put(entry.getKey(), new ArrayList<>(temp.values()));
        }
        result.put("seriesData", seriesData);
        return result;
    }

    @Override
    public List<BranchDevelopment> getBranchDevelopment02(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_02();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public Map<String, Object> developmentMapping02(List<BranchDevelopment> branchDevelopments, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (BranchDevelopment branchDevelopment: branchDevelopments) {
            String yearId = branchDevelopment.getTrade_year();
            HashedMap value = new HashedMap();
            String categoryId = branchDevelopment.getCategory_id();
            if (xAxisData.contains(yearId)) {
                value = (HashedMap) seriesData.get(yearId);
            }
            else {
                xAxisData.add(yearId);
            }
            HashedMap item = new HashedMap();
            for (String valueName: valueNameList) {
                item.put(valueName, branchDevelopment.getByKey(valueName));
            }
            value.put(categoryId, item);
            seriesData.put(yearId, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

    @Override
    public List<BranchDevelopment> getBranchDevelopment03(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_03();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public Map<String, List<BranchDevelopment>> developmentMapping03(List<BranchDevelopment> branchDevelopments) {
        Map<String, List<BranchDevelopment>> mappingMap = new HashMap<>();
        List<BranchDevelopment> listZX = new ArrayList<>();
        List<BranchDevelopment> listX = new ArrayList<>();
        List<BranchDevelopment> listA = new ArrayList<>();
        List<BranchDevelopment> listB = new ArrayList<>();
        List<BranchDevelopment> listC = new ArrayList<>();
        List<BranchDevelopment> listD = new ArrayList<>();
        List<BranchDevelopment> listE = new ArrayList<>();
        for (BranchDevelopment branchDevelopment: branchDevelopments) {
            String categoryId = branchDevelopment.getCategory_id();
            switch (categoryId) {
                case "ZX": {
                    listZX.add(branchDevelopment);
                    break;
                }
                case "X": {
                    listX.add(branchDevelopment);
                    break;
                }
                case "A": {
                    listA.add(branchDevelopment);
                    break;
                }
                case "B": {
                    listB.add(branchDevelopment);
                    break;
                }
                case "C": {
                    listC.add(branchDevelopment);
                    break;
                }
                case "D": {
                    listD.add(branchDevelopment);
                    break;
                }
                case "E": {
                    listE.add(branchDevelopment);
                    break;
                }
            }
        }
        mappingMap.put("ZX", listZX);
        mappingMap.put("A", listA);
        mappingMap.put("B", listB);
        mappingMap.put("C", listC);
        mappingMap.put("D", listD);
        mappingMap.put("E", listE);
        mappingMap.put("X", listX);
        return mappingMap;
    }

    @Override
    public List<BranchDevelopment> getBranchDevelopment0401(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_04_01();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public List<BranchDevelopment> getBranchDevelopment0402(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_DEVELOPMENT_04_02();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchDevelopmentDao.selectBranchDevelopment(sqlQuery);
    }

    @Override
    public Map<String, Object> developmentMapping04(Map<String, Map<String, Object>> developmentMap) {
        Map<String, Object> newMappingResult = new HashMap<>();
        for (Map.Entry<String, Map<String, Object>> entry : developmentMap.entrySet()) {
            Map<String, Object> valueMap = entry.getValue();
            ArrayList xAxisData = (ArrayList) valueMap.get("xAxisData");
            HashMap<String, Object> seriesData = (HashMap<String, Object>) valueMap.get("seriesData");
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
                orderList.add(item.get("branch_name").toString());
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
                        if (hashedMap.get("branch_name") == null)
                            continue;
                        if (hashedMap.get("branch_name").toString().contains(orderList.get(i))) {
                            newItemMap.put(key , item);
                            bool = true;
                            break;
                        }
                    }
                    if (!bool) {
                        BranchDevelopment item = new BranchDevelopment();
                        item.setBranch_name("");
                        item.setProfit("");
                        item.setProfit_rank("");
                        item.setProfit_yoy("");
                        newItemMap.put(key,item);
                    }
                }
                Integer j = i + 1;
                newSeriesData.put(j.toString(), newItemMap);
            }
            Map<String, Object> newValueMap = new HashMap<>();
            newValueMap.put("xAxisData", xAxisData);
            newValueMap.put("seriesData", newSeriesData);
            newMappingResult.put(entry.getKey(), newValueMap);
        }
        return newMappingResult;
    }

}
