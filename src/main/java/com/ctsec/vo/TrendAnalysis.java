package com.ctsec.vo;

/**
 * 趋势分析统一类
 *
 * Created by luchisheng on 2017/11/28.
 */
public class TrendAnalysis {

    /**
     * 月份
     */
    private String month_id;

    /**
     * 以下为业务绩效字段
     */

    /**
     * 单月公司代理买卖交易量
     */
    private String buy_sell_amount;

    /**
     * 单月公司代理买卖交易量环比
     */
    private String buy_sell_amount_rate;

    /**
     * 单月公司市场占有率（浙江）
     */
    private String buy_sell_rate_zhejiang;

    /**
     * 累计公司市场占有率（浙江）
     */
    private String buy_sell_rate_zhejiang_sum;

    /**
     * 单月公司市场占有率（全国）/ 代理买卖市占率
     */
    private String buy_sell_market_rate;

    /**
     * 累计公司市场占有率（全国）
     */
    private String buy_sell_market_rate_sum;

    /**
     * 两融交易市占率
     */
    private String margin_trading_market_rate;

    /**
     * 两融交易市占率环比
     */
    private String margin_trading_market_rate_mom;

    /**
     * 总交易量市占率
     */
    private String all_trading_market_rate;

    /**
     * 总交易量市占率环比
     */
    private String all_trading_market_rate_mom;

    /**
     * 股票交易费率
     */
    private String stock_trading_fee_rate;

    /**
     * 信用交易费率
     */
    private String margin_trading_fee_rate;

    /**
     * 净佣金费率（公司）
     */
    private String ctzq_net_commission_fee_rate;

    /**
     * 净佣金费率（行业）
     */
    private String market_net_commission_fee_rate;

    /**
     * 两融余额（亿元）
     */
    private String margin_trading_balance;

    /**
     * 两融余额环比
     */
    private String margin_trading_balance_mom;

    /**
     * 两融余额同比
     */
    private String margin_trading_balance_yoy;

    /**
     * 分公司名称
     */
    private String branch_name;

    /**
     * 考核市占率
     */
    private String market_rate;

    /**
     * 达成率
     */
    private String market_rate_complete_rate;

    /**
     * 考核利润（万元） / 累计考核利润（万元）
     */
    private String profit;

    /**
     * 利润达成率
     */
    private String profit_complete_rate;

    /**
     * 省
     */
    private String province;

    /**
     * 市
     */
    private String city;

    /**
     * 经度
     */
    private String lat;

    /**
     * 纬度
     */
    private String lng;

    /**
     * 交易量（万元）
     */
    private String trade_amount;

    /**
     * 累计考核收入（万元）
     */
    private String kpi_income;

    /**
     * 证券名称
     */
    private String secu_name;

    /**
     * 排名（序号）
     */
    private String market_rank;

    /**
     * 交易额（亿元）
     */
    private String secu_amount;

    /**
     * 交易占比（%）
     */
    private String secu_rate;

    /**
     * 交易量环比（%）
     */
    private String secu_rate_mom;

    /**
     * 累计交易额（亿元）
     */
    private String all_secu_amount;

    /**
     * 累计交易占比（%）
     */
    private String all_secu_rate;

    /**
     * 累计交易同比
     */
    private String all_secu_rate_yoy;

    /**
     * 排名变化环比
     */
    private String market_rank_change;

    /**
     * 排名变化同比
     */
    private String market_rank_change_yoy;

    /**
     * 以下为收入支出字段
     */

    /**
     * 代理买卖净收入（千万）
     */
    private String buy_sell_net_income;

    /**
     * 排名
     */
    private String buy_sell_rank;

    /**
     * 排名标签
     */
    private String buy_sell_rank_label;

    /**
     * 手续费及佣金收入万元)
     */
    private String broker_fee_commission_income;

    /**
     * 利息净收入
     */
    private String broker_interest_income;

    /**
     * 两融息费收入 / 两融余额息费分成
     */
    private String margin_trading_balance_divid;

    /**
     * 综合业务收入
     */
    private String broker_inte_service_income;

    /**
     * 手续费及佣金收入占比
     */
    private String broker_fee_commission_income_rate;

    /**
     * 利息净收入占比
     */
    private String broker_interest_income_rate;

    /**
     * 两融息费收入占比
     */
    private String margin_trading_balance_divid_rate;

    /**
     *  综合业务收入占比
     */
    private String broker_inte_service_income_rate;

    /**
     * 手续费及佣金收入环比
     */
    private String broker_fee_commission_income_mom;

    /**
     * 两融余额息费分成环比
     */
    private String margin_trading_balance_divid_mom;

    /**
     * 累计两融余额息费分成
     */
    private String margin_trading_balance_divid_sum;

    /**
     * 累计两融余额息费分成同比
     */
    private String margin_trading_balance_divid_sum_yoy;

    /**
     * 当月营业支出
     */
    private String all_expenses;

    /**
     * 当月营业支出环比
     */
    private String all_expenses_mom;

    /**
     * 营业税金及附加
     */
    private String taxes_expenses;

    /**
     * 营业税金及附加环比
     */
    private String taxes_expenses_mom;

    /**
     * 投资者保护基金
     */
    private String protection_fund_expenses;

