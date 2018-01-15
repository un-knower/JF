package com.ctsec.service;

import com.ctsec.model.jf.RelationItem;
import com.ctsec.vo.ReportData;

import java.util.List;
import java.util.Map;

/**
 * 报表数据服务接口层
 *
 * Created by luchisheng on 2017/11/20.
 */
public interface ReportDataService {

    /**
     * 获取报表01数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param branchId 分支机构
     * @param year 年
     * @param branchId1 分支机构1（语句不同）
     * @return 报表01数据
     */
    List<ReportData> getReportData01(String fromDate, String toDate, String branchId, String year, String branchId1);

    /**
     * 获取报表02数据
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @param branchId1 分支机构1（语句不同）
     * @return 报表02数据
     */
    List<ReportData> getReportData02(String endDate, String branchId, String branchId1);

    /**
     * 获取报表03数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param branchId 分支机构
     * @return 报表03数据
     */
    List<ReportData> getReportData03(String fromDate, String toDate, String branchId);

    /**
     * 获取报表04数据
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @return 报表04数据
     */
    List<ReportData> getReportData04(String endDate, String branchId);

    /**
     * 获取报表05数据
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @return 报表05数据
     */
    List<ReportData> getReportData05(String endDate, String branchId);

    /**
     * 获取报表06数据
     * @param startDate 起始日期
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @return 报表06数据
     */
    List<ReportData> getReportData06(String startDate, String endDate, String branchId);

    /**
     * 获取报表07数据
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @return 报表07数据
     */
    List<ReportData> getReportData07(String endDate, String branchId);

    /**
     * 获取报表08数据
     * @param endDate 终止日期
     * @param branchId 分支机构
     * @return 报表08数据
     */
    List<ReportData> getReportData08(String endDate, String branchId);

    /**
     * 获取报表09数据
     * @param branchId 开户营业部编号
     * @param coopBranchId 合作营业部编号
     * @param otherParams 其他参数
     * @param fromDate 统计起始时间
     * @param toDate 统计结束时间
     * @return 报表09数据
     */
    List<ReportData> getReportData09(String branchId, String coopBranchId, String otherParams, String fromDate, String toDate);

    /**
     * 获取报表10数据
     * @param branchId 开户营业部编号
     * @param coopBranchId 合作营业部编号
     * @param otherParams 其他参数
     * @return 报表10数据
     */
    List<ReportData> getReportData10(String branchId, String coopBranchId, String otherParams);

    /**
     * 报表10格式转换
     * @param reportDataList 报表数据
     * @return 格式转换后数据
     */
    List<ReportData> getMappingData10(List<ReportData> reportDataList);

    /**
     * 获取报表11数据
     * @param fromDate 清算起始日期
     * @param toDate 清算终止日期
     * @param branchId 营业部编号
     * @param exchangeType 市场编号
     * @param otherParams 其他参数
     * @return 报表11数据
     */
    List<ReportData> getReportData11(String fromDate, String toDate, String branchId, String exchangeType, String otherParams);

    /**
     * 获取报表12数据
     * @param fromDate 清算起始日趋
     * @param toDate 清算终止日期
     * @param branchId 营业部编号
     * @param exchangeType 市场编号
     * @param otherParams 其他参数
     * @return 报表12数据
     */
    List<ReportData> getReportData12(String fromDate, String toDate, String branchId, String exchangeType, String otherParams);

    /**
     * 获取报表13数据
     * @param fromDate 清算起始日趋
     * @param toDate 清算终止日期
     * @param branchId 营业部编号
     * @return 报表13数据
     */
    List<ReportData> getReportData13(String fromDate, String toDate, String branchId);

    /**
     * 获取报表13-下钻报表数据
     * @param fromDate 清算起始日趋
     * @param toDate 清算终止日期
     * @param branchId 营业部编号
     * @return 报表13-下钻报表数据
     */
    List<ReportData> getReportData1301(String fromDate, String toDate, String branchId);

    /**
     * 获取报表14数据
     * @param endDate 统计终止日期
     * @param branchId 营业部编号
     * @param assetSection 资产分段
     * @return 报表14数据
     */
    List<ReportData> getReportData14(String endDate, String branchId, String assetSection);

    /**
     * 获取报表15数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param branchId 营业部编号
     * @return 报表15数据
     */
    List<ReportData> getReportData15(String fromDate, String toDate, String branchId);

    /**
     * 获取报表16数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param prodCode 产品编号
     * @return 报表16数据
     */
    List<ReportData> getReportData16(String fromDate, String toDate, String prodCode);

    /**
     * 获取报表17数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param prodCode 产品编号
     * @return 报表17数据
     */
    List<ReportData> getReportData17(String fromDate, String toDate, String prodCode);

    /**
     * 获取报表18数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param prodCode 产品编号
     * @param index 指标及银行转入范围
     * @return 报表18数据
     */
    List<ReportData> getReportData18(String fromDate, String toDate, String prodCode, String otherParams, String index);

    /**
     * 获取报表19数据
     * @param fromDate 统计起始日期
     * @param toDate 统计终止日期
     * @param idNo 证件号码
     * @return 报表19数据
     */
    List<ReportData> getReportData19(String fromDate, String toDate, String idNo);

    List<ReportData> getMappingData19(List<ReportData> reportDataList, List<RelationItem> relationItemList, String queryType);

    /**
     * 报表数据排序
     * @param reportDataList 报表数据
     * @param orderKey 排序关键词
     * @param order 排序方式 asc 升序 desc 降序
     * @return 有序的报表数据
     */
    List<ReportData> getOrderedData(List<ReportData> reportDataList, String orderKey, String order);

    /**
     * 报表数据格式转换
     * @param reportDataList 报表数据
     * @param indexIdList 指标列表
     * @return 格式转换后的数据
     */
    List<Map<String, Object>> mapping(List<ReportData> reportDataList, String reportId, List<String> indexIdList);

    /**
     * 报表数据分页
     * @param reportDataList 报表数据
     * @param page 页数
     * @param pageSize 每页大小
     * @return 分页报表数据
     */
    Map<String, Object> getPagedData(List<Map<String, Object>> reportDataList, Integer page, Integer pageSize);

}
