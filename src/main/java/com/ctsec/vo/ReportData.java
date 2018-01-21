package com.ctsec.vo;

import java.util.List;
import java.util.Map;

/**
 * 报表统一数据
 *
 * Created by luchisheng on 2017/11/17.
 */
public class ReportData {

    /**
     * 本期_权证交易量(万)
     */
    private String warrant_amount;

    /**
     * 本期_股基权市场占比% 
     */
    private String sfw_market_rate;

    /**
     * 本期_股基市场占比%
     */
    private String sf_market_rate;

    /**
     * 本期_日均资金余额(万)
     */
    private String fund_balance_avg;

    /**
     * 本期_日均股票市值(万) / 本周_日均证券余额（万）
     */
    private String stock_balance_avg;

    /**
     * 本期_期末资金余额(万)
     */
    private String fund_balance_close_p;

    /**
     * 本期_期末股票市值(万)
     */
    private String stock_balance_close_p;

    /**
     * 本期_期末资产(万)
     */
    private String asset_balance_close_p;

    /**
     * 本年_股票交易量(万)
     */
    private String stock_amount_y;

    /**
     * 本年_基金交易量(万)
     */
    private String fund_amount_y;

    /**
     * 本年_权证交易量(万)
     */
    private String warrant_amount_y;

    /**
     * 本年_股基权交易量(万)
     */
    private String sfw_amount_y;

    /**
     * 本年_股基权市场占比%
     */
    private String sfw_market_rate_y;

    /**
     * 本年_股基交易量(万)
     */
    private String sf_amount_y;

    /**
     * 本年_股基市场占比%
     */
    private String sf_market_rate_y;

    /**
     * 本年_日均资金余额(万)
     */
    private String fund_balance_avg_y;

    /**
     * 本年_日均股票市值(万)
     */
    private String stock_balance_avg_y;

    /**
     * 本年_期末资金余额(万)
     */
    private String fund_balance_close_y;

    /**
     * 本年_期末股票市值(万)
     */
    private String stock_balance_close_y;

    /**
     * 本年_期末资产(万)
     */
    private String asset_balance_close_y;

    /**
     * 本年_B股交易量(万)
     */
    private String b_stock_amount_y;

    /**
     * 本期_股基费率‰
     */
    private String sf_rate;

    /**
     * 本年_股基费率‰
     */
    private String sf_rate_y;

    /**
     * 本期_期末担保品资产（万）
     */
    private String assure_balance_close_p;

    /**
     * 本期_期末负债资产（万）
     */
    private String debit_balance_close_p;

    /**
     * 本年_期末担保品资产（万）
     */
    private String assure_balance_close_y;

    /**
     * 本年_期末负债资产（万）
     */
    private String debit_balance_close_y;

    /**
     * 本期_股基权市场占比(含融资融券)%
     */
    private String sfw_market_amount_all_rate;

    /**
     * 本期_股基市场占比(含融资融券)%
     */
    private String sf_market_amount_all_rate;

    /**
     * 本年_股基权市场占比(含融资融券)%
     */
    private String sfw_market_amount_all_rate_y;

    /**
     * 本年_股基市场占比(含融资融券)%
     */
    private String sf_market_amount_all_rate_y;

    /**
     * 本期_股票费率(含融资融券)‰
     */
    private String stock_amount_all_rate;

    /**
     * 本年_股票费率(含融资融券)‰
     */
    private String stock_amount_all_rate_y;

    /**
     * 本期_股基费率(含融资融券)‰
     */
    private String sf_amount_all_rate;

    /**
     * 本年_股基费率(含融资融券)‰
     */
    private String sf_amount_all_rate_y;

    /**
     * 本期_日均担保品资产(万)
     */
    private String assure_balance_avg;

    /**
     * 本年_日均担保品资产(万)
     */
    private String assure_balance_avg_y;

    /**
     * 本期_融资融券客户开户数
     */
    private String margin_open_cust_num;

    /**
     * 本期_总股基权交易量(含融资融券)
     */
    private String sfw_amount_all;

    /**
     * 本期_总佣金(含融资融券)(万)
     */
    private String commission_all;

    /**
     * 本期_总净佣金(含融资融券)(万)
     */
    private String net_commission_all;

    /**
     * 本年_总股基权交易量(含融资融券)
     */
    private String sfw_amount_all_y;

    /**
     * 本年_总佣金(含融资融券)(万)
     */
    private String commission_all_y;

    /**
     * 本年_总净佣金(含融资融券)(万)
     */
    private String net_commission_all_y;

    /**
     * 本期_港股通交易量(万)
     */
    private String hk_stock_amount;

    /**
     * 本期_港股通佣金(万)
     */
    private String hk_commission;

    /**
     * 本年_港股通交易量(万)
     */
    private String hk_stock_amount_y;

    /**
     * 本年_港股通佣金(万)
     */
    private String hk_commission_y;

    /**
     * 本年_港股通总开户数
     */
    private String hk_open_cust_num_y;

    /**
     * 本期_日均多金融产品市值(万)
     */
    private String multi_financial_amount_avg;

    /**
     * 当日_市占率(股+基)%
     */
    private String market_rate;

    /**
     * 累计_市占率(股+基)%
     */
    private String all_market_rate;

    /**
     * 去年_市占率(股+基)%
     */
    private String lastyear_market_rate;

    /**
     * 市占率(股+基)%变动幅度
     */
    private String market_rate_change;

    /**
     * 累计_股票费率(‰)
     */
    private String all_stock_rate;

    /**
     * 当天股基权交易佣金（万）
     */
    private String sfw_fund_commission;

    /**
     * 本周_交易量(万元)
     */
    private String trade_amount;

    /**
     * 累计_交易量(万元)
     */
    private String all_trade_amount;

    /**
     * 累计_佣金收入(万元)
     */
    private String all_commission;

    /**
     * 累计_新开户
     */
    private String all_open_cust_num;

    /**
     * 本周_市占率(股+基)%
     */
    private String trade_amount_rate;

    /**
     * 累计_市占率(股+基)%
     */
    private String all_trade_amount_rate;

    /**
     * 考核累计市占率（含基金分仓）%
     */
    private String check_market_rate_fd;

    /**
     * 本周_日均客户权益(万元)
     */
    private String cust_right_avg;

    /**
     * 本周_期末客户权益(万元)
     */
    private String cust_right_close;

    /**
     * 本周_股票质押交易量（万）
     */
    private String pledge_amount;

    /**
     * 本周_融资融券股票交易量（万）
     */
    private String margin_stock_amount;

    /**
     * 本周_融资融券基金交易量（万）
     */
    private String margin_fund_amount;

    /**
     * 本周_融资融券债券交易量（万）
     */
    private String margin_bond_amount;

    /**
     * 本周_融资融券权证交易量（万）
     */
    private String margin_warrant_amount;

    /**
     * 累计_股票交易量（万）
     */
    private String all_stock_amount;

    /**
     * 累计_股票质押交易量（万）
     */
    private String all_pledge_amount;

    /**
     * 累计_基金交易量（万）
     */
    private String all_fund_amount;

    /**
     * 累计_权证交易量（万）
     */
    private String all_warrant_amount;

    /**
     * 累计_融资融券股票交易量（万）
     */
    private String all_margin_stock_amount;

    /**
     * 累计_融资融券基金交易量（万）
     */
    private String all_margin_fund_amount;

    /**
     * 累计_融资融券债券交易量（万）
     */
    private String all_margin_bond_amount;

    /**
     * 累计_融资融券权证交易量（万）
     */
    private String all_margin_warrant_amount;

    /**
     * 本周_股基权佣金收入（万）
     */
    private String sfw_commission;

    /**
     * 本周_基金佣金收入（万）
     */
    private String fund_commission;

    /**
     * 本周_权证佣金收入（万）
     */
    private String warrant_commission;

    /**
     * 本周_融资融券佣金收入（万）
     */
    private String margin_commission;

    /**
     * 本周_融资融券股票佣金收入（万）
     */
    private String margin_stock_commission;

    /**
     * 本周_融资融券基金佣金收入（万）
     */
    private String margin_fund_commission;

    /**
     * 本周_融资融券债券佣金收入（万）
     */
    private String margin_bond_commission;

    /**
     * 本周_融资融券权证佣金收入（万）
     */
    private String margin_warrant_commission;

    /**
     * 累计_股基权佣金收入（万）
     */
    private String all_sfw_commission;

    /**
     * 累计_股票佣金收入（万）
     */
    private String all_stock_commission;

    /**
     * 累计_基金佣金收入（万）
     */
    private String all_fund_commission;

    /**
     * 累计_权证佣金收入（万）
     */
    private String all_warrant_commission;

    /**
     * 累计_融资融券佣金收入（万）
     */
    private String all_margin_commission;

    /**
     * 累计_融资融券股票佣金收入（万）
     */
    private String all_margin_stock_commission;

    /**
     * 累计_融资融券基金佣金收入（万）
     */
    private String all_margin_fund_commission;

    /**
     * 累计_融资融券债券佣金收入（万）
     */
    private String all_margin_bond_commission;

    /**
     * 累计到当天累计融资融券权证佣金收入（万）
     */
    private String all_margin_warrant_commission;

    /**
     * 本周_日均多金融余额（万）
     */
    private String multi_financial_balance_avg;

    /**
     * 本周_日均两融负债（万）
     */
    private String margin_debit_avg;

    /**
     * 本周_日均股票质押负债（万）
     */
    private String pledge_debit_avg;

    /**
     *累计_交易量(含基金分仓)
     */
    private String all_trade_amount_fd;

    /**
     *本月_佣金收入(万)(含手动调整)
     */
    private String commission_adjust;

    /**
     *累计_佣金收入(含手动调整)
     */
    private String all_commission_adjust;

    /**
     *本月_日均客户权益(万)
     */
    private String avg_cust_right;

    /**
     *本月_期末客户权益(万)
     */
    private String end_cust_right;

    /**
     *本月_客户权益(万)
     */
    private String cust_right;

    /**
     *本月_基金分仓交易量
     */
    private String fund_division;

    /**
     *本月_手工调整佣金收入
     */
    private String adjust_commission;

    /**
     *累计_手工调整佣金收入
     */
    private String all_adjust_commission;

    /**
     *本月_日均资金余额
     */
    private String avg_fund_balance;

    /**
     *本月_日均证券余额
     */
    private String avg_stock_balance;

    /**
     *本月_日均多金融余额
     */
    private String avg_multi_financial_balance;

    /**
     *本月_日均两融负债
     */
    private String avg_margin_debit;

    /**
     *本月_日均股票质押负债
     */
    private String avg_pledge_debit;

    /**
     *本月_期末资金余额
     */
    private String end_fund_balance;

    /**
     *本月_期末证券余额
     */
    private String end_stock_balance;

    /**
     *本月_期末多金融余额
     */
    private String end_multi_financial_balance;

    /**
     *本月_期末两融负债
     */
    private String end_margin_debit;

    /**
     *本月_期末股票质押负债
     */
    private String end_pledge_debit;

    /**
     *本月_资金余额
     */
    private String fund_balance;

    /**
     *本月_证券余额
     */
    private String stock_balance;

    /**
     *本月_多金融余额
     */
    private String multi_financial_balance;

    /**
     *本月_两融负债
     */
    private String margin_debit;

    /**
     *本月_股票质押负债
     */
    private String pledge_debit;

    /**
     * 本年_考核交易量(万)(含基金分仓)
     */
    private String check_trade_amount_fd;

    /**
     * 本年_佣金费率(‰)
     */
    private String commission_rate;

    /**
     * 当年考核股票交易量
     */
    private String check_stock_amount;

    /**
     * 当年考核股票质押交易量
     */
    private String check_pledge_amount;

    /**
     * 当年考核基金交易量
     */
    private String check_fund_amount;

    /**
     * 当年考核权证交易量
     */
    private String check_warrant_amount;

    /**
     * 当年考核融资融券股票交易量
     */
    private String check_margin_stock_amount;

    /**
     * 当年考核融资融券基金交易量
     */
    private String check_margin_fund_amount;

    /**
     * 当年考核融资融券债券交易量
     */
    private String check_margin_bond_amount;

    /**
     * 当年考核融资融券权证交易量
     */
    private String check_margin_warrant_amount;

    /**
     * 日期
     */
    private String init_date;

    /**
     * 当日_转入资金(万)
     */
    private String in_capital_balance;

    /**
     * 当日_转出资金(万)
     */
    private String out_capital_balance;

    /**
     * 上日_资产额(万)
     */
    private String yesterday_asset;

    /**
     * 本年_日均证券市值(万)
     */
    private String thisyear_avg_secu_balance;

    /**
     * 本年_日均资金余额(万)
     */
    private String thisyear_avg_capital_balance;

    /**
     * 本年_日均资产(万)
     */
    private String thisyear_avg_asset;

    /**
     * 本年_日均担保资产(万)
     */
    private String thisyear_avg_assure_asset;

    /**
     * 本年_日均负债(万)
     */
    private String thisyear_avg_margin_debit;

    /**
     * 本年_累计转入市值(万)
     */
    private String all_in_secu_balance;

    /**
     * 本年_累计转出市值(万)
     */
    private String all_out_secu_balance;

    /**
     * 本年_累计转入资金(万)
     */
    private String all_in_capital_balance;

    /**
     * 本年_累计转出资金(万)
     */
    private String all_out_capital_balance;

    /**
     * 上年_日均资产(万)
     */
    private String lastyear_avg_asset;

    /**
     * 资产年变动率(%)
     */
    private String asset_change_rate_over_year;

    /**
     * 当日_担保现金(万)
     */
    private String assure_cash;

    /**
     * 当日_证券市值(万)
     */
    private String secu_balance;

    /**
     * 当日_资金余额(万)（可用）
     */
    private String avialable_balance;

    /**
     * 当日_资金余额(万)（可取）
     */
    private String advisable_balance;

