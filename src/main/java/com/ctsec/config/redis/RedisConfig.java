package com.ctsec.config.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import redis.clients.jedis.JedisPoolConfig;

@Configuration
@PropertySource("classpath:db_config.properties")
public class RedisConfig {

    // jedis 连接池配置
    @Bean(name = "jedisPoolConfig")
    @ConfigurationProperties(prefix = "datasource.redis.pool")
    public JedisPoolConfig getJedisPoolConfig() {
        return new JedisPoolConfig();
    }

    // jedis ConnectionFactory 数据库连接配置
    @Bean(name = "jedisConnectionFactory")
    @ConfigurationProperties(prefix = "datasource.redis")
    public JedisConnectionFactory getJedisConnectionFactory(@Qualifier("jedisPoolConfig") JedisPoolConfig jedisPoolConfig) {
        return new JedisConnectionFactory(jedisPoolConfig);
    }

    @Bean(name = "jedisTemplate")
    public RedisTemplate getRedisTemplate(@Qualifier("jedisConnectionFactory") JedisConnectionFactory jedisConnectionFactory) {
        return new StringRedisTemplate(jedisConnectionFactory);
    }
}
