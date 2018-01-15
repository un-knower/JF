package com.ctsec.config.kylin;

import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:db_config.properties")
public class DataSourceKylinConfig {

    @Autowired
    @Qualifier("kylinDataSourceProperties")
    private PoolProperties kylinDataSourceProperties;

    @Bean(name = "kylinDataSourceProperties")
    @ConfigurationProperties(prefix = "datasource.kylin")
    public PoolProperties poolProperties() {
        PoolProperties props = new PoolProperties();
        String jdbcInterceptors = "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer;org.apache.tomcat.jdbc.pool.interceptor.SlowQueryReport";
        props.setJdbcInterceptors(jdbcInterceptors);
        return props;
    }

    @Bean(name = "kylinDataSource")
    @Primary
    public DataSource dataSource() {
        return new org.apache.tomcat.jdbc.pool.DataSource(kylinDataSourceProperties);
    }

    @Bean(name = "kylinJdbcTemplate")
    @Primary
    public JdbcTemplate jdbcTemplate(@Qualifier("kylinDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}
