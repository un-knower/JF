package com.ctsec.config.query;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * 从配置文件sql_query_config.properties获取具体（KAP）SQL语句
 *
 * Created by luchisheng on 2017/11/6.
 */

@Configuration
@PropertySource("classpath:sql_query_config.properties")
public class SQLQueryConfig {

    /**
     * TestController
     * KAP样例查询K线指数国家
     */
    @Value("${sel.kline.country.by.country}")
    private String SEL_KLINE_COUNTRY_BY_COUNTRY;

    /**
     * Universal
     * 通用-当前日期上一交易日
     */
    @Value("${sel.universal.pioneer.trading.by.day}")
    private String SEL_UNIVERSAL_PIONEER_TRADING_BY_DAY;

    /**
     * Universal
     * 通用-当前日期范围内所有交易日
     */
    @Value("${sel.universal.trading.by.day}")
    private String SEL_UNIVERSAL_TRADING_BY_DAY;

    /**
     * Universal
     * 通用-当前日期范围内所有月份最后一个交易日
     */
    @Value("${sel.universal.trading.by.month}")
    private String SEL_UNIVERSAL_TRADING_BY_MONTH;

    /**
     * Universal
     * 通用-当前日期范围内所有年份最后一个交易日
     */
    @Value("${sel.universal.trading.by.year}")
    private String SEL_UNIVERSAL_TRADING_BY_YEAR;

    /**
     * Universal
     * 通用-获取系统日期
     */
    @Value("${sel.universal.clear.date}")
    private String SEL_UNIVERSAL_CLEAR_DATE;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-左
     */
    @Value("${sel.kpi.kpi.left}")
    private String SEL_KPI_KPI_LEFT;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-按日
     */
    @Value("${sel.kpi.kpi.right.by.day}")
    private String SEL_KPI_KPI_RIGHT_BY_DAY;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-不含客户资产及融资融券等期末值字段-按月
     */
    @Value("${sel.kpi.kpi.right.01.by.month}")
    private String SEL_KPI_KPI_RIGHT_01_BY_MONTH;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-客户资产及融资融券等期末值字段-按月
     */
    @Value("${sel.kpi.kpi.right.02.by.month}")
    private String SEL_KPI_KPI_RIGHT_02_BY_MONTH;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-不含客户资产及融资融券等期末值字段-按年
     */
    @Value("${sel.kpi.kpi.right.01.by.year}")
    private String SEL_KPI_KPI_RIGHT_01_BY_YEAR;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-客户资产及融资融券等期末值字段-按年
     */
    @Value("${sel.kpi.kpi.right.02.by.year}")
    private String SEL_KPI_KPI_RIGHT_02_BY_YEAR;

