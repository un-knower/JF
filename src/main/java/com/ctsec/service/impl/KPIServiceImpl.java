package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.KPIDao;
import com.ctsec.vo.KPILeft;
import com.ctsec.service.KPIService;
import com.ctsec.vo.KPIRight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * 关键指标数据服务实现层
 *
 * Created by luchisheng on 2017/11/23.
 */

@Service("kpiService")
public class KPIServiceImpl implements KPIService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("kpiDao")
    private KPIDao kpiDao;

    @Override
    public List<KPILeft> getKPILeft() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_LEFT();

        return kpiDao.selectKPILeft(sqlQuery);
    }

    @Override
    public List<KPIRight> getDayKPIRight() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_BY_DAY();

        return kpiDao.selectKPIRight(sqlQuery);
    }

    @Override
    public List<KPIRight> getMonthKPIRight01() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_01_BY_MONTH();

        return kpiDao.selectKPIRight(sqlQuery);
    }

    @Override
    public List<KPIRight> getMonthKPIRight02() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_02_BY_MONTH();

        return kpiDao.selectKPIRight(sqlQuery);
    }

    @Override
    public List<KPIRight> getYearKPIRight01() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_01_BY_YEAR();

        return kpiDao.selectKPIRight(sqlQuery);
    }

    @Override
    public List<KPIRight> getYearKPIRight02() {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_02_BY_YEAR();

        return kpiDao.selectKPIRight(sqlQuery);
    }

    @Override
    public List<KPIRight> getKPIRight03(String fromDate, String toDate, String fromDate1, String toDate1) {

        String sqlQuery = sqlQueryConfig.getSEL_KPI_KPI_RIGHT_03();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate, fromDate1, toDate1);
        return kpiDao.selectKPIRight(sqlQuery);
    }

}
