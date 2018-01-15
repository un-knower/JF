package com.ctsec.config.mybatis;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

/**
 * The configuration for datasource
 */
@Configuration
@MapperScan(basePackages = "com.ctsec.dao.jf", sqlSessionTemplateRef = "jfSqlSessionTemplate")
@PropertySource("classpath:db_config.properties")
public class DataSourceJfConfig {

    @Autowired
    @Qualifier("jfDataSourceProperties")
    private PoolProperties jfDataSourceProperties;

    @Bean(name = "jfDataSourceProperties")
    @ConfigurationProperties(prefix = "datasource.jf")
    public PoolProperties poolProperties() {
        PoolProperties props = new PoolProperties();
        String jdbcInterceptors = "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer;org.apache.tomcat.jdbc.pool.interceptor.SlowQueryReport";
        props.setJdbcInterceptors(jdbcInterceptors);
        return props;
    }

    @Bean(name = "jfDataSource")
    public DataSource dataSource() {
        return new org.apache.tomcat.jdbc.pool.DataSource(jfDataSourceProperties);
    }

    @Bean(name = "jfSqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("jfDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:com/ctsec/dao/jf/mapper/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "jfTransactionManager")
    public DataSourceTransactionManager testTransactionManager(@Qualifier("jfDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "jfSqlSessionTemplate")
    public SqlSessionTemplate testSqlSessionTemplate(@Qualifier("jfSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}