package com.ctsec.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;
import java.util.Map;

/**
 * HTTP POST请求，接口统一参数
 *
 * Created by luchisheng on 2017/11/7.
 */

@ApiModel(value = "Json参数", description = "接口统一参数")
public class ApiParams {

    /**
     * 起始时间
     * yyyyMMdd 格式的日期时间
     * 等同fromDate
     */
    @ApiModelProperty(value = "起始时间")
    private String startDate;

    /**
     * 起始时间
     * yyyyMMdd 格式的日期时间
     * 等同startDate
     */
    @ApiModelProperty(value = "起始时间")
    private String startDate1;

    /**
     * 结束时间
     * yyyyMMdd 格式的日期时间
     * 等同toDate
     */
    @ApiModelProperty(value = "终止时间")
    private String endDate;

    /**
     * 结束时间
     * yyyyMMdd 格式的日期时间
     * 等同endDate
     */
    @ApiModelProperty(value = "终止时间")
    private String endDate1;

    /**
     * 证券代码
     * 等同stockCode
     */
    @ApiModelProperty(value = "证券代码")
    private String secuCode;

    /**
     * 时间类型
     * 可选项："D"：天；"W"：周；"M"：月；"Q"：季；"Y"：年
     */
    @ApiModelProperty(value = "时间类型（D = 天; W = 周; M = 月; Q = 季; Y = 年）")
    private String dateType;

    /**
     * 报表Id
     */
    @ApiModelProperty(value = "报表Id")
    private String reportId;

    /**
     * 分支机构Id
     * 等同branchNo
     */
    @ApiModelProperty(value = "分支机构Id")
    private String branchId;

    /**
     * 分支机构Id
     * 等同branchNo
     */
    @ApiModelProperty(value = "分支机构Id")
    private String coopBranchId;

    /**
     * 市场编号
     * 可选项："1"：上海；"2"：深圳； "9"：新三板
     */
    @ApiModelProperty(value = "市场编号（1 = 上海; 2 = 深圳; 9 = 新三板）")
    private String exchangeType;

    /**
     * 客户号
     */
    @ApiModelProperty(value = "客户号")
    private String customerNo;

    /**
     * 证券账户
     */
    @ApiModelProperty(value = "证券账户")
    private String stockAccount;

    /**
     * 搜索关键词
     */
    @ApiModelProperty(value = "搜索关键词")
    private String searchKeyword;

    /**
     * 排序关键字段
     */
    @ApiModelProperty(value = "排序关键字段")
    private String orderKey;

    /**
     * 排序方式
     */
    @ApiModelProperty(value = "排序方式")
    private String order;

    /**
     * 页数
     */
    @ApiModelProperty(value = "页数")
    private Integer page;

    /**
     * 每页大小
     */
    @ApiModelProperty(value = "每页大小")
    private Integer pageSize;

    /**
     * 报表指标
     */
    @ApiModelProperty(value = "报表指标")
    private List<String> indexId;

    /**
     * url
     */
    @ApiModelProperty(value = "url")
    private String url;

    /**
     * 资产分段
     */
    @ApiModelProperty(value = "资产分段")
    private String assetSection;

    /**
     * 产品编号
     */
    @ApiModelProperty(value = "产品编号")
    private String prodCode;

    /**
     * 指标及银行转入范围
     */
    @ApiModelProperty(value = "指标及银行转入范围")
    private List<Map<String, String>> index;

    /**
     * 关联名单组名
     */
    @ApiModelProperty(value = "关联名单组名")
    private String groupName;

    /**
     * 关联名单组Id
     */
    @ApiModelProperty(value = "关联名单组Id")
    private String groupId;

    /**
     * 关联名单Id
     */
    @ApiModelProperty(value = "关联名单Id")
    private String itemId;

    /**
     * 关联名单名称
     */
    @ApiModelProperty(value = "关联名单名称")
    private String itemName;

