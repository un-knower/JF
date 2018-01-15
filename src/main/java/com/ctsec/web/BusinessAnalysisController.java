package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/11.
 */

@Controller
@RequestMapping("api/business")
@Api(value = "BusinessAnalysisController")
public class BusinessAnalysisController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    private InitService initService;

    @Autowired
    private CashManageFilterService cashManageFilterService;

    @Autowired
    private CustomerStatisticsService customerStatisticsService;

    @Autowired
    private SigningTrendService signingTrendService;

    @Autowired
    private ProductShareChangeService productShareChangeService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ParamDateService paramDateService;

    @Autowired
    private ReportFilterService reportFilterService;

    @ApiOperation(value = "产品编号", notes = "产品编号", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/prodCode", method = { RequestMethod.POST })
    public String productCode(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/business" + "/prodCode";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<ProductCode> queryResultList = cashManageFilterService.getProductCode();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList);

    }

    @ApiOperation(value = "客户统计", notes = "客户统计", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/statistics", method = { RequestMethod.POST })
    public String customerStatistics(
            @ApiParam(
                    value = "endDate <--- 20171122\n" +
                            "prodCode <--- 003479"
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");
        String prodCode = apiParams.getProdCode();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/business" + "/statistics"
                + "endDate" + endDate + "prodCode" + prodCode;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        endDate = paramDateService.getTradingDay(endDate);

        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";

        Map<String, List<CustomerStatistics>> result = new HashMap<>();

        List<CustomerStatistics> queryResultList1 = customerStatisticsService.getCustomerStatistics01(endDate, paramProdCode);
        List<CustomerStatistics> queryResultList2 = customerStatisticsService.getCustomerStatistics02(endDate, paramProdCode);

        result.put("01", queryResultList1);
        result.put("02", queryResultList2);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);

        return JsonResult.successJson(result);

    }

    @ApiOperation(value = "签约趋势", notes = "签约趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/trend", method = { RequestMethod.POST })
    public String signingTrend(
            @ApiParam(
                    value = "endDate <--- 20171101\n" +
                            "endDate <--- 20171220\n" +
                            "prodCode <--- 003479,C40005"
            )
            @RequestBody ApiParams apiParams
    ) {
        String startDate = initService.paramsReplaceNull(apiParams, "startDate");
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");
        String prodCode = apiParams.getProdCode();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/business" + "/trend"
                + "startDate" + startDate + "endDate" + endDate + "prodCode" + prodCode;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";

        List<SigningTrend> queryResultList = signingTrendService.getSigningTrend(startDate, endDate, paramProdCode);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("sign_num");
        valueName.add("remove_num");
        Map<String, Object> mappingResult = signingTrendService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);

    }

    @ApiOperation(value = "现金理财产品份额变化（亿）", notes = "现金理财产品份额变化（亿）", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/change", method = { RequestMethod.POST })
    public String productShareChange(
            @ApiParam(
                    value = "endDate <--- 20171101\n" +
                            "endDate <--- 20171220\n" +
                            "prodCode <--- 003479,C40005"
            )
            @RequestBody ApiParams apiParams
    ) {
        String startDate = initService.paramsReplaceNull(apiParams, "startDate");
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");
        String prodCode = apiParams.getProdCode();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/business" + "/change"
                + "startDate" + startDate + "endDate" + endDate + "prodCode" + prodCode;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String paramProdCode = "'" + prodCode.replaceAll(",","','") + "'";

        List<ProductShareChange> queryResultList = productShareChangeService.getProductShareChange(startDate, endDate, paramProdCode);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        Map<String, Object> mappingResult = productShareChangeService.mapping(queryResultList, xAxisData, seriesData);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);

    }

    @ApiOperation(value = "客户号筛选", notes = "客户号筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/custSearch", method = {RequestMethod.POST})
    public String customer(
            @ApiParam(
                    value = "searchKeyword <-- 1"
            )
            @RequestBody ApiParams apiParams
    ) {

        String searchKeyword = apiParams.getSearchKeyword();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/business" + "/custSearch"
                + "searchKeyword" + searchKeyword;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;
        else
            return JsonResult.successJson("Empty!");
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
            case "16":{
                result = reportService.getReport16(apiParams);
                break;
            }
            case "17":{
                result = reportService.getReport17(apiParams);
                break;
            }
            case "18":{
                result = reportService.getReport18(apiParams);
                break;
            }

        }
        return result.replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");
    }

}
