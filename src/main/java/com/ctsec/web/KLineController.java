package com.ctsec.web;

import com.ctsec.model.jf.KLine;
import com.ctsec.service.KLineService;
import com.ctsec.util.AppConstant;
import com.ctsec.util.DateUtil;
import com.ctsec.util.JsonResult;
import com.ctsec.util.ResultCode;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/kline")
@Deprecated
public class KLineController {

    @Autowired
    private KLineService kLineService;

    /**
     * 返回指数的k线数据
     * type: D表示日k，M表示月k,Y表示年k
     */
    @RequestMapping("index")
    public String getKLine(String secuCode, String type, Integer fromDate) {
        if (StringUtils.isBlank(secuCode)) {
            return JsonResult.errorJson(ResultCode.PARAM_EMPTY, "指数代码不能为空");
        }
        List<KLine> kLines;
        if (AppConstant.TIME_TYPE_YEAR.equals(type)) {
            kLines = kLineService.getYearKLine(secuCode);
        } else if (AppConstant.TIME_TYPE_MONTH.equals(type)) {
            fromDate = fromDate == null ? NumberUtils.toInt(DateUtil.getSimpleBeforeDate(3 * AppConstant.DAY_OF_ONE_YEAR)) : fromDate;
            kLines = kLineService.getMonthKLine(secuCode, fromDate);
        } else {
            fromDate = fromDate == null ? NumberUtils.toInt(DateUtil.getSimpleBeforeDate(AppConstant.DAY_OF_ONE_YEAR)) : fromDate;
            kLines = kLineService.getDayKLine(secuCode, fromDate);
        }
        return JsonResult.successJson(kLines);
    }

}
