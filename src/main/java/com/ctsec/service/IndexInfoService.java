package com.ctsec.service;

import com.ctsec.vo.SystemIndexInfo;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 系统指标描述信息服务接口层
 *
 * Created by luchisheng on 2017/11/16.
 */
public interface IndexInfoService {

    /**
     * 获取系统指标描述信息
     * @return 系统指标描述信息列表
     */

    List<SystemIndexInfo> getIndexInfo();

    /**
     * 系统指标描述信息映射转换
     * @param indexInfoList 系统指标描述信息列表
     * @return 映射转化后的系统指标描述信息
     */
    Map<String, Object> InfoMapping(List<SystemIndexInfo> indexInfoList);

}
