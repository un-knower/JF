package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.service.*;
import com.ctsec.util.AppConstant;
import com.ctsec.util.DateUtil;
import com.ctsec.util.JsonResult;
import com.ctsec.util.ReflectUtil;
import com.ctsec.vo.ApiParams;
import com.ctsec.vo.KPILeft;
import com.ctsec.vo.KPIRight;
import com.ctsec.vo.TrendAnalysis;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Field;
import java.util.*;

/**
 * KPI页面调度控制层
 *
 * Created by luchisheng on 2017/11/9.
 */

@Controller
@RequestMapping("api/kpi")
@Api(value = "KPIController")
public class KPIController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    private CubeInfoService cubeInfoService;

    @Autowired
    private ParamDateService paramDateService;

    @Autowired
    private KPIService kpiService;

    @Autowired
    private TrendAnalysisService trendAnalysisService;

    @ApiOperation(value = "关键指标左", notes = "关键指标左侧数据", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/kpiLeft", method = { RequestMethod.POST })
    public String kpiLeft(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/kpiLeft";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<KPILeft> queryResultList = kpiService.getKPILeft();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "关键指标右", notes = "关键指标右侧数据", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/kpiRight", method = { RequestMethod.POST })
    public String kpiRight(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/kpiRight";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String endDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date().replaceAll("-", "");
        String monthEndDate1 = paramDateService.getKPIRightToDay(endDate, "M");
        String monthStartDate = paramDateService.getKPIRightFromDay(endDate, "M", "0");
        String monthStartDate1 = paramDateService.getKPIRightFromDay(endDate, "M", "1");
        String yearEndDate1 = paramDateService.getKPIRightToDay(endDate, "Y");;
        String yearStartDate = paramDateService.getKPIRightFromDay(endDate, "Y", "0");
        String yearStartDate1 = paramDateService.getKPIRightFromDay(endDate, "Y", "1");

        List<KPIRight> dayQueryResultList = kpiService.getDayKPIRight();
        // 市占率要在早上9点半以后才能获取真正数据，否则会偏大很多，在此特殊处理，如果太大就先不显示
        Double dangerMarketRate = 3.0D;
        Date now = new Date();
        boolean isDangerTime = false;
        if (now.after(DateUtil.getAsertTime(8, 20)) && now.before(DateUtil.getAsertTime(9, 30))) {
            isDangerTime = true;
        }
        boolean useCache = true;
        if (isDangerTime && NumberUtils.toDouble(dayQueryResultList.get(0).getSf_amount_market_rate()) > dangerMarketRate) {
            dayQueryResultList.get(0).setSf_amount_market_rate("-");
            dayQueryResultList.get(0).setSf_market_rate_hb("-");
            useCache = false;
        }

        List<KPIRight> monthQueryResultList01 = kpiService.getMonthKPIRight01();
        List<KPIRight> monthQueryResultList02 = kpiService.getMonthKPIRight02();
        List<KPIRight> monthQueryResultList03 = kpiService.getKPIRight03(monthStartDate, endDate, monthStartDate1, monthEndDate1);
        List<KPIRight> yearQueryResultList01 = kpiService.getYearKPIRight01();
        List<KPIRight> yearQueryResultList02 = kpiService.getYearKPIRight02();
        List<KPIRight> yearQueryResultList03 = kpiService.getKPIRight03(yearStartDate, endDate, yearStartDate1, yearEndDate1);

        KPIRight monthResult = monthQueryResultList01.get(0);
        KPIRight yearResult = yearQueryResultList01.get(0);
        Field[] fields = KPIRight.class.getDeclaredFields();
        for (Field field: fields) {
            field.setAccessible(true);
            try {
                if (field.get(monthResult) == null || field.get(monthResult).equals("-"))
                    if (!monthQueryResultList02.isEmpty())
                        ReflectUtil.setFieldValueByType(field, monthResult,
                                field.get(monthQueryResultList02.get(0)) != null ? (String) field.get(monthQueryResultList02.get(0)) : null);
                    else
                        ReflectUtil.setFieldValueByType(field, monthResult,"-");
                if (field.get(monthResult) == null || field.get(monthResult).equals("-"))
                    if (!monthQueryResultList03.isEmpty())
                        ReflectUtil.setFieldValueByType(field, monthResult,
                                field.get(monthQueryResultList03.get(0)) != null ? (String) field.get(monthQueryResultList03.get(0)) : null);
                    else
                        ReflectUtil.setFieldValueByType(field, monthResult,"-");
                if (field.get(yearResult) == null || field.get(yearResult).equals("-"))
                    if (!yearQueryResultList02.isEmpty())
                        ReflectUtil.setFieldValueByType(field, yearResult,
                                field.get(yearQueryResultList02.get(0)) != null ? (String) field.get(yearQueryResultList02.get(0)) : null);
                    else
                        ReflectUtil.setFieldValueByType(field, yearResult,"-");
                if (field.get(yearResult) == null || field.get(yearResult).equals("-"))
                    if (!yearQueryResultList03.isEmpty())
                        ReflectUtil.setFieldValueByType(field, yearResult,
                                field.get(yearQueryResultList03.get(0)) != null ? (String) field.get(yearQueryResultList03.get(0)) : null);
                    else
                        ReflectUtil.setFieldValueByType(field, yearResult,"-");
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        Map<String, KPIRight> result = new HashMap<>();
        result.put("day", dayQueryResultList.get(0));
        result.put("month", monthResult);
        result.put("year", yearResult);

        /**
         * redis缓存请求结果
         */
        if (useCache) {
            jedisService.setJedisResult(redisKey, JsonResult.successJson(result).replaceAll("(-)?9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);
        }

        return JsonResult.successJson(result).replaceAll("(-)?9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-公司代理买卖交易量当月及累计市占率趋势",
            notes = "业务绩效-公司代理买卖交易量当月及累计市占率趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance01", method = { RequestMethod.POST })
    public String performance01(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance01";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance01(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("buy_sell_amount");
        valueName.add("buy_sell_amount_rate");
        valueName.add("buy_sell_rate_zhejiang");
        valueName.add("buy_sell_rate_zhejiang_sum");
        valueName.add("buy_sell_market_rate");
        valueName.add("buy_sell_market_rate_sum");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-公司两融市占率和总交易市占率的单月趋势对比图",
            notes = "业务绩效-公司两融市占率和总交易市占率的单月趋势对比图", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance02", method = { RequestMethod.POST })
    public String performance02(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance02";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance02(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("margin_trading_market_rate");
        valueName.add("margin_trading_market_rate_mom");
        valueName.add("all_trading_market_rate");
        valueName.add("all_trading_market_rate_mom");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-公司和市场的单月净佣金费率趋势对比图",
            notes = "业务绩效-公司和市场的单月净佣金费率趋势对比图", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance03", method = { RequestMethod.POST })
    public String performance03(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance03";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance03(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("stock_trading_fee_rate");
        valueName.add("margin_trading_fee_rate");
        valueName.add("ctzq_net_commission_fee_rate");
        valueName.add("market_net_commission_fee_rate");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-两融余额及市占率趋势",
            notes = "业务绩效-两融余额及市占率趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance04", method = { RequestMethod.POST })
    public String performance04(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance04";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance04(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("margin_trading_balance");
        valueName.add("margin_trading_balance_mom");
        valueName.add("margin_trading_balance_yoy");
        valueName.add("margin_trading_market_rate");
        valueName.add("margin_trading_market_rate_mom");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-分公司KPI指标完成情况", notes = "分公司KPI指标完成情况", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance05", method = { RequestMethod.POST })
    public String performance05(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance05";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance05();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-营业部经营情况", notes = "业务绩效-营业部经营情况", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance06", method = { RequestMethod.POST })
    public String performance06(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance06";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance06();
        ArrayList mappingResult = trendAnalysisService.performanceMapping06(queryResultList);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "业务绩效-券商排名", notes = "TOP25家券商交易量(股+基)及市场份额排行", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/performance07", method = { RequestMethod.POST })
    public String performance07(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/performance07";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getPerformance07();
        Map<String, Object> mappingResult = trendAnalysisService.performanceMapping07(queryResultList);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-代理买卖净收入市占率及排名",
            notes = "收入支出-代理买卖净收入市占率及排名", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp01", method = { RequestMethod.POST })
    public String incomeExpenditure01(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp01";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure01(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("buy_sell_net_income");
        valueName.add("buy_sell_market_rate");
        valueName.add("buy_sell_rank");
        valueName.add("buy_sell_rank_label");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-经纪业务主要收入占比变动",
            notes = "收入支出-经纪业务主要收入占比变动", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp02", method = { RequestMethod.POST })
    public String incomeExpenditure02(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp02";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure02();

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("broker_fee_commission_income");
        valueName.add("broker_interest_income");
        valueName.add("margin_trading_balance_divid");
        valueName.add("broker_inte_service_income");
        valueName.add("broker_fee_commission_income_rate");
        valueName.add("broker_interest_income_rate");
        valueName.add("margin_trading_balance_divid_rate");
        valueName.add("broker_inte_service_income_rate");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-佣金收入增长趋势图",
            notes = "收入支出-佣金收入增长趋势图", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp03", method = { RequestMethod.POST })
    public String incomeExpenditure03(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp03";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure03(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("broker_fee_commission_income");
        valueName.add("broker_fee_commission_income_mom");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-两融余额息费分成",
            notes = "收入支出-两融余额息费分成", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp04", method = { RequestMethod.POST })
    public String incomeExpenditure04(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp04";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure04(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("margin_trading_balance_divid");
        valueName.add("margin_trading_balance_divid_mom");
        valueName.add("margin_trading_balance_divid_sum");
        valueName.add("margin_trading_balance_divid_sum_yoy");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-成本支出变化趋势图&固定费用各项支出趋势图",
            notes = "收入支出-成本支出变化趋势图&固定费用各项支出趋势图", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp05", method = { RequestMethod.POST })
    public String incomeExpenditure05(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp05";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure05(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("all_expenses");
        valueName.add("all_expenses_mom");
        valueName.add("taxes_expenses");
        valueName.add("taxes_expenses_mom");
        valueName.add("protection_fund_expenses");
        valueName.add("protection_fund_expenses_mom");
        valueName.add("management_fee_expenses");
        valueName.add("management_fee_expenses_mom");
        valueName.add("fixed_expenses");
        valueName.add("fixed_expenses_mom");
        valueName.add("change_expenses");
        valueName.add("change_expenses_mom");
        valueName.add("hr_expenses");
        valueName.add("hr_expenses_mom");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-经济业务利润变化趋势",
            notes = "收入支出-经济业务利润变化趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp06", method = { RequestMethod.POST })
    public String incomeExpenditure06(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp06";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure06(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("broker_profit_goal");
        valueName.add("broker_profit");
        valueName.add("broker_profit_goal_mom");
        valueName.add("broker_profit_goal_sum");
        valueName.add("broker_profit_index_goal_sum");
        valueName.add("broker_profit_goal_rate");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "收入支出-各类网点考核市占率及利润变化趋势",
            notes = "收入支出-各类网点考核市占率及利润变化趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/incExp07", method = { RequestMethod.POST })
    public String incomeExpenditure07(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/incExp07";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getIncomeExpenditure07(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("center_branch_profit");
        valueName.add("a_branch_profit");
        valueName.add("b_branch_profit");
        valueName.add("c_branch_profit");
        valueName.add("d_branch_profit");
        valueName.add("x_branch_profit");
        valueName.add("second_branch_profit");
        valueName.add("center_branch_market_rate");
        valueName.add("a_branch_market_rate");
        valueName.add("b_branch_market_rate");
        valueName.add("c_branch_market_rate");
        valueName.add("d_branch_market_rate");
        valueName.add("x_branch_market_rate");
        valueName.add("second_branch_market_rate");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-公司及全国新增开户数趋势",
            notes = "客户资产-公司及全国新增开户数趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer01", method = { RequestMethod.POST })
    public String customerAsset01(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer01";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset01(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("asset");
        valueName.add("asset_mom");
        valueName.add("market_balance");
        valueName.add("market_balance_mom");
        valueName.add("assecu_balance");
        valueName.add("secu_balance_mom");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-资产保值率及资产周转率趋势",
            notes = "客户资产-资产保值率及资产周转率趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer02", method = { RequestMethod.POST })
    public String customerAsset02(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer02";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String endDate = paramDateService.getKpiCurrentMonth(clearDate);
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset02(fromDate, endDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("asset_turnover_rate");
        valueName.add("asset_turnover_rate_sum");
        valueName.add("asset_hedge_rate");
        valueName.add("asset_hedge_rate_sum");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-客户业务类型 客户资产结构",
            notes = "客户资产-客户业务类型 客户资产结构", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer03", method = { RequestMethod.POST })
    public String customerAsset03(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer03";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String endDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset03(endDate);

        Map<String, Object> mappingResult = trendAnalysisService.customerAssetMapping03(queryResultList);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);

    }

    @ApiOperation(value = "客户资产-净存入资金与净转入市值变化趋势",
            notes = "客户资产-净存入资金与净转入市值变化趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer04", method = { RequestMethod.POST })
    public String customerAsset04(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer04";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiMinMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset04(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("in_capital");
        valueName.add("in_capital_sum");
        valueName.add("in_value");
        valueName.add("in_value_sum");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult);

    }

    @ApiOperation(value = "客户资产-公司及全国新增开户数趋势",
            notes = "客户资产-公司及全国新增开户数趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer05", method = { RequestMethod.POST })
    public String customerAsset05(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer05";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset05(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("new_custom");
        valueName.add("new_custom_market_rate");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-公司及全国累计新增开户数趋势",
            notes = "客户资产-公司及全国累计新增开户数趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer06", method = { RequestMethod.POST })
    public String customerAsset06(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer06";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastMinMonth(clearDate);
        String toDate = paramDateService.getKpiLastMaxMonth(clearDate);
        String fromDate1 = paramDateService.getKpiMinMonth(clearDate);
        String toDate1 = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset06(fromDate, toDate, fromDate1, toDate1);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("new_custom_sum_ly");
        valueName.add("new_custom_market_rate_sum_ly");
        valueName.add("new_custom_sum");
        valueName.add("new_custom_market_rate_sum");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-新开户资产额及交易佣金趋势",
            notes = "客户资产-新开户资产额及交易佣金趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer07", method = { RequestMethod.POST })
    public String customerAsset07(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer07";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastYearMonth(clearDate);
        String toDate = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset07(fromDate, toDate);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("new_custom_asset");
        valueName.add("new_custom_commission");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-新开户资产额及交易佣金累计趋势",
            notes = "客户资产-新开户资产额及交易佣金累计趋势", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer08", method = { RequestMethod.POST })
    public String customerAsset08(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer08";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String clearDate = cubeInfoService.getByCube("c_kpi_dashboard_daily_data_01").getLast_build_date();
        clearDate = clearDate.replaceAll("-", "");
        String fromDate = paramDateService.getKpiLastMinMonth(clearDate);
        String toDate = paramDateService.getKpiLastMaxMonth(clearDate);
        String fromDate1 = paramDateService.getKpiMinMonth(clearDate);
        String toDate1 = paramDateService.getKpiCurrentMonth(clearDate);

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset08(fromDate, toDate, fromDate1, toDate1);

        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("new_custom_asset_sum_ly");
        valueName.add("new_custom_commission_sum_ly");
        valueName.add("new_custom_asset_sum");
        valueName.add("new_custom_commission_sum");
        Map<String, Object> mappingResult = trendAnalysisService.mapping(queryResultList, xAxisData, seriesData, valueName);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(mappingResult).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "客户资产-近一月新增客户及佣金分布",
            notes = "客户资产-近一月新增客户及佣金分布", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer09", method = { RequestMethod.POST })
    public String customerAsset09(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer09";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset09();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList);

    }

    @ApiOperation(value = "客户资产-浙江省的新客及新客交易佣金",
            notes = "客户资产-浙江省的新客及新客交易佣金", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/customer10", method = { RequestMethod.POST })
    public String customerAsset10(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/kpi" + "/customer10";
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<TrendAnalysis> queryResultList = trendAnalysisService.getCustomerAsset10();

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList);

    }

}
