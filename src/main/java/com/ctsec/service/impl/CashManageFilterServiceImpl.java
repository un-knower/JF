package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.CashManageFilterDao;
import com.ctsec.service.CashManageFilterService;
import com.ctsec.vo.ProductCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * Created by luchisheng on 2017/12/12.
 */

@Service("cashManageFilterService")
public class CashManageFilterServiceImpl implements CashManageFilterService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("CashManageFilterDao")
    private CashManageFilterDao cashManageFilterDao;

    @Override
    public List<ProductCode> getProductCode() {
        String sqlQuery = sqlQueryConfig.getSEL_MANAGEMENT_FILTER_PRODUCT();
        return cashManageFilterDao.selectProductCode(sqlQuery);
    }

}
