package com.ctsec.vo;

/**
 * 权限管理-菜单访问权限信息
 *
 * Created by luchisheng on 2017/12/5.
 */

public class MenuAccessInfo {

    /**
     * 目录关键词
     */
    private String key;

    /**
     * 目录
     */
    private String title;

    /**
     * 前端类
     */
    private String menu_class;

    /**
     * 子目录关键词
     */
    private String sub_key;

    /**
     * 子目录
     */
    private String sub_title;

    /**
     * 子目录描述
     */
    private String sub_title_desc;

    /**
     * 目录链接
     */
    private String menu_link;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMenu_class() {
        return menu_class;
    }

    public void setMenu_class(String menu_class) {
        this.menu_class = menu_class;
    }

    public String getSub_key() {
        return sub_key;
    }

    public void setSub_key(String sub_key) {
        this.sub_key = sub_key;
    }

    public String getSub_title() {
        return sub_title;
    }

    public void setSub_title(String sub_title) {
        this.sub_title = sub_title;
    }

    public String getSub_title_desc() {
        return sub_title_desc;
    }

    public void setSub_title_desc(String sub_title_desc) {
        this.sub_title_desc = sub_title_desc;
    }

    public String getMenu_link() {
        return menu_link;
    }

    public void setMenu_link(String menu_link) {
        this.menu_link = menu_link;
    }
}
