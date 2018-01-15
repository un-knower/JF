package com.ctsec.vo;

/**
 * 现金理财产品份额变化（亿）
 *
 * Created by luchisheng on 2017/12/13.
 */
public class ProductShareChange {

    /**
     * 日期
     */
    private String init_date;

    /**
     * 份额
     */
    private String amount;

    public String getByKey(String key) {
        switch (key) {
            case "amount":
                return this.getAmount();
        }
        return "";
    }

    public String getInit_date() {
        return init_date;
    }

    public void setInit_date(String init_date) {
        this.init_date = init_date;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
