package com.ctsec.dao.jf;

import com.ctsec.vo.*;

import java.util.List;

/**
 * 经营报表各类筛选条件信息数据访问接口层
 * 通过KAP对经营报表筛选条件信息查询
 *
 * Created by luchisheng on 2017/11/17.
 */

public interface ReportFilterDao {

    /**
     * 查询分支机构筛选信息
     * @param sqlQuery SQL语句
     * @return 分支机构筛选信息列表
     */
    List<BranchInfo> selectBranchFilter(String sqlQuery);

    /**
     * 查询证券代码筛选信息
     * @param sqlQuery SQL语句
     * @return 证券代码信息列表
     */
    List<SecuritiesInfo> selectStockCode(String sqlQuery);

    /**
     * 查询证券账户筛选信息
     * @param sqlQuery SQL语句
     * @return 证券账户信息列表
     */
    List<StockAccount> selectStockAccount(String sqlQuery);

    /**
     * 查询客户号筛选信息
     * @param sqlQuery SQL语句
     * @return 客户号信息列表
     */
    List<CustomerInfo> selectCustomer(String sqlQuery);

    /**
     * 查询资产分段筛选信息
     * @param sqlQuery SQL语句
     * @return 资产分段信息列表
     */
    List<AssetSection> selectAssetSection(String sqlQuery);

}
