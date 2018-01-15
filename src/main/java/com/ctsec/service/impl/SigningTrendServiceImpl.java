package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.SigningTrendDao;
import com.ctsec.service.SigningTrendService;
import com.ctsec.vo.SigningTrend;
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

@Service("signingTrendService")
public class SigningTrendServiceImpl implements SigningTrendService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("SigningTrendDao")
    private SigningTrendDao signingTrendDao;

    @Override
    public List<SigningTrend> getSigningTrend(String fromDate, String toDate, String prodCode) {
        String sqlQuery = sqlQueryConfig.getSEL_BUSINESS_TREND();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, prodCode);
        return signingTrendDao.selectSigningTrend(sqlQuery);
    }

    @Override
    public Map<String, Object> mapping(List<SigningTrend> signingTrendList, List<String> xAxisData, Map<String, Object> seriesData, List<String> valueNameList) {

        for (SigningTrend signingTrend: signingTrendList) {
            String dateId = signingTrend.getInit_date();
            HashedMap value = new HashedMap();
            if (xAxisData.contains(dateId)) {
                value = (HashedMap) seriesData.get(dateId);
            }
            else {
                xAxisData.add(dateId);
            }
            for (String valueName: valueNameList) {
                value.put(valueName, signingTrend.getByKey(valueName));
            }
            seriesData.put(dateId, value);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("xAxisData", xAxisData);
        result.put("seriesData", seriesData);
        return result;
    }

}
