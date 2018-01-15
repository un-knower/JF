package com.ctsec.dao.jf;

import com.ctsec.vo.KLineIndex;

import java.util.List;

/**
 * K线指数数据访问接口层
 * 通过KAP对K线指数查询
 *
 * Created by luchisheng on 2017/11/8.
 */
public interface KLineIndexDao {

    /**
     * 获取日K指数
     * @param sqlQuery SQL语句
     * @return 日K指数列表
     */
    List<KLineIndex> selectDayKLine(String sqlQuery);
}
