package com.ctsec.web;

import com.ctsec.model.jf.ExcelImportConfig;
import com.ctsec.model.jf.TradeStatisticsSh;
import com.ctsec.model.jf.TradeStatisticsSz;
import com.ctsec.service.DataImportService;
import com.ctsec.service.ExcelImportService;
import com.ctsec.util.ExcelUtil;
import com.ctsec.util.JsonResult;
import com.ctsec.util.ReflectUtil;
import com.ctsec.util.ResultCode;
import com.ctsec.vo.ApiParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("data/import")
public class DataImportController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataImportController.class);

    @Autowired
    ExcelImportService excelImportService;

    @ApiOperation(value = "数据导入配置", notes = "数据导入配置", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/excelConfig", method = {RequestMethod.POST})
    public String excelConfig(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<ExcelImportConfig> queryResult = excelImportService.getExcelImportConfig();
        ArrayList mappingResult = excelImportService.getExcelConfigMapping(queryResult);
        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "数据导入", notes = "数据导入", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/excel", method = {RequestMethod.POST})
    public String excel(
            @RequestParam(value = "file", required = false) MultipartFile file,
            String importId,
            String month
    ) {
        String result = "";
        switch (importId) {
            case "1":{
                result = excelImportService.importYearFinance(file);
                break;
            }
            case "2":{
                result = excelImportService.importQuarterFinance(file);
                break;
            }
            case "3":{
                result = excelImportService.importMonthFinance(file);
                break;
            }
            case "4":{
                result = excelImportService.importShTrade(Integer.valueOf(month), file);
                break;
            }
            case "5":{
                result = excelImportService.importSzTrade(Integer.valueOf(month), file);
                break;
            }
        }
        return result;
    }

}
