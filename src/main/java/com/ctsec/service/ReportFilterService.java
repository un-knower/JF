package com.ctsec.service;

import com.ctsec.model.jf.ReportIndex;
import com.ctsec.vo.*;

import java.util.List;
import java.util.Map;

/**
 * 报表筛选字段服务接口层
 *
 * Created by luchisheng on 2017/11/17.
 */

public interface ReportFilterService {

    /**
     * 获取报表指标筛选信息
     * @param reportId 报表编号
     * @return 报表指标
     */
    List<ReportIndex> getReportIndex(String reportId);

    /**
     * 获取分支机构营业部信息筛选信息
     * @return 分支机构营业部信息
     */
    List<BranchInfo> getBranchBaseInfo();

    /**
     * 分支机构机构机构转换
     * @param branchInfoList 分支机构信息
     * @return 格式转换的分支机构信息
     */
    Map<String, Object> branchBaseInfoMapping(List<BranchInfo> branchInfoList);

    /**
     * 获取证券代码筛选信息
     * @return 证券代码信息列表
     */
    List<SecuritiesInfo> getStockFilter();

    /**
     * 获取证券账户筛选信息
     * @param customerNo 客户号
     * @return 证券账户信息列表
     */
    List<StockAccount> getStockAccount(String customerNo);

    /**
     * 获取客户号筛选信息
     * @return 客户号信息列表
     */
    List<CustomerInfo> getCustomer();

    List<CustomerInfo> getCustomer18();

    /**
     * 获取资产分段筛选信息
     * @return 资产分段信息列表
     */
    List<AssetSection> getAssetSection();

}
