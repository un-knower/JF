package com.ctsec.service;

import com.ctsec.vo.KLineIndex;

import java.util.List;

/**
 * K线指数数据获取服务接口层
 *
 * Created by luchisheng on 2017/11/8.
 */

public interface KLineIndexService {

    /**
     * 按日获取K线指数数据
     * @param secuCode 证券代码
     * @param startDate 日期
     * @return 返回日K指数列表
     */
    List<KLineIndex> getDayKLine(String endDate, String secuCode);

}
