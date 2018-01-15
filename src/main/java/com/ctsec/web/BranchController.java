package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.service.*;
import com.ctsec.util.AppConstant;
import com.ctsec.util.DateUtil;
import com.ctsec.vo.*;
import com.ctsec.util.JsonResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 分支机构页面调度控制层
 *
 * Created by luchisheng on 2017/11/9.
 */

@Controller
@RequestMapping("api/branch")
@Api(value = "BranchController")
public class BranchController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    private ParamDateService paramDateService;

    @Autowired
    private BranchInfoService branchInfoService;

    @Autowired
    private BranchRankService branchRankService;

    @Autowired
    private BranchStatusService branchStatusService;

    @Autowired
    private BranchDevelopmentService branchDevelopmentService;

    @Autowired
    private BranchPerformanceService branchPerformanceService;

    @Autowired
    private CubeInfoService cubeInfoService;

    @ApiOperation(value = "机构现状", notes = "机构现状", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/status", method = {RequestMethod.POST})
    public String branchStatus(
            @ApiParam(
                    value = "dateType <--- D"
            )
            @RequestBody ApiParams apiParams
    ) {
        String dateType = apiParams.getDateType();
        String toDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""));

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "/status"
                + "dateType" + dateType + "endDate" + toDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String fromDate = paramDateService.getMarginFromDay(toDate, dateType);

        List<BranchStatus> queryResult = branchStatusService.getBranchStatus(fromDate, toDate);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "机构现状下钻", notes = "机构现状下钻", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/statusIn", method = {RequestMethod.POST})
    public String branchStatusIn(
            @ApiParam(
                    value = "dateType <--- D\n" +
                            "categoryId <--- ZX"
            )
            @RequestBody ApiParams apiParams
    ) {
        String dateType = apiParams.getDateType();
        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""));
        String categoryId = apiParams.getCategoryId();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "/status"
                + "dateType" + dateType + "endDate" + endDate + "categoryId" + categoryId;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchStatus> queryResult = new ArrayList<>();
        if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
            queryResult = branchStatusService.getDayBranchStatusIn(endDate, categoryId);
        }
        else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
            queryResult = branchStatusService.getMonthBranchStatusIn(endDate, categoryId);
        }
        else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
            queryResult = branchStatusService.getYearBranchStatusIn(endDate, categoryId);
        }

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("name");
        valueName.add("open_cust_num");
        valueName.add("commission");
        valueName.add("amount");
        valueName.add("asset");
        Map<String, Object> mappingResult = branchStatusService.mapping(queryResult, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "分支机构分类筛选", notes = "分支机构分类筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/categoryFilter", method = {RequestMethod.POST})
    public String branchCategoryFilter(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "/categoryFilter";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchInfo> queryResult = branchInfoService.getBranchCategory();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "营业部排名变化", notes = "营业部排名变化", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/rank", method = {RequestMethod.POST})
    public String branchRankByDay(
            @ApiParam(
                    value = "dateType <--- D"
            )
            @RequestBody ApiParams apiParams
    ) {

        String dateType = apiParams.getDateType();
        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""));

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "rank"
                + "endDate" + endDate + "dateType" + dateType;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchRank> queryResult;
        Map<String, Map<String, Object>> mappingResult;

        if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
            queryResult = branchRankService.getDayMarketBranch(endDate);
            mappingResult = branchRankService.marketBranchMapping(queryResult);
        }
        else {
            queryResult = branchRankService.getYearMarketBranch(endDate);
            mappingResult = branchRankService.marketBranchMapping(queryResult);
        }

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "营业部趋势对比", notes = "营业部趋势对比", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/development01", method = {RequestMethod.POST})
    public String development01(
            @ApiParam(
                    value = "dateType <--- D"
            )
            @RequestBody ApiParams apiParams
    ) {

        String dateType = apiParams.getDateType();

        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""));

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "development01"
                + "endDate" + endDate + "dateType" + dateType;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchDevelopment> queryResult;
        Map<String, Map<String, Object>> mappingResult;

        List<String> valueName = new ArrayList<>();
        valueName.add("branch_name");
        valueName.add("asset");
        valueName.add("amount");
        valueName.add("open_cust_num");

        if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
            queryResult = branchDevelopmentService.getDayBranchDevelopment01(endDate);
            mappingResult = branchDevelopmentService.developmentMapping01(queryResult, valueName);
        }
        else {
            queryResult = branchDevelopmentService.getYearBranchDevelopment01(endDate);
            mappingResult = branchDevelopmentService.developmentMapping01(queryResult, valueName);
        }

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "客户结构分析", notes = "客户结构分析", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/development02", method = {RequestMethod.POST})
    public String development02(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""));

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "development02"
                + "endDate" + endDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchDevelopment> queryResult = branchDevelopmentService.getBranchDevelopment02(endDate);
        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("category_id");
        valueName.add("common_cust_num");
        valueName.add("potential_cust_num");
        valueName.add("core_cust_num");
        valueName.add("vip_cust_num");
        valueName.add("vip_platina_cust_num");
        valueName.add("vip_diamond_cust_num");
        valueName.add("vip_super_diamond_cust_num");
        Map<String, Object> mappingResult = branchDevelopmentService.developmentMapping02(queryResult, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "收入结构分布", notes = "收入结构分布", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/development03", method = {RequestMethod.POST})
    public String development03(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) throws ParseException {

        String endDate = DateUtil.getSimplePastMonthDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", ""), 1).substring(0, 6);
        String startDate = endDate.substring(0, 4) + "01";

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "development03"
                + "startDate" + startDate + "endDate" + endDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchDevelopment> queryResult = branchDevelopmentService.getBranchDevelopment03(startDate, endDate);
        Map<String, List<BranchDevelopment>> mappingResult = branchDevelopmentService.developmentMapping03(queryResult);

        Map<String, Object> result = new HashMap<>();
        result.put("data", mappingResult);
        String patten = "(1)[012]";
        Pattern regex = Pattern.compile(patten);
        String date = endDate.substring(0, 4) + "年" + "1月-" + (regex.matcher(endDate.substring(4, 6)).find() ? endDate.substring(4,6) : endDate.substring(5,6)) + "月";
        result.put("date", date);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);

        return JsonResult.successJson(result);
    }

    @ApiOperation(value = "考核利润表现", notes = "考核利润表现", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/development04", method = {RequestMethod.POST})
    public String development04(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", "")).substring(0, 6);

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "development04"
                + "endDate" + endDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchDevelopment> queryResult1 = branchDevelopmentService.getBranchDevelopment0401(endDate);
        List<String> valueName = new ArrayList<>();
        valueName.add("branch_name");
        valueName.add("profit");
        valueName.add("profit_yoy");
        valueName.add("profit_rank");
        Map<String, Map<String, Object>> mappingResult1 = branchDevelopmentService.developmentMapping01(queryResult1, valueName);
        List<BranchDevelopment> queryResult2 = branchDevelopmentService.getBranchDevelopment0402(endDate);
        Map<String, Map<String, Object>> mappingResult2 = branchDevelopmentService.developmentMapping01(queryResult2, valueName);
        Map<String, Object> newMappingResult2 = branchDevelopmentService.developmentMapping04(mappingResult2);

        Map<String, Object> result = new HashMap<>();
        result.put("01", mappingResult1);
        result.put("02", newMappingResult2);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);

        return JsonResult.successJson(result);
    }

    @ApiOperation(value = "分公司筛选", notes = "分公司筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/subFilter", method = {RequestMethod.POST})
    public String subCompanyFilter(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "/subFilter";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchInfo> queryResult = branchInfoService.getSubCompany();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "机构绩效", notes = "机构绩效", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance", method = {RequestMethod.POST})
    public String performance01(
            @ApiParam(
                    value = "branchId <--- 2020"
            )
            @RequestBody ApiParams apiParams
    ) {

        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_branch_dashboard_01").getLast_build_date().replaceAll("-", "")).substring(0, 6);
        String branchId = apiParams.getBranchId();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/branch" + "performance"
                + "endDate" + endDate + "branchId" + branchId;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchPerformance> queryResult1 = branchPerformanceService.getBranchPerformance01(endDate, branchId);

        List<BranchPerformance> queryResult2 = branchPerformanceService.getBranchPerformance02(endDate, branchId);
        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("subcompany_name");
        valueName.add("market_rate_rank");
        valueName.add("market_rate");
        Map<String, Object> mappingResult2 = branchPerformanceService.mapping(queryResult2, xAxisData, seriesData, valueName);

        List<BranchPerformance> queryResult3 = branchPerformanceService.getBranchPerformance03(endDate, branchId);
        xAxisData = new ArrayList<>();
        seriesData = new HashMap<>();
        valueName = new ArrayList<>();
        valueName.add("subcompany_name");
        valueName.add("profit");
        valueName.add("profit_yoy");
        valueName.add("profit_rank");
        Map<String, Object> mappingResult3 = branchPerformanceService.mapping(queryResult3, xAxisData, seriesData, valueName);

        Map<String, Object> result = new HashMap<>();
        result.put("01", queryResult1);
        result.put("02", mappingResult2);
        result.put("03", mappingResult3);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);

        return JsonResult.successJson(result);
    }

}