    /**
     * 投资者保护基金环比
     */
    private String protection_fund_expenses_mom;

    /**
     * 业务及管理费
     */
    private String management_fee_expenses;

    /**
     * 业务及管理费环
     */
    private String management_fee_expenses_mom;

    /**
     * 固定费用
     */
    private String fixed_expenses;

    /**
     * 固定费用环比
     */
    private String fixed_expenses_mom;

    /**
     * 变动费用
     */
    private String change_expenses;

    /**
     * 变动费用环比
     */
    private String change_expenses_mom;

    /**
     * 人力成本
     */
    private String hr_expenses;

    /**
     * 人力成本环比
     */
    private String hr_expenses_mom;

    /**
     * 当月考核利润
     */
    private String broker_profit_goal;

    /**
     * 当月总共利润
     */
    private String broker_profit;

    /**
     * 当月考核利润环比
     */
    private String broker_profit_goal_mom;

    /**
     * 年累计考核利润
     */
    private String broker_profit_goal_sum;

    /**
     * 年累计考核利润指标
     */
    private String broker_profit_index_goal_sum;

    /**
     * 年累计达成率
     */
    private String broker_profit_goal_rate;

    /**
     * 中心类考核利润
     */
    private String center_branch_profit;

    /**
     * A类考核利润
     */
    private String a_branch_profit;

    /**
     * B类考核利润
     */
    private String b_branch_profit;

    /**
     * C类考核利润
     */
    private String c_branch_profit;

    /**
     * D类考核利润
     */
    private String d_branch_profit;

    /**
     * X类考核利润
     */
    private String x_branch_profit;

    /**
     * 二级网点考核利润
     */
    private String second_branch_profit;

    /**
     * 中心类考核市占率
     */
    private String center_branch_market_rate;

    /**
     * A类考核市占率
     */
    private String a_branch_market_rate;

    /**
     * B类考核市占率
     */
    private String b_branch_market_rate;

    /**
     * C类考核市占率
     */
    private String c_branch_market_rate;

    /**
     * D类考核市占率
     */
    private String d_branch_market_rate;

    /**
     * X类考核市占率
     */
    private String x_branch_market_rate;

    /**
     * 二级网点考核市占率
     */
    private String second_branch_market_rate;

    /**
     * 以下为客户资产字段
     */

    /**
     * 单月客户资产
     */
    private String asset;

    /**
     * 单月客户资产环比%
     */
    private String asset_mom;

    /**
     * 单月市场规模（千亿）
     */
    private String market_balance;

    /**
     * 单月市场环比%
     */
    private String market_balance_mom;

    /**
     * 单月客户持仓（亿）
     */
    private String assecu_balance;

    /**
     * 单月客户市值环比%
     */
    private String secu_balance_mom;

    /**
     * 客户业务类型 客户资产结构
     */
    private String businessflag_name;

    /**
     * 当月净转入资金(百万)
     */
    private String in_capital;

    /**
     * 本年累计净转入资金(百万)
     */
    private String in_capital_sum;

    /**
     * 当月净转入市值（百万）
     */
    private String in_value;

    /**
     * 本年累计净转入市值（百万）
     */
    private String in_value_sum;

    /**
     * 客户数
     */
    private String cust_num;

    /**
     * 公司新增开户数
     */
    private String new_custom;

    /**
     * 全国占比
     */
    private String new_custom_market_rate;

    /**
     * 去年公司累计新增开户数
     */
    private String new_custom_sum_ly;

    /**
     * 去年累计全国占比
     */
    private String new_custom_market_rate_sum_ly;

    /**
     * 公司累计新增开户数
     */
    private String new_custom_sum;

    /**
     * 累计全国占比
     */
    private String new_custom_market_rate_sum;

    /**
     * 新增开户贡献资产额（亿元）
     */
    private String new_custom_asset;

    /**
     * 新增开户贡献交易佣金收入（万元）
     */
    private String new_custom_commission;

    /**
     * 去年新增开户贡献资产额累计（亿元）
     */
    private String new_custom_asset_sum_ly;

    /**
     * 去年新增开户贡献交易佣金收入累计（万元）
     */
    private String new_custom_commission_sum_ly;

    /**
     * 新增开户贡献资产额累计（亿元）
     */
    private String new_custom_asset_sum;

    /**
     * 新增开户贡献交易佣金收入累计（万元）
     */
    private String new_custom_commission_sum;

    /**
     * 新开户数
     */
    private String open_sum;

    /**
     * 有效奖励用户数
     */
    private String reward_sum;

    /**
     * 佣金总和（万）
     */
    private String commission_sum;

    /**
     * 资产周转率
     */
    private String asset_turnover_rate;

    /**
     * 累计资产周转率
     */
    private String asset_turnover_rate_sum;

    /**
     * 资产保值率
     */
    private String asset_hedge_rate;

    /**
     * 累计资产保值率
     */
    private String asset_hedge_rate_sum;

