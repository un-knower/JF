package com.ctsec.service.impl;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.model.jf.RelationItem;
import com.ctsec.service.*;
import com.ctsec.vo.ApiParams;
import com.ctsec.vo.ReportData;
import com.ctsec.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 报表分发服务实现层
 *
 * Created by luchisheng on 2017/11/21.
 */

@Service("service")
public class ReportServiceImpl implements ReportService {

    private static Map<String, String> clearDateMap = new HashMap<>();
    static {
        clearDateMap.put("01", "c_trade_statistics_detail_01");
        clearDateMap.put("02", "c_trade_statistics_daily_01");
        clearDateMap.put("03", "c_trade_statistics_weekly_01");
        clearDateMap.put("04", "c_trade_statistics_monthly_01");
        clearDateMap.put("05", "c_trade_statistics_yearly_01");
        clearDateMap.put("06", "c_asset_change_detail_daily_01");
        clearDateMap.put("07", "c_asset_change_daily_01");
        clearDateMap.put("08", "c_asset_change_monthly_01");
        clearDateMap.put("09", "c_coop_statistics_01");
        clearDateMap.put("10", "c_coop_client_01");
        clearDateMap.put("11", "c_restricted_statistics_01");
        clearDateMap.put("12", "c_restricted_statistics_01");
        clearDateMap.put("13", "c_open_client_statistics_01");
        clearDateMap.put("13", "c_open_client_statistics_01");
        clearDateMap.put("1301", "c_open_client_statistics_01");
        clearDateMap.put("14", "c_asset_section_statistics_01");
        clearDateMap.put("15", "c_margin_trading_statistics_01");
        clearDateMap.put("16", "c_cashclient_redemption_01");
        clearDateMap.put("17", "c_cashclient_business_01");
        clearDateMap.put("18", "c_cashclient_business_01");
    }

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    ReportDataService reportDataService;

    @Autowired
    CubeInfoService cubeInfoService;

    @Autowired
    ParamDateService paramDateService;

    @Autowired
    RelationService relationService;