    /**
     * 当日_担保品资产(万)
     */
    private String assure_net_asset;

    /**
     * 当日_资产额(万)
     */
    private String asset;

    /**
     * 当日_转入市值(万)
     */
    private String in_secu_balance;

    /**
     * 当日_转出市值(万)
     */
    private String out_secu_balance;

    /**
     * 当日_存入资金(万)
     */
    private String in_deposit_balance;

    /**
     * 当日_取出资金(万)
     */
    private String out_deposit_balance;

    /**
     * 资产日变动率(%)
     */
    private String asset_change_rate;

    /**
     * 当日_持有红股入账
     */
    private String bonus_in;

    /**
     * 当日_持有港股通市值
     */
    private String hk_balance;

    /**
     * 当日_持有沪A市值
     */
    private String sh_a_balance;

    /**
     * 当日_持有沪B市值
     */
    private String sh_b_balance;

    /**
     * 当日_持有深A市值
     */
    private String sz_a_balance;

    /**
     * 当日_持有深B市值
     */
    private String sz_b_balance;

    /**
     * 当日_持有三板市值
     */
    private String stb_balance;

    /**
     * 当日_持有创业板市值
     */
    private String gem_balance;

    /**
     * 当日_持有上海基金市值
     */
    private String sh_fund_balance;

    /**
     * 当日持有深圳基金市值
     */
    private String sz_fund_balance;

    /**
     * 当日_持有债券市值
     */
    private String bond_balance;

    /**
     * 当日_担保品资产
     */
    private String assure_asset;

    /**
     * 当日_担保品资金余额
     */
    private String assure_capital_balance;

    /**
     * 当日_担保品证券市值
     */
    private String assure_secu_balance;

    /**
     * 当日_资金余额
     */
    private String capital_balance;

    /**
     * 当日_转入限售股市值（万）
     */
    private String in_limit_sale_balance;

    /**
     * 当日_转出限售股市值（万）
     */
    private String out_limit_sale_balance;

    /**
     * 本月日均保证金（万）
     */
    private String avg_deposit_balance;

    /**
     * 本月日均担保品资产（万）
     */
    private String avg_assure_asset;

    /**
     * 本月日均资产额（万）
     */
    private String avg_asset;

    /**
     * 资产月变动率（%）
     */
    private String asset_change_rate_over_month;

    /**
     * 本年日均资产额（万）
     */
    private String all_avg_asset;

    /**
     * 本年累计转入市值（万）
     */
    private String all_in_balance;

    /**
     * 本年累计转出市值（万）
     */
    private String all_out_balance;

    /**
     * 本年累计存入保证金（万）
     */
    private String all_store_in_capital_balance;

    /**
     * 本年累计取出保证金（万）
     */
    private String all_take_out_capital_balance;

    /**
     * 分支机构编号
     */
    private String branch_no;

    /**
     * 分支机构名称
     */
    private String branch_name;

    /**
     * 客户号
     */
    private String cust_no;

    /**
     * 证券账户
     */
    private String stock_account;

    /**
     * 开户时间
     */
    private String open_date;

    /**
     * 证券代码
     */
    private String stock_code;

    /**
     * 证券名称
     */
    private String stock_name;

    /**
     * 股数
     */
    private String stock_num;

    /**
     * 变动股数
     */
    private String change_stock_num;

    /**
     * 变动市值（万元）
     */
    private String change_stock_amount;

    /**
     * 持仓市值（万元）/ 本期_股票交易量(万)
     */
    private String stock_amount;

    /**
     * 期间日均持仓市值（万元）
     */
    private String avg_stock_amount;

    /**
     * 客户
     */
    private String customer;

    /**
     * 生效日期
     */
    private String effect_date;

    /**
     * 开户分支机构净佣金比例
     */
    private String fare_ratio;

    /**
     * 开户分支机构日均资产比例
     */
    private String asset_ratio;

    /**
     * 开户分支机构估计交易比例
     */
    private String amount_ratio;

    /**
     * 合作分支机构净佣金比例总和
     */
    private String coop_fare_ratio_sum;

    /**
     * 合作分支机构日均资产比例总和
     */
    private String coop_asset_ratio_sum;

    /**
     * 合作分支机构估计交易比例总和
     */
    private String coop_amount_ratio_sum;

    /**
     * 合作分支机构
     */
    private String coop_branch_name;

    /**
     * 关系
     */
    private String relation;

    /**
     * 合作分支机构净佣金比例
     */
    private String coop_fare_ratio;

    /**
     * 合作分支机构日均资产比例
     */
    private String coop_asset_ratio;

    /**
     * 合作分支机构估计交易比例
     */
    private String coop_amount_ratio;

    /**
     * 合作营业部列表
     */
    private List<Map<String, String>> coop_branch_list;

    /**
     * 日均资产（扣除理财）
     */
    private String asset_exclude_finance_avg;

    /**
     * 开户方式
     */
    private String open_way;

    /**
     * 内转客户（是/否）
     */
    private String inner_trans_mark;

    /**
     * 限售股客户（是否）
     */
    private String limit_sale_mark;

    /**
     * 引流客户（是否）
     */
    private String reward_mark;

    /**
     * 合作开发标记（是否）
     */
    private String coop_mark;

    /**
     * 资产范围
     */
    private String avg_asset_section_name;

    /**
     * 客户数
     */
    private String cust_num;

    /**
     * 总客户数
     */
    private String all_cust_num;

    /**
     * 客户占比（%）
     */
    private String cust_proportion;

    /**
     * 总资产（万）
     */
    private String all_asset;

    /**
     * 资产占额（%）
     */
    private String asset_proportion;

    /**
     * 佣金占比（%）
     */
    private String commission_proportion;

    /**
     * 交易量（万）
     */
    private String amount;

    /**
     * 总交易量（万）
     */
    private String all_amount;

    /**
     * 交易量占比（%）
     */
    private String amount_proportion;

    /**
     * 限售股股票市值（万）
     */
    private String limit_sale_stock_balance;

    /**
     * 本期_两融交易量(万)
     */
    private String margin_amount;

    /**
     * 本期_担保品成交金额(万) / 本期_担保品交易量(万)
     */
    private String assure_amount;

    /**
     * 本期_信用成交金额(万) / 本期_信用交易量(万)
     */
    private String credit_amount;

    /**
     * 本期_佣金(万) / 本周_佣金收入(万元)
     */
    private String commission;

    /**
     * 本期_担保品佣金(万)
     */
    private String assure_commission;

    /**
     * 本期_信用佣金 / 本期_信用交易佣金(万)
     */
    private String credit_commission;

    /**
     * 本期_净佣金(万)
     */
    private String net_commission;

    /**
     * 本期_担保品净佣金(万)
     */
    private String assure_net_commission;

    /**
     * 本期_信用净佣金 / 本期_信用交易净佣金(万)
     */
    private String credit_net_commission;

    /**
     * 本期_营销人员提成
     */
    private String marketing_staff_commission;

    /**
     * 本期_股票费率‰
     */
    private String stock_rate;

    /**
     * 本期_开户数
     */
    private String open_cust_num;

    /**
     * 本期_日均融资负债余额(万)
     */
    private String finance_debit_balance_avg;

    /**
     * 本期_日均融券负债市值(万)
     */
    private String security_debit_amount_avg;

    /**
     * 本期_日均负债资产(万)
     */
    private String debit_balance_avg;

    /**
     * 本期_日均资产(万)
     */
    private String asset_balance_avg;

    /**
     * 本期_期末融资负债余额(万)
     */
    private String finance_debit_balance_close;

    /**
     * 本期_期末融券负债市值(万)
     */
    private String security_debit_amount_close;

    /**
     * 本期_期末负债资产(万)
     */
    private String debit_balance_close;

    /**
     * 本期_期末资产(万)
     */
    private String asset_balance_close;

    /**
     * 本年_两融交易量(万)
     */
    private String margin_amount_y;

    /**
     * 本年_担保品成交金额(万) / 本年_担保品交易量(万)
     */
    private String assure_amount_y;

    /**
     * 本年_信用成交金额(万) / 本年_信用交易量(万)
     */
    private String credit_amount_y;

    /**
     * 本年_佣金(万)
     */
    private String commission_y;

    /**
     * 本年_担保品佣金 / 本年_担保品佣金(万)
     */
    private String assure_commission_y;

    /**
     * 本年_信用佣金 / 本年_信用交易佣金(万)
     */
    private String credit_commission_y;

    /**
     * 本年_净佣金(万)
     */
    private String net_commission_y;

    /**
     * 本年_担保品净佣金(万)
     */
    private String assure_net_commission_y;

    /**
     * 本年_信用净佣金 / 本年_信用交易净佣金(万)
     */
    private String credit_net_commission_y;

    /**
     * 本年_营销人员提成
     */
    private String marketing_staff_commission_y;

    /**
     * 本年_股票费率‰
     */
    private String stock_rate_y;

    /**
     * 本年_开户数
     */
    private String open_cust_num_y;

    /**
     * 本年_日均融资负债余额(万)
     */
    private String finance_debit_balance_avg_y;

    /**
     * 本年_日均融券负债市值(万)
     */
    private String security_debit_amount_avg_y;

    /**
     * 本年_日均负债资产(万)
     */
    private String debit_balance_avg_y;

    /**
     * 本年_日均资产(万)
     */
    private String asset_balance_avg_y;

    /**
     * 总开户数
     */
    private String open_cust_num_total;

    /**
     * 关系
     */
    private String relationship;

    /**
     * 本期_基金交易量 / 本期_基金交易量(万)
     */
    private String fund_amount;

    /**
     * 本期_权证交易量
     */
    private String warrants_amount;

    /**
     * 本期_股基权交易量(万)
     */
    private String sfw_amount;

    /**
     * 本期_股基交易量(万)
     */
    private String sf_amount;

    /**
     * 本期_总交易量
     */
    private String total_amount;

    /**
     * 本期_总佣金
     */
    private String total_commission;

    /**
     * 本期_总净佣金
     */
    private String total_net_commission;

    /**
     * 本期_日均资金余额
     */
    private String avialable_balance_avg;

    /**
     * 本期_日均证券市值
     */
    private String security_amount_avg;

    /**
     * 本期_日均资产
     */
    private String asset_avg;

    /**
     * 本期_日均担保现金
     */
    private String assure_cash_avg;

    /**
     * 本期_日均担保证券市值
     */
    private String assure_stock_amount_avg;

    /**
     * 本期_日均负债
     */
    private String debit_avg;

    /**
     * 本期_期末资金余额
     */
    private String avialable_balance_close;

    /**
     * 本期_期末证券市值
     */
    private String security_amount_close;

    /**
     * 本期_期末资产
     */
    private String asset_close;

    /**
     * 本期_期末担保现金
     */
    private String assure_cash_close;

    /**
     * 本期_期末担保股票市值
     */
    private String assure_stock_amount_close;

    /**
     * 本期_期末负债
     */
    private String debit_close;

    /**
     * 本期_期末担保资产
     */
    private String assure_close;

    /**
     * 本期_b股交易量(万)
     */
    private String b_stock_amount;

    /**
     * 本期_b股交易佣金
     */
    private String b_stock_commission;

    /**
     * 本期_b股交易净佣金
     */
    private String b_stock_net_commission;

    /**
     * 本期_港股通交易量
     */
    private String h_stock_amount;

    /**
     * 本期_港股通交易佣金
     */
    private String h_stock_commission;

    /**
     * 本期_港股通交易净佣金
     */
    private String h_stock_net_commission;

    /**
     * 本期_股票交易佣金 / 本周_股票佣金收入（万）
     */
    private String stock_commission;

    /**
     * 本期_股基交易佣金
     */
    private String sf_commission;

    /**
     * 本期_股票交易佣金（含融资融券）
     */
    private String stock_commission_with_margin;

    /**
     * 本期_股票交易金额（含融资融券）
     */
    private String stock_amount_with_margin;

    /**
     * 本期_股基交易佣金（含融资融券）
     */
    private String sf_commission_with_margin;

    /**
     * 本期_股基交易金额（含融资融券）
     */
    private String sf_amount_with_margin;

    /**
     * 当日申购金额（万）
     */
    private String purchase_amount;

    /**
     * 当日赎回金额（万）
     */
    private String redemption_amount;

    /**
     * 当日申购-赎回金额（万）
     */
    private String minus_amount;

    /**
     * 银行转账-银行转入（万）
     */
    private String bank_in;

    /**
     * 银行转账-银行转出（万）
     */
    private String bank_out;

    /**
     * 银行转账-合计（万）
     */
    private String bank_sum;

    /**
     * 证券买卖-证券买入（万）
     */
    private String secu_in;

    /**
     * 证券买卖-证券卖出（万）
     */
    private String secu_out;

    /**
     * 证券买卖-合计（万）
     */
    private String secu_sum;

    /**
     * 逆回购-拆除质押购回（万）
     */
    private String reverse_in;

    /**
     * 逆回购-质押回购拆出（万）
     */
    private String reverse_out;

    /**
     * 逆回购-合计（万）
     */
    private String reverse_sum;

    /**
     * 金融产品-赎回（万）
     */
    private String fin_product_in;

    /**
     * 金融产品-购买（万）
     */
    private String fin_product_out;

    /**
     * 金融产品-合计（万）
     */
    private String fin_product_sum;

    /**
     * 其他业务（万）
     */
    private String other_business;

    /**
     * 净赎回（万）
     */
    private String net_redemption;

    /**
     * 客户姓名
     */
    private String cust_name;

    /**
     * 身份证号/营业执照号
     */
    private String id_no;

    /**
     * 状态
     */
    private String cust_status;

    /**
     * 股票佣金费率
     */
    private String stock_commission_rate;

    /**
     * 融资融券余额
     */
    private String margin_trade_balance;

    /**
     * 融资融券息费收入
     */
    private String margin_trade_interest_expense;

