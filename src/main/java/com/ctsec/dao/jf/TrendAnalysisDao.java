package com.ctsec.dao.jf;

import com.ctsec.vo.TrendAnalysis;

import java.util.List;

/**
 * 趋势分析信息数据访问接口层
 * 通过KAP对趋势分析信息查询
 *
 * Created by luchisheng on 2017/11/28.
 */
public interface TrendAnalysisDao {

    /**
     * 查询趋势分析统一接口
     * @param sqlQuery SQL语句
     * @return 趋势分析列表
     */
    List<TrendAnalysis> selectTrendAnalysis(String sqlQuery);

}
