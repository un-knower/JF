package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.BranchInfoDao;
import com.ctsec.vo.BranchInfo;
import com.ctsec.service.BranchInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 分支结构基本信息服务实现层
 *
 * Created by luchisheng on 2017/11/14.
 */

@Service("branchFilterService")
public class BranchInfoServiceImpl implements BranchInfoService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("BranchInfoDao")
    private BranchInfoDao branchInfoDao;

    @Override
    public List<BranchInfo> getBranchCategory() {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_FILTER_BRANCH_CATEGORY_LEVEL();
        return branchInfoDao.selectBranchFilter(sqlQuery);
    }

    @Override
    public List<BranchInfo> getSubCompany() {
        String sqlQuery = sqlQueryConfig.getSEL_BRANCH_PERFORMANCE_FILTER_SUB();
        return branchInfoDao.selectBranchFilter(sqlQuery);
    }

}