    /**
     * 关联名单核查期间
     */
    @ApiModelProperty(value = "关联名单核查期间")
    private String itemTradeCheck;

    /**
     * 营业执照(统一社会信用码)/身份证号
     */
    @ApiModelProperty(value = "营业执照(统一社会信用码)/身份证号")
    private String itemCode;

    /**
     * 职务
     */
    @ApiModelProperty(value = "职务")
    private String itemJob;

    /**
     * 性别
     */
    @ApiModelProperty(value = "性别")
    private String itemSex;

    /**
     * 备注
     */
    @ApiModelProperty(value = "备注")
    private String itemRemark;

    /**
     * 证件号码
     */
    @ApiModelProperty(value = "证件号码")
    private String idNo;

    /**
     * 类别
     */
    @ApiModelProperty(value = "类别")
    private String categoryId;

    /**
     * 券商名
     */
    @ApiModelProperty(value = "券商名")
    private String secuName;

    /**
     * 查询类型
     */
    @ApiModelProperty(value = "查询类型")
    private String queryType;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getStartDate1() {
        return startDate1;
    }

    public void setStartDate1(String startDate1) {
        this.startDate1 = startDate1;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getEndDate1() {
        return endDate1;
    }

    public void setEndDate1(String endDate1) {
        this.endDate1 = endDate1;
    }

    public String getSecuCode() {
        return secuCode;
    }

    public void setSecuCode(String secuCode) {
        this.secuCode = secuCode;
    }

    public String getDateType() {
        return dateType;
    }

    public void setDateType(String dateType) {
        this.dateType = dateType;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getBranchId() {
        return branchId;
    }

    public void setBranchId(String branchId) {
        this.branchId = branchId;
    }

    public String getCoopBranchId() {
        return coopBranchId;
    }

    public void setCoopBranchId(String coopBranchId) {
        this.coopBranchId = coopBranchId;
    }

    public String getExchangeType() {
        return exchangeType;
    }

    public void setExchangeType(String exchangeType) {
        this.exchangeType = exchangeType;
    }

    public String getCustomerNo() {
        return customerNo;
    }

    public void setCustomerNo(String customerNo) {
        this.customerNo = customerNo;
    }

    public String getStockAccount() {
        return stockAccount;
    }

    public void setStockAccount(String stockAccount) {
        this.stockAccount = stockAccount;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getOrderKey() {
        return orderKey;
    }

    public void setOrderKey(String orderKey) {
        this.orderKey = orderKey;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public List<String> getIndexId() {
        return indexId;
    }

    public void setIndexId(List<String> indexId) {
        this.indexId = indexId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAssetSection() {
        return assetSection;
    }

    public void setAssetSection(String assetSection) {
        this.assetSection = assetSection;
    }

    public String getProdCode() {
        return prodCode;
    }

    public void setProdCode(String prodCode) {
        this.prodCode = prodCode;
    }

    public List<Map<String, String>> getIndex() {
        return index;
    }

    public void setIndex(List<Map<String, String>> index) {
        this.index = index;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemTradeCheck() {
        return itemTradeCheck;
    }

    public void setItemTradeCheck(String itemTradeCheck) {
        this.itemTradeCheck = itemTradeCheck;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemJob() {
        return itemJob;
    }

    public void setItemJob(String itemJob) {
        this.itemJob = itemJob;
    }

    public String getItemSex() {
        return itemSex;
    }

    public void setItemSex(String itemSex) {
        this.itemSex = itemSex;
    }

    public String getItemRemark() {
        return itemRemark;
    }

    public void setItemRemark(String itemRemark) {
        this.itemRemark = itemRemark;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getSecuName() {
        return secuName;
    }

    public void setSecuName(String secuName) {
        this.secuName = secuName;
    }

    public String getQueryType() {
        return queryType;
    }

    public void setQueryType(String queryType) {
        this.queryType = queryType;
    }
}
