package com.ctsec.dao.jf;

import com.ctsec.model.jf.ExcelImportConfig;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExcelImportConfigMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table excel_import_config
     *
     * @mbggenerated Mon Dec 25 13:02:18 CST 2017
     */
    ExcelImportConfig selectByPrimaryKey(@Param("id") Integer id);

    List<ExcelImportConfig> selectConfig();
}