    /**
     * 普通股票佣金收入
     */
    private String common_stock_commission;

    /**
     * 开放式基金佣金收入
     */
    private String open_fund_commission;
    
   /**
    * 当日_其他佣金收入
    */
    private String other_commission;
    /**
     * 累计_其他佣金收入
     */
    private String all_other_commission;
    
    public String getByKey(String key) {
        switch (key) {
            case"warrant_amount":
                return this.getWarrant_amount();
            case"sfw_market_rate":
                return this.getSfw_market_rate();
            case"sf_market_rate":
                return this.getSf_market_rate();
            case"fund_balance_avg":
                return this.getFund_balance_avg();
            case"stock_balance_avg":
                return this.getStock_balance_avg();
            case"fund_balance_close_p":
                return this.getFund_balance_close_p();
            case"stock_balance_close_p":
                return this.getStock_balance_close_p();
            case"asset_balance_close_p":
                return this.getAsset_balance_close_p();
            case"stock_amount_y":
                return this.getStock_amount_y();
            case"fund_amount_y":
                return this.getFund_amount_y();
            case"warrant_amount_y":
                return this.getWarrant_amount_y();
            case"sfw_amount_y":
                return this.getSfw_amount_y();
            case"sfw_market_rate_y":
                return this.getSfw_market_rate_y();
            case"sf_amount_y":
                return this.getSf_amount_y();
            case"sf_market_rate_y":
                return this.getSf_market_rate_y();
            case"fund_balance_avg_y":
                return this.getFund_balance_avg_y();
            case"stock_balance_avg_y":
                return this.getStock_balance_avg_y();
            case"fund_balance_close_y":
                return this.getFund_balance_close_y();
            case"stock_balance_close_y":
                return this.getStock_balance_close_y();
            case"asset_balance_close_y":
                return this.getAsset_balance_close_y();
            case"b_stock_amount_y":
                return this.getB_stock_amount_y();
            case"sf_rate":
                return this.getSf_rate();
            case"sf_rate_y":
                return this.getSf_rate_y();
            case"assure_balance_close_p":
                return this.getAssure_balance_close_p();
            case"debit_balance_close_p":
                return this.getDebit_balance_close_p();
            case"assure_balance_close_y":
                return this.getAssure_balance_close_y();
            case"debit_balance_close_y":
                return this.getDebit_balance_close_y();
            case"sfw_market_amount_all_rate":
                return this.getSfw_market_amount_all_rate();
            case"sf_market_amount_all_rate":
                return this.getSf_market_amount_all_rate();
            case"sfw_market_amount_all_rate_y":
                return this.getSfw_market_amount_all_rate_y();
            case"sf_market_amount_all_rate_y":
                return this.getSf_market_amount_all_rate_y();
            case"stock_amount_all_rate":
                return this.getStock_amount_all_rate();
            case"stock_amount_all_rate_y":
                return this.getStock_amount_all_rate_y();
            case"sf_amount_all_rate":
                return this.getSf_amount_all_rate();
            case"sf_amount_all_rate_y":
                return this.getSf_amount_all_rate_y();
            case"assure_balance_avg":
                return this.getAssure_balance_avg();
            case"assure_balance_avg_y":
                return this.getAssure_balance_avg_y();
            case"margin_open_cust_num":
                return this.getMargin_open_cust_num();
            case"sfw_amount_all":
                return this.getSfw_amount_all();
            case"commission_all":
                return this.getCommission_all();
            case"net_commission_all":
                return this.getNet_commission_all();
            case"sfw_amount_all_y":
                return this.getSfw_amount_all_y();
            case"commission_all_y":
                return this.getCommission_all_y();
            case"net_commission_all_y":
                return this.getNet_commission_all_y();
            case"hk_stock_amount":
                return this.getHk_stock_amount();
            case"hk_commission":
                return this.getHk_commission();
            case"hk_stock_amount_y":
                return this.getHk_stock_amount_y();
            case"hk_commission_y":
                return this.getHk_commission_y();
            case"hk_open_cust_num_y":
                return this.getHk_open_cust_num_y();
            case"multi_financial_amount_avg":
                return this.getMulti_financial_amount_avg();
            case"market_rate":
                return this.getMarket_rate();
            case"all_market_rate":
                return this.getAll_market_rate();
            case"lastyear_market_rate":
                return this.getLastyear_market_rate();
            case"market_rate_change":
                return this.getMarket_rate_change();
            case"all_stock_rate":
                return this.getAll_stock_rate();
            case"sfw_fund_commission":
                return this.getSfw_fund_commission();
            case"trade_amount":
                return this.getTrade_amount();
            case"all_trade_amount":
                return this.getAll_trade_amount();
            case"all_commission":
                return this.getAll_commission();
            case"all_open_cust_num":
                return this.getAll_open_cust_num();
            case"trade_amount_rate":
                return this.getTrade_amount_rate();
            case"all_trade_amount_rate":
                return this.getAll_trade_amount_rate();
            case"check_market_rate_fd":
                return this.getCheck_market_rate_fd();
            case"cust_right_avg":
                return this.getCust_right_avg();
            case"cust_right_close":
                return this.getCust_right_close();
            case"pledge_amount":
                return this.getPledge_amount();
            case"margin_stock_amount":
                return this.getMargin_stock_amount();
            case"margin_fund_amount":
                return this.getMargin_fund_amount();
            case"margin_bond_amount":
                return this.getMargin_bond_amount();
            case"margin_warrant_amount":
                return this.getMargin_warrant_amount();
            case"all_stock_amount":
                return this.getAll_stock_amount();
            case"all_pledge_amount":
                return this.getAll_pledge_amount();
            case"all_fund_amount":
                return this.getAll_fund_amount();
            case"all_warrant_amount":
                return this.getAll_warrant_amount();
            case"all_margin_stock_amount":
                return this.getAll_margin_stock_amount();
            case"all_margin_fund_amount":
                return this.getAll_margin_fund_amount();
            case"all_margin_bond_amount":
                return this.getAll_margin_bond_amount();
            case"all_margin_warrant_amount":
                return this.getAll_margin_warrant_amount();
            case"sfw_commission":
                return this.getSfw_commission();
            case"fund_commission":
                return this.getFund_commission();
            case"warrant_commission":
                return this.getWarrant_commission();
            case"margin_commission":
                return this.getMargin_commission();
            case"margin_stock_commission":
                return this.getMargin_stock_commission();
            case"margin_fund_commission":
                return this.getMargin_fund_commission();
            case"margin_bond_commission":
                return this.getMargin_bond_commission();
            case"margin_warrant_commission":
                return this.getMargin_warrant_commission();
            case"all_sfw_commission":
                return this.getAll_sfw_commission();
            case"all_stock_commission":
                return this.getAll_stock_commission();
            case"all_fund_commission":
                return this.getAll_fund_commission();
            case"all_warrant_commission":
                return this.getAll_warrant_commission();
            case"all_margin_commission":
                return this.getAll_margin_commission();
            case"all_margin_stock_commission":
                return this.getAll_margin_stock_commission();
            case"all_margin_fund_commission":
                return this.getAll_margin_fund_commission();
            case"all_margin_bond_commission":
                return this.getAll_margin_bond_commission();
            case"all_margin_warrant_commission":
                return this.getAll_margin_warrant_commission();
            case"multi_financial_balance_avg":
                return this.getMulti_financial_balance_avg();
            case"margin_debit_avg":
                return this.getMargin_debit_avg();
            case"pledge_debit_avg":
                return this.getPledge_debit_avg();
            case"all_trade_amount_fd":
                return this.getAll_trade_amount_fd();
            case"commission_adjust":
                return this.getCommission_adjust();
            case"all_commission_adjust":
                return this.getAll_commission_adjust();
            case"avg_cust_right":
                return this.getAvg_cust_right();
            case"end_cust_right":
                return this.getEnd_cust_right();
            case"cust_right":
                return this.getCust_right();
            case"fund_division":
                return this.getFund_division();
            case"adjust_commission":
                return this.getAdjust_commission();
            case"all_adjust_commission":
                return this.getAll_adjust_commission();
            case"avg_fund_balance":
                return this.getAvg_fund_balance();
            case"avg_stock_balance":
                return this.getAvg_stock_balance();
            case"avg_multi_financial_balance":
                return this.getAvg_multi_financial_balance();
            case"avg_margin_debit":
                return this.getAvg_margin_debit();
            case"avg_pledge_debit":
                return this.getAvg_pledge_debit();
            case"end_fund_balance":
                return this.getEnd_fund_balance();
            case"end_stock_balance":
                return this.getEnd_stock_balance();
            case"end_multi_financial_balance":
                return this.getEnd_multi_financial_balance();
            case"end_margin_debit":
                return this.getEnd_margin_debit();
            case"end_pledge_debit":
                return this.getEnd_pledge_debit();
            case"fund_balance":
                return this.getFund_balance();
            case"stock_balance":
                return this.getStock_balance();
            case"multi_financial_balance":
                return this.getMulti_financial_balance();
            case"margin_debit":
                return this.getMargin_debit();
            case"pledge_debit":
                return this.getPledge_debit();
            case"check_trade_amount_fd":
                return this.getCheck_trade_amount_fd();
            case"commission_rate":
                return this.getCommission_rate();
            case"check_stock_amount":
                return this.getCheck_stock_amount();
            case"check_pledge_amount":
                return this.getCheck_pledge_amount();
            case"check_fund_amount":
                return this.getCheck_fund_amount();
            case"check_warrant_amount":
                return this.getCheck_warrant_amount();
            case"check_margin_stock_amount":
                return this.getCheck_margin_stock_amount();
            case"check_margin_fund_amount":
                return this.getCheck_margin_fund_amount();
            case"check_margin_bond_amount":
                return this.getCheck_margin_bond_amount();
            case"check_margin_warrant_amount":
                return this.getCheck_margin_warrant_amount();
            case"init_date":
                return this.getInit_date();
            case"in_capital_balance":
                return this.getIn_capital_balance();
            case"out_capital_balance":
                return this.getOut_capital_balance();
            case"yesterday_asset":
                return this.getYesterday_asset();
            case"thisyear_avg_secu_balance":
                return this.getThisyear_avg_secu_balance();
            case"thisyear_avg_capital_balance":
                return this.getThisyear_avg_capital_balance();
            case"thisyear_avg_asset":
                return this.getThisyear_avg_asset();
            case"thisyear_avg_assure_asset":
                return this.getThisyear_avg_assure_asset();
            case"thisyear_avg_margin_debit":
                return this.getThisyear_avg_margin_debit();
            case"all_in_secu_balance":
                return this.getAll_in_secu_balance();
            case"all_out_secu_balance":
                return this.getAll_out_secu_balance();
            case"all_in_capital_balance":
                return this.getAll_in_capital_balance();
            case"all_out_capital_balance":
                return this.getAll_out_capital_balance();
            case"lastyear_avg_asset":
                return this.getLastyear_avg_asset();
            case"asset_change_rate_over_year":
                return this.getAsset_change_rate_over_year();
            case"assure_cash":
                return this.getAssure_cash();
            case"secu_balance":
                return this.getSecu_balance();
            case"avialable_balance":
                return this.getAvialable_balance();
            case"advisable_balance":
                return this.getAdvisable_balance();
            case"assure_net_asset":
                return this.getAssure_net_asset();
            case"asset":
                return this.getAsset();
            case"in_secu_balance":
                return this.getIn_secu_balance();
            case"out_secu_balance":
                return this.getOut_secu_balance();
            case"in_deposit_balance":
                return this.getIn_deposit_balance();
            case"out_deposit_balance":
                return this.getOut_deposit_balance();
            case"asset_change_rate":
                return this.getAsset_change_rate();
            case"bonus_in":
                return this.getBonus_in();
            case"hk_balance":
                return this.getHk_balance();
            case"sh_a_balance":
                return this.getSh_a_balance();
            case"sh_b_balance":
                return this.getSh_b_balance();
            case"sz_a_balance":
                return this.getSz_a_balance();
            case"sz_b_balance":
                return this.getSz_b_balance();
            case"stb_balance":
                return this.getStb_balance();
            case"gem_balance":
                return this.getGem_balance();
            case"sh_fund_balance":
                return this.getSh_fund_balance();
            case"sz_fund_balance":
                return this.getSz_fund_balance();
            case"bond_balance":
                return this.getBond_balance();
            case"assure_asset":
                return this.getAssure_asset();
            case"assure_capital_balance":
                return this.getAssure_capital_balance();
            case"assure_secu_balance":
                return this.getAssure_secu_balance();
            case"capital_balance":
                return this.getCapital_balance();
            case"in_limit_sale_balance":
                return this.getIn_limit_sale_balance();
            case"out_limit_sale_balance":
                return this.getOut_limit_sale_balance();
            case"avg_deposit_balance":
                return this.getAvg_deposit_balance();
            case"avg_assure_asset":
                return this.getAvg_assure_asset();
            case"avg_asset":
                return this.getAvg_asset();
            case"asset_change_rate_over_month":
                return this.getAsset_change_rate_over_month();
            case"all_avg_asset":
                return this.getAll_avg_asset();
            case"all_in_balance":
                return this.getAll_in_balance();
            case"all_out_balance":
                return this.getAll_out_balance();
            case"all_store_in_capital_balance":
                return this.getAll_store_in_capital_balance();
            case"all_take_out_capital_balance":
                return this.getAll_take_out_capital_balance();
            case "branch_no":
                return this.getBranch_no();
            case "branch_name":
                return this.getBranch_name();
            case "cust_no":
                return this.getCust_no();
            case "stock_account":
                return this.getStock_account();
            case "open_date":
                return this.getOpen_date();
            case "cust_name":
                return this.getCust_name();
            case "stock_code":
                return this.getStock_code();
            case "stock_name":
                return this.getStock_name();
            case "stock_num":
                return this.getStock_num();
            case "change_stock_num":
                return this.getChange_stock_num();
            case "change_stock_amount":
                return this.getChange_stock_amount();
            case "stock_amount":
                return this.getStock_amount();
            case "avg_stock_amount":
                return this.getAvg_stock_amount();
            case "customer":
                return this.getCustomer();
            case "effect_date":
                return this.getEffect_date();
            case "cust_status":
                return this.getCust_status();
            case "fare_ratio":
                return this.getFare_ratio();
            case "asset_ratio":
                return this.getAsset_ratio();
            case "amount_ratio":
                return this.getAmount_ratio();
            case "coop_fare_ratio_sum":
                return this.getCoop_fare_ratio_sum();
            case "coop_asset_ratio_sum":
                return this.getCoop_asset_ratio_sum();
            case "coop_amount_ratio_sum":
                return this.getCoop_amount_ratio_sum();
            case "coop_branch_name":
                return this.getCoop_branch_name();
            case "relation":
                return this.getRelation();
            case "coop_fare_ratio":
                return this.getCoop_fare_ratio();
            case "coop_asset_ratio":
                return this.getCoop_asset_ratio();
            case "coop_amount_ratio":
                return this.getCoop_amount_ratio();
            case"asset_exclude_finance_avg":
                return this.getAsset_exclude_finance_avg();
            case"open_way":
                return this.getOpen_way();
            case"inner_trans_mark":
                return this.getInner_trans_mark();
            case"limit_sale_mark":
                return this.getLimit_sale_mark();
            case"reward_mark":
                return this.getReward_mark();
            case"coop_mark":
                return this.getCoop_mark();
            case"avg_asset_section":
                return this.getAvg_asset_section_name();
            case"cust_num":
                return this.getCust_num();
            case"all_cust_num":
                return this.getAll_cust_num();
            case"cust_proportion":
                return this.getCust_proportion();
            case"all_asset":
                return this.getAll_asset();
            case"asset_proportion":
                return this.getAsset_proportion();
            case"commission_proportion":
                return this.getCommission_proportion();
            case"amount":
                return this.getAmount();
            case"all_amount":
                return this.getAll_amount();
            case"amount_proportion":
                return this.getAmount_proportion();
            case"limit_sale_stock_balance":
                return this.getLimit_sale_stock_balance();
            case "margin_amount":
                return this.getMargin_amount();
            case "assure_amount":
                return this.getAssure_amount();
            case "credit_amount":
                return this.getCredit_amount();
            case "commission":
                return this.getCommission();
            case "assure_commission":
                return this.getAssure_commission();
            case "credit_commission":
                return this.getCredit_commission();
            case "net_commission":
                return this.getNet_commission();
            case "assure_net_commission":
                return this.getAssure_net_commission();
            case "credit_net_commission":
                return this.getCredit_net_commission();
            case "marketing_staff_commission":
                return this.getMarketing_staff_commission();
            case "stock_rate":
                return this.getStock_rate();
            case "open_cust_num":
                return this.getOpen_cust_num();
            case "finance_debit_balance_avg":
                return this.getFinance_debit_balance_avg();
            case "security_debit_amount_avg":
                return this.getSecurity_debit_amount_avg();
            case "debit_balance_avg":
                return this.getDebit_balance_avg();
            case "asset_balance_avg":
                return this.getAsset_balance_avg();
            case "finance_debit_balance_close":
                return this.getFinance_debit_balance_close();
            case "security_debit_amount_close":
                return this.getSecurity_debit_amount_close();
            case "debit_balance_close":
                return this.getDebit_balance_close();
            case "asset_balance_close":
                return this.getAsset_balance_close();
            case "margin_amount_y":
                return this.getMargin_amount_y();
            case "assure_amount_y":
                return this.getAssure_amount_y();
            case "credit_amount_y":
                return this.getCredit_amount_y();
            case "commission_y":
                return this.getCommission_y();
            case "assure_commission_y":
                return this.getAssure_commission_y();
            case "credit_commission_y":
                return this.getCredit_commission_y();
            case "net_commission_y":
                return this.getNet_commission_y();
            case "assure_net_commission_y":
                return this.getAssure_net_commission_y();
            case "credit_net_commission_y":
                return this.getCredit_net_commission_y();
            case "marketing_staff_commission_y":
                return this.getMarketing_staff_commission_y();
            case "stock_rate_y":
                return this.getStock_rate_y();
            case "open_cust_num_y":
                return this.getOpen_cust_num_y();
            case "finance_debit_balance_avg_y":
                return this.getFinance_debit_balance_avg_y();
            case "security_debit_amount_avg_y":
                return this.getSecurity_debit_amount_avg_y();
            case "debit_balance_avg_y":
                return this.getDebit_balance_avg_y();
            case "asset_balance_avg_y":
                return this.getAsset_balance_avg_y();
            case "open_cust_num_total":
                return this.getOpen_cust_num_total();
            case "relationship":
                return this.getRelationship();
            case "fund_amount":
                return this.getFund_amount();
            case "warrants_amount":
                return this.getWarrants_amount();
            case "sfw_amount":
                return this.getSfw_amount();
            case "sf_amount":
                return this.getSf_amount();
            case "total_amount":
                return this.getTotal_amount();
            case "total_commission":
                return this.getTotal_commission();
            case "total_net_commission":
                return this.getTotal_net_commission();
            case "avialable_balance_avg":
                return this.getAvialable_balance_avg();
            case "security_amount_avg":
                return this.getSecurity_amount_avg();
            case "asset_avg":
                return this.getAsset_avg();
            case "assure_cash_avg":
                return this.getAssure_cash_avg();
            case "assure_stock_amount_avg":
                return this.getAssure_stock_amount_avg();
            case "debit_avg":
                return this.getDebit_avg();
            case "avialable_balance_close":
                return this.getAvialable_balance_close();
            case "security_amount_close":
                return this.getSecurity_amount_close();
            case "asset_close":
                return this.getAsset_close();
            case "assure_cash_close":
                return this.getAssure_cash_close();
            case "assure_stock_amount_close":
                return this.getAssure_stock_amount_close();
            case "debit_close":
                return this.getDebit_close();
            case "assure_close":
                return this.getAssure_close();
            case "b_stock_amount":
                return this.getB_stock_amount();
            case "b_stock_commission":
                return this.getB_stock_commission();
            case "b_stock_net_commission":
                return this.getB_stock_net_commission();
            case "h_stock_amount":
                return this.getH_stock_amount();
            case "h_stock_commission":
                return this.getH_stock_commission();
            case "h_stock_net_commission":
                return this.getH_stock_net_commission();
            case "stock_commission":
                return this.getStock_commission();
            case "sf_commission":
                return this.getSf_commission();
            case "stock_commission_with_margin":
                return this.getStock_commission_with_margin();
            case "stock_amount_with_margin":
                return this.getStock_amount_with_margin();
            case "sf_commission_with_margin":
                return this.getSf_commission_with_margin();
            case "sf_amount_with_margin":
                return this.getSf_amount_with_margin();
            case "purchase_amount":
                return this.getPurchase_amount();
            case "redemption_amount":
                return this.getRedemption_amount();
            case "minus_amount":
                return this.getMinus_amount();
            case"bank_in":
                return this.getBank_in();
            case"bank_out":
                return this.getBank_out();
            case"bank_sum":
                return this.getBank_sum();
            case"secu_in":
                return this.getSecu_in();
            case"secu_out":
                return this.getSecu_out();
            case"secu_sum":
                return this.getSecu_sum();
            case"reverse_in":
                return this.getReverse_in();
            case"reverse_out":
                return this.getReverse_out();
            case"reverse_sum":
                return this.getReverse_sum();
            case"fin_product_in":
                return this.getFin_product_in();
            case"fin_product_out":
                return this.getFin_product_out();
            case"fin_product_sum":
                return this.getFin_product_sum();
            case"other_business":
                return this.getOther_business();
            case"net_redemption":
                return this.getNet_redemption();
            case"id_no":
                return this.getId_no();
            case"stock_commission_rate":
                return this.getStock_commission_rate();
            case"margin_trade_balance":
                return this.getMargin_trade_balance();
            case"margin_trade_interest_expense":
                return this.getMargin_trade_interest_expense();
            case"common_stock_commission":
                return this.getCommon_stock_commission();
            case"open_fund_commission":
                return this.getOpen_fund_commission();
            case"all_other_commission":
                return this.getAll_other_commission();
            case"other_commission":
            	return this.getOther_commission();
        }
        return null;
    }

