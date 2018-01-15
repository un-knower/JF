package com.ctsec.service.impl;

import com.ctsec.service.MarketLineService;
import com.ctsec.vo.MarketLine;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/25.
 */

@Service("marketLineService")
public class MarketLineServiceImpl implements MarketLineService {

    @Override
    public Map<String, Object> mapping(List<MarketLine> marketLineList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (MarketLine marketLine: marketLineList) {
            String dayId = marketLine.getTrade_day();
            String monthId = marketLine.getTrade_month();
            String yearId = marketLine.getTrade_year();
            String xAxis;
            if (dayId != null)
                xAxis = dayId;
            else if (monthId != null)
                xAxis = monthId;
            else
                xAxis = yearId;
            HashedMap value = new HashedMap();
            if (xAxisData.contains(xAxis)) {
                value = (HashedMap) seriesData.get(xAxis);
            }
            else {
                xAxisData.add(xAxis);
            }
            for (String valueName: valueNameList) {
                value.put(valueName, marketLine.getByKey(valueName));
            }
            seriesData.put(xAxis, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
