package com.ctsec.vo;

/**
 * Created by luchisheng on 2017/11/9.
 */

@Deprecated
public class Branch {

    private Integer branch_id;
    private String branch_name;
    private Integer subcompany_id;
    private String subcompany_name;

    public Branch(Integer branch_id, String branch_name){
        this.branch_id = branch_id;
        this.branch_name = branch_name;
    }

    public Branch(Integer branch_id, String branch_name, Integer subcompany_id, String subcompany_name){
        this.branch_id = branch_id;
        this.branch_name = branch_name;
        this.subcompany_id = subcompany_id;
        this.subcompany_name = subcompany_name;
    }

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

}
