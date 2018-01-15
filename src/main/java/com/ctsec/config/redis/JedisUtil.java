package com.ctsec.config.redis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
public class JedisUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JedisUtil.class);

    @Autowired
    RedisTemplate<String, String> jedisTemplate;

    private ValueOperations<String, String> ops = null;
    private ListOperations<String, String> listOps = null;

    ValueOperations<String, String> getValueOps() {
        if (null == this.ops)
            this.ops = jedisTemplate.opsForValue();
        return this.ops;
    }

    public String get(String key) {
        return getValueOps().get(key);
    }

    public void set(String key, String value, long expire_tm) {
        getValueOps().set(key, value, expire_tm, TimeUnit.SECONDS);
    }

    public void del(String key) {
        getValueOps().getOperations().delete(key);

    }

    public Set<String> keys(String pattern) {
        return jedisTemplate.keys(pattern);

    }

    public String getAndSet(String key, String value) {
        return getValueOps().getAndSet(key, value);
    }

    public ListOperations<String, String> getListOps() {
        if (null == this.listOps)
            this.listOps = jedisTemplate.opsForList();
        return this.listOps;
    }

    public void lpush(String key, String value) {
        getListOps().leftPush(key, value);
    }

    public void rpush(String key, String value) {
        getListOps().rightPush(key, value);
    }

    public String rpop(String key) {
        return getListOps().rightPop(key);
    }

    public String lpop(String key) {
        return getListOps().leftPop(key);
    }

    public String brpop(String key) {
        return getListOps().rightPop(key, 0, TimeUnit.SECONDS);
    }

    /**
     * @param key     键值
     * @param timeOut 等待时长（秒）
     * @return
     */
    public String brpop(String key, Integer timeOut) {
        return getListOps().rightPop(key, timeOut, TimeUnit.SECONDS);
    }

    public long sizeOfList(String key) {
        return getListOps().size(key);
    }

}