    public String getWarrant_amount() {
        return warrant_amount;
    }

    public void setWarrant_amount(String warrant_amount) {
        this.warrant_amount = warrant_amount;
    }

    public String getSfw_market_rate() {
        return sfw_market_rate;
    }

    public void setSfw_market_rate(String sfw_market_rate) {
        this.sfw_market_rate = sfw_market_rate;
    }

    public String getSf_market_rate() {
        return sf_market_rate;
    }

    public void setSf_market_rate(String sf_market_rate) {
        this.sf_market_rate = sf_market_rate;
    }

    public String getFund_balance_avg() {
        return fund_balance_avg;
    }

    public void setFund_balance_avg(String fund_balance_avg) {
        this.fund_balance_avg = fund_balance_avg;
    }

    public String getStock_balance_avg() {
        return stock_balance_avg;
    }

    public void setStock_balance_avg(String stock_balance_avg) {
        this.stock_balance_avg = stock_balance_avg;
    }

    public String getFund_balance_close_p() {
        return fund_balance_close_p;
    }

    public void setFund_balance_close_p(String fund_balance_close_p) {
        this.fund_balance_close_p = fund_balance_close_p;
    }

    public String getStock_balance_close_p() {
        return stock_balance_close_p;
    }

    public void setStock_balance_close_p(String stock_balance_close_p) {
        this.stock_balance_close_p = stock_balance_close_p;
    }

    public String getAsset_balance_close_p() {
        return asset_balance_close_p;
    }

    public void setAsset_balance_close_p(String asset_balance_close_p) {
        this.asset_balance_close_p = asset_balance_close_p;
    }

    public String getStock_amount_y() {
        return stock_amount_y;
    }

    public void setStock_amount_y(String stock_amount_y) {
        this.stock_amount_y = stock_amount_y;
    }

    public String getFund_amount_y() {
        return fund_amount_y;
    }

    public void setFund_amount_y(String fund_amount_y) {
        this.fund_amount_y = fund_amount_y;
    }

    public String getWarrant_amount_y() {
        return warrant_amount_y;
    }

    public void setWarrant_amount_y(String warrant_amount_y) {
        this.warrant_amount_y = warrant_amount_y;
    }

    public String getSfw_amount_y() {
        return sfw_amount_y;
    }

    public void setSfw_amount_y(String sfw_amount_y) {
        this.sfw_amount_y = sfw_amount_y;
    }

    public String getSfw_market_rate_y() {
        return sfw_market_rate_y;
    }

    public void setSfw_market_rate_y(String sfw_market_rate_y) {
        this.sfw_market_rate_y = sfw_market_rate_y;
    }

    public String getSf_amount_y() {
        return sf_amount_y;
    }

    public void setSf_amount_y(String sf_amount_y) {
        this.sf_amount_y = sf_amount_y;
    }

    public String getSf_market_rate_y() {
        return sf_market_rate_y;
    }

    public void setSf_market_rate_y(String sf_market_rate_y) {
        this.sf_market_rate_y = sf_market_rate_y;
    }

    public String getFund_balance_avg_y() {
        return fund_balance_avg_y;
    }

    public void setFund_balance_avg_y(String fund_balance_avg_y) {
        this.fund_balance_avg_y = fund_balance_avg_y;
    }

    public String getStock_balance_avg_y() {
        return stock_balance_avg_y;
    }

    public void setStock_balance_avg_y(String stock_balance_avg_y) {
        this.stock_balance_avg_y = stock_balance_avg_y;
    }

    public String getFund_balance_close_y() {
        return fund_balance_close_y;
    }

    public void setFund_balance_close_y(String fund_balance_close_y) {
        this.fund_balance_close_y = fund_balance_close_y;
    }

    public String getStock_balance_close_y() {
        return stock_balance_close_y;
    }

    public void setStock_balance_close_y(String stock_balance_close_y) {
        this.stock_balance_close_y = stock_balance_close_y;
    }

    public String getAsset_balance_close_y() {
        return asset_balance_close_y;
    }

    public void setAsset_balance_close_y(String asset_balance_close_y) {
        this.asset_balance_close_y = asset_balance_close_y;
    }

    public String getB_stock_amount_y() {
        return b_stock_amount_y;
    }

    public void setB_stock_amount_y(String b_stock_amount_y) {
        this.b_stock_amount_y = b_stock_amount_y;
    }

    public String getSf_rate() {
        return sf_rate;
    }

    public void setSf_rate(String sf_rate) {
        this.sf_rate = sf_rate;
    }

    public String getSf_rate_y() {
        return sf_rate_y;
    }

    public void setSf_rate_y(String sf_rate_y) {
        this.sf_rate_y = sf_rate_y;
    }

    public String getAssure_balance_close_p() {
        return assure_balance_close_p;
    }

    public void setAssure_balance_close_p(String assure_balance_close_p) {
        this.assure_balance_close_p = assure_balance_close_p;
    }

    public String getDebit_balance_close_p() {
        return debit_balance_close_p;
    }

    public void setDebit_balance_close_p(String debit_balance_close_p) {
        this.debit_balance_close_p = debit_balance_close_p;
    }

    public String getAssure_balance_close_y() {
        return assure_balance_close_y;
    }

    public void setAssure_balance_close_y(String assure_balance_close_y) {
        this.assure_balance_close_y = assure_balance_close_y;
    }

    public String getDebit_balance_close_y() {
        return debit_balance_close_y;
    }

    public void setDebit_balance_close_y(String debit_balance_close_y) {
        this.debit_balance_close_y = debit_balance_close_y;
    }

    public String getSfw_market_amount_all_rate() {
        return sfw_market_amount_all_rate;
    }

