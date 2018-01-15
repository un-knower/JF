package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/18.
 */
public class Relation {

    /**
     * 组Id
     */
    private String group_id;

    /**
     * 组名称
     */
    private String group_name;

    /**
     * 客户/组织名称
     */
    private String item_name;

    /**
     * 身份证/营业执照号
     */
    private String item_code;

    public String getGroup_id() {
        return group_id;
    }

    public void setGroup_id(String group_id) {
        this.group_id = group_id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public String getItem_code() {
        return item_code;
    }

    public void setItem_code(String item_code) {
        this.item_code = item_code;
    }
}
