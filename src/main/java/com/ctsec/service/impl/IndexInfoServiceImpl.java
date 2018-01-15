package com.ctsec.service.impl;

import com.ctsec.dao.jf.IndexInfoMapper;
import com.ctsec.vo.SystemIndexInfo;
import com.ctsec.service.IndexInfoService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 系统指标描述信息服务服务层
 *
 * Created by luchisheng on 2017/11/16.
 */

@Service("indexInfoService")
public class IndexInfoServiceImpl implements IndexInfoService {

    @Autowired
    private IndexInfoMapper indexInfoMapper;

    @Override
    public List<SystemIndexInfo> getIndexInfo() {
        return indexInfoMapper.selectAll();
    }

    @Override
    public Map<String, Object> InfoMapping(List<SystemIndexInfo> systemIndexInfoList) {

        Set<String> categorySet = new HashSet<>();
        Set<String> reportSet = new HashSet<>();
        Map<String, Object> categoryMap = new HashMap<>();
        Map<String, Object> indexMap = new HashMap<>();
        Map<String, Object> reportMap = new HashMap<>();

        for (SystemIndexInfo systemIndexInfo: systemIndexInfoList) {
            String categoryId = systemIndexInfo.getCategory_id();
            String categoryDesc = systemIndexInfo.getCategory_desc();
            HashedMap categoryItem = new HashedMap();
            if (categorySet.contains(categoryId + categoryDesc)) {
                categoryItem = (HashedMap) categoryMap.get(categoryId);
            }
            else {
                categorySet.add(categoryId + categoryDesc);
                categoryMap.put(categoryId, new HashedMap());
                categoryItem.put("categoryId", categoryId);
                categoryItem.put("categoryDesc", categoryDesc);
                categoryItem.put("index", new ArrayList<>());
                categoryItem.put("report", "");
            }
            List<String> indexList = (List<String>) categoryItem.get("index");
            HashedMap indexItem = new HashedMap();
            String indexId = systemIndexInfo.getIndex_id();
            indexItem.put("indexId", indexId);
            indexItem.put("indexDesc", systemIndexInfo.getIndex_desc());
            indexItem.put("indexInfo", systemIndexInfo.getIndex_info());
            indexMap.put(indexId, indexItem);
            indexList.add(indexId);
            categoryItem.put("index", indexList);
            String isReport = systemIndexInfo.getIs_report();
            String reportId = systemIndexInfo.getReport_id();
            if (isReport != null) {
                if (isReport.equals("1") && !reportSet.contains(reportId)) {
                    reportSet.add(reportId);
                    Map<String, String> reportItem = new HashMap<>();
                    reportItem.put("reportId", reportId);
                    reportItem.put("reportDesc", systemIndexInfo.getReport_desc());
                    reportItem.put("department", systemIndexInfo.getDepartment());
                    reportItem.put("user", systemIndexInfo.getUser());
                    reportMap.put(reportId, reportItem);
                    categoryItem.put("report", reportId);
                }
            }
            categoryMap.put(categoryId, categoryItem);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("category", categoryMap);
        result.put("index", indexMap);
        result.put("report", reportMap);
        return result;
    }
}
