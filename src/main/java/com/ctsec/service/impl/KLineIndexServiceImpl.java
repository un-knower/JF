package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.KLineIndexDao;
import com.ctsec.vo.KLineIndex;
import com.ctsec.service.KLineIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

/**
 * K线指数数据获取服务实现层
 *
 * Created by luchisheng on 2017/11/8.
 */

@Service("kLineIndexService")
public class KLineIndexServiceImpl implements KLineIndexService {

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("kLineIndexDao")
    private KLineIndexDao kLineIndexDao;

    @Override
    public List<KLineIndex> getDayKLine(String endDate, String secuCode) {

        String sqlQuery = sqlQueryConfig.getSEL_MARKET_K_LINE_BY_DAY();
        sqlQuery = MessageFormat.format(sqlQuery, endDate, secuCode);

        return kLineIndexDao.selectDayKLine(sqlQuery);
    }

}