    /**
     * 获取报表01数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （非必需）
     *      endDate 统计结束时间 （非必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表01数据
     */
    @Override
    public String getReport01(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report01";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("01")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String fromDate1 = toDate.substring(0,4) + "0101";
        String branchId;
        String paramBranchIds = "";
        String paramBranchIds1 = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
                paramBranchIds1 = " where BRANCH_CODE IN " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData01(fromDate, toDate, paramBranchIds, fromDate1, paramBranchIds1);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "1", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表02数据
     * @param apiParams 统一参数
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表02数据
     */
    @Override
    public String getReport02(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report02";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("02")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        String paramBranchIds1 = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
                paramBranchIds1 = " and a.BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData02(endDate, paramBranchIds, paramBranchIds1);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "2", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表03数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表03数据
     */
    @Override
    public String getReport03(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report03";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("03")).getReal_last_build_date().replaceAll("-", ""), "W")
                : apiParams.getEndDate();

        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? paramDateService.getReportFromDay(toDate, "W")
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData03(fromDate, toDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "3", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表04数据
     * @param apiParams 统一参数
     *      endDate 统计结束时间 月（必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表04数据
     */
    @Override
    public String getReport04(ApiParams apiParams) {

        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report04";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("04")).getReal_last_build_date().replaceAll("-", ""), "M").substring(0,6)
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData04(endDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "4", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表05数据
     * @param apiParams 统一参数
     *      endDate 统计结束时间 年（必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表05数据
     */
    @Override
    public String getReport05(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report05";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("05")).getLast_build_date().replaceAll("-", ""), "Y").substring(0,4)
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData05(endDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "5", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表06数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表06数据
     */
    @Override
    public String getReport06(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report06";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("06")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData06(fromDate, toDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "6", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表07数据
     * @param apiParams 统一参数
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表07数据
     */
    @Override
    public String getReport07(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report07";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("07")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData07(endDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "7", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表08数据
     * @param apiParams 统一参数
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表08数据
     */
    @Override
    public String getReport08(ApiParams apiParams) {

        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report08";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("08")).getReal_last_build_date().replaceAll("-", ""), "M").substring(0,6)
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and a.BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData08(endDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "8", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表09数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      startDate1 开户起始时间 （非必需）
     *      endDate1 开户结束时间 （非必需）
     *      branchId 开户营业部 （非必需）
     *      coopBranchId 合作营业部 （非必需）
     *      customerNo 客户号 （非必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表09数据
     */
    @Override
    public String getReport09(ApiParams apiParams) {

        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getStartDate1() == null || apiParams.getStartDate1().equals(""))
                && (apiParams.getEndDate1() == null || apiParams.getEndDate1().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))
                && (apiParams.getCoopBranchId() == null || apiParams.getCoopBranchId().equals("") || apiParams.getCoopBranchId().equals("1000"))
                && (apiParams.getCustomerNo() == null || apiParams.getCustomerNo().equals(""))) {
            redisKey = "jf-" + "api/report" + "/report09";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("09")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();
        String toDate1 = apiParams.getEndDate1() == null || apiParams.getEndDate1().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("09")).getReal_last_build_date().replaceAll("-", ""), "W")
                : apiParams.getEndDate1();
        String fromDate1 = apiParams.getStartDate1() == null || apiParams.getStartDate1().equals("")
                ? paramDateService.getReportFromDay(toDate1, "W")
                : apiParams.getStartDate1();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        String coopBranchId;
        String paramCoopBranchIds = "";
        if (apiParams.getCoopBranchId() != null) {
            if (!apiParams.getCoopBranchId().equals("") && !apiParams.getCoopBranchId().equals("1000")) {
                coopBranchId = apiParams.getCoopBranchId();
                paramCoopBranchIds = " and BRANCH_CODE in " + "('" + coopBranchId.replaceAll(",", "','") + "')";
            }
        }
        String customerNo;
        String otherParams = "";
        otherParams = otherParams + " where a.OPEN_DATE between " + fromDate1 + " and " + toDate1;

        if (apiParams.getCustomerNo() != null) {
            if (!apiParams.getCustomerNo().equals("")) {
                customerNo = apiParams.getCustomerNo();
                String paramCustomNos = "'" + customerNo.replaceAll(",", "','") + "'";
                if (otherParams.equals("")) {
                    otherParams = otherParams + " where ";
                } else {
                    otherParams = otherParams + " and ";
                }
                otherParams = otherParams + " a.CUST_NO in ( " + paramCustomNos + ")";
            }
        }

        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData09(paramBranchIds, paramCoopBranchIds, otherParams, fromDate, toDate);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(queryResult, orderKey, order);
        }
        else {
            orderedResult = queryResult;
        }

        List<Map<String, Object>> mappingResult = reportDataService.mapping(orderedResult, "9", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", pagedResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        params.put("startDate1", fromDate1);
        params.put("endDate1", toDate1);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表10数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （非必需）
     *      endDate 开户结束时间 （非必需）
     *      branchId 开户营业部 （非必需）
     *      coopBranchId 合作营业部 （非必需）
     *      customerNo 客户号 （非必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表10数据
     */
    @Override
    public String getReport10(ApiParams apiParams) {

        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))
                && (apiParams.getCoopBranchId() == null || apiParams.getCoopBranchId().equals("") || apiParams.getCoopBranchId().equals("1000"))
                && (apiParams.getCustomerNo() == null || apiParams.getCustomerNo().equals(""))) {
            redisKey = "jf-" + "api/report" + "/report10";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("10")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        String coopBranchId;
        String paramCoopBranchIds = "";
        if (apiParams.getCoopBranchId() != null) {
            if (!apiParams.getCoopBranchId().equals("") && !apiParams.getCoopBranchId().equals("1000")) {
                coopBranchId = apiParams.getCoopBranchId();
                paramCoopBranchIds = " and BRANCH_CODE in " + "('" + coopBranchId.replaceAll(",", "','") + "')";
            }
        }
        String customerNo;
        String otherParams = "";
        otherParams = otherParams + " where a.OPEN_DATE between " + fromDate + " and " + toDate;
        if (apiParams.getCustomerNo() != null) {
            if (!apiParams.getCustomerNo().equals("")) {
                customerNo = apiParams.getCustomerNo();
                String paramCustomNos = "'" + customerNo.replaceAll(",", "','") + "'";
                if (otherParams.equals("")) {
                    otherParams = otherParams + " where ";
                } else {
                    otherParams = otherParams + " and ";
                }
                otherParams = otherParams + " a.CUST_NO in (" + paramCustomNos + ")";
            }
        }
        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData10(paramBranchIds, paramCoopBranchIds, otherParams);

        List<ReportData> mappingResult = reportDataService.getMappingData10(queryResult);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(mappingResult, orderKey, order);
        }
        else {
            orderedResult = mappingResult;
        }

        List<Map<String, Object>> mappingResult1 = reportDataService.mapping(orderedResult, "10", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult1, page, pageSize);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", pagedResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表11数据
     * @param apiParams 统一参数
     *      startDate 清算起始时间 （必需）
     *      endDate 清算结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      exchangeType 市场 （必需）
     *      customerNo 客户号 （非必需）
     *      stockAccount 证券账户 （非必需）
     *      secuCode 证券代码 （非必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表11数据
     */
    @Override
    public String getReport11(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))
                && (apiParams.getExchangeType() == null || apiParams.getExchangeType().equals("") || apiParams.getExchangeType().equals("1,2,9"))
                && (apiParams.getCustomerNo() == null || apiParams.getCustomerNo().equals(""))) {
            redisKey = "jf-" + "api/report" + "/report11";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("11")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and a.BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }

        String exchangeType = apiParams.getExchangeType();
        String paramExchangeTypes = "'" + exchangeType.replaceAll(",","','") + "'";
        String customerNo;
        String stockAccount;
        String stockCode;
        String otherParams = "";
        if (apiParams.getCustomerNo() != null) {
            if (!apiParams.getCustomerNo().equals("")) {
                customerNo = apiParams.getCustomerNo();
                String paramCustomNos = "'" + customerNo.replaceAll(",", "','") + "'";
                otherParams = otherParams + " and a.CUST_NO in (" + paramCustomNos + ")";
            }
        }
        if (apiParams.getStockAccount() != null) {
            if (!apiParams.getStockAccount().equals("")) {
                stockAccount = apiParams.getStockAccount();
                String paramStockAccount = "'" + stockAccount.replaceAll(",", "','") + "'";
                otherParams = otherParams + "and a.STOCK_ACCOUNT in (" + paramStockAccount + ")";
            }
        }
        if (apiParams.getSecuCode() != null) {
            if (!apiParams.getSecuCode().equals("")) {
                stockCode = apiParams.getSecuCode();
                String paramStockCodes = "'" + stockCode.replaceAll(",", "','") + "'";
                otherParams = otherParams + "and a.STOCK_CODE in (" + paramStockCodes + ")";
            }
        }

        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData11(fromDate, toDate, paramBranchIds, paramExchangeTypes, otherParams);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(queryResult, orderKey, order);
        }
        else {
            orderedResult = queryResult;
        }

        List<Map<String, Object>> mappingResult = reportDataService.mapping(orderedResult, "11", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", pagedResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表12数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      exchangeType 市场 （必需）
     *      startDate1 开户起始时间 （非必需）
     *      endDate1 开户结束时间 （非必需）
     *      customerNo 客户号 （非必需）
     *      stockAccount 证券账户 （非必需）
     *      secuCode 证券代码 （非必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表12数据
     */
    @Override
    public String getReport12(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getStartDate1() == null || apiParams.getStartDate1().equals(""))
                && (apiParams.getEndDate1() == null || apiParams.getEndDate1().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))
                && (apiParams.getExchangeType() == null || apiParams.getExchangeType().equals("") || apiParams.getExchangeType().equals("1,2,9"))
                && (apiParams.getCustomerNo() == null || apiParams.getCustomerNo().equals(""))
                && (apiParams.getStockAccount() == null || apiParams.getStockAccount().equals(""))
                && (apiParams.getSecuCode() == null || apiParams.getSecuCode().equals(""))) {
            redisKey = "jf-" + "api/report" + "/report12";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("12")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();
        String toDate1 = apiParams.getEndDate1() == null || apiParams.getEndDate1().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("12")).getReal_last_build_date().replaceAll("-", ""), "W")
                : apiParams.getEndDate1();
        String fromDate1 = apiParams.getStartDate1() == null || apiParams.getStartDate1().equals("")
                ? paramDateService.getReportFromDay(toDate1, "W")
                : apiParams.getStartDate1();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and a.BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        String exchangeType = apiParams.getExchangeType();
        String paramExchangeTypes = "'" + exchangeType.replaceAll(",","','") + "'";
        String customerNo;
        String stockAccount;
        String stockCode;
        String otherParams = "";
        otherParams = otherParams + " and a.OPEN_DATE between " +  fromDate1 + " and " + toDate1;
        if (apiParams.getCustomerNo() != null) {
            if (!apiParams.getCustomerNo().equals("")) {
                customerNo = apiParams.getCustomerNo();
                String paramCustomNos = "'" + customerNo.replaceAll(",","','") + "'";
                otherParams = otherParams + " and a.CUST_NO in ( " +  paramCustomNos + ")";
            }
        }
        if (apiParams.getStockAccount() != null) {
            if (!apiParams.getStockAccount().equals("")) {
                stockAccount = apiParams.getStockAccount();
                String paramStockAccount = "'" + stockAccount.replaceAll(",","','") + "'";
                otherParams = otherParams + " and a.STOCK_ACCOUNT in (" +  paramStockAccount + ")";
            }
        }
        if (apiParams.getSecuCode() != null) {
            if (!apiParams.getSecuCode().equals("")) {
                stockCode = apiParams.getSecuCode();
                String paramStockCodes = "'" + stockCode.replaceAll(",","','") + "'";
                otherParams = otherParams + " and a.STOCK_CODE in (" +  paramStockCodes + ")";
            }
        }

        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData12(fromDate, toDate, paramBranchIds, paramExchangeTypes, otherParams);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(queryResult, orderKey, order);
        }
        else {
            orderedResult = queryResult;
        }

        List<Map<String, Object>> mappingResult = reportDataService.mapping(orderedResult, "12", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", pagedResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        params.put("startDate1", fromDate1);
        params.put("endDate1", toDate1);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表13数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表13数据
     */
    @Override
    public String getReport13(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report13";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("13")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData13(fromDate, toDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "13", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表13-下钻报表数据
     * @param apiParams 统一参数
     *      startDate 统计起始时间 （必需）
     *      endDate 统计结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表13-下钻报表数据
     */
    @Override
    public String getReport1301(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report1301";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("1301")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }

        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData1301(fromDate, toDate, paramBranchIds);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(queryResult, orderKey, order);
        }
        else {
            orderedResult = queryResult;
        }

        List<Map<String, Object>> mappingResult = reportDataService.mapping(orderedResult, "1301", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", pagedResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表14数据
     * @param apiParams 统一参数
     *      endDate 开户结束时间 （必需）
     *      branchId 开户营业部 （非必需）
     *      assetSection 资产分段 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表14数据
     */
    @Override
    public String getReport14(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))
                && (apiParams.getAssetSection() == null || apiParams.getAssetSection().equals("") || apiParams.getAssetSection().equals("1,2,3,4,5,6,7,8,9"))) {
            redisKey = "jf-" + "api/report" + "/report14";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String endDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("14")).getReal_last_build_date().replaceAll("-", ""), "M").substring(0,6)
                : apiParams.getEndDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_NO in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        String assetSection = apiParams.getAssetSection();
        String paramAssetSections = "'" + assetSection.replaceAll(",", "','") + "'";

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData14(endDate, paramBranchIds, paramAssetSections);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "14", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("endDate", endDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表15数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （非必需）
     *      endDate 开户结束时间 （非必需）
     *      branchId 开户营业部 （非必需）
     *      indexId 报表指标 （非必需）
     * @return 报表15数据
     */
    @Override
    public String getReport15(ApiParams apiParams) {
        String redisKey = "";
        if ((apiParams.getStartDate() == null || apiParams.getStartDate().equals(""))
                && (apiParams.getEndDate() == null || apiParams.getEndDate().equals(""))
                && (apiParams.getBranchId() == null || apiParams.getBranchId().equals("") || apiParams.getBranchId().equals("1000"))) {
            redisKey = "jf-" + "api/report" + "/report15";
            String jedisResult = jedisService.getJedisResult(redisKey);
            if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
                return jedisResult;
        }

        String toDate = apiParams.getEndDate() == null || apiParams.getEndDate().equals("")
                ? paramDateService.getReportPreTradingDay(cubeInfoService.getByCube(clearDateMap.get("15")).getLast_build_date().replaceAll("-", ""), "D")
                : apiParams.getEndDate();
        String fromDate = apiParams.getStartDate() == null || apiParams.getStartDate().equals("")
                ? toDate
                : apiParams.getStartDate();

        String branchId;
        String paramBranchIds = "";
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                paramBranchIds = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData15(fromDate, toDate, paramBranchIds);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "15", indexIdList);

        Map<String, Object> result = new HashMap<>();
        result.put("reportData", mappingResult);
        Map<String, String> params = new HashMap<>();
        params.put("startDate", fromDate);
        params.put("endDate", toDate);
        result.put("params", params);

        if (!redisKey.equals("")) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);
        }