    public void setSfw_market_amount_all_rate(String sfw_market_amount_all_rate) {
        this.sfw_market_amount_all_rate = sfw_market_amount_all_rate;
    }

    public String getSf_market_amount_all_rate() {
        return sf_market_amount_all_rate;
    }

    public void setSf_market_amount_all_rate(String sf_market_amount_all_rate) {
        this.sf_market_amount_all_rate = sf_market_amount_all_rate;
    }

    public String getSfw_market_amount_all_rate_y() {
        return sfw_market_amount_all_rate_y;
    }

    public void setSfw_market_amount_all_rate_y(String sfw_market_amount_all_rate_y) {
        this.sfw_market_amount_all_rate_y = sfw_market_amount_all_rate_y;
    }

    public String getSf_market_amount_all_rate_y() {
        return sf_market_amount_all_rate_y;
    }

    public void setSf_market_amount_all_rate_y(String sf_market_amount_all_rate_y) {
        this.sf_market_amount_all_rate_y = sf_market_amount_all_rate_y;
    }

    public String getStock_amount_all_rate() {
        return stock_amount_all_rate;
    }

    public void setStock_amount_all_rate(String stock_amount_all_rate) {
        this.stock_amount_all_rate = stock_amount_all_rate;
    }

    public String getStock_amount_all_rate_y() {
        return stock_amount_all_rate_y;
    }

    public void setStock_amount_all_rate_y(String stock_amount_all_rate_y) {
        this.stock_amount_all_rate_y = stock_amount_all_rate_y;
    }

    public String getSf_amount_all_rate() {
        return sf_amount_all_rate;
    }

    public void setSf_amount_all_rate(String sf_amount_all_rate) {
        this.sf_amount_all_rate = sf_amount_all_rate;
    }

    public String getSf_amount_all_rate_y() {
        return sf_amount_all_rate_y;
    }

    public void setSf_amount_all_rate_y(String sf_amount_all_rate_y) {
        this.sf_amount_all_rate_y = sf_amount_all_rate_y;
    }

    public String getAssure_balance_avg() {
        return assure_balance_avg;
    }

    public void setAssure_balance_avg(String assure_balance_avg) {
        this.assure_balance_avg = assure_balance_avg;
    }

    public String getAssure_balance_avg_y() {
        return assure_balance_avg_y;
    }

    public void setAssure_balance_avg_y(String assure_balance_avg_y) {
        this.assure_balance_avg_y = assure_balance_avg_y;
    }

    public String getMargin_open_cust_num() {
        return margin_open_cust_num;
    }

    public void setMargin_open_cust_num(String margin_open_cust_num) {
        this.margin_open_cust_num = margin_open_cust_num;
    }

    public String getSfw_amount_all() {
        return sfw_amount_all;
    }

    public void setSfw_amount_all(String sfw_amount_all) {
        this.sfw_amount_all = sfw_amount_all;
    }

    public String getCommission_all() {
        return commission_all;
    }

    public void setCommission_all(String commission_all) {
        this.commission_all = commission_all;
    }

    public String getNet_commission_all() {
        return net_commission_all;
    }

    public void setNet_commission_all(String net_commission_all) {
        this.net_commission_all = net_commission_all;
    }

    public String getSfw_amount_all_y() {
        return sfw_amount_all_y;
    }

    public void setSfw_amount_all_y(String sfw_amount_all_y) {
        this.sfw_amount_all_y = sfw_amount_all_y;
    }

    public String getCommission_all_y() {
        return commission_all_y;
    }

    public void setCommission_all_y(String commission_all_y) {
        this.commission_all_y = commission_all_y;
    }

    public String getNet_commission_all_y() {
        return net_commission_all_y;
    }

    public void setNet_commission_all_y(String net_commission_all_y) {
        this.net_commission_all_y = net_commission_all_y;
    }

    public String getHk_stock_amount() {
        return hk_stock_amount;
    }

    public void setHk_stock_amount(String hk_stock_amount) {
        this.hk_stock_amount = hk_stock_amount;
    }

    public String getHk_commission() {
        return hk_commission;
    }

    public void setHk_commission(String hk_commission) {
        this.hk_commission = hk_commission;
    }

    public String getHk_stock_amount_y() {
        return hk_stock_amount_y;
    }

    public void setHk_stock_amount_y(String hk_stock_amount_y) {
        this.hk_stock_amount_y = hk_stock_amount_y;
    }

    public String getHk_commission_y() {
        return hk_commission_y;
    }

    public void setHk_commission_y(String hk_commission_y) {
        this.hk_commission_y = hk_commission_y;
    }

    public String getHk_open_cust_num_y() {
        return hk_open_cust_num_y;
    }

    public void setHk_open_cust_num_y(String hk_open_cust_num_y) {
        this.hk_open_cust_num_y = hk_open_cust_num_y;
    }

    public String getMulti_financial_amount_avg() {
        return multi_financial_amount_avg;
    }

    public void setMulti_financial_amount_avg(String multi_financial_amount_avg) {
        this.multi_financial_amount_avg = multi_financial_amount_avg;
    }

    public String getMarket_rate() {
        return market_rate;
    }

    public void setMarket_rate(String market_rate) {
        this.market_rate = market_rate;
    }

    public String getAll_market_rate() {
        return all_market_rate;
    }

    public void setAll_market_rate(String all_market_rate) {
        this.all_market_rate = all_market_rate;
    }

    public String getLastyear_market_rate() {
        return lastyear_market_rate;
    }

    public void setLastyear_market_rate(String lastyear_market_rate) {
        this.lastyear_market_rate = lastyear_market_rate;
    }

    public String getMarket_rate_change() {
        return market_rate_change;
    }

    public void setMarket_rate_change(String market_rate_change) {
        this.market_rate_change = market_rate_change;
    }

    public String getAll_stock_rate() {
        return all_stock_rate;
    }

    public void setAll_stock_rate(String all_stock_rate) {
        this.all_stock_rate = all_stock_rate;
    }

    public String getSfw_fund_commission() {
        return sfw_fund_commission;
    }

    public void setSfw_fund_commission(String sfw_fund_commission) {
        this.sfw_fund_commission = sfw_fund_commission;
    }

    public String getTrade_amount() {
        return trade_amount;
    }

    public void setTrade_amount(String trade_amount) {
        this.trade_amount = trade_amount;
    }

    public String getAll_trade_amount() {
        return all_trade_amount;
    }

    public void setAll_trade_amount(String all_trade_amount) {
        this.all_trade_amount = all_trade_amount;
    }

    public String getAll_commission() {
        return all_commission;
    }

    public void setAll_commission(String all_commission) {
        this.all_commission = all_commission;
    }

    public String getAll_open_cust_num() {
        return all_open_cust_num;
    }

    public void setAll_open_cust_num(String all_open_cust_num) {
        this.all_open_cust_num = all_open_cust_num;
    }

    public String getTrade_amount_rate() {
        return trade_amount_rate;
    }

    public void setTrade_amount_rate(String trade_amount_rate) {
        this.trade_amount_rate = trade_amount_rate;
    }

    public String getAll_trade_amount_rate() {
        return all_trade_amount_rate;
    }

    public void setAll_trade_amount_rate(String all_trade_amount_rate) {
        this.all_trade_amount_rate = all_trade_amount_rate;
    }

    public String getCheck_market_rate_fd() {
        return check_market_rate_fd;
    }

    public void setCheck_market_rate_fd(String check_market_rate_fd) {
        this.check_market_rate_fd = check_market_rate_fd;
    }

    public String getCust_right_avg() {
        return cust_right_avg;
    }

    public void setCust_right_avg(String cust_right_avg) {
        this.cust_right_avg = cust_right_avg;
    }

    public String getCust_right_close() {
        return cust_right_close;
    }

    public void setCust_right_close(String cust_right_close) {
        this.cust_right_close = cust_right_close;
    }

    public String getPledge_amount() {
        return pledge_amount;
    }

    public void setPledge_amount(String pledge_amount) {
        this.pledge_amount = pledge_amount;
    }

    public String getMargin_stock_amount() {
        return margin_stock_amount;
    }

    public void setMargin_stock_amount(String margin_stock_amount) {
        this.margin_stock_amount = margin_stock_amount;
    }

    public String getMargin_fund_amount() {
        return margin_fund_amount;
    }

    public void setMargin_fund_amount(String margin_fund_amount) {
        this.margin_fund_amount = margin_fund_amount;
    }

    public String getMargin_bond_amount() {
        return margin_bond_amount;
    }

    public void setMargin_bond_amount(String margin_bond_amount) {
        this.margin_bond_amount = margin_bond_amount;
    }

    public String getMargin_warrant_amount() {
        return margin_warrant_amount;
    }

    public void setMargin_warrant_amount(String margin_warrant_amount) {
        this.margin_warrant_amount = margin_warrant_amount;
    }

    public String getAll_stock_amount() {
        return all_stock_amount;
    }

    public void setAll_stock_amount(String all_stock_amount) {
        this.all_stock_amount = all_stock_amount;
    }

    public String getAll_pledge_amount() {
        return all_pledge_amount;
    }

    public void setAll_pledge_amount(String all_pledge_amount) {
        this.all_pledge_amount = all_pledge_amount;
    }

    public String getAll_fund_amount() {
        return all_fund_amount;
    }

    public void setAll_fund_amount(String all_fund_amount) {
        this.all_fund_amount = all_fund_amount;
    }

    public String getAll_warrant_amount() {
        return all_warrant_amount;
    }

    public void setAll_warrant_amount(String all_warrant_amount) {
        this.all_warrant_amount = all_warrant_amount;
    }

    public String getAll_margin_stock_amount() {
        return all_margin_stock_amount;
    }

    public void setAll_margin_stock_amount(String all_margin_stock_amount) {
        this.all_margin_stock_amount = all_margin_stock_amount;
    }

    public String getAll_margin_fund_amount() {
        return all_margin_fund_amount;
    }

    public void setAll_margin_fund_amount(String all_margin_fund_amount) {
        this.all_margin_fund_amount = all_margin_fund_amount;
    }

    public String getAll_margin_bond_amount() {
        return all_margin_bond_amount;
    }

    public void setAll_margin_bond_amount(String all_margin_bond_amount) {
        this.all_margin_bond_amount = all_margin_bond_amount;
    }

    public String getAll_margin_warrant_amount() {
        return all_margin_warrant_amount;
    }

    public void setAll_margin_warrant_amount(String all_margin_warrant_amount) {
        this.all_margin_warrant_amount = all_margin_warrant_amount;
    }

    public String getSfw_commission() {
        return sfw_commission;
    }

    public void setSfw_commission(String sfw_commission) {
        this.sfw_commission = sfw_commission;
    }

    public String getFund_commission() {
        return fund_commission;
    }

    public void setFund_commission(String fund_commission) {
        this.fund_commission = fund_commission;
    }

    public String getWarrant_commission() {
        return warrant_commission;
    }

    public void setWarrant_commission(String warrant_commission) {
        this.warrant_commission = warrant_commission;
    }

    public String getMargin_commission() {
        return margin_commission;
    }

    public void setMargin_commission(String margin_commission) {
        this.margin_commission = margin_commission;
    }

    public String getMargin_stock_commission() {
        return margin_stock_commission;
    }

    public void setMargin_stock_commission(String margin_stock_commission) {
        this.margin_stock_commission = margin_stock_commission;
    }

    public String getMargin_fund_commission() {
        return margin_fund_commission;
    }

    public void setMargin_fund_commission(String margin_fund_commission) {
        this.margin_fund_commission = margin_fund_commission;
    }

    public String getMargin_bond_commission() {
        return margin_bond_commission;
    }

    public void setMargin_bond_commission(String margin_bond_commission) {
        this.margin_bond_commission = margin_bond_commission;
    }

    public String getMargin_warrant_commission() {
        return margin_warrant_commission;
    }

    public void setMargin_warrant_commission(String margin_warrant_commission) {
        this.margin_warrant_commission = margin_warrant_commission;
    }

    public String getAll_sfw_commission() {
        return all_sfw_commission;
    }

    public void setAll_sfw_commission(String all_sfw_commission) {
        this.all_sfw_commission = all_sfw_commission;
    }

    public String getAll_stock_commission() {
        return all_stock_commission;
    }

    public void setAll_stock_commission(String all_stock_commission) {
        this.all_stock_commission = all_stock_commission;
    }

    public String getAll_fund_commission() {
        return all_fund_commission;
    }

    public void setAll_fund_commission(String all_fund_commission) {
        this.all_fund_commission = all_fund_commission;
    }

    public String getAll_warrant_commission() {
        return all_warrant_commission;
    }

    public void setAll_warrant_commission(String all_warrant_commission) {
        this.all_warrant_commission = all_warrant_commission;
    }

    public String getAll_margin_commission() {
        return all_margin_commission;
    }

    public void setAll_margin_commission(String all_margin_commission) {
        this.all_margin_commission = all_margin_commission;
    }

    public String getAll_margin_stock_commission() {
        return all_margin_stock_commission;
    }

    public void setAll_margin_stock_commission(String all_margin_stock_commission) {
        this.all_margin_stock_commission = all_margin_stock_commission;
    }

    public String getAll_margin_fund_commission() {
        return all_margin_fund_commission;
    }

    public void setAll_margin_fund_commission(String all_margin_fund_commission) {
        this.all_margin_fund_commission = all_margin_fund_commission;
    }

    public String getAll_margin_bond_commission() {
        return all_margin_bond_commission;
    }

    public void setAll_margin_bond_commission(String all_margin_bond_commission) {
        this.all_margin_bond_commission = all_margin_bond_commission;
    }

    public String getAll_margin_warrant_commission() {
        return all_margin_warrant_commission;
    }

    public void setAll_margin_warrant_commission(String all_margin_warrant_commission) {
        this.all_margin_warrant_commission = all_margin_warrant_commission;
    }

