package com.ctsec.service.impl;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.vo.ApiParams;
import com.ctsec.vo.CustomerInfo;
import com.ctsec.vo.SecuritiesInfo;
import com.ctsec.service.InitService;
import com.ctsec.util.DateUtil;
import com.ctsec.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 预处理服务实现层
 *
 * Created by luchisheng on 2017/11/20.
 */

@Service("initService")
public class InitServiceImpl implements InitService {

    @Autowired
    JedisUtil jedisUtil;

    @Autowired
    private JedisServiceImpl jedisService;

    @Override
    public String paramsReplaceNull(ApiParams apiParams, String key) {
        switch (key) {
            case "startDate": {
                if (apiParams.getStartDate() != null ) {
                    if (!apiParams.getStartDate().equals("")) {
                        return  apiParams.getStartDate();
                    }
                }
                return DateUtil.getSimpleDate();
            }
            case "endDate": {
                if (apiParams.getEndDate() != null ) {
                    if (!apiParams.getEndDate().equals("")) {
                        return apiParams.getEndDate();
                    }
                }
                return DateUtil.getSimpleDate();
            }
        }
        return "";
    }

    @Override
    public String getSecuritiesSearchInit(List<SecuritiesInfo> securitiesInfoList) {
        Set<String> keywordSet = new HashSet<>();
        Map<String, List<SecuritiesInfo>> initResult = new HashMap<>();
        for (SecuritiesInfo securitiesInfo : securitiesInfoList) {
            String stockCode = securitiesInfo.getStock_code();
            String stockName = securitiesInfo.getStock_name();
            String[] stockList = stockName.split(" \\| ");
            stockName = stockList[1];
            Set<String> secuSet = new HashSet<>();
            for (int i = 0; i < stockCode.length(); ++ i) {
                secuSet.add(stockCode.substring(0, i + 1));
            }
            for (int i = 0; i < stockName.length(); ++ i) {
                secuSet.add(stockName.substring(0, i + 1));
            }
            for (String secu: secuSet) {
                List<SecuritiesInfo> secuList = new ArrayList<>();
                if (keywordSet.contains(secu)) {
                    secuList = initResult.get(secu);
                }
                else {
                    keywordSet.add(secu);
                }
                secuList.add(securitiesInfo);
                initResult.put(secu, secuList);
            }
        }

        for (Map.Entry<String, List<SecuritiesInfo>> entry: initResult.entrySet()) {
            String key = entry.getKey();
            List<SecuritiesInfo> value = entry.getValue();
            value = value.subList(0, value.size() > 20 ? 20 : value.size());
            String redisKey = "jf-" + "api/report" + "/secuSearch"
                    + "searchKeyword" + key;
            jedisService.setJedisResult(redisKey, JsonResult.successJson(value), 10 * 24 * 60 * 60);
        }

        return "Security keyword search pre-processing is completed!";
    }

    @Override
    public String getCustomerNoSearchInit(List<CustomerInfo> customerInfoList, String path) {
        Set<String> keywordSet = new HashSet<>();
        Map<String, List<CustomerInfo>> initResult = new HashMap<>();
        for (CustomerInfo customerInfo : customerInfoList) {
            String customerNo = customerInfo.getCust_no();
            String customerName = customerInfo.getCust_name();
            Set<String> customerSet = new HashSet<>();
            for (int i = 0; i < customerNo.length(); ++ i) {
                customerSet.add(customerNo.substring(0, i + 1));
            }
            for (int i = 0; i < customerName.length(); ++ i) {
                customerSet.add(customerName.substring(0, i + 1));
            }
            for (String customer: customerSet) {
                List<CustomerInfo> cutomerList = new ArrayList<>();
                if (keywordSet.contains(customer)) {
                    cutomerList = initResult.get(customer);
                }
                else {
                    keywordSet.add(customer);
                }
                cutomerList.add(customerInfo);
                initResult.put(customer, cutomerList);
            }
        }

        for (Map.Entry<String, List<CustomerInfo>> entry: initResult.entrySet()) {
            String key = entry.getKey();
            List<CustomerInfo> value = entry.getValue();
            value = value.subList(0, value.size() > 20 ? 20 : value.size());
            String redisKey = "jf-" + "api/" + path + "/custSearch"
                    + "searchKeyword" + key;
            jedisService.setJedisResult(redisKey, JsonResult.successJson(value), 10 * 24 * 60 * 60);
        }

        return path + "Customer Number keyword search pre-processing is completed!";
    }
}
