package com.ctsec.service;

import com.ctsec.vo.ProductShareChange;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/14.
 */
public interface ProductShareChangeService {

    List<ProductShareChange> getProductShareChange(String fromDate, String toDate, String prodCode);

    Map<String, Object> mapping(List<ProductShareChange> productShareChangeList, List<String> xAxisData, Map<String, Object> seriesData);

}
