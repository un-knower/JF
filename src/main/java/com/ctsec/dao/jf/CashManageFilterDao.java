package com.ctsec.dao.jf;

import com.ctsec.vo.ProductCode;

import java.util.List;

/**
 * 现金理财字段筛选数据访问接口层
 *
 * Created by luchisheng on 2017/12/12.
 */
public interface CashManageFilterDao {

    /**
     * 获取产品编号
     * @param sqlQuery sql语音
     * @return 产品编号
     */
    List<ProductCode> selectProductCode(String sqlQuery);

}