    public String getByKey(String key) {
        switch (key) {
            case "buy_sell_amount":
                return this.getBuy_sell_amount();
            case "buy_sell_amount_rate":
                return this.getBuy_sell_amount_rate();
            case "buy_sell_rate_zhejiang":
                return this.getBuy_sell_rate_zhejiang();
            case "buy_sell_rate_zhejiang_sum":
                return this.getBuy_sell_rate_zhejiang_sum();
            case "buy_sell_market_rate":
                return this.getBuy_sell_market_rate();
            case "buy_sell_market_rate_sum":
                return this.getBuy_sell_market_rate_sum();
            case "margin_trading_market_rate":
                return this.getMargin_trading_market_rate();
            case "margin_trading_market_rate_mom":
                return this.getMargin_trading_market_rate_mom();
            case "all_trading_market_rate":
                return this.getAll_trading_market_rate();
            case "all_trading_market_rate_mom":
                return this.getAll_trading_market_rate_mom();
            case "stock_trading_fee_rate":
                return this.getStock_trading_fee_rate();
            case "margin_trading_fee_rate":
                return this.getMargin_trading_fee_rate();
            case "ctzq_net_commission_fee_rate":
                return this.getCtzq_net_commission_fee_rate();
            case "market_net_commission_fee_rate":
                return this.getMarket_net_commission_fee_rate();
            case "margin_trading_balance":
                return this.getMargin_trading_balance();
            case "margin_trading_balance_mom":
                return this.getMargin_trading_balance_mom();
            case "margin_trading_balance_yoy":
                return this.getMargin_trading_balance_yoy();

            case "buy_sell_net_income":
                return this.getBuy_sell_net_income();
            case "buy_sell_rank":
                return this.getBuy_sell_rank();
            case "buy_sell_rank_label":
                return this.getBuy_sell_rank_label();
            case "broker_fee_commission_income":
                return this.getBroker_fee_commission_income();
            case "broker_interest_income":
                return this.getBroker_interest_income();
            case "margin_trading_balance_divid":
                return this.getMargin_trading_balance_divid();
            case "broker_inte_service_income":
                return this.getBroker_inte_service_income();
            case "broker_fee_commission_income_rate":
                return this.getBroker_fee_commission_income_rate();
            case "broker_interest_income_rate":
                return this.getBroker_interest_income_rate();
            case "margin_trading_balance_divid_rate":
                return this.getMargin_trading_balance_divid_rate();
            case "broker_inte_service_income_rate":
                return this.getBroker_inte_service_income_rate();
            case "broker_fee_commission_income_mom":
                return this.getBroker_fee_commission_income_mom();
            case "margin_trading_balance_divid_mom":
                return this.getMargin_trading_balance_divid_mom();
            case "margin_trading_balance_divid_sum":
                return this.getMargin_trading_balance_divid_sum();
            case "margin_trading_balance_divid_sum_yoy":
                return this.getMargin_trading_balance_divid_sum_yoy();
            case "all_expenses":
                return this.getAll_expenses();
            case "all_expenses_mom":
                return this.getAll_expenses_mom();
            case "taxes_expenses":
                return this.getTaxes_expenses();
            case "taxes_expenses_mom":
                return this.getTaxes_expenses_mom();
            case "protection_fund_expenses":
                return this.getProtection_fund_expenses();
            case "protection_fund_expenses_mom":
                return this.getProtection_fund_expenses_mom();
            case "management_fee_expenses":
                return this.getManagement_fee_expenses();
            case "management_fee_expenses_mom":
                return this.getManagement_fee_expenses_mom();
            case "fixed_expenses":
                return this.getFixed_expenses();
            case "fixed_expenses_mom":
                return this.getFixed_expenses_mom();
            case "change_expenses":
                return this.getChange_expenses();
            case "change_expenses_mom":
                return this.getChange_expenses_mom();
            case "hr_expenses":
                return this.getHr_expenses();
            case "hr_expenses_mom":
                return this.getHr_expenses_mom();
            case "broker_profit_goal":
                return this.getBroker_profit_goal();
            case "broker_profit":
                return this.getBroker_profit();
            case "broker_profit_goal_mom":
                return this.getBroker_profit_goal_mom();
            case "broker_profit_goal_sum":
                return this.getBroker_profit_goal_sum();
            case "broker_profit_index_goal_sum":
                return this.getBroker_profit_index_goal_sum();
            case "broker_profit_goal_rate":
                return this.getBroker_profit_goal_rate();
            case "center_branch_profit":
                return this.getCenter_branch_profit();
            case "a_branch_profit":
                return this.getA_branch_profit();
            case "b_branch_profit":
                return this.getB_branch_profit();
            case "c_branch_profit":
                return this.getC_branch_profit();
            case "d_branch_profit":
                return this.getD_branch_profit();
            case "x_branch_profit":
                return this.getX_branch_profit();
            case "second_branch_profit":
                return this.getSecond_branch_profit();
            case "center_branch_market_rate":
                return this.getCenter_branch_market_rate();
            case "a_branch_market_rate":
                return this.getA_branch_market_rate();
            case "b_branch_market_rate":
                return this.getB_branch_market_rate();
            case "c_branch_market_rate":
                return this.getC_branch_market_rate();
            case "d_branch_market_rate":
                return this.getD_branch_market_rate();
            case "x_branch_market_rate":
                return this.getX_branch_market_rate();
            case "second_branch_market_rate":
                return this.getSecond_branch_market_rate();

            case "asset":
                return this.getAsset();
            case "asset_mom":
                return this.getAsset_mom();
            case "market_balance":
                return this.getMarket_balance();
            case "market_balance_mom":
                return this.getMarket_balance_mom();
            case "assecu_balance":
                return this.getAssecu_balance();
            case "secu_balance_mom":
                return this.getSecu_balance_mom();
            case "in_capital":
                return this.getIn_capital();
            case "in_capital_sum":
                return this.getIn_capital_sum();
            case "in_value":
                return this.getIn_value();
            case "in_value_sum":
                return this.getIn_value_sum();
            case "new_custom":
                return this.getNew_custom();
            case "new_custom_market_rate":
                return this.getNew_custom_market_rate();
            case "new_custom_sum_ly":
                return this.getNew_custom_sum_ly();
            case "new_custom_market_rate_sum_ly":
                return this.getNew_custom_market_rate_sum_ly();
            case "new_custom_sum":
                return this.getNew_custom_sum();
            case "new_custom_market_rate_sum":
                return this.getNew_custom_market_rate_sum();
            case "new_custom_asset":
                return this.getNew_custom_asset();
            case "new_custom_commission":
                return this.getNew_custom_commission();
            case "new_custom_asset_sum_ly":
                return this.getNew_custom_asset_sum_ly();
            case "new_custom_commission_sum_ly":
                return this.getNew_custom_commission_sum_ly();
            case "new_custom_asset_sum":
                return this.getNew_custom_asset_sum();
            case "new_custom_commission_sum":
                return this.getNew_custom_commission_sum();
            case "asset_turnover_rate":
                return this.getAsset_turnover_rate();
            case "asset_turnover_rate_sum":
                return this.getAsset_turnover_rate_sum();
            case "asset_hedge_rate":
                return this.getAsset_hedge_rate();
            case "asset_hedge_rate_sum":
                return this.getAsset_hedge_rate_sum();
        }
        return "";
    }

