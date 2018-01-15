package com.ctsec.service.impl;

import com.ctsec.service.PolylineService;
import com.ctsec.vo.Polyline;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 折线图数据服务实现层
 *
 * Created by luchisheng on 2017/11/15.
 */

@Service("polylineService")
public class PolylineServiceImpl implements PolylineService {

    @Override
    public Map<String, Object> mapping(List<Polyline> polylineList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (Polyline polyline: polylineList) {
            String category = polyline.getCategory();
            String endDate = polyline.getEndDate();
            HashedMap value = new HashedMap();
            if (xAxisData.contains(endDate)) {
                value = (HashedMap) seriesData.get(endDate);
            }
            else {
                xAxisData.add(endDate);
            }
            for (String valueName: valueNameList) {
                value.put(category + "_" + valueName, polyline.getByKey(valueName));
            }
            seriesData.put(endDate, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }
}
