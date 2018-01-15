package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.model.jf.*;
import com.ctsec.service.*;
import com.ctsec.util.JsonResult;
import com.ctsec.vo.*;
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

import java.util.List;
import java.util.Map;

/**
 * 报表页面调度控制层
 *
 * Created by luchisheng on 2017/11/8.
 */

@Controller
@RequestMapping("api/report")
@Api(value = "ReportController")
public class ReportController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    private InitService initService;

    @Autowired
    private ReportFilterService reportFilterService;

    @Autowired
    private ReportTestService reportTestService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportDataService reportDataService;

    @ApiOperation(value = "分支机构筛选", notes = "分支机构筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/branch", method = {RequestMethod.POST})
    public String branch(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/branch";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<BranchInfo> queryResult = reportFilterService.getBranchBaseInfo();
        Map<String, Object> mappingResult = reportFilterService.branchBaseInfoMapping(queryResult);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "指标筛选", notes = "指标筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/index", method = {RequestMethod.POST})
    public String index(
            @ApiParam(
                    value = "reportId <--- 1"
            )
            @RequestBody ApiParams apiParams
    ) {
        String reportId = apiParams.getReportId();

        List<ReportIndex> queryResult = reportFilterService.getReportIndex(reportId);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "证券代码筛选", notes = "证券代码筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/stockCode", method = {RequestMethod.POST})
    @Deprecated
    public String stockCode(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/stockCode";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<SecuritiesInfo> queryResult = reportFilterService.getStockFilter();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "证券代码名称筛选", notes = "证券代码、证券名称关键字顺序搜索", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/secuSearch", method = {RequestMethod.POST})
    public String securitiesSearch(
            @ApiParam(
                    value = "searchKeyword <-- 1"
            )
            @RequestBody ApiParams apiParams
    ) {

        String searchKeyword = apiParams.getSearchKeyword();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/secuSearch"
                + "searchKeyword" + searchKeyword;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;
        else
            return JsonResult.successJson("Empty!");

    }

    @ApiOperation(value = "证券账号筛选", notes = "证券账号筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/stockAccount", method = {RequestMethod.POST})
    public String stockAccount(
            @ApiParam(
                    value = "customerNo <-- 33000007,33000015,33000106,33000167"
            )
            @RequestBody ApiParams apiParams
    ) {
        String customerNo = apiParams.getCustomerNo();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/stockAccount"
                + "customerNo" + customerNo;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String paramCustomerNos = "'" + customerNo.replaceAll(",","','") + "'";

        List<StockAccount> queryResult = reportFilterService.getStockAccount(paramCustomerNos);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "客户号筛选", notes = "客户号筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer", method = {RequestMethod.POST})
    public String customer(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/customer";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<CustomerInfo> queryResult = reportFilterService.getCustomer();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "资产分段筛选", notes = "资产分段筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/asset", method = {RequestMethod.POST})
    public String assetSection(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/asset";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<AssetSection> queryResult = reportFilterService.getAssetSection();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "报表数据样例", notes = "报表数据样例，来自mysql", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/reportTest", method = {RequestMethod.POST})
    @Deprecated
    public String reportTest(
            @ApiParam(
                    value = "reportId <-- 1\n" +
                            "branchId <-- 33,35,37\n" +
                            "startDate <-- 20171101\n" +
                            "endDate <-- 20171116"
            )
            @RequestBody ApiParams apiParams
    ) {
        String reportId = apiParams.getReportId();
        String branchId = apiParams.getBranchId();
        String startDate = initService.paramsReplaceNull(apiParams, "startDate");
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/report" + "/index"
                + "reportId" + reportId + "branchId" + branchId + "startDate" + startDate + "endDate" + endDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String paramBranchIds = "'" + branchId.replaceAll(",","','") + "'";
        List<ReportTestData> queryResult = reportTestService.getReportTest(paramBranchIds, startDate, endDate);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResult), 24 * 60 * 60);

        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "报表数据", notes = "报表数据获取统一接口", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/report", method = {RequestMethod.POST})
    public String report(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        String reportId = apiParams.getReportId();
        String result = "";
        switch (reportId) {
            case "1":{
                result = reportService.getReport01(apiParams);
                break;
            }
            case "2":{
                result = reportService.getReport02(apiParams);
                break;
            }
            case "3":{
                result = reportService.getReport03(apiParams);
                break;
            }
            case "4":{
                result = reportService.getReport04(apiParams);
                break;
            }
            case "5":{
                result = reportService.getReport05(apiParams);
                break;
            }
            case "6":{
                result = reportService.getReport06(apiParams);
                break;
            }
            case "7":{
                result = reportService.getReport07(apiParams);
                break;
            }
            case "8":{
                result = reportService.getReport08(apiParams);
                break;
            }
            case "9":{
                result = reportService.getReport09(apiParams);
                break;
            }
            case "10":{
                result = reportService.getReport10(apiParams);
                break;
            }
            case "11":{
                result = reportService.getReport11(apiParams);
                break;
            }
            case "12":{
                result = reportService.getReport12(apiParams);
                break;
            }
            case "13":{
                result = reportService.getReport13(apiParams);
                break;
            }
            case "1301":{
                result = reportService.getReport1301(apiParams);
                break;
            }
            case "14":{
                result = reportService.getReport14(apiParams);
                break;
            }
            case "15":{
                result = reportService.getReport15(apiParams);
                break;
            }

        }
        return result.replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");
    }

}

