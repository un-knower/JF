package com.ctsec.service;


import com.alibaba.fastjson.JSONObject;
import com.ctsec.vo.ApiParams;

/**
 * Created by luchisheng on 2017/11/8.
 */

@Deprecated
public interface JsonMappingService {

    ApiParams getApiParams(JSONObject paramsJson);

}