    public String getMonth_id() {
        return month_id;
    }

    public void setMonth_id(String month_id) {
        this.month_id = month_id;
    }

    public String getBuy_sell_amount() {
        return buy_sell_amount;
    }

    public void setBuy_sell_amount(String buy_sell_amount) {
        this.buy_sell_amount = buy_sell_amount;
    }

    public String getBuy_sell_amount_rate() {
        return buy_sell_amount_rate;
    }

    public void setBuy_sell_amount_rate(String buy_sell_amount_rate) {
        this.buy_sell_amount_rate = buy_sell_amount_rate;
    }

    public String getBuy_sell_rate_zhejiang() {
        return buy_sell_rate_zhejiang;
    }

    public void setBuy_sell_rate_zhejiang(String buy_sell_rate_zhejiang) {
        this.buy_sell_rate_zhejiang = buy_sell_rate_zhejiang;
    }

    public String getBuy_sell_rate_zhejiang_sum() {
        return buy_sell_rate_zhejiang_sum;
    }

    public void setBuy_sell_rate_zhejiang_sum(String buy_sell_rate_zhejiang_sum) {
        this.buy_sell_rate_zhejiang_sum = buy_sell_rate_zhejiang_sum;
    }

    public String getBuy_sell_market_rate() {
        return buy_sell_market_rate;
    }

    public void setBuy_sell_market_rate(String buy_sell_market_rate) {
        this.buy_sell_market_rate = buy_sell_market_rate;
    }

    public String getBuy_sell_market_rate_sum() {
        return buy_sell_market_rate_sum;
    }

    public void setBuy_sell_market_rate_sum(String buy_sell_market_rate_sum) {
        this.buy_sell_market_rate_sum = buy_sell_market_rate_sum;
    }

    public String getMargin_trading_market_rate() {
        return margin_trading_market_rate;
    }

    public void setMargin_trading_market_rate(String margin_trading_market_rate) {
        this.margin_trading_market_rate = margin_trading_market_rate;
    }

    public String getMargin_trading_market_rate_mom() {
        return margin_trading_market_rate_mom;
    }

    public void setMargin_trading_market_rate_mom(String margin_trading_market_rate_mom) {
        this.margin_trading_market_rate_mom = margin_trading_market_rate_mom;
    }

    public String getAll_trading_market_rate() {
        return all_trading_market_rate;
    }

    public void setAll_trading_market_rate(String all_trading_market_rate) {
        this.all_trading_market_rate = all_trading_market_rate;
    }

    public String getAll_trading_market_rate_mom() {
        return all_trading_market_rate_mom;
    }

    public void setAll_trading_market_rate_mom(String all_trading_market_rate_mom) {
        this.all_trading_market_rate_mom = all_trading_market_rate_mom;
    }

    public String getStock_trading_fee_rate() {
        return stock_trading_fee_rate;
    }

    public void setStock_trading_fee_rate(String stock_trading_fee_rate) {
        this.stock_trading_fee_rate = stock_trading_fee_rate;
    }

    public String getMargin_trading_fee_rate() {
        return margin_trading_fee_rate;
    }

    public void setMargin_trading_fee_rate(String margin_trading_fee_rate) {
        this.margin_trading_fee_rate = margin_trading_fee_rate;
    }

    public String getCtzq_net_commission_fee_rate() {
        return ctzq_net_commission_fee_rate;
    }

    public void setCtzq_net_commission_fee_rate(String ctzq_net_commission_fee_rate) {
        this.ctzq_net_commission_fee_rate = ctzq_net_commission_fee_rate;
    }

