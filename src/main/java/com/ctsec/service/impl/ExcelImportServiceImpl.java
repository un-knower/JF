package com.ctsec.service.impl;

import com.ctsec.dao.jf.ExcelImportConfigMapper;
import com.ctsec.model.jf.ExcelImportConfig;
import com.ctsec.model.jf.ManualAdjust;
import com.ctsec.model.jf.TradeStatisticsSh;
import com.ctsec.model.jf.TradeStatisticsSz;
import com.ctsec.service.DataImportService;
import com.ctsec.service.ExcelImportService;
import com.ctsec.util.ExcelUtil;
import com.ctsec.util.JsonResult;
import com.ctsec.util.ReflectUtil;
import com.ctsec.util.ResultCode;
import com.ctsec.web.DataImportController;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by luchisheng on 2017/12/22.
 */

@Service("excelImportService")
public class ExcelImportServiceImpl implements ExcelImportService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataImportController.class);

    private static Map<String, String> yearFinanceExcelNameMap = new HashMap<>();
    private static Map<String, String> quarterFinanceExcelNameMap = new HashMap<>();
    private static Map<String, String> monthFinanceExcelNameMap = new HashMap<>();
    private static Map<String, String> adjustItemMappingMap = new HashMap<>();
    private static Map<String, String> shTradeExcelNameMap = new HashMap<>();
    private static Map<String, String> szTradeExcelNameMap = new HashMap<>();

    static {
        yearFinanceExcelNameMap.put("年度", "year");
        yearFinanceExcelNameMap.put("分支机构名称", "branch_code");
        yearFinanceExcelNameMap.put("调整项目", "adjust_item");
        yearFinanceExcelNameMap.put("调整金额", "adjust_amount");

        quarterFinanceExcelNameMap.put("年度", "year");
        quarterFinanceExcelNameMap.put("季度", "quarter");
        quarterFinanceExcelNameMap.put("分支机构名称", "branch_code");
        quarterFinanceExcelNameMap.put("调整项目", "adjust_item");
        quarterFinanceExcelNameMap.put("调整金额", "adjust_amount");

        monthFinanceExcelNameMap.put("年度", "year");
        monthFinanceExcelNameMap.put("月度", "month");
        monthFinanceExcelNameMap.put("分支机构名称", "branch_code");
        monthFinanceExcelNameMap.put("调整项目", "adjust_item");
        monthFinanceExcelNameMap.put("调整金额", "adjust_amount");

        adjustItemMappingMap.put("年底调整佣金", "year_end_commission");
        adjustItemMappingMap.put("年底调整交易量", "year_end_amount");
        adjustItemMappingMap.put("引流交易量", "reward_amount");
        adjustItemMappingMap.put("引流佣金", "reward_commission");
        adjustItemMappingMap.put("基金分仓交易量", "fund_division_amount");

        shTradeExcelNameMap.put("会员名称", "name");
        shTradeExcelNameMap.put("席位数", "set_num");
        shTradeExcelNameMap.put("总计", "total");
        shTradeExcelNameMap.put("股票", "stock");
        shTradeExcelNameMap.put("证券投资基金", "fund");
        shTradeExcelNameMap.put("ETF", "etf");
        shTradeExcelNameMap.put("国债现货", "national_debt");
        shTradeExcelNameMap.put("地方政府债", "government_debt");
        shTradeExcelNameMap.put("公司债、企业债", "company_debt");
        shTradeExcelNameMap.put("可转债", "convertible_bond");
        shTradeExcelNameMap.put("债券回购", "bond_repurchase");
        shTradeExcelNameMap.put("权证", "warrant");

        szTradeExcelNameMap.put("会员名称", "name");
        szTradeExcelNameMap.put("总交易金额", "total");
        szTradeExcelNameMap.put("占市场(%)", "rate");
        szTradeExcelNameMap.put("股票交易金额", "stock");
        szTradeExcelNameMap.put("基金交易金额", "fund");
        szTradeExcelNameMap.put("债券交易金额", "debt");
        szTradeExcelNameMap.put("权证交易金额", "warrant");
    }

    @Autowired
    private ExcelImportConfigMapper excelImportConfigMapper;

    @Autowired
    private DataImportService dataImportService;

    public List<ExcelImportConfig> getExcelImportConfig() {
        return excelImportConfigMapper.selectConfig();
    }

    @Override
    public ArrayList getExcelConfigMapping(List<ExcelImportConfig> excelImportConfigList) {
        Set<String> categorySet = new HashSet<>();
        Map<String, Object> categoryMap = new LinkedHashMap<>();
        for (ExcelImportConfig excelImportConfig: excelImportConfigList) {
            String category = excelImportConfig.getCategory1();
            HashedMap categoryItem = new HashedMap();
            if (categorySet.contains(category)) {
                categoryItem = (HashedMap) categoryMap.get(category);
            }
            else {
                categorySet.add(category);
                categoryItem.put("category1", category);
                categoryItem.put("category2", new ArrayList<>());
            }
            List<HashedMap> categoryList2 = (List<HashedMap>) categoryItem.get("category2");
            HashedMap categoryItem2 = new HashedMap();
            categoryItem2.put("category2", excelImportConfig.getCategory2());
            categoryItem2.put("id", excelImportConfig.getId());
            categoryItem2.put("simplePath", excelImportConfig.getSample_path());
            categoryList2.add(categoryItem2);
            categoryItem.put("category2", categoryList2);
            categoryMap.put(category, categoryItem);
        }
        return new ArrayList<>(categoryMap.values());
    }

    /**
     * 导入财务年度数据
     */
    @Override
    public String importYearFinance(MultipartFile file) {
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson("excel格式错误，文件请在excel中右键另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<ManualAdjust> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "年度")) {
                    for (String value : values) {
                        String fieldName = yearFinanceExcelNameMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find manual finance year excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < yearFinanceExcelNameMap.size()) {
                return JsonResult.errorJson("excel中请确认下面这些列的存在:" + yearFinanceExcelNameMap.keySet());
            }
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                ManualAdjust manualAdjust = new ManualAdjust();
                String year = "";
                String item = "";
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    if (fieldInExcel.get(j).equals("year")) {
                        year = values[j];
                        continue;
                    }
                    else if (fieldInExcel.get(j).equals("adjust_item")) {
                        item = values[j];
                        continue;
                    }
                    Field field = ManualAdjust.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, manualAdjust, values[j]);
                    }
                }
                manualAdjust.setAdjust_granularity(1);
                manualAdjust.setAdjust_time(Integer.valueOf(year));
                manualAdjust.setAdjust_item(adjustItemMappingMap.get(item));
                Date now = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
                manualAdjust.setUpdate_time(Integer.valueOf(dateFormat.format(now)));
                data.add(manualAdjust);
            }

            dataImportService.importManualAdjust(data);
            return JsonResult.successJson();
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics manual finance year to save error", e);
            return JsonResult.errorJson("upload excel error");
        }
    }

    /**
     * 导入财务季度数据
     */
    @Override
    public String importQuarterFinance(MultipartFile file) {
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson("excel格式错误，文件请在excel中右键另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<ManualAdjust> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "年度")) {
                    for (String value : values) {
                        String fieldName = quarterFinanceExcelNameMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find manual finance quarter excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < quarterFinanceExcelNameMap.size()) {
                return JsonResult.errorJson("excel中请确认下面这些列的存在:" + quarterFinanceExcelNameMap.keySet());
            }
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                ManualAdjust manualAdjust = new ManualAdjust();
                String year = "";
                String quarter = "";
                String item = "";
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    if (fieldInExcel.get(j).equals("year")) {
                        year = values[j];
                        continue;
                    }
                    else if (fieldInExcel.get(j).equals("quarter")) {
                        quarter = values[j];
                        continue;
                    }
                    else if (fieldInExcel.get(j).equals("adjust_item")) {
                        item = values[j];
                        continue;
                    }
                    Field field = ManualAdjust.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, manualAdjust, values[j]);
                    }
                }
                manualAdjust.setAdjust_granularity(2);
                manualAdjust.setAdjust_time(Integer.valueOf(year + quarter));
                manualAdjust.setAdjust_item(adjustItemMappingMap.get(item));
                Date now = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
                manualAdjust.setUpdate_time(Integer.valueOf(dateFormat.format(now)));
                data.add(manualAdjust);
            }

            dataImportService.importManualAdjust(data);
            return JsonResult.successJson();
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics manual finance quarter to save error", e);
            return JsonResult.errorJson("upload excel error");
        }
    }

    /**
     * 导入财务月度数据
     */
    @Override
    public String importMonthFinance(MultipartFile file) {
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson("excel格式错误，文件请在excel中右键另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<ManualAdjust> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "年度")) {
                    for (String value : values) {
                        String fieldName = monthFinanceExcelNameMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find manual finance month excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < monthFinanceExcelNameMap.size()) {
                return JsonResult.errorJson("excel中请确认下面这些列的存在:" + monthFinanceExcelNameMap.keySet());
            }
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                ManualAdjust manualAdjust = new ManualAdjust();
                String year = "";
                String month = "";
                String item = "";
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    if (fieldInExcel.get(j).equals("year")) {
                        year = values[j];
                        continue;
                    }
                    else if (fieldInExcel.get(j).equals("month")) {
                        month = values[j];
                        continue;
                    }
                    else if (fieldInExcel.get(j).equals("adjust_item")) {
                        item = values[j];
                        continue;
                    }
                    Field field = ManualAdjust.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, manualAdjust, values[j]);
                    }
                }
                manualAdjust.setAdjust_granularity(3);
                if (month.length() < 2)
                    month = "0" + month;
                manualAdjust.setAdjust_time(Integer.valueOf(year + month));
                manualAdjust.setAdjust_item(adjustItemMappingMap.get(item));
                Date now = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
                manualAdjust.setUpdate_time(Integer.valueOf(dateFormat.format(now)));
                data.add(manualAdjust);
            }

            dataImportService.importManualAdjust(data);
            return JsonResult.successJson();
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics manual finance month to save error", e);
            return JsonResult.errorJson("upload excel error");
        }
    }

    /**
     * 导入上交所的交易数据
     */
    @Override
    public String importShTrade(Integer month, MultipartFile file) {
        if (month == null || month.toString().length() != 6) {
            return JsonResult.errorJson(ResultCode.PARAM_ERROR, "月份数据错误");
        }
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson("excel格式错误，上交所网站导出的文件请在excel中右键另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<TradeStatisticsSh> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "会员名称")) {
                    for (String value : values) {
                        String fieldName = shTradeExcelNameMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find sh excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < shTradeExcelNameMap.size()) {
                return JsonResult.errorJson("excel中请确认下面这些列的存在:" + shTradeExcelNameMap.keySet());
            }
            Map<String, Integer> companyMap = dataImportService.getSecuCompanyNameIdMap();
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                TradeStatisticsSh tradeSh = new TradeStatisticsSh();
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    Field field = TradeStatisticsSh.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, tradeSh, values[j]);
                    }
                }
                tradeSh.setMonth_id(month);
                String cnName = StringUtils.replace(StringUtils.replace(tradeSh.getName(), ")", "）"), "(", "（");
                if (companyMap.get(cnName) == null) {
                    return JsonResult.errorJson("数据库中找不到券商[" + tradeSh.getName() + "]，请手动添加到库中名字id对应关系");
                } else {
                    tradeSh.setSecu_id(companyMap.get(cnName));
                }
                data.add(tradeSh);
            }

            dataImportService.importShTrade(data);
            return JsonResult.successJson();
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics sh to save error", e);
            return JsonResult.errorJson("upload excel error");
        }
    }

    /**
     * 导入深交所的交易数据
     */
    @Override
    public String importSzTrade(Integer month, MultipartFile file) {
        if (month == null || month.toString().length() != 6) {
            return JsonResult.errorJson(ResultCode.PARAM_ERROR, "月份数据错误");
        }
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson("excel格式错误，深交所网站导出的文件请在excel中右键另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<TradeStatisticsSz> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "会员名称")) {
                    for (String value : values) {
                        String fieldName = szTradeExcelNameMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find sz excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < szTradeExcelNameMap.size()) {
                return JsonResult.errorJson("excel中请确认下面这些列的存在:" + szTradeExcelNameMap.keySet());
            }
            Map<String, Integer> companyMap = dataImportService.getSecuCompanyNameIdMap();
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                TradeStatisticsSz tradeSz = new TradeStatisticsSz();
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    Field field = TradeStatisticsSz.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, tradeSz, values[j]);
                    }
                }
                tradeSz.setMonth_id(month);
                String cnName = StringUtils.replace(StringUtils.replace(tradeSz.getName(), ")", "）"), "(", "（");
                if (companyMap.get(cnName) == null) {
                    return JsonResult.errorJson("数据库中找不到券商[" + tradeSz.getName() + "]，请手动添加到库中名字id对应关系");
                } else {
                    tradeSz.setSecu_id(companyMap.get(cnName));
                }
                data.add(tradeSz);
            }

            dataImportService.importSzTrade(data);
            return JsonResult.successJson();
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics sz to save error", e);
            return JsonResult.errorJson("upload excel error");
        }
    }

}