    public String getMulti_financial_balance_avg() {
        return multi_financial_balance_avg;
    }

    public void setMulti_financial_balance_avg(String multi_financial_balance_avg) {
        this.multi_financial_balance_avg = multi_financial_balance_avg;
    }

    public String getMargin_debit_avg() {
        return margin_debit_avg;
    }

    public void setMargin_debit_avg(String margin_debit_avg) {
        this.margin_debit_avg = margin_debit_avg;
    }

    public String getPledge_debit_avg() {
        return pledge_debit_avg;
    }

    public void setPledge_debit_avg(String pledge_debit_avg) {
        this.pledge_debit_avg = pledge_debit_avg;
    }

    public String getAll_trade_amount_fd() {
        return all_trade_amount_fd;
    }

    public void setAll_trade_amount_fd(String all_trade_amount_fd) {
        this.all_trade_amount_fd = all_trade_amount_fd;
    }

    public String getCommission_adjust() {
        return commission_adjust;
    }

    public void setCommission_adjust(String commission_adjust) {
        this.commission_adjust = commission_adjust;
    }

    public String getAll_commission_adjust() {
        return all_commission_adjust;
    }

    public void setAll_commission_adjust(String all_commission_adjust) {
        this.all_commission_adjust = all_commission_adjust;
    }

    public String getAvg_cust_right() {
        return avg_cust_right;
    }

    public void setAvg_cust_right(String avg_cust_right) {
        this.avg_cust_right = avg_cust_right;
    }

    public String getEnd_cust_right() {
        return end_cust_right;
    }

    public void setEnd_cust_right(String end_cust_right) {
        this.end_cust_right = end_cust_right;
    }

    public String getCust_right() {
        return cust_right;
    }

    public void setCust_right(String cust_right) {
        this.cust_right = cust_right;
    }

    public String getFund_division() {
        return fund_division;
    }

    public void setFund_division(String fund_division) {
        this.fund_division = fund_division;
    }

    public String getAdjust_commission() {
        return adjust_commission;
    }

    public void setAdjust_commission(String adjust_commission) {
        this.adjust_commission = adjust_commission;
    }

    public String getAll_adjust_commission() {
        return all_adjust_commission;
    }

    public void setAll_adjust_commission(String all_adjust_commission) {
        this.all_adjust_commission = all_adjust_commission;
    }

    public String getAvg_fund_balance() {
        return avg_fund_balance;
    }

    public void setAvg_fund_balance(String avg_fund_balance) {
        this.avg_fund_balance = avg_fund_balance;
    }

    public String getAvg_stock_balance() {
        return avg_stock_balance;
    }

    public void setAvg_stock_balance(String avg_stock_balance) {
        this.avg_stock_balance = avg_stock_balance;
    }

    public String getAvg_multi_financial_balance() {
        return avg_multi_financial_balance;
    }

    public void setAvg_multi_financial_balance(String avg_multi_financial_balance) {
        this.avg_multi_financial_balance = avg_multi_financial_balance;
    }

    public String getAvg_margin_debit() {
        return avg_margin_debit;
    }

    public void setAvg_margin_debit(String avg_margin_debit) {
        this.avg_margin_debit = avg_margin_debit;
    }

    public String getAvg_pledge_debit() {
        return avg_pledge_debit;
    }

    public void setAvg_pledge_debit(String avg_pledge_debit) {
        this.avg_pledge_debit = avg_pledge_debit;
    }

    public String getEnd_fund_balance() {
        return end_fund_balance;
    }

    public void setEnd_fund_balance(String end_fund_balance) {
        this.end_fund_balance = end_fund_balance;
    }

    public String getEnd_stock_balance() {
        return end_stock_balance;
    }

    public void setEnd_stock_balance(String end_stock_balance) {
        this.end_stock_balance = end_stock_balance;
    }

    public String getEnd_multi_financial_balance() {
        return end_multi_financial_balance;
    }

    public void setEnd_multi_financial_balance(String end_multi_financial_balance) {
        this.end_multi_financial_balance = end_multi_financial_balance;
    }

    public String getEnd_margin_debit() {
        return end_margin_debit;
    }

    public void setEnd_margin_debit(String end_margin_debit) {
        this.end_margin_debit = end_margin_debit;
    }

    public String getEnd_pledge_debit() {
        return end_pledge_debit;
    }

    public void setEnd_pledge_debit(String end_pledge_debit) {
        this.end_pledge_debit = end_pledge_debit;
    }

    public String getFund_balance() {
        return fund_balance;
    }

    public void setFund_balance(String fund_balance) {
        this.fund_balance = fund_balance;
    }

    public String getStock_balance() {
        return stock_balance;
    }

    public void setStock_balance(String stock_balance) {
        this.stock_balance = stock_balance;
    }

    public String getMulti_financial_balance() {
        return multi_financial_balance;
    }

    public void setMulti_financial_balance(String multi_financial_balance) {
        this.multi_financial_balance = multi_financial_balance;
    }

    public String getMargin_debit() {
        return margin_debit;
    }

    public void setMargin_debit(String margin_debit) {
        this.margin_debit = margin_debit;
    }

    public String getPledge_debit() {
        return pledge_debit;
    }

    public void setPledge_debit(String pledge_debit) {
        this.pledge_debit = pledge_debit;
    }

    public String getCheck_trade_amount_fd() {
        return check_trade_amount_fd;
    }

    public void setCheck_trade_amount_fd(String check_trade_amount_fd) {
        this.check_trade_amount_fd = check_trade_amount_fd;
    }

    public String getCommission_rate() {
        return commission_rate;
    }

    public void setCommission_rate(String commission_rate) {
        this.commission_rate = commission_rate;
    }

    public String getCheck_stock_amount() {
        return check_stock_amount;
    }

    public void setCheck_stock_amount(String check_stock_amount) {
        this.check_stock_amount = check_stock_amount;
    }

    public String getCheck_pledge_amount() {
        return check_pledge_amount;
    }

    public void setCheck_pledge_amount(String check_pledge_amount) {
        this.check_pledge_amount = check_pledge_amount;
    }

    public String getCheck_fund_amount() {
        return check_fund_amount;
    }

    public void setCheck_fund_amount(String check_fund_amount) {
        this.check_fund_amount = check_fund_amount;
    }

    public String getCheck_warrant_amount() {
        return check_warrant_amount;
    }

    public void setCheck_warrant_amount(String check_warrant_amount) {
        this.check_warrant_amount = check_warrant_amount;
    }

    public String getCheck_margin_stock_amount() {
        return check_margin_stock_amount;
    }

    public void setCheck_margin_stock_amount(String check_margin_stock_amount) {
        this.check_margin_stock_amount = check_margin_stock_amount;
    }

    public String getCheck_margin_fund_amount() {
        return check_margin_fund_amount;
    }

    public void setCheck_margin_fund_amount(String check_margin_fund_amount) {
        this.check_margin_fund_amount = check_margin_fund_amount;
    }

    public String getCheck_margin_bond_amount() {
        return check_margin_bond_amount;
    }

    public void setCheck_margin_bond_amount(String check_margin_bond_amount) {
        this.check_margin_bond_amount = check_margin_bond_amount;
    }

    public String getCheck_margin_warrant_amount() {
        return check_margin_warrant_amount;
    }

    public void setCheck_margin_warrant_amount(String check_margin_warrant_amount) {
        this.check_margin_warrant_amount = check_margin_warrant_amount;
    }

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getIn_capital_balance() {
        return in_capital_balance;
    }

    public void setIn_capital_balance(String in_capital_balance) {
        this.in_capital_balance = in_capital_balance;
    }

    public String getOut_capital_balance() {
        return out_capital_balance;
    }

    public void setOut_capital_balance(String out_capital_balance) {
        this.out_capital_balance = out_capital_balance;
    }

    public String getYesterday_asset() {
        return yesterday_asset;
    }

    public void setYesterday_asset(String yesterday_asset) {
        this.yesterday_asset = yesterday_asset;
    }

    public String getThisyear_avg_secu_balance() {
        return thisyear_avg_secu_balance;
    }

    public void setThisyear_avg_secu_balance(String thisyear_avg_secu_balance) {
        this.thisyear_avg_secu_balance = thisyear_avg_secu_balance;
    }

    public String getThisyear_avg_capital_balance() {
        return thisyear_avg_capital_balance;
    }

    public void setThisyear_avg_capital_balance(String thisyear_avg_capital_balance) {
        this.thisyear_avg_capital_balance = thisyear_avg_capital_balance;
    }

    public String getThisyear_avg_asset() {
        return thisyear_avg_asset;
    }

    public void setThisyear_avg_asset(String thisyear_avg_asset) {
        this.thisyear_avg_asset = thisyear_avg_asset;
    }

    public String getThisyear_avg_assure_asset() {
        return thisyear_avg_assure_asset;
    }

    public void setThisyear_avg_assure_asset(String thisyear_avg_assure_asset) {
        this.thisyear_avg_assure_asset = thisyear_avg_assure_asset;
    }

    public String getThisyear_avg_margin_debit() {
        return thisyear_avg_margin_debit;
    }

    public void setThisyear_avg_margin_debit(String thisyear_avg_margin_debit) {
        this.thisyear_avg_margin_debit = thisyear_avg_margin_debit;
    }

    public String getAll_in_secu_balance() {
        return all_in_secu_balance;
    }

    public void setAll_in_secu_balance(String all_in_secu_balance) {
        this.all_in_secu_balance = all_in_secu_balance;
    }

    public String getAll_out_secu_balance() {
        return all_out_secu_balance;
    }

    public void setAll_out_secu_balance(String all_out_secu_balance) {
        this.all_out_secu_balance = all_out_secu_balance;
    }

    public String getAll_in_capital_balance() {
        return all_in_capital_balance;
    }

    public void setAll_in_capital_balance(String all_in_capital_balance) {
        this.all_in_capital_balance = all_in_capital_balance;
    }

    public String getAll_out_capital_balance() {
        return all_out_capital_balance;
    }

    public void setAll_out_capital_balance(String all_out_capital_balance) {
        this.all_out_capital_balance = all_out_capital_balance;
    }

    public String getLastyear_avg_asset() {
        return lastyear_avg_asset;
    }

    public void setLastyear_avg_asset(String lastyear_avg_asset) {
        this.lastyear_avg_asset = lastyear_avg_asset;
    }

    public String getAsset_change_rate_over_year() {
        return asset_change_rate_over_year;
    }

    public void setAsset_change_rate_over_year(String asset_change_rate_over_year) {
        this.asset_change_rate_over_year = asset_change_rate_over_year;
    }

    public String getAssure_cash() {
        return assure_cash;
    }

    public void setAssure_cash(String assure_cash) {
        this.assure_cash = assure_cash;
    }

    public String getSecu_balance() {
        return secu_balance;
    }

    public void setSecu_balance(String secu_balance) {
        this.secu_balance = secu_balance;
    }

    public String getAvialable_balance() {
        return avialable_balance;
    }

    public void setAvialable_balance(String avialable_balance) {
        this.avialable_balance = avialable_balance;
    }

    public String getAdvisable_balance() {
        return advisable_balance;
    }

    public void setAdvisable_balance(String advisable_balance) {
        this.advisable_balance = advisable_balance;
    }

    public String getAssure_net_asset() {
        return assure_net_asset;
    }