    /**
     * KPIController
     * 领导驾驶舱-KPI-关键指标-右-新增日均资产和同比、环比-按月、年
     */
    @Value("${sel.kpi.kpi.right.03}")
    private String SEL_KPI_KPI_RIGHT_03;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-公司代理买卖交易量当月及累计市占率趋势
     */
    @Value("${sel.kpi.trend.performance.01}")
    private String SEL_KPI_TREND_PERFORMANCE_01;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-公司两融市占率和总交易市占率的单月趋势对比图
     */
    @Value("${sel.kpi.trend.performance.02}")
    private String SEL_KPI_TREND_PERFORMANCE_02;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-公司和市场的单月净佣金费率趋势对比图
     */
    @Value("${sel.kpi.trend.performance.03}")
    private String SEL_KPI_TREND_PERFORMANCE_03;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-两融余额及市占率趋势
     */
    @Value("${sel.kpi.trend.performance.04}")
    private String SEL_KPI_TREND_PERFORMANCE_04;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-分公司KPI指标完成情况
     */
    @Value("${sel.kpi.trend.performance.05}")
    private String SEL_KPI_TREND_PERFORMANCE_05;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-营业部经营情况
     */
    @Value("${sel.kpi.trend.performance.06}")
    private String SEL_KPI_TREND_PERFORMANCE_06;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-业务绩效-TOP25家券商交易量(股+基)及市场份额排行
     */
    @Value("${sel.kpi.trend.performance.07}")
    private String SEL_KPI_TREND_PERFORMANCE_07;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-代理买卖净收入市占率及排名
     */
    @Value("${sel.kpi.trend.income.expenditure.01}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_01;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-经纪业务主要收入占比变动
     */
    @Value("${sel.kpi.trend.income.expenditure.02}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_02;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-佣金收入增长趋势图
     */
    @Value("${sel.kpi.trend.income.expenditure.03}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_03;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-两融余额息费分成
     */
    @Value("${sel.kpi.trend.income.expenditure.04}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_04;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-成本支出变化趋势图&固定费用各项支出趋势图
     */
    @Value("${sel.kpi.trend.income.expenditure.05}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_05;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-各类网点考核市占率及利润变化趋势
     */
    @Value("${sel.kpi.trend.income.expenditure.06}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_06;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-收入支出-经济业务利润变化趋势
     */
    @Value("${sel.kpi.trend.income.expenditure.07}")
    private String SEL_KPI_TREND_INCOME_EXPENDITURE_07;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-公司客户资产变动与市场规模对标
     */
    @Value("${sel.kpi.trend.customer.01}")
    private String SEL_KPI_TREND_CUSTOMER_01;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-资产保值率及资产周转率趋势
     */
    @Value("${sel.kpi.trend.customer.02}")
    private String SEL_KPI_TREND_CUSTOMER_02;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-客户业务类型 客户资产结构
     */
    @Value("${sel.kpi.trend.customer.03}")
    private String SEL_KPI_TREND_CUSTOMER_03;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-净存入资金与净转入市值变化趋势
     */
    @Value("${sel.kpi.trend.customer.04}")
    private String SEL_KPI_TREND_CUSTOMER_04;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-公司及全国新增开户数趋势
     */
    @Value("${sel.kpi.trend.customer.05}")
    private String SEL_KPI_TREND_CUSTOMER_05;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-公司及全国累计新增开户数趋势
     */
    @Value("${sel.kpi.trend.customer.06}")
    private String SEL_KPI_TREND_CUSTOMER_06;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-新开户资产额及交易佣金趋势
     */
    @Value("${sel.kpi.trend.customer.07}")
    private String SEL_KPI_TREND_CUSTOMER_07;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-新开户资产额及交易佣金累计趋势
     */
    @Value("${sel.kpi.trend.customer.08}")
    private String SEL_KPI_TREND_CUSTOMER_08;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-近一月新增客户及佣金分布
     */
    @Value("${sel.kpi.trend.customer.09}")
    private String SEL_KPI_TREND_CUSTOMER_09;

    /**
     * KPIController
     * 领导驾驶舱-KPI-趋势分析-客户资产-浙江省的新客及新客交易佣金
     */
    @Value("${sel.kpi.trend.customer.10}")
    private String SEL_KPI_TREND_CUSTOMER_10;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-指数概览-按日
     */
    @Value("${sel.market.k.line.by.day}")
    private String SEL_MARKET_K_LINE_BY_DAY;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-股基交易-股基交易信息概览-全国股基总市值-按天、月、年
     */
    @Value("${sel.market.stock.fund.by.date.01}")
    private String SEL_MARKET_STOCK_FUND_BY_DATE_01;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-股票交易-股票交易信息概览-全国股票数据-按天、月、年
     */
    @Value("${sel.market.stock.by.date.01}")
    private String SEL_MARKET_STOCK_BY_DATE_01;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-基金交易-基金交易信息概览-全国/沪/深基金交易总市值&同比-按天、月、年
     */
    @Value("${sel.market.fund.by.date.01}")
    private String SEL_MARKET_FUND_BY_DATE_01;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-融资融券-融资融券信息概览-全市场融资融券指标-按天
     */
    @Value("${sel.market.margin.by.day.01}")
    private String SEL_MARKET_MARGIN_BY_DAY_01;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-股基交易-全国及公司股基总市值变化-全国股基总市值变化-按天、月、年
     */
    @Value("${sel.market.stock.fund.by.date.11}")
    private String SEL_MARKET_STOCK_FUND_BY_DATE_11;
    
    @Value("${sel.market.stock.fund.by.date.12}")
    private String SEL_MARKET_STOCK_FUND_BY_DATE_12;
    
    @Value("${sel.market.stock.fund.by.date.13}")
    private String SEL_MARKET_STOCK_FUND_BY_DATE_13;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-股票交易-全国及公司沪深两市股票总市值趋势-全国沪深、股转总市值趋势图-按天、月、年
     */
    @Value("${sel.market.stock.by.date.11}")
    private String SEL_MARKET_STOCK_BY_DATE_11;
    
    @Value("${sel.market.stock.by.date.12}")
    private String SEL_MARKET_STOCK_BY_DATE_12;
    
    @Value("${sel.market.stock.by.date.13}")
    private String SEL_MARKET_STOCK_BY_DATE_13;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-基金交易-全国及公司沪深两市基金总市值趋势-全国沪深基金总市值趋势图-按天、月、年
     */
    @Value("${sel.market.fund.by.date.11}")
    private String SEL_MARKET_FUND_BY_DATE_11;

	@Value("${sel.market.fund.by.date.12}")
    private String SEL_MARKET_FUND_BY_DATE_12;
    
    @Value("${sel.market.fund.by.date.13}")
    private String SEL_MARKET_FUND_BY_DATE_13;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-融资融券-全国及公司融资融券余额变化-全国融资融券余额变化-按天
     */
    @Value("${sel.market.margin.by.day.11}")
    private String SEL_MARKET_MARGIN_BY_DAY_11;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-融资融券-全国及公司融资融券余额变化-全国融资融券余额变化-按月
     */
    @Value("${sel.market.margin.by.month.11}")
    private String SEL_MARKET_MARGIN_BY_MONTH_11;

    /**
     * MarketConditionController
     * 领导仓驾驶-市场环境-融资融券-全国及公司融资融券余额变化-全国融资融券余额变化-按年
     */
    @Value("${sel.market.margin.by.year.11}")
    private String SEL_MARKET_MARGIN_BY_YEAR_11;

    /**
     * MarketConditionController
     * 领导驾驶舱-市场环境-各大券商营业部变化情况-按月
     */
    @Value("${sel.market.branch.by.month}")
    private String SEL_MARKET_BRANCH_BY_MONTH;

    /**
     * MarketConditionController
     * 领导驾驶舱-市场环境-各大券商营业部变化情况-财通下钻-按月
     */
    @Value("${sel.market.branch.in.by.month}")
    private String SEL_MARKET_BRANCH_IN_BY_MONTH;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构现状-按天、月、年
     */
    @Value("${sel.branch.status.by.date}")
    private String SEL_BRANCH_STATUS_BY_DATE;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构现状-下钻-按天
     */
    @Value("${sel.branch.status.in.by.day}")
    private String SEL_BRANCH_STATUS_IN_BY_DAY;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构现状-下钻-按月
     */
    @Value("${sel.branch.status.in.by.month}")
    private String SEL_BRANCH_STATUS_IN_BY_MONTH;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构现状-下钻-按年
     */
    @Value("${sel.branch.status.in.by.year}")
    private String SEL_BRANCH_STATUS_IN_BY_YEAR;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-筛选-分支机构类别&级别
     */
    @Value("${sel.branch.filter.branch.category.level}")
    private String SEL_BRANCH_FILTER_BRANCH_CATEGORY_LEVEL;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构排名-营业部排名变化-按天
     */
    @Value("${sel.branch.rank.branch.by.day}")
    private String SEL_BRANCH_RANK_BRANCH_BY_DAY;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构排名-营业部排名变化-按年
     */
    @Value("${sel.branch.rank.branch.by.year}")
    private String SEL_BRANCH_RANK_BRANCH_BY_YEAR;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-营业部趋势对比-按天
     */
    @Value("${sel.branch.development.01.by.day}")
    private String SEL_BRANCH_DEVELOPMENT_01_BY_DAY;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-营业部趋势对比-按年
     */
    @Value("${sel.branch.development.01.by.year}")
    private String SEL_BRANCH_DEVELOPMENT_01_BY_YEAR;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-客户结构分析
     */
    @Value("${sel.branch.development.02}")
    private String SEL_BRANCH_DEVELOPMENT_02;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-收入结构分布
     */
    @Value("${sel.branch.development.03}")
    private String SEL_BRANCH_DEVELOPMENT_03;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-考核利润表现-年利润及同比
     */
    @Value("${sel.branch.development.04.01}")
    private String SEL_BRANCH_DEVELOPMENT_04_01;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构发展-考核利润表现-各分支机构利润排名
     */
    @Value("${sel.branch.development.04.02}")
    private String SEL_BRANCH_DEVELOPMENT_04_02;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构绩效-筛选-分公司
     */
    @Value("${sel.branch.performance.filter.sub}")
    private String SEL_BRANCH_PERFORMANCE_FILTER_SUB;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构绩效-分公司绩效考核表
     */
    @Value("${sel.branch.performance.01}")
    private String SEL_BRANCH_PERFORMANCE_01;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构绩效-分支机构交易金额市占率
     */
    @Value("${sel.branch.performance.02}")
    private String SEL_BRANCH_PERFORMANCE_02;

    /**
     * BranchController
     * 领导驾驶舱-分支机构-机构绩效-利润表现
     */
    @Value("${sel.branch.performance.03}")
    private String SEL_BRANCH_PERFORMANCE_03;

    /**
     * ReportController
     * 经营报表-筛选-分支机构
     */
    @Value("${sel.report.filter.branch}")
    private String SEL_REPORT_FILTER_BRANCH;

    /**
     * ReportController
     * 经营报表-筛选-证券代码
     */
    @Value("${sel.report.filter.stock.code}")
    private String SEL_REPORT_FILTER_STOCK_CODE;

    /**
     * ReportController
     * 经营报表-筛选-证券账户
     */
    @Value("${sel.report.filter.stock.account}")
    private String SEL_REPORT_FILTER_STOCK_ACCOUNT;

    /**
     * ReportController
     * 经营报表-筛选-客户号
     */
    @Value("${sel.report.filter.customer}")
    private String SEL_REPORT_FILTER_CUSTOMER;

    /**
     * ReportController
     * 经营报表-筛选-资产分段
     */
    @Value("${sel.report.filter.asset}")
    private String SEL_REPORT_FILTER_ASSET;

    /**
     * ReportController
     * 经营报表--报表数据-报表01-日常业务交易统计原始日报表
     */
    @Value("${sel.report.data.report.01.by.filter}")
    private String SEL_REPORT_DATA_REPORT_01_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表02-分支机构交易统计日报表
     */
    @Value("${sel.report.data.report.02.by.filter}")
    private String SEL_REPORT_DATA_REPORT_02_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表03-分支机构交易统计周报表
     */
    @Value("${sel.report.data.report.03.by.filter}")
    private String SEL_REPORT_DATA_REPORT_03_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表04-分支机构交易统计月报表
     */
    @Value("${sel.report.data.report.04.by.filter}")
    private String SEL_REPORT_DATA_REPORT_04_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表05-分支机构交易统计年报表
     */
    @Value("${sel.report.data.report.05.by.filter}")
    private String SEL_REPORT_DATA_REPORT_05_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表06-分支机构资产变动原始表
     */
    @Value("${sel.report.data.report.06.by.filter}")
    private String SEL_REPORT_DATA_REPORT_06_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表07-分支机构资产变动日报
     */
    @Value("${sel.report.data.report.07.by.filter}")
    private String SEL_REPORT_DATA_REPORT_07_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表08-分支机构资产变动月报
     */
    @Value("${sel.report.data.report.08.by.filter}")
    private String SEL_REPORT_DATA_REPORT_08_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表09-营业部合作开发统计表
     */
    @Value("${sel.report.data.report.09.by.filter}")
    private String SEL_REPORT_DATA_REPORT_09_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表10-合作业务统计报表
     */
    @Value("${sel.report.data.report.10.by.filter}")
    private String SEL_REPORT_DATA_REPORT_10_BY_FILTER;

    /**
     * ReportController
     * 经营报表--报表数据-报表11-限售非流通股份变动流水
     */
    @Value("${sel.report.data.report.11.by.filter}")
    private String SEL_REPORT_DATA_REPORT_11_BY_FILTER;

    /**
     * ReportController
     * 经营报表-报表数据-报表12-限售非流通股份持仓
     */
    @Value("${sel.report.data.report.12.by.filter}")
    private String SEL_REPORT_DATA_REPORT_12_BY_FILTER;

    /**
     * ReportController
     * 经营报表-报表数据-报表13-新开户情况统计报表
     */
    @Value("${sel.report.data.report.13.by.filter}")
    private String SEL_REPORT_DATA_REPORT_13_BY_FILTER;

    /**
     * ReportController
     * 经营报表-报表数据-报表13-新开户情况统计报表-开户数下钻表
     */
    @Value("${sel.report.data.report.1301.by.filter}")
    private String SEL_REPORT_DATA_REPORT_1301_BY_FILTER;

    /**
     * ReportController
     * 经营报表-报表数据-报表14-营业部资产分段查询
     */
    @Value("${sel.report.data.report.14.by.filter}")
    private String SEL_REPORT_DATA_REPORT_14_BY_FILTER;

    /**
     * ReportController
     * 经营报表-报表数据-报表15-营业部资产分段查询
     */
    @Value("${sel.report.data.report.15.by.filter}")
    private String SEL_REPORT_DATA_REPORT_15_BY_FILTER;

    /**
     * BusinessController
     * 现金理财-筛选-产品编号
     */
    @Value("${sel.management.filter.product}")
    private String SEL_MANAGEMENT_FILTER_PRODUCT;

    /**
     * ReportController
     * 现金理财-业务分析-客户统计-按资产区间统计客户数量&按资产区间统计客户资产分布&按资产区间客户数量及资产分布统计
     */
    @Value("${sel.business.statistics.01}")
    private String SEL_BUSINESS_STATISTICS_01;

    /**
     * ReportController
     * 现金理财-业务分析-客户统计-按产品份额区间统计客户数量 &按产品份额区间统计客户资产分布&按产品份额区间客户数量及资产分布统计
     */
    @Value("${sel.business.statistics.02}")
    private String SEL_BUSINESS_STATISTICS_02;

    /**
     * ReportController
     * 现金理财-业务分析-签约趋势
     */
    @Value("${sel.business.trend}")
    private String SEL_BUSINESS_TREND;

    /**
     * ReportController
     * 现金理财-业务分析-现金理财产品份额变化（亿）
     */
    @Value("${sel.business.change}")
    private String SEL_BUSINESS_CHANGE;

    /**
     * BusinessController
     * 现金理财-报表数据-报表16-申赎报表
     */
    @Value("${sel.business.data.report.16.by.filter}")
    private String SEL_BUSINESS_DATA_REPORT_16_BY_FILTER;

    /**
     * BusinessController
     * 现金理财-报表数据-报表17-资产变动
     */
    @Value("${sel.business.data.report.17.by.filter}")
    private String SEL_BUSINESS_DATA_REPORT_17_BY_FILTER;

    /**
     * BusinessController
     * 现金理财-筛选-报表18-客户号
     */
    @Value("${sel.business.filter.report.18.customer}")
    private String SEL_BUSINESS_FILTER_REPORT_18_CUSTOMER;

    /**
     * BusinessController
     * 现金理财-报表数据-报表18-客户分析
     */
    @Value("${sel.business.data.report.18.by.filter}")
    private String SEL_BUSINESS_DATA_REPORT_18_BY_FILTER;

    /**
     * RelationController
     * 关联查询-报表数据-报表19-关联方证券经纪业务查询
     */
    @Value("${sel.relation.data.report.19.by.filter}")
    private String SEL_RELATION_DATA_REPORT_19_BY_FILTER;

    public String getSEL_KLINE_COUNTRY_BY_COUNTRY() {
        return SEL_KLINE_COUNTRY_BY_COUNTRY;
    }

    public String getSEL_UNIVERSAL_PIONEER_TRADING_BY_DAY() {
        return SEL_UNIVERSAL_PIONEER_TRADING_BY_DAY;
    }

    public String getSEL_UNIVERSAL_TRADING_BY_DAY() {
        return SEL_UNIVERSAL_TRADING_BY_DAY;
    }

    public String getSEL_UNIVERSAL_TRADING_BY_MONTH() {
        return SEL_UNIVERSAL_TRADING_BY_MONTH;
    }

    public String getSEL_UNIVERSAL_TRADING_BY_YEAR() {
        return SEL_UNIVERSAL_TRADING_BY_YEAR;
    }

    public String getSEL_UNIVERSAL_CLEAR_DATE() {
        return SEL_UNIVERSAL_CLEAR_DATE;
    }

    public String getSEL_KPI_KPI_LEFT() {
        return SEL_KPI_KPI_LEFT;
    }

    public String getSEL_KPI_KPI_RIGHT_BY_DAY() {
        return SEL_KPI_KPI_RIGHT_BY_DAY;
    }

    public String getSEL_KPI_KPI_RIGHT_01_BY_MONTH() {
        return SEL_KPI_KPI_RIGHT_01_BY_MONTH;
    }

    public String getSEL_KPI_KPI_RIGHT_02_BY_MONTH() {
        return SEL_KPI_KPI_RIGHT_02_BY_MONTH;
    }

    public String getSEL_KPI_KPI_RIGHT_01_BY_YEAR() {
        return SEL_KPI_KPI_RIGHT_01_BY_YEAR;
    }

    public String getSEL_KPI_KPI_RIGHT_02_BY_YEAR() {
        return SEL_KPI_KPI_RIGHT_02_BY_YEAR;
    }

    public String getSEL_KPI_KPI_RIGHT_03() {
        return SEL_KPI_KPI_RIGHT_03;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_01() {
        return SEL_KPI_TREND_PERFORMANCE_01;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_02() {
        return SEL_KPI_TREND_PERFORMANCE_02;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_03() {
        return SEL_KPI_TREND_PERFORMANCE_03;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_04() {
        return SEL_KPI_TREND_PERFORMANCE_04;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_05() {
        return SEL_KPI_TREND_PERFORMANCE_05;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_06() {
        return SEL_KPI_TREND_PERFORMANCE_06;
    }

    public String getSEL_KPI_TREND_PERFORMANCE_07() {
        return SEL_KPI_TREND_PERFORMANCE_07;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_01() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_01;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_02() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_02;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_03() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_03;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_04() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_04;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_05() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_05;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_06() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_06;
    }

    public String getSEL_KPI_TREND_INCOME_EXPENDITURE_07() {
        return SEL_KPI_TREND_INCOME_EXPENDITURE_07;
    }

    public String getSEL_KPI_TREND_CUSTOMER_01() {
        return SEL_KPI_TREND_CUSTOMER_01;
    }

    public String getSEL_KPI_TREND_CUSTOMER_02() {
        return SEL_KPI_TREND_CUSTOMER_02;
    }

    public String getSEL_KPI_TREND_CUSTOMER_03() {
        return SEL_KPI_TREND_CUSTOMER_03;
    }

    public String getSEL_KPI_TREND_CUSTOMER_04() {
        return SEL_KPI_TREND_CUSTOMER_04;
    }

    public String getSEL_KPI_TREND_CUSTOMER_05() {
        return SEL_KPI_TREND_CUSTOMER_05;
    }

    public String getSEL_KPI_TREND_CUSTOMER_06() {
        return SEL_KPI_TREND_CUSTOMER_06;
    }

    public String getSEL_KPI_TREND_CUSTOMER_07() {
        return SEL_KPI_TREND_CUSTOMER_07;
    }

    public String getSEL_KPI_TREND_CUSTOMER_08() {
        return SEL_KPI_TREND_CUSTOMER_08;
    }

    public String getSEL_KPI_TREND_CUSTOMER_09() {
        return SEL_KPI_TREND_CUSTOMER_09;
    }

    public String getSEL_KPI_TREND_CUSTOMER_10() {
        return SEL_KPI_TREND_CUSTOMER_10;
    }

    public String getSEL_MARKET_K_LINE_BY_DAY() {
        return SEL_MARKET_K_LINE_BY_DAY;
    }

    public String getSEL_MARKET_STOCK_FUND_BY_DATE_01() {
        return SEL_MARKET_STOCK_FUND_BY_DATE_01;
    }

    public String getSEL_MARKET_STOCK_BY_DATE_01() {
        return SEL_MARKET_STOCK_BY_DATE_01;
    }

    public String getSEL_MARKET_FUND_BY_DATE_01() {
        return SEL_MARKET_FUND_BY_DATE_01;
    }

    public String getSEL_MARKET_MARGIN_BY_DAY_01() {
        return SEL_MARKET_MARGIN_BY_DAY_01;
    }

    public String getSEL_MARKET_STOCK_FUND_BY_DATE_11() {
        return SEL_MARKET_STOCK_FUND_BY_DATE_11;
    }

    public String getSEL_MARKET_STOCK_FUND_BY_DATE_12() {
        return SEL_MARKET_STOCK_FUND_BY_DATE_12;
    }

    public String getSEL_MARKET_STOCK_FUND_BY_DATE_13() {
        return SEL_MARKET_STOCK_FUND_BY_DATE_13;
    }

    public String getSEL_MARKET_STOCK_BY_DATE_11() {
        return SEL_MARKET_STOCK_BY_DATE_11;
    }

    public String getSEL_MARKET_STOCK_BY_DATE_12() {
        return SEL_MARKET_STOCK_BY_DATE_12;
    }

    public String getSEL_MARKET_STOCK_BY_DATE_13() {
        return SEL_MARKET_STOCK_BY_DATE_13;
    }

    public String getSEL_MARKET_FUND_BY_DATE_11() {
        return SEL_MARKET_FUND_BY_DATE_11;
    }

    public String getSEL_MARKET_FUND_BY_DATE_12() {
        return SEL_MARKET_FUND_BY_DATE_12;
    }

    public String getSEL_MARKET_FUND_BY_DATE_13() {
        return SEL_MARKET_FUND_BY_DATE_13;
    }

    public String getSEL_MARKET_MARGIN_BY_DAY_11() {
        return SEL_MARKET_MARGIN_BY_DAY_11;
    }

    public String getSEL_MARKET_MARGIN_BY_MONTH_11() {
        return SEL_MARKET_MARGIN_BY_MONTH_11;
    }

    public String getSEL_MARKET_MARGIN_BY_YEAR_11() {
        return SEL_MARKET_MARGIN_BY_YEAR_11;
    }

    public String getSEL_MARKET_BRANCH_BY_MONTH() {
        return SEL_MARKET_BRANCH_BY_MONTH;
    }

    public String getSEL_MARKET_BRANCH_IN_BY_MONTH() {
        return SEL_MARKET_BRANCH_IN_BY_MONTH;
    }

    public String getSEL_BRANCH_STATUS_BY_DATE() {
        return SEL_BRANCH_STATUS_BY_DATE;
    }

    public String getSEL_BRANCH_STATUS_IN_BY_DAY() {
        return SEL_BRANCH_STATUS_IN_BY_DAY;
    }

    public String getSEL_BRANCH_STATUS_IN_BY_MONTH() {
        return SEL_BRANCH_STATUS_IN_BY_MONTH;
    }

    public String getSEL_BRANCH_STATUS_IN_BY_YEAR() {
        return SEL_BRANCH_STATUS_IN_BY_YEAR;
    }

    public String getSEL_BRANCH_FILTER_BRANCH_CATEGORY_LEVEL() {
        return SEL_BRANCH_FILTER_BRANCH_CATEGORY_LEVEL;
    }

    public String getSEL_BRANCH_RANK_BRANCH_BY_DAY() {
        return SEL_BRANCH_RANK_BRANCH_BY_DAY;
    }

    public String getSEL_BRANCH_RANK_BRANCH_BY_YEAR() {
        return SEL_BRANCH_RANK_BRANCH_BY_YEAR;
    }

    public String getSEL_BRANCH_DEVELOPMENT_01_BY_DAY() {
        return SEL_BRANCH_DEVELOPMENT_01_BY_DAY;
    }

    public String getSEL_BRANCH_DEVELOPMENT_01_BY_YEAR() {
        return SEL_BRANCH_DEVELOPMENT_01_BY_YEAR;
    }

    public String getSEL_BRANCH_DEVELOPMENT_02() {
        return SEL_BRANCH_DEVELOPMENT_02;
    }

    public String getSEL_BRANCH_DEVELOPMENT_03() {
        return SEL_BRANCH_DEVELOPMENT_03;
    }

    public String getSEL_BRANCH_DEVELOPMENT_04_01() {
        return SEL_BRANCH_DEVELOPMENT_04_01;
    }

    public String getSEL_BRANCH_DEVELOPMENT_04_02() {
        return SEL_BRANCH_DEVELOPMENT_04_02;
    }

    public String getSEL_BRANCH_PERFORMANCE_FILTER_SUB() {
        return SEL_BRANCH_PERFORMANCE_FILTER_SUB;
    }

    public String getSEL_BRANCH_PERFORMANCE_01() {
        return SEL_BRANCH_PERFORMANCE_01;
    }

    public String getSEL_BRANCH_PERFORMANCE_02() {
        return SEL_BRANCH_PERFORMANCE_02;
    }

    public String getSEL_BRANCH_PERFORMANCE_03() {
        return SEL_BRANCH_PERFORMANCE_03;
    }

    public String getSEL_REPORT_FILTER_BRANCH() {
        return SEL_REPORT_FILTER_BRANCH;
    }

    public String getSEL_REPORT_FILTER_STOCK_CODE() {
        return SEL_REPORT_FILTER_STOCK_CODE;
    }

    public String getSEL_REPORT_FILTER_STOCK_ACCOUNT() {
        return SEL_REPORT_FILTER_STOCK_ACCOUNT;
    }

    public String getSEL_REPORT_FILTER_CUSTOMER() {
        return SEL_REPORT_FILTER_CUSTOMER;
    }

    public String getSEL_REPORT_FILTER_ASSET() {
        return SEL_REPORT_FILTER_ASSET;
    }

    public String getSEL_REPORT_DATA_REPORT_01_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_01_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_02_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_02_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_03_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_03_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_04_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_04_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_05_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_05_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_06_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_06_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_07_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_07_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_08_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_08_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_09_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_09_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_10_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_10_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_11_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_11_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_12_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_12_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_13_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_13_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_1301_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_1301_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_14_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_14_BY_FILTER;
    }

    public String getSEL_REPORT_DATA_REPORT_15_BY_FILTER() {
        return SEL_REPORT_DATA_REPORT_15_BY_FILTER;
    }

    public String getSEL_MANAGEMENT_FILTER_PRODUCT() {
        return SEL_MANAGEMENT_FILTER_PRODUCT;
    }

    public String getSEL_BUSINESS_STATISTICS_01() {
        return SEL_BUSINESS_STATISTICS_01;
    }

    public String getSEL_BUSINESS_STATISTICS_02() {
        return SEL_BUSINESS_STATISTICS_02;
    }

    public String getSEL_BUSINESS_TREND() {
        return SEL_BUSINESS_TREND;
    }

    public String getSEL_BUSINESS_CHANGE() {
        return SEL_BUSINESS_CHANGE;
    }

    public String getSEL_BUSINESS_DATA_REPORT_16_BY_FILTER() {
        return SEL_BUSINESS_DATA_REPORT_16_BY_FILTER;
    }

    public String getSEL_BUSINESS_DATA_REPORT_17_BY_FILTER() {
        return SEL_BUSINESS_DATA_REPORT_17_BY_FILTER;
    }

    public String getSEL_BUSINESS_FILTER_REPORT_18_CUSTOMER() {
        return SEL_BUSINESS_FILTER_REPORT_18_CUSTOMER;
    }

    public String getSEL_BUSINESS_DATA_REPORT_18_BY_FILTER() {
        return SEL_BUSINESS_DATA_REPORT_18_BY_FILTER;
    }

    public String getSEL_RELATION_DATA_REPORT_19_BY_FILTER() {
        return SEL_RELATION_DATA_REPORT_19_BY_FILTER;
    }
}