package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.ReportFilterDao;
import com.ctsec.dao.jf.ReportIndexMapper;
import com.ctsec.model.jf.ReportIndex;
import com.ctsec.vo.*;
import com.ctsec.service.ReportFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 报表筛选字段服务实现层
 *
 * Created by luchisheng on 2017/11/17.
 */

@Service("reportFilterService")
public class ReportFilterServiceImpl implements ReportFilterService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("ReportFilterDao")
    private ReportFilterDao reportFilterDao;

    @Autowired
    ReportIndexMapper reportIndexMapper;

    @Override
    public List<ReportIndex> getReportIndex(String reportId) {
        return reportIndexMapper.selectIndex(reportId);
    }

    @Override
    public List<BranchInfo> getBranchBaseInfo() {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_FILTER_BRANCH();
        return reportFilterDao.selectBranchFilter(sqlQuery);
    }

    @Override
    public Map<String, Object> branchBaseInfoMapping(List<BranchInfo> branchInfoList) {
        BranchInfo superNode = new BranchInfo();
        superNode.setBranch_id(1000);
        superNode.setBranch_name("财通证券股份有限公司");
        return recursive(branchInfoList, superNode);

    }

    @Override
    public List<SecuritiesInfo> getStockFilter() {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_FILTER_STOCK_CODE();
        return reportFilterDao.selectStockCode(sqlQuery);
    }

    @Override
    public List<StockAccount> getStockAccount(String customerNo) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_FILTER_STOCK_ACCOUNT();
        sqlQuery = MessageFormat.format(sqlQuery, customerNo);
        return reportFilterDao.selectStockAccount(sqlQuery);
    }

    @Override
    public List<CustomerInfo> getCustomer() {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_FILTER_CUSTOMER();
        return reportFilterDao.selectCustomer(sqlQuery);
    }

    @Override
    public List<CustomerInfo> getCustomer18() {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_FILTER_REPORT_18_CUSTOMER();
        return reportFilterDao.selectCustomer(sqlQuery);
    }

    @Override
    public List<AssetSection> getAssetSection() {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_FILTER_ASSET();
        return reportFilterDao.selectAssetSection(sqlQuery);
    }

    private Map<String, Object> recursive(List<BranchInfo> branchInfoList, BranchInfo branchInfo) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", branchInfo.getBranch_id());
        result.put("name", branchInfo.getBranch_name());
        result.put("shortName", branchInfo.getShort_name());
        result.put("category", branchInfo.getCategory());
        List<Object> childrenList = new ArrayList<>();
        List<BranchInfo> children = getChildren(branchInfoList, branchInfo.getBranch_id());
        for (BranchInfo child: children) {
            Map<String, Object> childMap = recursive(branchInfoList, child);
            childrenList.add(childMap);
        }
        result.put("children", childrenList);
        return result;
    }

    private List<BranchInfo> getChildren(List<BranchInfo> branchInfoList, Integer subcompanyId) {
        List<BranchInfo> result = new ArrayList<>();
        for (BranchInfo branch: branchInfoList) {
            if (branch.getSubcompany_id().equals(subcompanyId)) {
                result.add(branch);
            }
        }
        return result;
    }
}
