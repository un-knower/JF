package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.BranchRankDao;
import com.ctsec.service.BranchRankService;
import com.ctsec.vo.BranchRank;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.*;

/**
 * Created by luchisheng on 2017/12/20.
 */

@Service("branchRankService")
public class BranchRankServiceImpl implements BranchRankService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("BranchRankDao")
    private BranchRankDao branchRankDao;

    @Override
    public List<BranchRank> getDayMarketBranch(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_RANK_BRANCH_BY_DAY();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchRankDao.selectBranchRank(sqlQuery);
    }

    @Override
    public List<BranchRank> getYearMarketBranch(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_RANK_BRANCH_BY_YEAR();
        sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return branchRankDao.selectBranchRank(sqlQuery);
    }

    @Override
    public Map<String,  Map<String, Object>> marketBranchMapping(List<BranchRank> branchRankList) {
        Map<String, Map<String, Object>> mappingMap = new HashMap<>();
        List<BranchRank> listZX = new ArrayList<>();
        List<BranchRank> listA = new ArrayList<>();
        List<BranchRank> listB = new ArrayList<>();
        List<BranchRank> listC = new ArrayList<>();
        List<BranchRank> listD = new ArrayList<>();
        List<BranchRank> listX = new ArrayList<>();
        List<BranchRank> listE = new ArrayList<>();
        for (BranchRank branchRank: branchRankList) {
            String categoryId = branchRank.getCategory_id();
            switch (categoryId) {
                case "ZX": {
                    listZX.add(branchRank);
                    break;
                }
                case "A": {
                    listA.add(branchRank);
                    break;
                }
                case "B": {
                    listB.add(branchRank);
                    break;
                }
                case "C": {
                    listC.add(branchRank);
                    break;
                }
                case "D": {
                    listD.add(branchRank);
                    break;
                }
                case "X": {
                    listX.add(branchRank);
                    break;
                }
                case "E": {
                    listE.add(branchRank);
                    break;
                }
            }
        }
        mappingMap.put("ZX", mapping(listZX, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("A", mapping(listA, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("B", mapping(listB, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("C", mapping(listC, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("D", mapping(listD, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("X", mapping(listX, new ArrayList<>(), new HashMap<>()));
        mappingMap.put("E", mapping(listE, new ArrayList<>(), new HashMap<>()));
        return mappingMap;
    }

    private Map<String, Object> mapping(List<BranchRank> branchRankList, List<String> xAxisData, Map<String, Object> seriesData) {

        Integer index = 0;

        for (BranchRank branchRank: branchRankList) {
            String dateId = branchRank.getInit_date();
            String yearId = branchRank.getInit_year();
            String branchName = branchRank.getBranch_name();
            String assetRank = branchRank.getAsset_rank();
            String asset = branchRank.getAsset();
            String amountRank = branchRank.getAmount_rank();
            String amount = branchRank.getAmount();
            String xData;
            if (dateId != null)
                xData = dateId;
            else
                xData = yearId;
            HashedMap value = new HashedMap();
            if (xAxisData.contains(xData)) {
                value = (HashedMap) seriesData.get(xData);
                index ++;
            }
            else {
                xAxisData.add(xData);
                value.put("asset", new LinkedHashMap<>());
                value.put("amount", new LinkedHashMap<>());
                index = 1;
            }
            LinkedHashMap<String, Object> assetMap = (LinkedHashMap) value.get("asset");
            LinkedHashMap<String, Object> amountMap = (LinkedHashMap) value.get("amount");

            HashedMap assetItem = new HashedMap();
            assetItem.put("branchName",branchName);
            assetItem.put("assetRank", assetRank);
            assetItem.put("asset", asset);
            assetMap.put(index.toString(), assetItem);
            HashedMap amountItem = new HashedMap();
            amountItem.put("branchName",branchName);
            amountItem.put("amountRank", amountRank);
            amountItem.put("amount", amount);
            amountMap.put(index.toString(), amountItem);
            value.put("asset", assetMap);
            value.put("amount", amountMap);
            seriesData.put(xData, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
