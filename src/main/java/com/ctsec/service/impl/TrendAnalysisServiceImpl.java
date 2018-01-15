package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.TrendAnalysisDao;
import com.ctsec.service.UniversalService;
import com.ctsec.vo.TrendAnalysis;
import com.ctsec.service.TrendAnalysisService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.MessageFormat;
import java.util.*;

/**
 * 趋势分析数据信息服务实现层
 *
 * Created by luchisheng on 2017/11/28.
 */

@Service("trendAnalysisService")
public class TrendAnalysisServiceImpl implements TrendAnalysisService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("TrendAnalysisDao")
    private TrendAnalysisDao trendAnalysisDao;

    @Autowired
    private UniversalService universalService;

    @Override
    public List<TrendAnalysis> getPerformance01(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_01();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getPerformance02(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_02();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getPerformance03(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_03();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getPerformance04(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_04();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getPerformance05() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_05();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getPerformance06() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_06();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public ArrayList performanceMapping06(List<TrendAnalysis> trendAnalysisList) {
        DecimalFormat df = new DecimalFormat("#0.00");
        Map<String, Object> provinceMap = new HashMap<>();
        Set<String> provinceSet = new HashSet<>();
        Set<String> citySet = new HashSet<>();
        for (TrendAnalysis trendAnalyses: trendAnalysisList) {
            String province = trendAnalyses.getProvince();
            HashedMap provinceItem = new HashedMap();
            if (provinceSet.contains(province)) {
                provinceItem = (HashedMap) provinceMap.get(province);
            }
            else {
                provinceSet.add(province);
                provinceItem.put("tradeAmountSum", "0.00");
                provinceItem.put("cityMap", new HashedMap());
                provinceItem.put("provinceName", province);
            }
            Double tradeAmountSum = Double.parseDouble(provinceItem.get("tradeAmountSum").toString());
            String tradeAmount = trendAnalyses.getTrade_amount();
            tradeAmountSum = tradeAmountSum + Double.parseDouble(tradeAmount);
            provinceItem.put("tradeAmountSum", df.format(tradeAmountSum));
            HashedMap cityMap = (HashedMap) provinceItem.get("cityMap");
            String city = trendAnalyses.getCity();
            HashedMap cityItem = new HashedMap();
            if (citySet.contains(province + city)) {
                cityItem = (HashedMap) cityMap.get(city);
            }
            else {
                citySet.add(province + city);
                cityItem.put("tradeAmountSum", "0.00");
                cityItem.put("branchMap", new HashedMap());
                cityItem.put("cityName", city);
            }
            Double tradeAmountSum1 = Double.parseDouble(cityItem.get("tradeAmountSum").toString());
            tradeAmountSum1 = tradeAmountSum1 + Double.parseDouble(tradeAmount);
            cityItem.put("tradeAmountSum", df.format(tradeAmountSum1));
            HashedMap branchItem = new HashedMap();
            HashedMap branchMap = (HashedMap) cityItem.get("branchMap");
            String branchName = trendAnalyses.getBranch_name();
            branchItem.put("branchName", branchName);
            branchItem.put("lat", trendAnalyses.getLat());
            branchItem.put("lng", trendAnalyses.getLng());
            branchItem.put("tradeAmount", trendAnalyses.getTrade_amount());
            branchItem.put("kpiIncome", trendAnalyses.getKpi_income());
            branchItem.put("profit", trendAnalyses.getProfit());
            branchMap.put(branchName, branchItem);
            cityItem.put("branchMap", branchMap);
            cityMap.put(city, cityItem);
            provinceItem.put("cityMap", cityMap);
            provinceMap.put(province, provinceItem);
        }
        ArrayList<Object> provinceList = new ArrayList<>(provinceMap.values());
        for (int i = 0; i < provinceList.size(); ++ i) {
            HashedMap provinceItem = (HashedMap) provinceList.get(i);
            HashedMap cityMap = (HashedMap) provinceItem.get("cityMap");
            ArrayList<Object> cityList = new ArrayList<>();
            for (Object city: cityMap.values()) {
                HashedMap cityItem = (HashedMap) city;
                HashedMap branchMap = (HashedMap) cityItem.get("branchMap");
                cityItem.remove("branchMap");
                cityItem.put("branchList", new ArrayList<Object>(branchMap.values()));
                cityList.add(cityItem);
            }
            provinceItem.remove("cityMap");
            provinceItem.put("cityList", cityList);
            provinceList.set(i, provinceItem);
        }
        return provinceList;
    }

    @Override
    public List<TrendAnalysis> getPerformance07() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_PERFORMANCE_07();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public Map<String, Object> performanceMapping07(List<TrendAnalysis> trendAnalysisList) {
        Map<String, Object> result = new HashMap<>();
        List<TrendAnalysis> leftList = new ArrayList<>();
        List<TrendAnalysis> rightList = new ArrayList<>();
        for (TrendAnalysis trendAnalysis: trendAnalysisList) {
            String secuName = trendAnalysis.getSecu_name();
            String marketRank = trendAnalysis.getMarket_rank();
            String secuAmount = trendAnalysis.getSecu_amount();
            String secuRate = trendAnalysis.getSecu_rate();
            String secuRateMom = trendAnalysis.getSecu_rate_mom();
            String allSecuAmount = trendAnalysis.getAll_secu_amount();
            String allSecuRate = trendAnalysis.getAll_secu_rate();
            String allSecuRateYoy =trendAnalysis.getAll_secu_rate_yoy();
            String marketRankChange = trendAnalysis.getMarket_rank_change();
            String marketRankChangeYoy = trendAnalysis.getMarket_rank_change_yoy();

            TrendAnalysis left = new TrendAnalysis();
            left.setSecu_name(secuName);
            left.setMarket_rank(marketRank);
            left.setSecu_amount(secuAmount);
            left.setSecu_rate_mom(secuRateMom);
            left.setSecu_rate(secuRate);
            left.setAll_secu_amount(allSecuAmount);
            left.setAll_secu_rate(allSecuRate);
            left.setAll_secu_rate_yoy(allSecuRateYoy);
            leftList.add(left);

            TrendAnalysis right = new TrendAnalysis();
            right.setSecu_name(secuName);
            right.setMarket_rank(marketRank);
            right.setSecu_rate(secuRate);
            right.setMarket_rank_change(marketRankChange);
            right.setMarket_rank_change_yoy(marketRankChangeYoy);
            right.setAll_secu_rate(allSecuRate);
            rightList.add(right);
        }
        String monthId = trendAnalysisList.get(1).getMonth_id();
        String date1 = monthId.substring(0, 4) + "年" + monthId.substring(4, 6) + "月";
        String date2 = monthId.substring(0, 4) + "年1-" + monthId.substring(4, 6) + "月";
        result.put("date1", date1);
        result.put("date2", date2);
        result.put("left", leftList);
        result.put("right", rightList);
        return result;
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure01(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_01();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure02() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_02();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure03(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_03();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure04(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_04();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure05(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_05();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure06(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_06();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getIncomeExpenditure07(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_INCOME_EXPENDITURE_07();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset01(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_01();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset02(String fromDate, String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_02();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, endDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset03(String endDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_03();
        //sqlQuery = MessageFormat.format(sqlQuery, endDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public Map<String, Object> customerAssetMapping03(List<TrendAnalysis> trendAnalysisList) {
        DecimalFormat df = new DecimalFormat("#0.00");
        Map<String, Object> result = new HashMap<>();
        List<Map<String, String>> list1 = new ArrayList<>();
        List<Map<String, String>> list2 = new ArrayList<>();
        Double total1 = 0.00;
        Double total2 = 0.00;
        for (TrendAnalysis trendAnalysis: trendAnalysisList) {
            String businessFlagName = trendAnalysis.getBusinessflag_name();
            String custNum = trendAnalysis.getCust_num();
            if (!businessFlagName.contains("客户"))
                total1 += Double.parseDouble(custNum);
            else
                total2 += Double.parseDouble(custNum);
        }
        for (TrendAnalysis trendAnalysis: trendAnalysisList) {
            String businessFlagName = trendAnalysis.getBusinessflag_name();
            String custNum = trendAnalysis.getCust_num();
            Map<String, String> item = new HashMap<>();
            item.put("businessFlagName", businessFlagName);
            item.put("custNum", custNum);
            if (!businessFlagName.contains("客户")) {
                item.put("rate", df.format(Double.parseDouble(custNum) * 100 / total1) + "%");
                list1.add(item);
            }
            else {
                item.put("rate", df.format(Double.parseDouble(custNum) * 100 / total2) + "%");
                list2.add(item);
            }
        }
        result.put("01", list1);
        result.put("02", list2);
        return result;
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset04(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_04();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset05(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_05();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset06(String fromDate, String toDate, String fromDate1, String toDate1) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_06();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, fromDate1, toDate1);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset07(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_07();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset08(String fromDate, String toDate, String fromDate1, String toDate1) {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_08();
        //sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, fromDate1, toDate1);
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset09() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_09();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public List<TrendAnalysis> getCustomerAsset10() {
        String sqlQuery = sqlQueryConfig.getSEL_KPI_TREND_CUSTOMER_10();
        return trendAnalysisDao.selectTrendAnalysis(sqlQuery);
    }

    @Override
    public Map<String, Object> mapping(List<TrendAnalysis> trendAnalysisList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (TrendAnalysis trendAnalysis: trendAnalysisList) {
            String monthId = trendAnalysis.getMonth_id();
            HashedMap value = new HashedMap();
            if (xAxisData.contains(monthId)) {
                value = (HashedMap) seriesData.get(monthId);
            }
            else {
                xAxisData.add(monthId);
            }
            for (String valueName: valueNameList) {
                value.put(valueName, trendAnalysis.getByKey(valueName));
            }
            seriesData.put(monthId, value);
        }
        Map<String, Object> result = new HashMap<>();
        xAxisData = universalService.xAxisOrder(xAxisData);
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
