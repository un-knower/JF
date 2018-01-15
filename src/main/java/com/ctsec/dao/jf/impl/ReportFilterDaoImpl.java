package com.ctsec.dao.jf.impl;

import com.ctsec.dao.jf.ReportFilterDao;
import com.ctsec.dao.kylin.KylinRowMapper;
import com.ctsec.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 经营报表各类筛选条件信息数据访问接口层
 *
 * Created by luchisheng on 2017/11/17.
 */

@Repository("ReportFilterDao")
public class ReportFilterDaoImpl implements ReportFilterDao {

    @Autowired
    @Qualifier("kylinJdbcTemplate")
    private JdbcTemplate kylinJdbcTemplate;

    @Override
    public List<BranchInfo> selectBranchFilter(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(BranchInfo.class));
    }

    @Override
    public List<SecuritiesInfo> selectStockCode(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(SecuritiesInfo.class));
    }

    @Override
    public List<StockAccount> selectStockAccount(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(StockAccount.class));
    }

    @Override
    public List<CustomerInfo> selectCustomer(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(CustomerInfo.class));
    }

    @Override
    public List<AssetSection> selectAssetSection(String sqlQuery) {
        return kylinJdbcTemplate.query(sqlQuery, KylinRowMapper.getDefault(AssetSection.class));
    }
}
