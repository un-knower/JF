package com.ctsec.service;

import com.ctsec.vo.SigningTrend;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/14.
 */
public interface SigningTrendService {

    List<SigningTrend> getSigningTrend(String fromDate, String toDate, String prodCode);

    Map<String, Object> mapping(List<SigningTrend> signingTrendList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList);

}