    public String getMarket_net_commission_fee_rate() {
        return market_net_commission_fee_rate;
    }

    public void setMarket_net_commission_fee_rate(String market_net_commission_fee_rate) {
        this.market_net_commission_fee_rate = market_net_commission_fee_rate;
    }

    public String getMargin_trading_balance() {
        return margin_trading_balance;
    }

    public void setMargin_trading_balance(String margin_trading_balance) {
        this.margin_trading_balance = margin_trading_balance;
    }

    public String getMargin_trading_balance_mom() {
        return margin_trading_balance_mom;
    }

    public void setMargin_trading_balance_mom(String margin_trading_balance_mom) {
        this.margin_trading_balance_mom = margin_trading_balance_mom;
    }

    public String getMargin_trading_balance_yoy() {
        return margin_trading_balance_yoy;
    }

    public void setMargin_trading_balance_yoy(String margin_trading_balance_yoy) {
        this.margin_trading_balance_yoy = margin_trading_balance_yoy;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public String getMarket_rate() {
        return market_rate;
    }

    public void setMarket_rate(String market_rate) {
        this.market_rate = market_rate;
    }

    public String getMarket_rate_complete_rate() {
        return market_rate_complete_rate;
    }

    public void setMarket_rate_complete_rate(String market_rate_complete_rate) {
        this.market_rate_complete_rate = market_rate_complete_rate;
    }

    public String getProfit() {
        return profit;
    }

    public void setProfit(String profit) {
        this.profit = profit;
    }

    public String getProfit_complete_rate() {
        return profit_complete_rate;
    }

    public void setProfit_complete_rate(String profit_complete_rate) {
        this.profit_complete_rate = profit_complete_rate;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getTrade_amount() {
        return trade_amount;
    }

    public void setTrade_amount(String trade_amount) {
        this.trade_amount = trade_amount;
    }

    public String getKpi_income() {
        return kpi_income;
    }

    public void setKpi_income(String kpi_income) {
        this.kpi_income = kpi_income;
    }

    public String getSecu_name() {
        return secu_name;
    }

    public void setSecu_name(String secu_name) {
        this.secu_name = secu_name;
    }

    public String getMarket_rank() {
        return market_rank;
    }

    public void setMarket_rank(String market_rank) {
        this.market_rank = market_rank;
    }

    public String getSecu_amount() {
        return secu_amount;
    }

    public void setSecu_amount(String secu_amount) {
        this.secu_amount = secu_amount;
    }

    public String getSecu_rate() {
        return secu_rate;
    }

    public void setSecu_rate(String secu_rate) {
        this.secu_rate = secu_rate;
    }

    public String getSecu_rate_mom() {
        return secu_rate_mom;
    }

    public void setSecu_rate_mom(String secu_rate_mom) {
        this.secu_rate_mom = secu_rate_mom;
    }

    public String getAll_secu_amount() {
        return all_secu_amount;
    }

    public void setAll_secu_amount(String all_secu_amount) {
        this.all_secu_amount = all_secu_amount;
    }

    public String getAll_secu_rate() {
        return all_secu_rate;
    }

    public void setAll_secu_rate(String all_secu_rate) {
        this.all_secu_rate = all_secu_rate;
    }

    public String getAll_secu_rate_yoy() {
        return all_secu_rate_yoy;
    }

    public void setAll_secu_rate_yoy(String all_secu_rate_yoy) {
        this.all_secu_rate_yoy = all_secu_rate_yoy;
    }

    public String getMarket_rank_change() {
        return market_rank_change;
    }

    public void setMarket_rank_change(String market_rank_change) {
        this.market_rank_change = market_rank_change;
    }

    public String getMarket_rank_change_yoy() {
        return market_rank_change_yoy;
    }

    public void setMarket_rank_change_yoy(String market_rank_change_yoy) {
        this.market_rank_change_yoy = market_rank_change_yoy;
    }

    public String getBuy_sell_net_income() {
        return buy_sell_net_income;
    }

    public void setBuy_sell_net_income(String buy_sell_net_income) {
        this.buy_sell_net_income = buy_sell_net_income;
    }

    public String getBuy_sell_rank() {
        return buy_sell_rank;
    }

    public void setBuy_sell_rank(String buy_sell_rank) {
        this.buy_sell_rank = buy_sell_rank;
    }

    public String getBuy_sell_rank_label() {
        return buy_sell_rank_label;
    }

    public void setBuy_sell_rank_label(String buy_sell_rank_label) {
        this.buy_sell_rank_label = buy_sell_rank_label;
    }

    public String getBroker_fee_commission_income() {
        return broker_fee_commission_income;
    }

    public void setBroker_fee_commission_income(String broker_fee_commission_income) {
        this.broker_fee_commission_income = broker_fee_commission_income;
    }

    public String getBroker_interest_income() {
        return broker_interest_income;
    }

    public void setBroker_interest_income(String broker_interest_income) {
        this.broker_interest_income = broker_interest_income;
    }

    public String getMargin_trading_balance_divid() {
        return margin_trading_balance_divid;
    }

    public void setMargin_trading_balance_divid(String margin_trading_balance_divid) {
        this.margin_trading_balance_divid = margin_trading_balance_divid;
    }

    public String getBroker_inte_service_income() {
        return broker_inte_service_income;
    }

    public void setBroker_inte_service_income(String broker_inte_service_income) {
        this.broker_inte_service_income = broker_inte_service_income;
    }

    public String getBroker_fee_commission_income_rate() {
        return broker_fee_commission_income_rate;
    }

    public void setBroker_fee_commission_income_rate(String broker_fee_commission_income_rate) {
        this.broker_fee_commission_income_rate = broker_fee_commission_income_rate;
    }

    public String getBroker_interest_income_rate() {
        return broker_interest_income_rate;
    }

    public void setBroker_interest_income_rate(String broker_interest_income_rate) {
        this.broker_interest_income_rate = broker_interest_income_rate;
    }

    public String getMargin_trading_balance_divid_rate() {
        return margin_trading_balance_divid_rate;
    }

    public void setMargin_trading_balance_divid_rate(String margin_trading_balance_divid_rate) {
        this.margin_trading_balance_divid_rate = margin_trading_balance_divid_rate;
    }

    public String getBroker_inte_service_income_rate() {
        return broker_inte_service_income_rate;
    }

    public void setBroker_inte_service_income_rate(String broker_inte_service_income_rate) {
        this.broker_inte_service_income_rate = broker_inte_service_income_rate;
    }

    public String getBroker_fee_commission_income_mom() {
        return broker_fee_commission_income_mom;
    }

    public void setBroker_fee_commission_income_mom(String broker_fee_commission_income_mom) {
        this.broker_fee_commission_income_mom = broker_fee_commission_income_mom;
    }

    public String getMargin_trading_balance_divid_mom() {
        return margin_trading_balance_divid_mom;
    }

    public void setMargin_trading_balance_divid_mom(String margin_trading_balance_divid_mom) {
        this.margin_trading_balance_divid_mom = margin_trading_balance_divid_mom;
    }

    public String getMargin_trading_balance_divid_sum() {
        return margin_trading_balance_divid_sum;
    }

    public void setMargin_trading_balance_divid_sum(String margin_trading_balance_divid_sum) {
        this.margin_trading_balance_divid_sum = margin_trading_balance_divid_sum;
    }

    public String getMargin_trading_balance_divid_sum_yoy() {
        return margin_trading_balance_divid_sum_yoy;
    }

    public void setMargin_trading_balance_divid_sum_yoy(String margin_trading_balance_divid_sum_yoy) {
        this.margin_trading_balance_divid_sum_yoy = margin_trading_balance_divid_sum_yoy;
    }

    public String getAll_expenses() {
        return all_expenses;
    }

    public void setAll_expenses(String all_expenses) {
        this.all_expenses = all_expenses;
    }

    public String getAll_expenses_mom() {
        return all_expenses_mom;
    }

    public void setAll_expenses_mom(String all_expenses_mom) {
        this.all_expenses_mom = all_expenses_mom;
    }

    public String getTaxes_expenses() {
        return taxes_expenses;
    }

    public void setTaxes_expenses(String taxes_expenses) {
        this.taxes_expenses = taxes_expenses;
    }

    public String getTaxes_expenses_mom() {
        return taxes_expenses_mom;
    }

    public void setTaxes_expenses_mom(String taxes_expenses_mom) {
        this.taxes_expenses_mom = taxes_expenses_mom;
    }

    public String getProtection_fund_expenses() {
        return protection_fund_expenses;
    }

    public void setProtection_fund_expenses(String protection_fund_expenses) {
        this.protection_fund_expenses = protection_fund_expenses;
    }

    public String getProtection_fund_expenses_mom() {
        return protection_fund_expenses_mom;
    }

    public void setProtection_fund_expenses_mom(String protection_fund_expenses_mom) {
        this.protection_fund_expenses_mom = protection_fund_expenses_mom;
    }

    public String getManagement_fee_expenses() {
        return management_fee_expenses;
    }

    public void setManagement_fee_expenses(String management_fee_expenses) {
        this.management_fee_expenses = management_fee_expenses;
    }

    public String getManagement_fee_expenses_mom() {
        return management_fee_expenses_mom;
    }

    public void setManagement_fee_expenses_mom(String management_fee_expenses_mom) {
        this.management_fee_expenses_mom = management_fee_expenses_mom;
    }

    public String getFixed_expenses() {
        return fixed_expenses;
    }

    public void setFixed_expenses(String fixed_expenses) {
        this.fixed_expenses = fixed_expenses;
    }

    public String getFixed_expenses_mom() {
        return fixed_expenses_mom;
    }

    public void setFixed_expenses_mom(String fixed_expenses_mom) {
        this.fixed_expenses_mom = fixed_expenses_mom;
    }

    public String getChange_expenses() {
        return change_expenses;
    }

    public void setChange_expenses(String change_expenses) {
        this.change_expenses = change_expenses;
    }

    public String getChange_expenses_mom() {
        return change_expenses_mom;
    }

    public void setChange_expenses_mom(String change_expenses_mom) {
        this.change_expenses_mom = change_expenses_mom;
    }

    public String getHr_expenses() {
        return hr_expenses;
    }

    public void setHr_expenses(String hr_expenses) {
        this.hr_expenses = hr_expenses;
    }

    public String getHr_expenses_mom() {
        return hr_expenses_mom;
    }

    public void setHr_expenses_mom(String hr_expenses_mom) {
        this.hr_expenses_mom = hr_expenses_mom;
    }

    public String getBroker_profit_goal() {
        return broker_profit_goal;
    }

    public void setBroker_profit_goal(String broker_profit_goal) {
        this.broker_profit_goal = broker_profit_goal;
    }

    public String getBroker_profit() {
        return broker_profit;
    }

    public void setBroker_profit(String broker_profit) {
        this.broker_profit = broker_profit;
    }

    public String getBroker_profit_goal_mom() {
        return broker_profit_goal_mom;
    }

    public void setBroker_profit_goal_mom(String broker_profit_goal_mom) {
        this.broker_profit_goal_mom = broker_profit_goal_mom;
    }

    public String getBroker_profit_goal_sum() {
        return broker_profit_goal_sum;
    }

    public void setBroker_profit_goal_sum(String broker_profit_goal_sum) {
        this.broker_profit_goal_sum = broker_profit_goal_sum;
    }

    public String getBroker_profit_index_goal_sum() {
        return broker_profit_index_goal_sum;
    }

    public void setBroker_profit_index_goal_sum(String broker_profit_index_goal_sum) {
        this.broker_profit_index_goal_sum = broker_profit_index_goal_sum;
    }

    public String getBroker_profit_goal_rate() {
        return broker_profit_goal_rate;
    }

    public void setBroker_profit_goal_rate(String broker_profit_goal_rate) {
        this.broker_profit_goal_rate = broker_profit_goal_rate;
    }

    public String getCenter_branch_profit() {
        return center_branch_profit;
    }

    public void setCenter_branch_profit(String center_branch_profit) {
        this.center_branch_profit = center_branch_profit;
    }

    public String getA_branch_profit() {
        return a_branch_profit;
    }

    public void setA_branch_profit(String a_branch_profit) {
        this.a_branch_profit = a_branch_profit;
    }

    public String getB_branch_profit() {
        return b_branch_profit;
    }

    public void setB_branch_profit(String b_branch_profit) {
        this.b_branch_profit = b_branch_profit;
    }

    public String getC_branch_profit() {
        return c_branch_profit;
    }

    public void setC_branch_profit(String c_branch_profit) {
        this.c_branch_profit = c_branch_profit;
    }

    public String getD_branch_profit() {
        return d_branch_profit;
    }

    public void setD_branch_profit(String d_branch_profit) {
        this.d_branch_profit = d_branch_profit;
    }

    public String getX_branch_profit() {
        return x_branch_profit;
    }

    public void setX_branch_profit(String x_branch_profit) {
        this.x_branch_profit = x_branch_profit;
    }

    public String getSecond_branch_profit() {
        return second_branch_profit;
    }

    public void setSecond_branch_profit(String second_branch_profit) {
        this.second_branch_profit = second_branch_profit;
    }

    public String getCenter_branch_market_rate() {
        return center_branch_market_rate;
    }

    public void setCenter_branch_market_rate(String center_branch_market_rate) {
        this.center_branch_market_rate = center_branch_market_rate;
    }

    public String getA_branch_market_rate() {
        return a_branch_market_rate;
    }

    public void setA_branch_market_rate(String a_branch_market_rate) {
        this.a_branch_market_rate = a_branch_market_rate;
    }

    public String getB_branch_market_rate() {
        return b_branch_market_rate;
    }

    public void setB_branch_market_rate(String b_branch_market_rate) {
        this.b_branch_market_rate = b_branch_market_rate;
    }

    public String getC_branch_market_rate() {
        return c_branch_market_rate;
    }

    public void setC_branch_market_rate(String c_branch_market_rate) {
        this.c_branch_market_rate = c_branch_market_rate;
    }

    public String getD_branch_market_rate() {
        return d_branch_market_rate;
    }

    public void setD_branch_market_rate(String d_branch_market_rate) {
        this.d_branch_market_rate = d_branch_market_rate;
    }

    public String getX_branch_market_rate() {
        return x_branch_market_rate;
    }

    public void setX_branch_market_rate(String x_branch_market_rate) {
        this.x_branch_market_rate = x_branch_market_rate;
    }

    public String getSecond_branch_market_rate() {
        return second_branch_market_rate;
    }

    public void setSecond_branch_market_rate(String second_branch_market_rate) {
        this.second_branch_market_rate = second_branch_market_rate;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getAsset_mom() {
        return asset_mom;
    }

    public void setAsset_mom(String asset_mom) {
        this.asset_mom = asset_mom;
    }

    public String getMarket_balance() {
        return market_balance;
    }

    public void setMarket_balance(String market_balance) {
        this.market_balance = market_balance;
    }

    public String getMarket_balance_mom() {
        return market_balance_mom;
    }

    public void setMarket_balance_mom(String market_balance_mom) {
        this.market_balance_mom = market_balance_mom;
    }

    public String getAssecu_balance() {
        return assecu_balance;
    }

    public void setAssecu_balance(String assecu_balance) {
        this.assecu_balance = assecu_balance;
    }

    public String getSecu_balance_mom() {
        return secu_balance_mom;
    }

    public void setSecu_balance_mom(String secu_balance_mom) {
        this.secu_balance_mom = secu_balance_mom;
    }

    public String getBusinessflag_name() {
        return businessflag_name;
    }

    public void setBusinessflag_name(String businessflag_name) {
        this.businessflag_name = businessflag_name;
    }

    public String getIn_capital() {
        return in_capital;
    }

    public void setIn_capital(String in_capital) {
        this.in_capital = in_capital;
    }

    public String getIn_capital_sum() {
        return in_capital_sum;
    }

    public void setIn_capital_sum(String in_capital_sum) {
        this.in_capital_sum = in_capital_sum;
    }

    public String getIn_value() {
        return in_value;
    }

    public void setIn_value(String in_value) {
        this.in_value = in_value;
    }

    public String getIn_value_sum() {
        return in_value_sum;
    }

    public void setIn_value_sum(String in_value_sum) {
        this.in_value_sum = in_value_sum;
    }

    public String getCust_num() {
        return cust_num;
    }

    public void setCust_num(String cust_num) {
        this.cust_num = cust_num;
    }

    public String getNew_custom() {
        return new_custom;
    }

    public void setNew_custom(String new_custom) {
        this.new_custom = new_custom;
    }

    public String getNew_custom_market_rate() {
        return new_custom_market_rate;
    }

    public void setNew_custom_market_rate(String new_custom_market_rate) {
        this.new_custom_market_rate = new_custom_market_rate;
    }

    public String getNew_custom_sum_ly() {
        return new_custom_sum_ly;
    }

    public void setNew_custom_sum_ly(String new_custom_sum_ly) {
        this.new_custom_sum_ly = new_custom_sum_ly;
    }

    public String getNew_custom_market_rate_sum_ly() {
        return new_custom_market_rate_sum_ly;
    }

    public void setNew_custom_market_rate_sum_ly(String new_custom_market_rate_sum_ly) {
        this.new_custom_market_rate_sum_ly = new_custom_market_rate_sum_ly;
    }

    public String getNew_custom_sum() {
        return new_custom_sum;
    }

    public void setNew_custom_sum(String new_custom_sum) {
        this.new_custom_sum = new_custom_sum;
    }

    public String getNew_custom_market_rate_sum() {
        return new_custom_market_rate_sum;
    }

    public void setNew_custom_market_rate_sum(String new_custom_market_rate_sum) {
        this.new_custom_market_rate_sum = new_custom_market_rate_sum;
    }

    public String getNew_custom_asset() {
        return new_custom_asset;
    }

    public void setNew_custom_asset(String new_custom_asset) {
        this.new_custom_asset = new_custom_asset;
    }

    public String getNew_custom_commission() {
        return new_custom_commission;
    }

    public void setNew_custom_commission(String new_custom_commission) {
        this.new_custom_commission = new_custom_commission;
    }

    public String getNew_custom_asset_sum_ly() {
        return new_custom_asset_sum_ly;
    }

    public void setNew_custom_asset_sum_ly(String new_custom_asset_sum_ly) {
        this.new_custom_asset_sum_ly = new_custom_asset_sum_ly;
    }

    public String getNew_custom_commission_sum_ly() {
        return new_custom_commission_sum_ly;
    }

    public void setNew_custom_commission_sum_ly(String new_custom_commission_sum_ly) {
        this.new_custom_commission_sum_ly = new_custom_commission_sum_ly;
    }

    public String getNew_custom_asset_sum() {
        return new_custom_asset_sum;
    }

    public void setNew_custom_asset_sum(String new_custom_asset_sum) {
        this.new_custom_asset_sum = new_custom_asset_sum;
    }

    public String getNew_custom_commission_sum() {
        return new_custom_commission_sum;
    }

    public void setNew_custom_commission_sum(String new_custom_commission_sum) {
        this.new_custom_commission_sum = new_custom_commission_sum;
    }

    public String getOpen_sum() {
        return open_sum;
    }

    public void setOpen_sum(String open_sum) {
        this.open_sum = open_sum;
    }

    public String getReward_sum() {
        return reward_sum;
    }

    public void setReward_sum(String reward_sum) {
        this.reward_sum = reward_sum;
    }

    public String getCommission_sum() {
        return commission_sum;
    }

    public void setCommission_sum(String commission_sum) {
        this.commission_sum = commission_sum;
    }

    public String getAsset_turnover_rate() {
        return asset_turnover_rate;
    }

    public void setAsset_turnover_rate(String asset_turnover_rate) {
        this.asset_turnover_rate = asset_turnover_rate;
    }

    public String getAsset_turnover_rate_sum() {
        return asset_turnover_rate_sum;
    }

    public void setAsset_turnover_rate_sum(String asset_turnover_rate_sum) {
        this.asset_turnover_rate_sum = asset_turnover_rate_sum;
    }

    public String getAsset_hedge_rate() {
        return asset_hedge_rate;
    }

    public void setAsset_hedge_rate(String asset_hedge_rate) {
        this.asset_hedge_rate = asset_hedge_rate;
    }

    public String getAsset_hedge_rate_sum() {
        return asset_hedge_rate_sum;
    }

    public void setAsset_hedge_rate_sum(String asset_hedge_rate_sum) {
        this.asset_hedge_rate_sum = asset_hedge_rate_sum;
    }
}
