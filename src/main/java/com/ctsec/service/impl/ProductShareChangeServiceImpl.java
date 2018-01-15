package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.ProductShareChangeDao;
import com.ctsec.service.ProductShareChangeService;
import com.ctsec.vo.ProductShareChange;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/14.
 */

@Service("productShareChangeService")
public class ProductShareChangeServiceImpl implements ProductShareChangeService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("ProductShareChangeDao")
    private ProductShareChangeDao productShareChangeDao;

    @Override
    public List<ProductShareChange> getProductShareChange(String fromDate, String toDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_CHANGE();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, prodCode);
        return productShareChangeDao.selectProductShareChange(sqlQuery);
    }

    @Override
    public Map<String, Object> mapping(List<ProductShareChange> productShareChangeList, List<String> xAxisData, Map<String, Object> seriesData) {

        for (ProductShareChange productShareChange: productShareChangeList) {
            String dateId = productShareChange.getInit_date();
            HashedMap value = new HashedMap();
            if (xAxisData.contains(dateId)) {
                value = (HashedMap) seriesData.get(dateId);
            }
            else {
                xAxisData.add(dateId);
            }
            value.put("Amount", productShareChange.getAmount());
            seriesData.put(dateId, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
