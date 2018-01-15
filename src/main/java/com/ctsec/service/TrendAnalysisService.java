package com.ctsec.service;

import com.ctsec.vo.TrendAnalysis;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 趋势分析数据信息服务接口层
 *
 * Created by luchisheng on 2017/11/28.
 */
public interface TrendAnalysisService {

    /**
     * 获取业务绩效-公司代理买卖交易量当月及累计市占率趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 业务绩效-公司代理买卖交易量当月及累计市占率趋势列表
     */
    List<TrendAnalysis> getPerformance01(String fromDate, String toDate);

    /**
     * 获取业务绩效-公司两融市占率和总交易市占率的单月趋势对比图
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 业务绩效-公司两融市占率和总交易市占率的单月趋势对比图列表
     */
    List<TrendAnalysis> getPerformance02(String fromDate, String toDate);

    /**
     * 获取业务绩效-公司和市场的单月净佣金费率趋势对比图
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 业务绩效-公司和市场的单月净佣金费率趋势对比图列表
     */
    List<TrendAnalysis> getPerformance03(String fromDate, String toDate);

    /**
     * 获取业务绩效-两融余额及市占率趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 业务绩效-两融余额及市占率趋势列表
     */
    List<TrendAnalysis> getPerformance04(String fromDate, String toDate);

    /**
     * 获取业务绩效-分公司KPI指标完成情况
     * @return 业务绩效-分公司KPI指标完成情况列表
     */
    List<TrendAnalysis> getPerformance05();

    /**
     * 获取业务绩效-营业部经营情况
     * @return 业务绩效-营业部经营情况
     */
    List<TrendAnalysis> getPerformance06();

    /**
     * 营业部经营情况格式转换
     * @param trendAnalysisList 营业部经营情况
     * @return 格式转换后营业部经营情况
     */
    ArrayList performanceMapping06(List<TrendAnalysis> trendAnalysisList);

    /**
     * 获取业务绩效-TOP25家券商交易量(股+基)及市场份额排行
     * @return 获取业务绩效-TOP25家券商交易量(股+基)及市场份额排行
     */
    List<TrendAnalysis> getPerformance07();

    /**
     * TOP25家券商交易量(股+基)及市场份额排行格式转换
     * @param trendAnalysisList TOP25家券商交易量(股+基)及市场份额排行
     * @return 格式转换后排行
     */
    Map<String, Object> performanceMapping07(List<TrendAnalysis> trendAnalysisList);

    /**
     * 获取收入支出-代理买卖净收入市占率及排名
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-代理买卖净收入市占率及排名
     */
    List<TrendAnalysis> getIncomeExpenditure01(String fromDate, String toDate);

    /**
     * 获取收入支出-经纪业务主要收入占比变动
     * @return 收入支出-经纪业务主要收入占比变动
     */
    List<TrendAnalysis> getIncomeExpenditure02();

    /**
     * 获取收入支出-佣金收入增长趋势图
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-佣金收入增长趋势图
     */
    List<TrendAnalysis> getIncomeExpenditure03(String fromDate, String toDate);

    /**
     * 获取收入支出-两融余额息费分成
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-两融余额息费分成
     */
    List<TrendAnalysis> getIncomeExpenditure04(String fromDate, String toDate);

    /**
     * 获取收入支出-成本支出变化趋势图&业务及管理费各项支出趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-成本支出变化趋势图&业务及管理费各项支出趋势
     */
    List<TrendAnalysis> getIncomeExpenditure05(String fromDate, String toDate);

    /**
     * 获取收入支出-经济业务利润变化趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-经济业务利润变化趋势
     */
    List<TrendAnalysis> getIncomeExpenditure06(String fromDate, String toDate);

    /**
     * 获取收入支出-各类网点考核市占率及利润变化趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 收入支出-各类网点考核市占率及利润变化趋势
     */
    List<TrendAnalysis> getIncomeExpenditure07(String fromDate, String toDate);

    /**
     * 获取客户资产-公司客户资产变动与市场规模对标
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 客户资产-公司客户资产变动与市场规模对标
     */
    List<TrendAnalysis> getCustomerAsset01(String fromDate, String toDate);

    /**
     * 获取客户资产-（累计）资产保值率、资产周转率
     * @param fromDate 起始日期
     * @param endDate 终止日期
     * @return 客户资产-（累计）资产保值率、周转率
     */
    List<TrendAnalysis> getCustomerAsset02(String fromDate, String endDate);

    /**
     * 获取客户资产-客户业务类型 客户资产结构
     * @param endDate 日期
     * @return 客户资产-客户业务类型 客户资产结构
     */
    List<TrendAnalysis> getCustomerAsset03(String endDate);

    /**
     * 客户业务类型 客户资产结构转换
     * @param trendAnalysisList 客户业务类型 客户资产结构数据
     * @return 转换后结果
     */
    Map<String, Object> customerAssetMapping03(List<TrendAnalysis> trendAnalysisList);

    /**
     * 获取客户资产-净存入资金与净转入市值变化趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 客户资产-净存入资金与净转入市值变化趋势
     */
    List<TrendAnalysis> getCustomerAsset04(String fromDate, String toDate);

    /**
     * 获取客户资产-公司及全国新增开户数趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 客户资产-公司及全国新增开户数趋势
     */
    List<TrendAnalysis> getCustomerAsset05(String fromDate, String toDate);

    /**
     * 获取客户资产-公司及全国累计新增开户数趋势
     * @param fromDate 去年起始日期
     * @param toDate 去年终止日期
     * @param fromDate1 起始日期
     * @param toDate1 终止日期
     * @return 客户资产-公司及全国累计新增开户数趋势
     */
    List<TrendAnalysis> getCustomerAsset06(String fromDate, String toDate, String fromDate1, String toDate1);

    /**
     * 获取客户资产-新开户资产额及交易佣金趋势
     * @param fromDate 起始日期
     * @param toDate 终止日期
     * @return 客户资产-新开户资产额及交易佣金趋势
     */
    List<TrendAnalysis> getCustomerAsset07(String fromDate, String toDate);

    /**
     * 获取客户资产-新开户资产额及交易佣金累计趋势
     * @param fromDate 去年起始日期
     * @param toDate 去年终止日期
     * @param fromDate1 起始日期
     * @param toDate1 终止日期
     * @return 客户资产-新开户资产额及交易佣金累计趋势
     */
    List<TrendAnalysis> getCustomerAsset08(String fromDate, String toDate, String fromDate1, String toDate1);

    /**
     * 获取客户资产-近一月新增客户及佣金分布
     * @return 近一月新增客户及佣金分布
     */
    List<TrendAnalysis> getCustomerAsset09();

    /**
     * 获取客户资产-浙江省的新客及新客交易佣金
     * @return 浙江省的新客及新客交易佣金
     */
    List<TrendAnalysis> getCustomerAsset10();

    /**
     * 趋势图数据格式转换
     * @param trendAnalysisList 趋势图数据
     * @param xAxisData X轴数据
     * @param seriesData Y轴数据
     * @param valueNameList Y轴字段列表
     * @return 格式转换后的趋势图数据
     */
    Map<String, Object> mapping(List<TrendAnalysis> trendAnalysisList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
