package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/12/18.
 */
public class CubeInfo {

    /**
     * 栏目
     */
    private String cube_name;

    /**
     * 日期
     */
    private String last_build_date;

    /**
     * 真实日期
     */
    private String real_last_build_date;

    public String getCube_name() {
        return cube_name;
    }

    public void setCube_name(String cube_name) {
        this.cube_name = cube_name;
    }

    public String getLast_build_date() {
        return last_build_date;
    }

    public void setLast_build_date(String last_build_date) {
        this.last_build_date = last_build_date;
    }

    public String getReal_last_build_date() {
        return real_last_build_date;
    }

    public void setReal_last_build_date(String real_last_build_date) {
        this.real_last_build_date = real_last_build_date;
    }
}
