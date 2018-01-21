package com.ctsec.web;

import com.alibaba.fastjson.JSONArray;
import com.ctsec.model.jf.RelationGroup;
import com.ctsec.model.jf.RelationItem;
import com.ctsec.service.RelationService;
import com.ctsec.service.ReportDataService;
import com.ctsec.service.ReportService;
import com.ctsec.util.*;
import com.ctsec.vo.ApiParams;
import com.ctsec.vo.Relation;
import com.ctsec.vo.ReportData;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/15.
 */

@Controller
@RequestMapping("api/relation")
@Api(value = "RelationController")
public class RelationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataImportController.class);

    private static Map<String, String> relationMap = new HashMap<>();

    static {
        relationMap.put("关联方名称", "name");
        relationMap.put("关联交易核查期间", "trade_check");
        relationMap.put("营业执照(统一社会信用码)/身份证号", "code");
        relationMap.put("职务", "job");
        relationMap.put("性别", "sex");
        relationMap.put("备注", "remark");
    }

    @Autowired
    private RelationService relationService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportDataService reportDataService;

    @ApiOperation(value = "关联名单组名验重", notes = "关联名单组名验重", produces = "application/json")
    @ResponseBody
    @Deprecated
    @RequestMapping(value = "/groupExist", method = {RequestMethod.POST})
    public String groupExist(
            @ApiParam(
                    value = "groupName <--- 关联方查询"
            )
            @RequestBody ApiParams apiParams
    ) {
        String groupName = apiParams.getGroupName();
        Boolean exist = relationService.ifGroupExist(groupName);
        if (exist)
            return JsonResult.successJson("新增的关联名单组已存在！");
        else
            return JsonResult.successJson();
    }

    @ApiOperation(value = "关联名单组名模糊查询", notes = "关联名单组名模糊查询", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/groupMatch", method = {RequestMethod.POST})
    public String groupMatch(
            @ApiParam(
                    value = "groupName <--- 关联方查询"
            )
            @RequestBody ApiParams apiParams
    ) {
        String groupName = apiParams.getGroupName();
        List<String> queryResult = relationService.getMatchGroupName(groupName);
        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "数据导入", notes = "数据导入", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/import", method = {RequestMethod.POST})
    public String importExcel(
            @RequestParam(value = "file", required = false) MultipartFile file,
            String groupName
    ) {
        if (groupName == null || groupName.length() == 0) {
            return JsonResult.errorJson(ResultCode.PARAM_ERROR, "关联名单组名数据错误");
        }
        Boolean exist = relationService.ifGroupExist(groupName);
        String message = "";
        if (exist)
            message = "关联组:" + groupName + " 覆盖成功！";
        else
            message = "关联组:" + groupName + " 上传成功！";
        List<String[]> result;
        try {
            result = ExcelUtil.readExcel(file);
        } catch (Exception e) {
            return JsonResult.errorJson(ResultCode.FILE_FORMAT_ERROR, "excel格式错误，上传的关联名单文件请另存为新的xlsx文件后上传");
        }
        try {
            List<String> fieldInExcel = new ArrayList<>();
            List<RelationItem> data = new ArrayList<>();
            int i = 0;
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (StringUtils.equals(values[0], "关联方名称")) {
                    for (String value : values) {
                        String fieldName = relationMap.get(value);
                        if (fieldName == null) {
                            LOGGER.warn("cannot find relation excel field name from excel field map of {}", value);
                        } else {
                            fieldInExcel.add(fieldName);
                        }
                    }
                    i++;
                    break;
                }
            }
            if (fieldInExcel.size() < relationMap.size()) {
                return JsonResult.errorJson(ResultCode.FILE_FORMAT_ERROR, "excel中请确认下面这些列的存在:" + relationMap.keySet());
            }
            relationService.removeGroupByName(groupName);
            relationService.insertOneGroup(groupName);
            RelationGroup relationGroup = relationService.getOneGroup(groupName);
            Long groupId = relationGroup.getId();
            for (; i < result.size(); i++) {
                String[] values = result.get(i);
                if (values.length == 0 || StringUtils.isBlank(values[0])) {
                    break;
                }
                RelationItem relationItem = new RelationItem();
                for (int j = 0; j < fieldInExcel.size(); j++) {
                    if (fieldInExcel.get(j) == null) {
                        continue;
                    }
                    Field field = RelationItem.class.getDeclaredField(fieldInExcel.get(j));
                    if (field != null) {
                        ReflectUtil.setFieldValueByType(field, relationItem, values[j]);
                    }
                }
                relationItem.setGroup_id(groupId);
                if (StringUtils.isBlank(relationItem.getName()) || StringUtils.isBlank(relationItem.getCode()))
                    continue;
                data.add(relationItem);
            }

            relationService.removeAllItemByGroupName(groupName);
            relationService.insertBatchItem(data);

            return JsonResult.successJson(message);
        } catch (Exception e) {
            LOGGER.error("upload excel trade statistics sh to save error", e);
            return JsonResult.errorJson("upload excel error");
        }

    }

    @ApiOperation(value = "名单组选择", notes = "名单组选择", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/getGroup", method = {RequestMethod.POST})
    public String getGroup(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<RelationGroup> queryResult = relationService.getGroup();
        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "获取关联名单", notes = "获取关联名单", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/getItem", method = {RequestMethod.POST})
    public String getItem(
            @ApiParam(
                    value = "groupId <--- 1"
            )
            @RequestBody ApiParams apiParams
    ) {
        String groupId = apiParams.getGroupId();
        List<RelationItem> queryResult = relationService.getItemByGroupId(groupId);
        return JsonResult.successJson(queryResult);
    }

    @ApiOperation(value = "增加关联名单", notes = "增加关联名单", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/insertItem", method = {RequestMethod.POST})
    public String insertItem(
            @ApiParam(
                    value = "groupId <--- 1\n" +
                            "itemName <--- 浙江省财务开发公司\n" +
                            "itemTradeCheck <--- 持续核查\n" +
                            "itemCode <--- 3300000000030146\n" +
                            "itemJob <--- 无\n" +
                            "itemSex <--- 无"
            )
            @RequestBody ApiParams apiParams
    ) {
        String groupId = apiParams.getGroupId();
        String itemName = apiParams.getItemName();
        String ItemTradeCheck = apiParams.getItemTradeCheck();
        String itemCode = apiParams.getItemCode();
        String itemJob = apiParams.getItemJob();
        String itemSex = apiParams.getItemSex();
        String itemRemark = apiParams.getItemRemark();
        Boolean exist = relationService.ifItemExist(groupId, itemCode);
        if (!exist) {
            relationService.insertItem(groupId, itemName, ItemTradeCheck, itemCode, itemJob, itemSex, itemRemark);
            return JsonResult.successJson();
        }
        else
            return JsonResult.successJson("新增的关联人信息已存在！");
    }

    @ApiOperation(value = "编辑关联名单", notes = "编辑关联名单", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/updateItem", method = {RequestMethod.POST})
    public String updateItem(
            @ApiParam(
                    value = "itemId <--- 1\n" +
                            "itemName <--- 浙江省财务开发公司\n" +
                            "itemTradeCheck <--- 持续核查\n" +
                            "itemCode <--- 3300000000030146\n" +
                            "itemJob <--- 无\n" +
                            "itemSex <--- 无\n" +
                            "groupId <--- 1"
            )
            @RequestBody ApiParams apiParams
    ) {
        String itemId = apiParams.getItemId();
        String itemName = apiParams.getItemName();
        String ItemTradeCheck = apiParams.getItemTradeCheck();
        String itemCode = apiParams.getItemCode();
        String itemJob = apiParams.getItemJob();
        String itemSex = apiParams.getItemSex();
        String itemRemark = apiParams.getItemRemark();
        String groupId = apiParams.getGroupId();
        Boolean exist = relationService.ifItemExistById(groupId, itemCode, itemId);
        if (!exist) {
            relationService.updateItem(itemId, itemName, ItemTradeCheck, itemCode, itemJob, itemSex, itemRemark);
            return JsonResult.successJson();
        }
        else
            return JsonResult.successJson("更新的关联人信息已存在！");
    }

    @ApiOperation(value = "删除关联名单", notes = "删除关联名单", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/deleteItem", method = {RequestMethod.POST})
    public String deleteItem(
            @ApiParam(
                    value = "itemId <--- 1"
            )
            @RequestBody ApiParams apiParams
    ) {
        String itemId = apiParams.getItemId();
        relationService.removeItem(itemId);
        return JsonResult.successJson();
    }

    @ApiOperation(value = "查询关联名单组(含时间)", notes = "查询关联名单组(含时间)", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/getGroup2", method = {RequestMethod.POST})
    public String getGroup2(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<RelationGroup> queryResult = relationService.getGroup2();
        List<Map<String, String>> mappingResult = relationService.getGroup2Mapping(queryResult);
        return JsonResult.successJson(mappingResult);
    }

    @ApiOperation(value = "删除关联名单组", notes = "删除关联名单组", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/deleteGroup", method = {RequestMethod.POST})
    public String deleteGroup(
            @ApiParam(
                    value = "groupId <--- 1"
            )
            @RequestBody ApiParams apiParams
    ) {
        String groupId = apiParams.getGroupId();
        relationService.removeGroup(groupId);
        relationService.removeAllItem(groupId);
        return JsonResult.successJson();
    }

    @ApiOperation(value = "关联查询组与证件号筛选", notes = "关联查询组与证件号筛选", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/filter", method = {RequestMethod.POST})
    public String filter(
            @ApiParam(
                    value = ""
            )
            @RequestBody ApiParams apiParams
    ) {
        List<Relation> queryResult = relationService.getGroupAndItem();
        ArrayList mappingResult = relationService.groupAndItemMapping(queryResult);
        return JsonResult.successJson(mappingResult);
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
            case "19":{
                result = reportService.getReport19(apiParams);
                break;
            }

        }
        return result.replaceAll("9999999999.(00)+", "-");
    }

    @ApiOperation(value = "导出关联方查询报表", notes = "导出关联方查询报表", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "/export", method = {RequestMethod.GET})
    public String export(
            String exportType, String startDate, String endDate, String idNo, String queryType,
            HttpServletResponse response
    ) {
        StringBuilder paramIdNo;
        paramIdNo = new StringBuilder("'" + idNo.replaceAll(",", "','") + "'");
        List<RelationItem> relationItemList = relationService.getItemByCode(paramIdNo.toString());
        List<ReportData> queryResult = reportDataService.getReportData19(startDate, endDate, paramIdNo.toString());
        List<ReportData> mappingData = reportDataService.getMappingData19(queryResult, relationItemList, queryType);
        for (ReportData reportData: mappingData)
            reportData.setStock_commission_rate(reportData.getStock_commission_rate() + "‰");
        String fileName = "关联方证券经纪业务情况表";
        String title = "关联方证券经纪业务情况表" + "(" + startDate + "-" + endDate + ")";
        String[] titles = {"序号", "客户姓名","身份证号/营业执照号","账户状态","股票佣金率(‰)","融资融券余额(元)","融资融券息费收入(元)","普通股票佣金收入(元)","开放式基金佣金收入(元)"};
        String msg = ExportUtil.exportExcel(response, fileName, title, titles , mappingData);
        return JsonResult.successJson(msg);
    }

}
