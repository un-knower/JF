package com.ctsec.service;

import com.ctsec.vo.MarketLine;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/25.
 */
public interface MarketLineService {

    Map<String, Object> mapping(List<MarketLine> marketLineList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
