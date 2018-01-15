package com.ctsec.service;

import com.ctsec.vo.ProductCode;

import java.util.List;

/**
 * 现金理财信息服务接口层
 *
 * Created by luchisheng on 2017/12/12.
 */
public interface CashManageFilterService {

    /**
     * 获取产品编号
     * @return 产品编号列表
     */
    List<ProductCode> getProductCode();

}