    public void setAssure_net_asset(String assure_net_asset) {
        this.assure_net_asset = assure_net_asset;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getIn_secu_balance() {
        return in_secu_balance;
    }

    public void setIn_secu_balance(String in_secu_balance) {
        this.in_secu_balance = in_secu_balance;
    }

    public String getOut_secu_balance() {
        return out_secu_balance;
    }

    public void setOut_secu_balance(String out_secu_balance) {
        this.out_secu_balance = out_secu_balance;
    }

    public String getIn_deposit_balance() {
        return in_deposit_balance;
    }

    public void setIn_deposit_balance(String in_deposit_balance) {
        this.in_deposit_balance = in_deposit_balance;
    }

    public String getOut_deposit_balance() {
        return out_deposit_balance;
    }

    public void setOut_deposit_balance(String out_deposit_balance) {
        this.out_deposit_balance = out_deposit_balance;
    }

    public String getAsset_change_rate() {
        return asset_change_rate;
    }

    public void setAsset_change_rate(String asset_change_rate) {
        this.asset_change_rate = asset_change_rate;
    }

    public String getBonus_in() {
        return bonus_in;
    }

    public void setBonus_in(String bonus_in) {
        this.bonus_in = bonus_in;
    }

    public String getHk_balance() {
        return hk_balance;
    }

    public void setHk_balance(String hk_balance) {
        this.hk_balance = hk_balance;
    }

    public String getSh_a_balance() {
        return sh_a_balance;
    }

    public void setSh_a_balance(String sh_a_balance) {
        this.sh_a_balance = sh_a_balance;
    }

    public String getSh_b_balance() {
        return sh_b_balance;
    }

    public void setSh_b_balance(String sh_b_balance) {
        this.sh_b_balance = sh_b_balance;
    }

    public String getSz_a_balance() {
        return sz_a_balance;
    }

    public void setSz_a_balance(String sz_a_balance) {
        this.sz_a_balance = sz_a_balance;
    }

    public String getSz_b_balance() {
        return sz_b_balance;
    }

    public void setSz_b_balance(String sz_b_balance) {
        this.sz_b_balance = sz_b_balance;
    }

    public String getStb_balance() {
        return stb_balance;
    }

    public void setStb_balance(String stb_balance) {
        this.stb_balance = stb_balance;
    }

    public String getGem_balance() {
        return gem_balance;
    }

    public void setGem_balance(String gem_balance) {
        this.gem_balance = gem_balance;
    }

    public String getSh_fund_balance() {
        return sh_fund_balance;
    }

    public void setSh_fund_balance(String sh_fund_balance) {
        this.sh_fund_balance = sh_fund_balance;
    }

    public String getSz_fund_balance() {
        return sz_fund_balance;
    }

    public void setSz_fund_balance(String sz_fund_balance) {
        this.sz_fund_balance = sz_fund_balance;
    }

    public String getBond_balance() {
        return bond_balance;
    }

    public void setBond_balance(String bond_balance) {
        this.bond_balance = bond_balance;
    }

    public String getAssure_asset() {
        return assure_asset;
    }

    public void setAssure_asset(String assure_asset) {
        this.assure_asset = assure_asset;
    }

    public String getAssure_capital_balance() {
        return assure_capital_balance;
    }

    public void setAssure_capital_balance(String assure_capital_balance) {
        this.assure_capital_balance = assure_capital_balance;
    }

    public String getAssure_secu_balance() {
        return assure_secu_balance;
    }

    public void setAssure_secu_balance(String assure_secu_balance) {
        this.assure_secu_balance = assure_secu_balance;
    }

    public String getCapital_balance() {
        return capital_balance;
    }

    public void setCapital_balance(String capital_balance) {
        this.capital_balance = capital_balance;
    }

    public String getIn_limit_sale_balance() {
        return in_limit_sale_balance;
    }

    public void setIn_limit_sale_balance(String in_limit_sale_balance) {
        this.in_limit_sale_balance = in_limit_sale_balance;
    }

    public String getOut_limit_sale_balance() {
        return out_limit_sale_balance;
    }

    public void setOut_limit_sale_balance(String out_limit_sale_balance) {
        this.out_limit_sale_balance = out_limit_sale_balance;
    }

    public String getAvg_deposit_balance() {
        return avg_deposit_balance;
    }

    public void setAvg_deposit_balance(String avg_deposit_balance) {
        this.avg_deposit_balance = avg_deposit_balance;
    }

    public String getAvg_assure_asset() {
        return avg_assure_asset;
    }

    public void setAvg_assure_asset(String avg_assure_asset) {
        this.avg_assure_asset = avg_assure_asset;
    }

    public String getAvg_asset() {
        return avg_asset;
    }

    public void setAvg_asset(String avg_asset) {
        this.avg_asset = avg_asset;
    }

    public String getAsset_change_rate_over_month() {
        return asset_change_rate_over_month;
    }

    public void setAsset_change_rate_over_month(String asset_change_rate_over_month) {
        this.asset_change_rate_over_month = asset_change_rate_over_month;
    }

    public String getAll_avg_asset() {
        return all_avg_asset;
    }

    public void setAll_avg_asset(String all_avg_asset) {
        this.all_avg_asset = all_avg_asset;
    }

    public String getAll_in_balance() {
        return all_in_balance;
    }

    public void setAll_in_balance(String all_in_balance) {
        this.all_in_balance = all_in_balance;
    }

    public String getAll_out_balance() {
        return all_out_balance;
    }

    public void setAll_out_balance(String all_out_balance) {
        this.all_out_balance = all_out_balance;
    }

    public String getAll_store_in_capital_balance() {
        return all_store_in_capital_balance;
    }

    public void setAll_store_in_capital_balance(String all_store_in_capital_balance) {
        this.all_store_in_capital_balance = all_store_in_capital_balance;
    }

    public String getAll_take_out_capital_balance() {
        return all_take_out_capital_balance;
    }

    public void setAll_take_out_capital_balance(String all_take_out_capital_balance) {
        this.all_take_out_capital_balance = all_take_out_capital_balance;
    }

    public String getBranch_no() {
        return branch_no;
    }

    public void setBranch_no(String branch_no) {
        this.branch_no = branch_no;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public String getCust_no() {
        return cust_no;
    }

    public void setCust_no(String cust_no) {
        this.cust_no = cust_no;
    }

    public String getStock_account() {
        return stock_account;
    }

    public void setStock_account(String stock_account) {
        this.stock_account = stock_account;
    }

    public String getOpen_date() {
        return open_date;
    }

    public void setOpen_date(String open_date) {
        this.open_date = open_date;
    }

    public String getCust_name() {
        return cust_name;
    }

    public void setCust_name(String cust_name) {
        this.cust_name = cust_name;
    }

    public String getStock_code() {
        return stock_code;
    }

    public void setStock_code(String stock_code) {
        this.stock_code = stock_code;
    }

    public String getStock_name() {
        return stock_name;
    }

    public void setStock_name(String stock_name) {
        this.stock_name = stock_name;
    }

    public String getStock_num() {
        return stock_num;
    }

    public void setStock_num(String stock_num) {
        this.stock_num = stock_num;
    }

    public String getChange_stock_num() {
        return change_stock_num;
    }

    public void setChange_stock_num(String change_stock_num) {
        this.change_stock_num = change_stock_num;
    }

    public String getChange_stock_amount() {
        return change_stock_amount;
    }

    public void setChange_stock_amount(String change_stock_amount) {
        this.change_stock_amount = change_stock_amount;
    }

    public String getStock_amount() {
        return stock_amount;
    }

    public void setStock_amount(String stock_amount) {
        this.stock_amount = stock_amount;
    }

    public String getAvg_stock_amount() {
        return avg_stock_amount;
    }

    public void setAvg_stock_amount(String avg_stock_amount) {
        this.avg_stock_amount = avg_stock_amount;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getEffect_date() {
        return effect_date;
    }

    public void setEffect_date(String effect_date) {
        this.effect_date = effect_date;
    }

    public String getCust_status() {
        return cust_status;
    }

    public void setCust_status(String cust_status) {
        this.cust_status = cust_status;
    }

    public String getFare_ratio() {
        return fare_ratio;
    }

    public void setFare_ratio(String fare_ratio) {
        this.fare_ratio = fare_ratio;
    }

    public String getAsset_ratio() {
        return asset_ratio;
    }

    public void setAsset_ratio(String asset_ratio) {
        this.asset_ratio = asset_ratio;
    }

    public String getAmount_ratio() {
        return amount_ratio;
    }

    public void setAmount_ratio(String amount_ratio) {
        this.amount_ratio = amount_ratio;
    }

    public String getCoop_fare_ratio_sum() {
        return coop_fare_ratio_sum;
    }

    public void setCoop_fare_ratio_sum(String coop_fare_ratio_sum) {
        this.coop_fare_ratio_sum = coop_fare_ratio_sum;
    }

    public String getCoop_asset_ratio_sum() {
        return coop_asset_ratio_sum;
    }

    public void setCoop_asset_ratio_sum(String coop_asset_ratio_sum) {
        this.coop_asset_ratio_sum = coop_asset_ratio_sum;
    }

    public String getCoop_amount_ratio_sum() {
        return coop_amount_ratio_sum;
    }

    public void setCoop_amount_ratio_sum(String coop_amount_ratio_sum) {
        this.coop_amount_ratio_sum = coop_amount_ratio_sum;
    }

    public String getCoop_branch_name() {
        return coop_branch_name;
    }

    public void setCoop_branch_name(String coop_branch_name) {
        this.coop_branch_name = coop_branch_name;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getCoop_fare_ratio() {
        return coop_fare_ratio;
    }

    public void setCoop_fare_ratio(String coop_fare_ratio) {
        this.coop_fare_ratio = coop_fare_ratio;
    }

    public String getCoop_asset_ratio() {
        return coop_asset_ratio;
    }

    public void setCoop_asset_ratio(String coop_asset_ratio) {
        this.coop_asset_ratio = coop_asset_ratio;
    }

    public String getCoop_amount_ratio() {
        return coop_amount_ratio;
    }

    public void setCoop_amount_ratio(String coop_amount_ratio) {
        this.coop_amount_ratio = coop_amount_ratio;
    }

    public List<Map<String, String>> getCoop_branch_list() {
        return coop_branch_list;
    }

    public void setCoop_branch_list(List<Map<String, String>> coop_branch_list) {
        this.coop_branch_list = coop_branch_list;
    }

    public String getAsset_exclude_finance_avg() {
        return asset_exclude_finance_avg;
    }

    public void setAsset_exclude_finance_avg(String asset_exclude_finance_avg) {
        this.asset_exclude_finance_avg = asset_exclude_finance_avg;
    }

    public String getOpen_way() {
        return open_way;
    }

    public void setOpen_way(String open_way) {
        this.open_way = open_way;
    }

    public String getInner_trans_mark() {
        return inner_trans_mark;
    }

    public void setInner_trans_mark(String inner_trans_mark) {
        this.inner_trans_mark = inner_trans_mark;
    }

    public String getLimit_sale_mark() {
        return limit_sale_mark;
    }

    public void setLimit_sale_mark(String limit_sale_mark) {
        this.limit_sale_mark = limit_sale_mark;
    }

    public String getReward_mark() {
        return reward_mark;
    }

    public void setReward_mark(String reward_mark) {
        this.reward_mark = reward_mark;
    }

    public String getCoop_mark() {
        return coop_mark;
    }

    public void setCoop_mark(String coop_mark) {
        this.coop_mark = coop_mark;
    }

    public String getAvg_asset_section_name() {
        return avg_asset_section_name;
    }

    public void setAvg_asset_section_name(String avg_asset_section_name) {
        this.avg_asset_section_name = avg_asset_section_name;
    }

    public String getCust_num() {
        return cust_num;
    }

    public void setCust_num(String cust_num) {
        this.cust_num = cust_num;
    }

    public String getAll_cust_num() {
        return all_cust_num;
    }

    public void setAll_cust_num(String all_cust_num) {
        this.all_cust_num = all_cust_num;
    }

    public String getCust_proportion() {
        return cust_proportion;
    }

    public void setCust_proportion(String cust_proportion) {
        this.cust_proportion = cust_proportion;
    }

    public String getAll_asset() {
        return all_asset;
    }

    public void setAll_asset(String all_asset) {
        this.all_asset = all_asset;
    }

    public String getAsset_proportion() {
        return asset_proportion;
    }

    public void setAsset_proportion(String asset_proportion) {
        this.asset_proportion = asset_proportion;
    }

    public String getCommission_proportion() {
        return commission_proportion;
    }

    public void setCommission_proportion(String commission_proportion) {
        this.commission_proportion = commission_proportion;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getAll_amount() {
        return all_amount;
    }

    public void setAll_amount(String all_amount) {
        this.all_amount = all_amount;
    }

    public String getAmount_proportion() {
        return amount_proportion;
    }

    public void setAmount_proportion(String amount_proportion) {
        this.amount_proportion = amount_proportion;
    }

    public String getLimit_sale_stock_balance() {
        return limit_sale_stock_balance;
    }

    public void setLimit_sale_stock_balance(String limit_sale_stock_balance) {
        this.limit_sale_stock_balance = limit_sale_stock_balance;
    }

    public String getMargin_amount() {
        return margin_amount;
    }

    public void setMargin_amount(String margin_amount) {
        this.margin_amount = margin_amount;
    }

    public String getAssure_amount() {
        return assure_amount;
    }

    public void setAssure_amount(String assure_amount) {
        this.assure_amount = assure_amount;
    }

    public String getCredit_amount() {
        return credit_amount;
    }

    public void setCredit_amount(String credit_amount) {
        this.credit_amount = credit_amount;
    }

    public String getCommission() {
        return commission;
    }

    public void setCommission(String commission) {
        this.commission = commission;
    }

    public String getAssure_commission() {
        return assure_commission;
    }

    public void setAssure_commission(String assure_commission) {
        this.assure_commission = assure_commission;
    }

    public String getCredit_commission() {
        return credit_commission;
    }

    public void setCredit_commission(String credit_commission) {
        this.credit_commission = credit_commission;
    }

    public String getNet_commission() {
        return net_commission;
    }

    public void setNet_commission(String net_commission) {
        this.net_commission = net_commission;
    }

    public String getAssure_net_commission() {
        return assure_net_commission;
    }

    public void setAssure_net_commission(String assure_net_commission) {
        this.assure_net_commission = assure_net_commission;
    }

    public String getCredit_net_commission() {
        return credit_net_commission;
    }

    public void setCredit_net_commission(String credit_net_commission) {
        this.credit_net_commission = credit_net_commission;
    }

    public String getMarketing_staff_commission() {
        return marketing_staff_commission;
    }

    public void setMarketing_staff_commission(String marketing_staff_commission) {
        this.marketing_staff_commission = marketing_staff_commission;
    }

    public String getStock_rate() {
        return stock_rate;
    }

    public void setStock_rate(String stock_rate) {
        this.stock_rate = stock_rate;
    }

    public String getOpen_cust_num() {
        return open_cust_num;
    }

    public void setOpen_cust_num(String open_cust_num) {
        this.open_cust_num = open_cust_num;
    }

    public String getFinance_debit_balance_avg() {
        return finance_debit_balance_avg;
    }

    public void setFinance_debit_balance_avg(String finance_debit_balance_avg) {
        this.finance_debit_balance_avg = finance_debit_balance_avg;
    }

    public String getSecurity_debit_amount_avg() {
        return security_debit_amount_avg;
    }

    public void setSecurity_debit_amount_avg(String security_debit_amount_avg) {
        this.security_debit_amount_avg = security_debit_amount_avg;
    }

    public String getDebit_balance_avg() {
        return debit_balance_avg;
    }

    public void setDebit_balance_avg(String debit_balance_avg) {
        this.debit_balance_avg = debit_balance_avg;
    }

    public String getAsset_balance_avg() {
        return asset_balance_avg;
    }

    public void setAsset_balance_avg(String asset_balance_avg) {
        this.asset_balance_avg = asset_balance_avg;
    }

    public String getFinance_debit_balance_close() {
        return finance_debit_balance_close;
    }

    public void setFinance_debit_balance_close(String finance_debit_balance_close) {
        this.finance_debit_balance_close = finance_debit_balance_close;
    }

    public String getSecurity_debit_amount_close() {
        return security_debit_amount_close;
    }

    public void setSecurity_debit_amount_close(String security_debit_amount_close) {
        this.security_debit_amount_close = security_debit_amount_close;
    }

    public String getDebit_balance_close() {
        return debit_balance_close;
    }

    public void setDebit_balance_close(String debit_balance_close) {
        this.debit_balance_close = debit_balance_close;
    }

    public String getAsset_balance_close() {
        return asset_balance_close;
    }

    public void setAsset_balance_close(String asset_balance_close) {
        this.asset_balance_close = asset_balance_close;
    }

    public String getMargin_amount_y() {
        return margin_amount_y;
    }

    public void setMargin_amount_y(String margin_amount_y) {
        this.margin_amount_y = margin_amount_y;
    }

    public String getAssure_amount_y() {
        return assure_amount_y;
    }

    public void setAssure_amount_y(String assure_amount_y) {
        this.assure_amount_y = assure_amount_y;
    }

    public String getCredit_amount_y() {
        return credit_amount_y;
    }

    public void setCredit_amount_y(String credit_amount_y) {
        this.credit_amount_y = credit_amount_y;
    }

    public String getCommission_y() {
        return commission_y;
    }

    public void setCommission_y(String commission_y) {
        this.commission_y = commission_y;
    }

    public String getAssure_commission_y() {
        return assure_commission_y;
    }

    public void setAssure_commission_y(String assure_commission_y) {
        this.assure_commission_y = assure_commission_y;
    }

    public String getCredit_commission_y() {
        return credit_commission_y;
    }

    public void setCredit_commission_y(String credit_commission_y) {
        this.credit_commission_y = credit_commission_y;
    }

    public String getNet_commission_y() {
        return net_commission_y;
    }

    public void setNet_commission_y(String net_commission_y) {
        this.net_commission_y = net_commission_y;
    }

    public String getAssure_net_commission_y() {
        return assure_net_commission_y;
    }

    public void setAssure_net_commission_y(String assure_net_commission_y) {
        this.assure_net_commission_y = assure_net_commission_y;
    }

    public String getCredit_net_commission_y() {
        return credit_net_commission_y;
    }

    public void setCredit_net_commission_y(String credit_net_commission_y) {
        this.credit_net_commission_y = credit_net_commission_y;
    }

    public String getMarketing_staff_commission_y() {
        return marketing_staff_commission_y;
    }

    public void setMarketing_staff_commission_y(String marketing_staff_commission_y) {
        this.marketing_staff_commission_y = marketing_staff_commission_y;
    }

    public String getStock_rate_y() {
        return stock_rate_y;
    }

    public void setStock_rate_y(String stock_rate_y) {
        this.stock_rate_y = stock_rate_y;
    }

    public String getOpen_cust_num_y() {
        return open_cust_num_y;
    }

    public void setOpen_cust_num_y(String open_cust_num_y) {
        this.open_cust_num_y = open_cust_num_y;
    }

    public String getFinance_debit_balance_avg_y() {
        return finance_debit_balance_avg_y;
    }

    public void setFinance_debit_balance_avg_y(String finance_debit_balance_avg_y) {
        this.finance_debit_balance_avg_y = finance_debit_balance_avg_y;
    }

    public String getSecurity_debit_amount_avg_y() {
        return security_debit_amount_avg_y;
    }

    public void setSecurity_debit_amount_avg_y(String security_debit_amount_avg_y) {
        this.security_debit_amount_avg_y = security_debit_amount_avg_y;
    }

    public String getDebit_balance_avg_y() {
        return debit_balance_avg_y;
    }

    public void setDebit_balance_avg_y(String debit_balance_avg_y) {
        this.debit_balance_avg_y = debit_balance_avg_y;
    }

    public String getAsset_balance_avg_y() {
        return asset_balance_avg_y;
    }

    public void setAsset_balance_avg_y(String asset_balance_avg_y) {
        this.asset_balance_avg_y = asset_balance_avg_y;
    }

    public String getOpen_cust_num_total() {
        return open_cust_num_total;
    }

    public void setOpen_cust_num_total(String open_cust_num_total) {
        this.open_cust_num_total = open_cust_num_total;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public String getFund_amount() {
        return fund_amount;
    }

    public void setFund_amount(String fund_amount) {
        this.fund_amount = fund_amount;
    }

    public String getWarrants_amount() {
        return warrants_amount;
    }

    public void setWarrants_amount(String warrants_amount) {
        this.warrants_amount = warrants_amount;
    }

    public String getSfw_amount() {
        return sfw_amount;
    }

    public void setSfw_amount(String sfw_amount) {
        this.sfw_amount = sfw_amount;
    }

    public String getSf_amount() {
        return sf_amount;
    }

    public void setSf_amount(String sf_amount) {
        this.sf_amount = sf_amount;
    }

    public String getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(String total_amount) {
        this.total_amount = total_amount;
    }

    public String getTotal_commission() {
        return total_commission;
    }

    public void setTotal_commission(String total_commission) {
        this.total_commission = total_commission;
    }

    public String getTotal_net_commission() {
        return total_net_commission;
    }

    public void setTotal_net_commission(String total_net_commission) {
        this.total_net_commission = total_net_commission;
    }

    public String getAvialable_balance_avg() {
        return avialable_balance_avg;
    }

    public void setAvialable_balance_avg(String avialable_balance_avg) {
        this.avialable_balance_avg = avialable_balance_avg;
    }

    public String getSecurity_amount_avg() {
        return security_amount_avg;
    }

    public void setSecurity_amount_avg(String security_amount_avg) {
        this.security_amount_avg = security_amount_avg;
    }

    public String getAsset_avg() {
        return asset_avg;
    }

    public void setAsset_avg(String asset_avg) {
        this.asset_avg = asset_avg;
    }

    public String getAssure_cash_avg() {
        return assure_cash_avg;
    }

    public void setAssure_cash_avg(String assure_cash_avg) {
        this.assure_cash_avg = assure_cash_avg;
    }

    public String getAssure_stock_amount_avg() {
        return assure_stock_amount_avg;
    }

    public void setAssure_stock_amount_avg(String assure_stock_amount_avg) {
        this.assure_stock_amount_avg = assure_stock_amount_avg;
    }

    public String getDebit_avg() {
        return debit_avg;
    }

    public void setDebit_avg(String debit_avg) {
        this.debit_avg = debit_avg;
    }

    public String getAvialable_balance_close() {
        return avialable_balance_close;
    }

    public void setAvialable_balance_close(String avialable_balance_close) {
        this.avialable_balance_close = avialable_balance_close;
    }

    public String getSecurity_amount_close() {
        return security_amount_close;
    }

    public void setSecurity_amount_close(String security_amount_close) {
        this.security_amount_close = security_amount_close;
    }

    public String getAsset_close() {
        return asset_close;
    }

    public void setAsset_close(String asset_close) {
        this.asset_close = asset_close;
    }

    public String getAssure_cash_close() {
        return assure_cash_close;
    }

    public void setAssure_cash_close(String assure_cash_close) {
        this.assure_cash_close = assure_cash_close;
    }

    public String getAssure_stock_amount_close() {
        return assure_stock_amount_close;
    }

    public void setAssure_stock_amount_close(String assure_stock_amount_close) {
        this.assure_stock_amount_close = assure_stock_amount_close;
    }

    public String getDebit_close() {
        return debit_close;
    }

    public void setDebit_close(String debit_close) {
        this.debit_close = debit_close;
    }

    public String getAssure_close() {
        return assure_close;
    }

    public void setAssure_close(String assure_close) {
        this.assure_close = assure_close;
    }

    public String getB_stock_amount() {
        return b_stock_amount;
    }

    public void setB_stock_amount(String b_stock_amount) {
        this.b_stock_amount = b_stock_amount;
    }

    public String getB_stock_commission() {
        return b_stock_commission;
    }

    public void setB_stock_commission(String b_stock_commission) {
        this.b_stock_commission = b_stock_commission;
    }

    public String getB_stock_net_commission() {
        return b_stock_net_commission;
    }

    public void setB_stock_net_commission(String b_stock_net_commission) {
        this.b_stock_net_commission = b_stock_net_commission;
    }

    public String getH_stock_amount() {
        return h_stock_amount;
    }

    public void setH_stock_amount(String h_stock_amount) {
        this.h_stock_amount = h_stock_amount;
    }

    public String getH_stock_commission() {
        return h_stock_commission;
    }

    public void setH_stock_commission(String h_stock_commission) {
        this.h_stock_commission = h_stock_commission;
    }

    public String getH_stock_net_commission() {
        return h_stock_net_commission;
    }

    public void setH_stock_net_commission(String h_stock_net_commission) {
        this.h_stock_net_commission = h_stock_net_commission;
    }

    public String getStock_commission() {
        return stock_commission;
    }

    public void setStock_commission(String stock_commission) {
        this.stock_commission = stock_commission;
    }

    public String getSf_commission() {
        return sf_commission;
    }

    public void setSf_commission(String sf_commission) {
        this.sf_commission = sf_commission;
    }

    public String getStock_commission_with_margin() {
        return stock_commission_with_margin;
    }

    public void setStock_commission_with_margin(String stock_commission_with_margin) {
        this.stock_commission_with_margin = stock_commission_with_margin;
    }

    public String getStock_amount_with_margin() {
        return stock_amount_with_margin;
    }

    public void setStock_amount_with_margin(String stock_amount_with_margin) {
        this.stock_amount_with_margin = stock_amount_with_margin;
    }

    public String getSf_commission_with_margin() {
        return sf_commission_with_margin;
    }

    public void setSf_commission_with_margin(String sf_commission_with_margin) {
        this.sf_commission_with_margin = sf_commission_with_margin;
    }

    public String getSf_amount_with_margin() {
        return sf_amount_with_margin;
    }

    public void setSf_amount_with_margin(String sf_amount_with_margin) {
        this.sf_amount_with_margin = sf_amount_with_margin;
    }

    public String getPurchase_amount() {
        return purchase_amount;
    }

    public void setPurchase_amount(String purchase_amount) {
        this.purchase_amount = purchase_amount;
    }

    public String getRedemption_amount() {
        return redemption_amount;
    }

    public void setRedemption_amount(String redemption_amount) {
        this.redemption_amount = redemption_amount;
    }

    public String getMinus_amount() {
        return minus_amount;
    }

    public void setMinus_amount(String minus_amount) {
        this.minus_amount = minus_amount;
    }

    public String getBank_in() {
        return bank_in;
    }

    public void setBank_in(String bank_in) {
        this.bank_in = bank_in;
    }

    public String getBank_out() {
        return bank_out;
    }

    public void setBank_out(String bank_out) {
        this.bank_out = bank_out;
    }

    public String getBank_sum() {
        return bank_sum;
    }

    public void setBank_sum(String bank_sum) {
        this.bank_sum = bank_sum;
    }

    public String getSecu_in() {
        return secu_in;
    }

    public void setSecu_in(String secu_in) {
        this.secu_in = secu_in;
    }

    public String getSecu_out() {
        return secu_out;
    }

    public void setSecu_out(String secu_out) {
        this.secu_out = secu_out;
    }

    public String getSecu_sum() {
        return secu_sum;
    }

    public void setSecu_sum(String secu_sum) {
        this.secu_sum = secu_sum;
    }

    public String getReverse_in() {
        return reverse_in;
    }

    public void setReverse_in(String reverse_in) {
        this.reverse_in = reverse_in;
    }

    public String getReverse_out() {
        return reverse_out;
    }

    public void setReverse_out(String reverse_out) {
        this.reverse_out = reverse_out;
    }

    public String getReverse_sum() {
        return reverse_sum;
    }

    public void setReverse_sum(String reverse_sum) {
        this.reverse_sum = reverse_sum;
    }

    public String getFin_product_in() {
        return fin_product_in;
    }

    public void setFin_product_in(String fin_product_in) {
        this.fin_product_in = fin_product_in;
    }

    public String getFin_product_out() {
        return fin_product_out;
    }

    public void setFin_product_out(String fin_product_out) {
        this.fin_product_out = fin_product_out;
    }

    public String getFin_product_sum() {
        return fin_product_sum;
    }

    public void setFin_product_sum(String fin_product_sum) {
        this.fin_product_sum = fin_product_sum;
    }

    public String getOther_business() {
        return other_business;
    }

    public void setOther_business(String other_business) {
        this.other_business = other_business;
    }

    public String getNet_redemption() {
        return net_redemption;
    }

    public void setNet_redemption(String net_redemption) {
        this.net_redemption = net_redemption;
    }

    public String getId_no() {
        return id_no;
    }

    public void setId_no(String id_no) {
        this.id_no = id_no;
    }

    public String getStock_commission_rate() {
        return stock_commission_rate;
    }

    public void setStock_commission_rate(String stock_commission_rate) {
        this.stock_commission_rate = stock_commission_rate;
    }

    public String getMargin_trade_balance() {
        return margin_trade_balance;
    }

    public void setMargin_trade_balance(String margin_trade_balance) {
        this.margin_trade_balance = margin_trade_balance;
    }

    public String getMargin_trade_interest_expense() {
        return margin_trade_interest_expense;
    }

    public void setMargin_trade_interest_expense(String margin_trade_interest_expense) {
        this.margin_trade_interest_expense = margin_trade_interest_expense;
    }

    public String getCommon_stock_commission() {
        return common_stock_commission;
    }

    public void setCommon_stock_commission(String common_stock_commission) {
        this.common_stock_commission = common_stock_commission;
    }

    public String getOpen_fund_commission() {
        return open_fund_commission;
    }

    public void setOpen_fund_commission(String open_fund_commission) {
        this.open_fund_commission = open_fund_commission;
    }

	public String getAll_other_commission() {
		return all_other_commission;
	}

	public void setAll_other_commission(String all_other_commission) {
		this.all_other_commission = all_other_commission;
	}

	public String getOther_commission() {
		return other_commission;
	}

	public void setOther_commission(String other_commission) {
		this.other_commission = other_commission;
	}
    
}
