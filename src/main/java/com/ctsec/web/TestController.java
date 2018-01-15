package com.ctsec.web;

import com.alibaba.fastjson.JSONObject;
import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.config.redis.JedisUtil;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.model.jf.KLine;
import com.ctsec.service.KLineService;
import com.ctsec.util.DateUtil;
import com.ctsec.util.JsonResult;
import com.ctsec.vo.Country;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.jdbc.Null;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Types;
import java.text.MessageFormat;
import java.util.List;

@Controller
@RequestMapping("test")
@Api(value = "TestController")
public class TestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;
    @Autowired
    private JedisUtil jedisUtil;
    @Autowired
    private KLineService kLineService;
    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @ApiOperation(value = "mapper测试", notes = "mapper测试用例")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "country", value = "国家参数", required = true, dataType = "String"),
            @ApiImplicitParam(name = "size", value = "数量限制参数", required = true, dataType = "Integer")
    })
    @ResponseBody
    @RequestMapping(value = "/mapper", method = { RequestMethod.POST})
    public String testRowMapper(String country, Integer size) {

        String sql = sqlQueryConfig.getSEL_KLINE_COUNTRY_BY_COUNTRY();
        sql = MessageFormat.format(sql, country, size);

        List<Country> demoList = kylinJdbcTemplate
                .query(sql, KylinRowMapper.getDefault(Country.class));

        return JSONObject.toJSONString(demoList);
    }

    @RequestMapping("redis")
    @ResponseBody
    public String getRedis() {
        System.out.println(jedisUtil.get("test-key-jf"));
        jedisUtil.set("test-key-jf", "test-key-jf-value", 1000);
        System.out.println(jedisUtil.get("test-key-jf"));
        return JsonResult.successJson();
    }

    @RequestMapping("kline")
    @ResponseBody
    public String getKline(String secuCode, String type) {
        List<KLine> kLines = kLineService.getDayKLine("000001",
                NumberUtils.toInt(DateUtil.getSimpleBeforeDate(365)));
        return JsonResult.successJson(kLines);
    }

}
