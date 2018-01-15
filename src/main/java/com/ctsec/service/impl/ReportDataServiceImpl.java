package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.ReportDataDao;
import com.ctsec.dao.jf.ReportIndexMapper;
import com.ctsec.model.jf.RelationItem;
import com.ctsec.model.jf.ReportIndex;
import com.ctsec.vo.ReportData;
import com.ctsec.service.ReportDataService;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.text.MessageFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 报表数据服务实现层
 *
 * Created by luchisheng on 2017/11/20.
 */

@Service("reportDataService")
public class ReportDataServiceImpl implements ReportDataService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("ReportDataDao")
    private ReportDataDao reportDataDao;

    @Autowired
    ReportIndexMapper reportIndexMapper;

    @Override
    public List<ReportData> getReportData01(String fromDate, String toDate, String branchId, String year, String branchId1) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_01_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId, year, branchId1);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData02(String endDate, String branchId, String branchId1) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_02_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId, branchId1);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData03(String fromDate, String toDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_03_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData04(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_04_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData05(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_05_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData06(String startDate, String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_06_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, startDate, endDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData07(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_07_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData08(String endDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_08_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData09(String branchId, String coopBranchId, String otherParams, String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_09_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, branchId, coopBranchId, otherParams, fromDate, toDate);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData10(String branchId, String coopBranchId, String otherParams) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_10_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, branchId, coopBranchId, otherParams);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getMappingData10(List<ReportData> reportDataList) {
        Map<String, ReportData> dataMap = new HashMap<>();
        Set<String> dataSet = new HashSet<>();
        for (ReportData reportData: reportDataList) {
            String customer = reportData.getCustomer();
            String branchName = reportData.getBranch_name();
            String custStatus = reportData.getCust_status();
            String effectDate = reportData.getEffect_date();
            ReportData data = new ReportData();
            String coopBranchName = "";
            List<Map<String, String>> coopBranchList = new ArrayList<>();
            if (dataSet.contains(customer + branchName + custStatus + effectDate)) {
                data = dataMap.get(customer + branchName + custStatus + effectDate);
                coopBranchName = data.getCoop_branch_name();
                coopBranchList = data.getCoop_branch_list();
            }
            else {
                dataSet.add(customer + branchName + custStatus + effectDate);
                data.setCustomer(customer);
                data.setBranch_name(branchName);
                data.setEffect_date(reportData.getEffect_date());
                data.setCust_status(reportData.getCust_status());
                data.setFare_ratio(reportData.getFare_ratio());
                data.setAsset_ratio(reportData.getAsset_ratio());
                data.setAmount_ratio(reportData.getAmount_ratio());
                data.setCoop_fare_ratio_sum(reportData.getCoop_fare_ratio_sum());
                data.setCoop_asset_ratio_sum(reportData.getCoop_asset_ratio_sum());
                data.setCoop_amount_ratio_sum(reportData.getCoop_amount_ratio_sum());
            }
            if (coopBranchName.equals(""))
                coopBranchName = reportData.getCoop_branch_name();
            else
                coopBranchName = coopBranchName + ";\n" + reportData.getCoop_branch_name();
            Map<String, String> coopBranch = new HashMap<>();
            coopBranch.put("customer", customer);
            coopBranch.put("effect_date", reportData.getEffect_date());
            coopBranch.put("branch_name", reportData.getBranch_name());
            coopBranch.put("coop_branch_name", reportData.getCoop_branch_name());
            coopBranch.put("relation", reportData.getRelation());
            coopBranch.put("coop_fare_ratio", reportData.getCoop_fare_ratio() == null
                    ? reportData.getCoop_fare_ratio() : reportData.getCoop_fare_ratio() + "%");
            coopBranch.put("coop_asset_ratio", reportData.getCoop_asset_ratio() == null
                    ? reportData.getCoop_asset_ratio() : reportData.getCoop_asset_ratio() + "%");
            coopBranch.put("coop_amount_ratio", reportData.getCoop_amount_ratio() == null
                    ? reportData.getCoop_amount_ratio() : reportData.getCoop_amount_ratio() + "%");
            coopBranchList.add(coopBranch);
            data.setCoop_branch_name(coopBranchName);
            data.setCoop_branch_list(coopBranchList);
            dataMap.put(customer + branchName + custStatus + effectDate, data);
        }
        return new ArrayList<>(dataMap.values());
    }

    @Override
    public List<ReportData> getReportData11(String fromDate, String toDate, String branchId, String exchangeType, String otherParams) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_11_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId, exchangeType, otherParams);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData12(String fromDate, String toDate, String branchId, String exchangeType, String otherParams) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_12_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId, exchangeType, otherParams);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData13(String fromDate, String toDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_13_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData1301(String fromDate, String toDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_1301_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData14(String endDate, String branchId, String assetSection) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_14_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, branchId, assetSection);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData15(String fromDate, String toDate, String branchId) {
        String sqlQuery = sqlQueryConfig.getSEL_REPORT_DATA_REPORT_15_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, branchId);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData16(String fromDate, String toDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_DATA_REPORT_16_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, prodCode);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData17(String fromDate, String toDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_DATA_REPORT_17_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, prodCode);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData18(String fromDate, String toDate, String prodCode, String otherParams, String index) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_DATA_REPORT_18_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, prodCode, otherParams, index);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getReportData19(String fromDate, String toDate, String idNo) {
        String sqlQuery = sqlQueryConfig.getSEL_RELATION_DATA_REPORT_19_BY_FILTER();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, idNo);
        return reportDataDao.selectReportData(sqlQuery);
    }

    @Override
    public List<ReportData> getMappingData19(List<ReportData> reportDataList, List<RelationItem> relationItemList, String queryType) {
        Map<String, Map<String, String>> dataMap = new HashMap<>();
        for (int i = 0; i < relationItemList.size(); i ++) {
            Map<String, String> item = new HashMap<>();
            item.put("id_no", relationItemList.get(i).getCode());
            item.put("cust_name", relationItemList.get(i).getName());
            item.put("cust_status", "-");
            item.put("stock_commission_rate", "-");
            item.put("margin_trade_balance", "-");
            item.put("margin_trade_interest_expense", "-");
            item.put("common_stock_commission", "-");
            item.put("open_fund_commission", "-");
            dataMap.put(relationItemList.get(i).getCode(), item);
        }
        Double totalStock_commission = 0.0;
        Double totalStock_amount = 0.0;
        Double totalMargin_trade_balance = 0.0;
        Double totalMargin_trade_interest_expense = 0.0;
        Double totalCommon_stock_commission = 0.0;
        Double totalOpen_fund_commission = 0.0;
        DecimalFormat df2 = new DecimalFormat("#0.00");
        DecimalFormat df4 = new DecimalFormat("#0.0000");

        for (ReportData reportData: reportDataList) {
            String id_no = reportData.getId_no();
            Map<String, String> item = dataMap.get(id_no);

            item.put("cust_status", reportData.getCust_status());

            item.put("margin_trade_balance", df4.format((NumberUtils.toDouble(reportData.getMargin_trade_balance())
                    + (dataMap.get(id_no) == null ? 0d : NumberUtils.toDouble(dataMap.get(id_no).get("margin_trade_balance"))))));
            item.put("margin_trade_interest_expense", df4.format((NumberUtils.toDouble(reportData.getMargin_trade_interest_expense())
                    + (dataMap.get(id_no) == null ? 0d : NumberUtils.toDouble(dataMap.get(id_no).get("margin_trade_interest_expense"))))));
            item.put("common_stock_commission", df4.format((NumberUtils.toDouble(reportData.getCommon_stock_commission())
                    + (dataMap.get(id_no) == null ? 0d : NumberUtils.toDouble(dataMap.get(id_no).get("common_stock_commission"))))));
            item.put("open_fund_commission", df4.format((NumberUtils.toDouble(reportData.getOpen_fund_commission())
                    + (dataMap.get(id_no) == null ? 0d : NumberUtils.toDouble(dataMap.get(id_no).get("open_fund_commission"))))));
            item.put("stock_amount", df4.format((NumberUtils.toDouble(reportData.getStock_amount())
                    + (dataMap.get(id_no) == null ? 0d : NumberUtils.toDouble(dataMap.get(id_no).get("stock_amount"))))));
            item.put("stock_commission_rate", NumberUtils.toDouble(item.get("stock_amount")) == 0 ? "9999999999.0000"
                    : df4.format(NumberUtils.toDouble(item.get("common_stock_commission")) / NumberUtils.toDouble(item.get("stock_amount")) * 1000));
            dataMap.put(id_no, item);

            totalStock_commission += Double.parseDouble(reportData.getStock_commission());
            totalStock_amount += Double.parseDouble(reportData.getStock_amount());
            totalMargin_trade_balance += Double.parseDouble(reportData.getMargin_trade_balance());
            totalMargin_trade_interest_expense += Double.parseDouble(reportData.getMargin_trade_interest_expense());
            totalCommon_stock_commission += Double.parseDouble(reportData.getCommon_stock_commission());
            totalOpen_fund_commission += Double.parseDouble(reportData.getOpen_fund_commission());
        }

        ReportData totalItem = new ReportData();
        totalItem.setId_no("-");
        totalItem.setCust_name("合计");
        totalItem.setCust_status("-");
        totalItem.setStock_commission_rate(totalStock_amount == 0 ? "9999999999.0000" : df4.format(totalStock_commission / totalStock_amount * 1000));
        totalItem.setMargin_trade_balance(df2.format(totalMargin_trade_balance));
        totalItem.setMargin_trade_interest_expense(df2.format(totalMargin_trade_interest_expense));
        totalItem.setCommon_stock_commission(df2.format(totalCommon_stock_commission));
        totalItem.setOpen_fund_commission(df2.format(totalOpen_fund_commission));
        List<ReportData> result = new ArrayList<>();
        if (queryType.equals("group"))
            result.add(totalItem);
        for (Map<String, String> value: dataMap.values()) {
            ReportData reportData = new ReportData();
            reportData.setId_no(value.get("id_no"));
            reportData.setCust_name(value.get("cust_name"));
            reportData.setCust_status(value.get("cust_status"));
            reportData.setStock_commission_rate(value.get("stock_commission_rate"));
            reportData.setMargin_trade_balance(value.get("margin_trade_balance"));
            reportData.setMargin_trade_interest_expense(value.get("margin_trade_interest_expense"));
            reportData.setCommon_stock_commission(value.get("common_stock_commission"));
            reportData.setOpen_fund_commission(value.get("open_fund_commission"));
            result.add(reportData);
        }
        return result;
    }

    @Override
    public List<ReportData> getOrderedData(List<ReportData> reportDataList, String key, String orderKey)
    {
        reportDataList.sort((reportData1, reportData2) -> {
            String data1 = reportData1.getByKey(key);
            if (data1 == null)
                data1 = "-";
            String data2 = reportData2.getByKey(key);
            if (data2 == null)
                data2 = "-";
            switch (orderKey) {
                case "asc": {
                    return isNumber(data1) && isNumber(data2)
                            ? Double.valueOf(data1).compareTo(Double.valueOf(data2))
                            : data1.compareTo(data2);
                }
                case "desc": {
                    return isNumber(data2) && isNumber(data1)
                            ? Double.valueOf(data2).compareTo(Double.valueOf(data1))
                            : data2.compareTo(data1);
                }

            }
            return 0;
        });
        return reportDataList;
    }

    @Override
    public List<Map<String, Object>> mapping(List<ReportData> reportDataList, String reportId, List<String> indexIdList) {
        List<ReportIndex> reportIndexList = reportIndexMapper.selectIndex(reportId);
        List<Map<String, Object>> mappingResult = new ArrayList<>();
        Field[] declaredFields = ReportData.class.getDeclaredFields();
        for (ReportData reportData : reportDataList) {
            Map<String, Object> reportMap = new HashMap<>();
            for (Field field : declaredFields) {
                field.setAccessible(true);
                try {
                    reportMap.put(field.getName(), field.get(reportData));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
            mappingResult.add(reportMap);
        }
        if (mappingResult.isEmpty())
            return mappingResult;
        if (!indexIdList.isEmpty()) {
            for (ReportIndex reportIndex : reportIndexList) {
                if (!indexIdList.contains(reportIndex.getIndex_id())) {
                    for (Map<String, Object> reportMap : mappingResult) {
                        reportMap.remove(reportIndex.getField_name());
                    }
                }
            }
        }
        for (ReportIndex reportIndex : reportIndexList) {
            String fieldName = reportIndex.getField_name();
            if (fieldName.equals("coop_branch_list"))
                continue;
            if (mappingResult.get(0).get(fieldName) == null)
                continue;
            for (int i = 0; i < mappingResult.size(); i++) {
                Map<String, Object> reportData = mappingResult.get(i);
                String value = "";
                if (reportData.get(fieldName) != null) {
                    value = reportData.get(fieldName).toString();
                }
                value = value + reportIndex.getUnit();
                reportData.put(fieldName, value);
                mappingResult.set(i, reportData);
            }
        }
        return mappingResult;
    }

    @Override
    public Map<String, Object> getPagedData(List<Map<String, Object>> reportDataList, Integer page, Integer pageSize) {
        Integer size = reportDataList.size();
        Integer fromIndex = page * pageSize - pageSize;
        Integer toIndex = page * pageSize;
        List<Map<String, Object>> pagedResult = reportDataList.subList(fromIndex, toIndex > size ? size : toIndex);
        Map<String, Object>  result = new HashMap<>();
        result.put("total", size);
        result.put("data", pagedResult);
        return result;
    }

    private Boolean isNumber(String str) {
        Pattern pattern = Pattern.compile("[0-9]*.?[0-9]*");
        Matcher isNumber = pattern.matcher(str);
        return isNumber.matches();
    }
}
