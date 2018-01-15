package com.ctsec.service;

import com.ctsec.vo.ApiParams;
import com.ctsec.vo.CustomerInfo;
import com.ctsec.vo.SecuritiesInfo;

import java.util.List;

/**
 * 预处理服务接口层
 *
 * Created by luchisheng on 2017/11/20.
 */

public interface InitService {

    /**
     * 接口参数Null处理转换
     * @param apiParams 接口统一参数
     * @param key 参数键值
     * @return 处理转换后的接口参数
     */
    String paramsReplaceNull(ApiParams apiParams, String key);

    /**
     * 证券代码名称搜索预处理缓存
     * @param securitiesInfoList 证券信息列表
     * @return 预处理结果返回信息
     */
    String getSecuritiesSearchInit(List<SecuritiesInfo> securitiesInfoList);

    String getCustomerNoSearchInit(List<CustomerInfo> customerInfoList, String path);

}
