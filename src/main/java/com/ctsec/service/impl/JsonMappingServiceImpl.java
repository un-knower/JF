package com.ctsec.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ctsec.vo.ApiParams;
import com.ctsec.service.JsonMappingService;
import com.ctsec.web.TestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Created by luchisheng on 2017/11/8.
 */

@Service("jsonMapping")
@Deprecated
public class JsonMappingServiceImpl implements JsonMappingService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Override
    public ApiParams getApiParams(JSONObject paramsJson) {

        ObjectMapper mapper = new ObjectMapper();
        ApiParams apiParams = new ApiParams();

        try {
            apiParams = mapper.readValue(paramsJson.toJSONString(), ApiParams.class);
        }
        catch (Exception e) {
            LOGGER.error("error json branchBaseInfoMapping!");
            throw e;
        }
        finally {
            return apiParams;
        }
    }

}
