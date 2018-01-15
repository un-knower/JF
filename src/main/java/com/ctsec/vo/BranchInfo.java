package com.ctsec.vo;

/**
 * 分支机构信息
 *
 * Created by luchisheng on 2017/11/14.
 */
public class BranchInfo {

    /**
     * 分支机构Id
     */
    private Integer branch_id;

    /**
     * 分支机构名称
     */
    private String branch_name;

    /**
     * 分公司Id
     */
    private Integer subcompany_id;

    /**
     * 分公司名称
     */
    private String subcompany_name;

    /**
     * 分支机构简称
     */
    private String short_name;

    /**
     * 分支机构级别
     */
    private String category;

    /**
     * 分支机构类别排序
     */
    private String category_rank;

    /**
     * 分支机构类别ID
     */
    private String category_id;

    /**
     * 分支机构类别描述
     */
    private String category_desc;

    /**
     * 分支机构级别排序
     */
    private String level_rank;

    /**
     * 分支机构级别ID
     */
    private String level_id;

    /**
     * 分支机构级别描述
     */
    private String level_desc;

    public Integer getBranch_id() {
        return branch_id;
    }

    public void setBranch_id(Integer branch_id) {
        this.branch_id = branch_id;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public Integer getSubcompany_id() {
        return subcompany_id;
    }

    public void setSubcompany_id(Integer subcompany_id) {
        this.subcompany_id = subcompany_id;
    }

    public String getSubcompany_name() {
        return subcompany_name;
    }

    public void setSubcompany_name(String subcompany_name) {
        this.subcompany_name = subcompany_name;
    }

    public String getShort_name() {
        return short_name;
    }

    public void setShort_name(String short_name) {
        this.short_name = short_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory_rank() {
        return category_rank;
    }

    public void setCategory_rank(String category_rank) {
        this.category_rank = category_rank;
    }

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getCategory_desc() {
        return category_desc;
    }

    public void setCategory_desc(String category_desc) {
        this.category_desc = category_desc;
    }

    public String getLevel_rank() {
        return level_rank;
    }

    public void setLevel_rank(String level_rank) {
        this.level_rank = level_rank;
    }

    public String getLevel_id() {
        return level_id;
    }

    public void setLevel_id(String level_id) {
        this.level_id = level_id;
    }

    public String getLevel_desc() {
        return level_desc;
    }

    public void setLevel_desc(String level_desc) {
        this.level_desc = level_desc;
    }
}
