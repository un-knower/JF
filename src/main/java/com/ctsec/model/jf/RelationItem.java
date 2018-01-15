package com.ctsec.model.jf;

import java.util.Date;

public class RelationItem {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.group_id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private Long group_id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.name
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.trade_check
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String trade_check;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.code
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String code;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.job
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String job;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.sex
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String sex;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.remark
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String remark;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.is_delete
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private String is_delete;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.create_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private Date create_time;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column relation_item.update_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    private Date update_time;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table relation_item
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public RelationItem(Long id, Long group_id, String name, String trade_check, String code, String job, String sex, String remark, String is_delete, Date create_time, Date update_time) {
        this.id = id;
        this.group_id = group_id;
        this.name = name;
        this.trade_check = trade_check;
        this.code = code;
        this.job = job;
        this.sex = sex;
        this.remark = remark;
        this.is_delete = is_delete;
        this.create_time = create_time;
        this.update_time = update_time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table relation_item
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public RelationItem() {
        super();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.id
     *
     * @return the value of relation_item.id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.id
     *
     * @param id the value for relation_item.id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.group_id
     *
     * @return the value of relation_item.group_id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public Long getGroup_id() {
        return group_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.group_id
     *
     * @param group_id the value for relation_item.group_id
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setGroup_id(Long group_id) {
        this.group_id = group_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.name
     *
     * @return the value of relation_item.name
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.name
     *
     * @param name the value for relation_item.name
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.trade_check
     *
     * @return the value of relation_item.trade_check
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getTrade_check() {
        return trade_check;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.trade_check
     *
     * @param trade_check the value for relation_item.trade_check
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setTrade_check(String trade_check) {
        this.trade_check = trade_check;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.code
     *
     * @return the value of relation_item.code
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getCode() {
        return code;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.code
     *
     * @param code the value for relation_item.code
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.job
     *
     * @return the value of relation_item.job
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getJob() {
        return job;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.job
     *
     * @param job the value for relation_item.job
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setJob(String job) {
        this.job = job;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.sex
     *
     * @return the value of relation_item.sex
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getSex() {
        return sex;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.sex
     *
     * @param sex the value for relation_item.sex
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setSex(String sex) {
        this.sex = sex;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.remark
     *
     * @return the value of relation_item.remark
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getRemark() {
        return remark;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.remark
     *
     * @param remark the value for relation_item.remark
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.is_delete
     *
     * @return the value of relation_item.is_delete
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public String getIs_delete() {
        return is_delete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.is_delete
     *
     * @param is_delete the value for relation_item.is_delete
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setIs_delete(String is_delete) {
        this.is_delete = is_delete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.create_time
     *
     * @return the value of relation_item.create_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public Date getCreate_time() {
        return create_time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.create_time
     *
     * @param create_time the value for relation_item.create_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column relation_item.update_time
     *
     * @return the value of relation_item.update_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public Date getUpdate_time() {
        return update_time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column relation_item.update_time
     *
     * @param update_time the value for relation_item.update_time
     *
     * @mbggenerated Fri Jan 05 17:21:49 CST 2018
     */
    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }
}