package com.ctsec.service.impl;

import com.ctsec.config.redis.JedisUtil;
import com.ctsec.service.JedisService;
import com.ctsec.util.JsonResult;
import com.ctsec.web.TestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.exceptions.JedisConnectionException;

import java.net.SocketTimeoutException;

/**
 * Redis缓存读写容错服务实现层
 *
 * Created by luchisheng on 2017/11/27.
 */

@Service("jedisService")
public class JedisServiceImpl implements JedisService {

    private static final Logger LOGGER = LoggerFactory.getLogger(JedisServiceImpl.class);

    @Autowired
    JedisUtil jedisUtil;

    @Override
    public String getJedisResult(String redisKey) {
        Integer timeoutCount = 0;
        while (true) {
            try {
                return jedisUtil.get(redisKey);
            }
            catch (Exception e) {
                if (e instanceof JedisConnectionException) {
                    timeoutCount ++;
                    LOGGER.warn("getJedis timeoutCount={1}", timeoutCount);
                    if (timeoutCount > 3)
                    {
                        LOGGER.error("getJedis timeout", e);
                        break;
                    }
                }
                else {
                    LOGGER.error("getJedis error", e);
                    break;
                }
            }
        }
        return "ErrorGet!";
    }

    @Override
    public String setJedisResult(String redisKey, String result, Integer expireTime) {
        Integer timeoutCount = 0;
        while (true) {
            try {
                jedisUtil.set(redisKey, result, expireTime);
                return "SuccessSet!";
            }
            catch (Exception e) {
                if (e instanceof JedisConnectionException) {
                    timeoutCount ++;
                    LOGGER.warn("setJedis, timeoutCount={}", timeoutCount);
                    if (timeoutCount > 3)
                    {
                        LOGGER.error("setJedis timeout", e);
                        break;
                    }
                }
                else {
                    LOGGER.error("setJedis error", e);
                    break;
                }
            }
        }
        return "ErrorSet!";
    }
}
