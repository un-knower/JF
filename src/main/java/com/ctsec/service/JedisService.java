package com.ctsec.service;

/**
 * Redis缓存读写容错服务接口层
 *
 * Created by luchisheng on 2017/11/27.
 */
public interface JedisService {

    /**
     * 容错读Redis
     * @param redisKey Redis缓存关键字
     * @return 缓存读取结果
     */
    String getJedisResult(String redisKey);

    /**
     * 容错写Redis
     * @param redisKey Redis缓存关键字
     * @param result Redis缓存内容
     * @param expireTime 失效时间
     * @return 缓存写入结果
     */
    String setJedisResult(String redisKey, String result, Integer expireTime);

}