        return JsonResult.successJson(result);
    }

    /**
     * 获取报表16数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （必需）
     *      endDate 开户结束时间 （必需）
     *      prodCode 产品编号 （必需）
     *      orderKey 排序关键字段 （非必需）
     *      order 排序方式 （非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表16数据
     */
    @Override
    public String getReport16(ApiParams apiParams) {
        String fromDate = apiParams.getStartDate();
        String toDate = apiParams.getEndDate();
        String prodCode = apiParams.getProdCode();
        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";

        String orderKey = "";
        if (apiParams.getOrderKey() != null) {
            if (!apiParams.getOrderKey().equals("")) {
                orderKey = apiParams.getOrderKey();
            }
        }
        String order = "";
        if (apiParams.getOrder() != null) {
            if (!apiParams.getOrder().equals("")) {
                order = apiParams.getOrder();
            }
        }
        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData16(fromDate, toDate, paramProdCode);

        List<ReportData> orderedResult;
        if (!orderKey.equals("") && !orderKey.equals("")) {
            orderedResult = reportDataService.getOrderedData(queryResult, orderKey, order);
        }
        else {
            orderedResult = queryResult;
        }

        List<Map<String, Object>> mappingResult = reportDataService.mapping(orderedResult, "16", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        return JsonResult.successJson(pagedResult);
    }

    /**
     * 获取报表17数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （必需）
     *      endDate 开户结束时间 （必需）
     *      prodCode 产品编号 （必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表17数据
     */
    @Override
    public String getReport17(ApiParams apiParams) {
        String fromDate = apiParams.getStartDate();
        String toDate = apiParams.getEndDate();
        String prodCode = apiParams.getProdCode();
        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";

        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData17(fromDate, toDate, paramProdCode);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "17", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        return JsonResult.successJson(pagedResult);
    }

    /**
     * 获取报表18数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （必需）
     *      endDate 开户结束时间 （必需）
     *      prodCode 产品编号 （必需）
     *      branchId 分支机构 （非必需）
     *      customerNo 客户编号 （非必需）
     *      index 指标及银行转入范围（非必需）
     *      page 页数 （必需）
     *      pageSize 每页大小 （必需）
     *      indexId 报表指标 （非必需）
     * @return 报表18数据
     */
    @Override
    public String getReport18(ApiParams apiParams) {
        String fromDate = apiParams.getStartDate();
        String toDate = apiParams.getEndDate();
        String prodCode = apiParams.getProdCode();
        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";
        String otherParams = "";
        String branchId;
        if (apiParams.getBranchId() != null) {
            if (!apiParams.getBranchId().equals("") && !apiParams.getBranchId().equals("1000")) {
                branchId = apiParams.getBranchId();
                otherParams = " and BRANCH_CODE in " + "('" + branchId.replaceAll(",", "','") + "')";
            }
        }
        String customerNo;
        if (apiParams.getCustomerNo() != null) {
            if (!apiParams.getCustomerNo().equals("")) {
                customerNo = apiParams.getCustomerNo();
                otherParams = " and CUST_NO in " + "('" + customerNo.replaceAll(",", "','") + "')";
            }
        }

        List<Map<String, String>> indexList = apiParams.getIndex();
        StringBuilder paramIndex = new StringBuilder();
        if (indexList == null) {
            paramIndex.append(" 1 = 1 ");
        }
        else if (indexList.isEmpty()) {
            paramIndex.append(" 1 = 1 ");
        }
        else {
            for (Map<String, String> index : indexList) {
                String name = index.get("name");
                String from = index.get("from");
                String to = index.get("to");
                paramIndex.append(name).append("*10000 between ").append(from).append(" and ").append(to).append(" and ");
            }
            paramIndex.delete(paramIndex.length() - 4, paramIndex.length());
        }

        Integer page = apiParams.getPage();
        Integer pageSize = apiParams.getPageSize();

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData18(fromDate, toDate, paramProdCode, otherParams, paramIndex.toString());

        List<Map<String, Object>> mappingResult = reportDataService.mapping(queryResult, "18", indexIdList);

        Map<String, Object> pagedResult = reportDataService.getPagedData(mappingResult, page, pageSize);

        return JsonResult.successJson(pagedResult);
    }

    /**
     * 获取报表19数据
     * @param apiParams 统一参数
     *      startDate 开户起始时间 （必需）
     *      endDate 开户结束时间 （必需）
     *      idNo 证件号码 （必需）
     *      queryType 查询类型
     *      indexId 报表指标 （非必需）
     * @return 报表19数据
     */
    @Override
    public String getReport19(ApiParams apiParams) {
        String fromDate = apiParams.getStartDate();
        String toDate = apiParams.getEndDate();
        String idNo = apiParams.getIdNo();
        String queryType = apiParams.getQueryType();
        StringBuilder paramIdNo;
        paramIdNo = new StringBuilder("'" + idNo.replaceAll(",", "','") + "'");

        List<RelationItem> relationItemList = relationService.getItemByCode(paramIdNo.toString());

        List<String> indexIdList = new ArrayList<>();
        if (apiParams.getIndexId() != null) {
            if (!apiParams.getIndexId().isEmpty()) {
                indexIdList = apiParams.getIndexId();
            }
        }

        List<ReportData> queryResult = reportDataService.getReportData19(fromDate, toDate, paramIdNo.toString());

        List<ReportData> mappingData19 = reportDataService.getMappingData19(queryResult, relationItemList, queryType);

        List<Map<String, Object>> mappingResult = reportDataService.mapping(mappingData19, "19", indexIdList);

        return JsonResult.successJson(mappingResult);
    }

}
