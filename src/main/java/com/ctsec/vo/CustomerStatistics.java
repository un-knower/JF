package com.ctsec.vo;

/**
 * 客户统计
 *
 * Created by luchisheng on 2017/12/11.
 */
public class CustomerStatistics {

    /**
     * 资产区间
     */
    private String asset_section_name;

    /**
     * 客户数量 饼图1 & 统计表
     */
    private String cust_num;

    /**
     * 资产分布 饼图2 & 统计表
     */
    private String asset;

    /**
     * 份额区间
     */
    private String amount_section_name;

    public String getAsset_section_name() {
        return asset_section_name;
    }

    public void setAsset_section_name(String asset_section_name) {
        this.asset_section_name = asset_section_name;
    }

    public String getCust_num() {
        return cust_num;
    }

    public void setCust_num(String cust_num) {
        this.cust_num = cust_num;
    }

    public String getAsset() {
        return asset;
    }

    public void setAsset(String asset) {
        this.asset = asset;
    }

    public String getAmount_section_name() {
        return amount_section_name;
    }

    public void setAmount_section_name(String amount_section_name) {
        this.amount_section_name = amount_section_name;
    }
}
