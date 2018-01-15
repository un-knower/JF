package com.ctsec.dao.jf;

import com.ctsec.model.jf.IndexInfo;
import com.ctsec.vo.SystemIndexInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 系统指标描述信息数据访问接口层
 * 通过Mysql对系统指标描述信息查询
 *
 * Created by luchisheng on 2017/11/15.
 */

public interface IndexInfoMapper {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table index_info
     *
     * @mbggenerated Wed Nov 15 19:25:36 CST 2017
     */
    IndexInfo selectByPrimaryKey(@Param("index_id") Integer index_id);

    /**
     *
     * @return
     */
    List<SystemIndexInfo> selectAll();
}