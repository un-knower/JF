package com.ctsec.dao.jf;

import com.ctsec.vo.KPILeft;
import com.ctsec.vo.KPIRight;

import java.util.List;

/**
 * 关键指标数据访问接口层
 *
 * Created by luchisheng on 2017/11/23.
 */
public interface KPIDao {

    /**
     * 查询关键指教左侧数据
     * @param sqlQuery SQL语句
     * @return 关键指标左侧数据
     */
    List<KPILeft> selectKPILeft(String sqlQuery);

    /**
     * 查询关键指教右侧数据
     * @param sqlQuery SQL语句
     * @return 关键指标右侧数据
     */
    List<KPIRight> selectKPIRight(String sqlQuery);

}
