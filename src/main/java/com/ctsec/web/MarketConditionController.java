package com.ctsec.web;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.vo.*;
import com.ctsec.service.*;
import com.ctsec.util.AppConstant;
import com.ctsec.util.DateUtil;
import com.ctsec.util.JsonResult;
import io.swagger.annotations.*;
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
 * 市场环境页面调度控制层
 *
 * Created by luchisheng on 2017/11/7.
 */

@Controller
@RequestMapping("api/market")
@Api(value = "MarketConditionController")
public class MarketConditionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private JedisService jedisService;

    @Autowired
    private InitService initService;

    @Autowired
    private ParamDateService paramDateService;

    @Autowired
    private PolylineService polylineService;

    @Autowired
    private MarketLineService marketLineService;

    @Autowired
    private KLineIndexService kLineIndexService;

    @Autowired
    private StockFundTradingService stockFundTradingService;

    @Autowired
    private StockTradingService stockTradingService;

    @Autowired
    private FundTradingService  fundTradingService;

    @Autowired
    private MarginTradingService marginTradingService;

    @Autowired
    private MarketBranchService marketBranchService;

    @Autowired
    private CubeInfoService cubeInfoService;

    @ApiOperation(value = "指数概览", notes = "K线指数概览", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/kLineIndex", method = { RequestMethod.POST })
    public String kLineIndexByDay(
            @ApiParam(
                    value = "startDate <--- 20161108\n" +
                            "secuCode <--- 000001,399001,399005,399006"
            )
            @RequestBody ApiParams apiParams
    ) {
        String startDate = initService.paramsReplaceNull(apiParams, "startDate");
        String secuCodes = apiParams.getSecuCode();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/market" + "/kLineIndex"
                + "startDate" + startDate + "secuCode" + secuCodes;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String paramSecuCodes = "'" + secuCodes.replaceAll(",","','") + "'";

        Map<String, List<KLineIndex>> result = new HashMap<>();

        List<KLineIndex> queryResultList = kLineIndexService.getDayKLine(paramSecuCodes, startDate);

        String[] secuCodeList = secuCodes.split(",");
        for (String secuCode: secuCodeList ) {
            List<KLineIndex> KLineList = new ArrayList<>();
            for (KLineIndex KLine: queryResultList) {
                if (KLine.getSecu_code().equals(secuCode)) {
                    KLineList.add(KLine);
                }
            }
            result.put(secuCode, KLineList);
        }

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }
    
    @ApiOperation(value = "交易信息概览", notes = "股基、股票、基金和融资融券交易信息概览", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/tradingInfo", method = { RequestMethod.POST})
    public String stockFundMarginTradingInfo(
            @ApiParam(
                    value = "dateType <--- M"
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_jy_k_day_01").getLast_build_date().replaceAll("-", ""));
        String dateType = apiParams.getDateType() == null ? "M" : apiParams.getDateType();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/market" + "/tradingInfo"
                + "endDate" + endDate + "dateType" + dateType;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        String preEndDate = paramDateService.getTradingInfoPreDay(endDate, dateType);

        List<StockFundMarginTrading> queryResultList_stockFund01 = stockFundTradingService.getStockFundTrading01(endDate, preEndDate);
        List<StockFundMarginTrading> queryResultList_stock01 = stockTradingService.getStockTrading01(endDate, preEndDate);
        List<StockFundMarginTrading> queryResultList_fund01 = fundTradingService.getFundTrading01(endDate, preEndDate);
        List<StockFundMarginTrading> queryResultList_margin01 = marginTradingService.getDayMarginTrading01(endDate, preEndDate);

        Map<String, Object> result = new HashMap<>();
        result.put("stock_fund_trading", queryResultList_stockFund01);
        result.put("stock_trading", queryResultList_stock01);
        result.put("fund_trading", queryResultList_fund01);
        result.put("margin_trading", queryResultList_margin01);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("9.999999999E9", "-");
    }

    @ApiOperation(value = "市场环境趋势", notes = "全国及公司股基、股票、基金总市值和融资融券交易余额变化&市占率变化", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/marketLine", method = {RequestMethod.POST})
    public String marketLine(
            @ApiParam(
                    value = "dateType <--- D"
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = paramDateService.getTradingDay(cubeInfoService.getByCube("c_jy_k_day_01").getLast_build_date().replaceAll("-", ""));
        String dateType = apiParams.getDateType()==null ? "D" : apiParams.getDateType();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/market" + "/marketLine"
                + "endDate" + endDate + "dateType" + dateType;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<MarketLine> queryResult_stockFund = stockFundTradingService.getStockFundTrading11(endDate, dateType);
        List<String> xAxisData = new ArrayList<>();
        Map<String, Object> seriesData = new HashMap<>();
        List<String> valueName = new ArrayList<>();
        valueName.add("sf");
        valueName.add("sf_rate");
        valueName.add("total_sf");
        Map<String, Object> mappingResult_stockFund = marketLineService.mapping(queryResult_stockFund, xAxisData, seriesData, valueName);

        List<MarketLine> queryResult_stock = stockTradingService.getStockTrading11(endDate, dateType);
        xAxisData = new ArrayList<>();
        seriesData = new HashMap<>();
        valueName = new ArrayList<>();
        valueName.add("total_s");
        valueName.add("total_s_sh");
        valueName.add("total_s_sz");
        valueName.add("total_s_stb");
        valueName.add("s_hk");
        valueName.add("s");
        valueName.add("s_sh");
        valueName.add("s_sz");
        valueName.add("s_stb");
        valueName.add("s_hk");
        valueName.add("s_sh_rate");
        valueName.add("s_sz_rate");
        Map<String, Object> mappingResult_stock = marketLineService.mapping(queryResult_stock, xAxisData, seriesData, valueName);

        List<MarketLine> queryResult_fund = fundTradingService.getFundTrading11(endDate, dateType);
        xAxisData = new ArrayList<>();
        seriesData = new HashMap<>();
        valueName.add("total_f");
        valueName.add("total_f_sh");
        valueName.add("total_f_sz");
        valueName.add("f");
        valueName.add("f_sh");
        valueName.add("f_sz");
        valueName.add("f_sh_rate");
        valueName.add("f_sz_rate");
        Map<String, Object> mappingResult_fund = marketLineService.mapping(queryResult_fund, xAxisData, seriesData, valueName);

        List<MarketLine> queryResult_margin = marginTradingService.getMarginTrading11(endDate, dateType);
        xAxisData = new ArrayList<>();
        seriesData = new HashMap<>();
        valueName.add("total_fin_slo");
        valueName.add("fin_slo");
        valueName.add("fin_slo_rate");
        Map<String, Object> mappingResult_margin = marketLineService.mapping(queryResult_margin, xAxisData, seriesData, valueName);

        Map<String, Object> result = new HashMap<>();
        result.put("stockFund", mappingResult_stockFund);
        result.put("stock", mappingResult_stock);
        result.put("fund", mappingResult_fund);
        result.put("margin", mappingResult_margin);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-"), 24 * 60 * 60);

        return JsonResult.successJson(result).replaceAll("9999999999.(00)+", "-").replaceAll("(-)?9.999999999E9", "-");

    }

    @ApiOperation(value = "各大券商营业部数量", notes = "各大券商营业部数量", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/branch", method = {RequestMethod.POST})
    public String branch(
            @ApiParam(
                    value = "endDate <--- 201712"
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/market" + "/branch"
                + "endDate" + endDate;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<MarketBranch> marketBranchList = marketBranchService.getMarketBranch(endDate);

        List<MarketBranch> marketBranchCTZQList = marketBranchService.getMarketBranchIn("财通证券股份有限公司", endDate);

        Map<String, Object> result = new HashMap<>();
        result.put("branch", marketBranchList);
        result.put("ctzq", marketBranchCTZQList);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(result), 24 * 60 * 60);

        return JsonResult.successJson(result);
    }

    @ApiOperation(value = "各大券商营业部下钻", notes = "各大券商营业部下钻", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/branchIn", method = {RequestMethod.POST})
    public String branchIn(
            @ApiParam(
                    value = "endDate <--- 201712\n" +
                            "secuName <--- 财通证券股份有限公司"
            )
            @RequestBody ApiParams apiParams
    ) {
        String endDate = initService.paramsReplaceNull(apiParams, "endDate");
        String secuName = apiParams.getSecuName();

        /**
         * redis缓存判断
         */
        String redisKey = "jf-" + "api/market" + "/branchIn"
                + "endDate" + endDate + "secuName" + secuName;
        String jedisResult = jedisService.getJedisResult(redisKey);
        if (jedisResult != null && !jedisResult.equals("ErrorGet!"))
            return jedisResult;

        List<MarketBranch> queryResultList = marketBranchService.getMarketBranchIn(secuName, endDate);

        /**
         * redis缓存请求结果
         */
        jedisService.setJedisResult(redisKey, JsonResult.successJson(queryResultList), 24 * 60 * 60);

        return JsonResult.successJson(queryResultList);
    }

}
