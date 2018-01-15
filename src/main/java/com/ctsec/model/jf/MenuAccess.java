package com.ctsec.model.jf;

public class MenuAccess {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.menu_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String menu_id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.menu_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String menu_name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.parent_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String parent_id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.parent_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String parent_name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.menu_link
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String menu_link;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column jf_menu.menu_class
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    private String menu_class;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table jf_menu
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public MenuAccess(Integer id, String menu_id, String menu_name, String parent_id, String parent_name, String menu_link, String menu_class) {
        this.id = id;
        this.menu_id = menu_id;
        this.menu_name = menu_name;
        this.parent_id = parent_id;
        this.parent_name = parent_name;
        this.menu_link = menu_link;
        this.menu_class = menu_class;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table jf_menu
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public MenuAccess() {
        super();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.id
     *
     * @return the value of jf_menu.id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.id
     *
     * @param id the value for jf_menu.id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.menu_id
     *
     * @return the value of jf_menu.menu_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getMenu_id() {
        return menu_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.menu_id
     *
     * @param menu_id the value for jf_menu.menu_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setMenu_id(String menu_id) {
        this.menu_id = menu_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.menu_name
     *
     * @return the value of jf_menu.menu_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getMenu_name() {
        return menu_name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.menu_name
     *
     * @param menu_name the value for jf_menu.menu_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setMenu_name(String menu_name) {
        this.menu_name = menu_name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.parent_id
     *
     * @return the value of jf_menu.parent_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getParent_id() {
        return parent_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.parent_id
     *
     * @param parent_id the value for jf_menu.parent_id
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setParent_id(String parent_id) {
        this.parent_id = parent_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.parent_name
     *
     * @return the value of jf_menu.parent_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getParent_name() {
        return parent_name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.parent_name
     *
     * @param parent_name the value for jf_menu.parent_name
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setParent_name(String parent_name) {
        this.parent_name = parent_name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.menu_link
     *
     * @return the value of jf_menu.menu_link
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getMenu_link() {
        return menu_link;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.menu_link
     *
     * @param menu_link the value for jf_menu.menu_link
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setMenu_link(String menu_link) {
        this.menu_link = menu_link;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column jf_menu.menu_class
     *
     * @return the value of jf_menu.menu_class
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public String getMenu_class() {
        return menu_class;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column jf_menu.menu_class
     *
     * @param menu_class the value for jf_menu.menu_class
     *
     * @mbggenerated Tue Dec 05 09:49:13 CST 2017
     */
    public void setMenu_class(String menu_class) {
        this.menu_class = menu_class;
    }
}