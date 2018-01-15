package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.CashManageFilterDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.ProductCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 现金理财字段筛选数据访问实现层
 *
 * Created by luchisheng on 2017/12/12.
 */

@Repository("CashManageFilterDao")
public class CashManageFilterDaoImpl implements CashManageFilterDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<ProductCode> selectProductCode(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(ProductCode.class));
    }

}
