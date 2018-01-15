package com.ctsec.vo;

/**
 * 签约趋势
 *
 * Created by luchisheng on 2017/12/13.
 */
public class SigningTrend {

    /**
     * 日期
     */
    private String init_date;

    /**
     * 签约
     */
    private String sign_num;

    /**
     * 解约
     */
    private String remove_num;

    public String getByKey(String key) {
        switch (key) {
            case "sign_num":
                return this.getSign_num();
            case "remove_num":
                return this.getRemove_num();
        }
        return "";
    }

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getSign_num() {
        return sign_num;
    }

    public void setSign_num(String sign_num) {
        this.sign_num = sign_num;
    }

    public String getRemove_num() {
        return remove_num;
    }

    public void setRemove_num(String remove_num) {
        this.remove_num = remove_num;
    }
}
