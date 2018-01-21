package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.service.*;
import com.ctsec.util.ResultCode;
import com.ctsec.vo.*;
import com.ctsec.util.JsonResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 预处理调度控制层
 *
 * Created by luchisheng on 2017/11/16.
 */

@Controller
@RequestMapping("api/home")
@Api(value = "HomeController")
public class HomeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private IndexInfoService indexInfoService;

    @Autowired
    private CubeInfoService cubeInfoService;

    @Autowired
    private ParamDateService paramDateService;

    @Autowired
    private ReportFilterService reportFilterService;

    @Autowired
    private InitService initService;

    @ApiOperation(value = "系统指标信息", notes = "系统指标信息", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/indexInfo", method = {RequestMethod.POST})
    public String indexInfo(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<SystemIndexInfo> queryResult = indexInfoService.getIndexInfo();
        Map<String, Object> mappingResult = indexInfoService.InfoMapping(queryResult);

        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "系统时间", notes = "系统时间", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/clearDate", method = {RequestMethod.POST})
    public String clearDate(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<CubeInfo> quearyResult = cubeInfoService.getCubeInfo();

        return JsonResult.successJson(quearyResult);
    }

    @ApiOperation(value = "清除redis缓存", notes = "清除redis缓存", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/flushRedis", method = {RequestMethod.POST, RequestMethod.GET})
    public String flushRedis(String prefix) {
        prefix = StringUtils.isBlank(prefix) ? "jf-*" : prefix + "*";
        if (!StringUtils.startsWith(prefix,"jf-")) {
            return JsonResult.errorJson(ResultCode.PARAM_ERROR, "本系统缓存必须以'jf-'开头");
        }
        Set<String> keyList = jedisUtil.keys(prefix);

        String pattern = "^jf-api/(report|business)/(secu|cust)SearchsearchKeyword.*";
        Pattern r = Pattern.compile(pattern);

        for (String key: keyList) {
            Matcher matcher = r.matcher(key);
            if (matcher.matches())
                continue;
            jedisUtil.del(key);
        }
        return JsonResult.successJson("Redis Cache Cleanup Completed!");
    }

    @ApiOperation(value = "证券代码、证券名称搜索预处理", notes = "证券代码、证券名称关键字顺序搜索预处理，缓存至redis",
            produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/secuSearchInit", method = {RequestMethod.POST, RequestMethod.GET})
    public String securitiesSearchInit() {
        List<SecuritiesInfo> queryResult = reportFilterService.getStockFilter();
        String initResult = initService.getSecuritiesSearchInit(queryResult);
        return JsonResult.successJson(initResult);
    }

    @ApiOperation(value = "客户号搜索预处理", notes = "客户号关键字顺序搜索预处理，缓存至redis",
            produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/custSearchInit", method = {RequestMethod.POST, RequestMethod.GET})
    public String customerNoSearchInit() {
        List<CustomerInfo> queryResult1 = reportFilterService.getCustomer();
        List<CustomerInfo> queryResult2 = reportFilterService.getCustomer18();
        String initResult1 = initService.getCustomerNoSearchInit(queryResult1, "report");
        String initResult2 = initService.getCustomerNoSearchInit(queryResult2, "business");
        return JsonResult.successJson(initResult1 + " && " + initResult2);
    }

}
