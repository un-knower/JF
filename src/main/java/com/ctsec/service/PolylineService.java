package com.ctsec.service;

import com.ctsec.vo.Polyline;

import java.util.List;
import java.util.Map;

/**
 * 折线图数据服务接口层
 *
 * Created by luchisheng on 2017/11/15.
 */
public interface PolylineService {

    /**
     * 折线图数据格式转换
     * @param polylineList 折线图数据
     * @param xAxisData X轴数据
     * @param seriesData Y轴数据
     * @param valueNameList Y轴字段列表
     * @return 格式转换后的折线图数据
     */
    Map<String, Object> mapping(List<Polyline> polylineList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
