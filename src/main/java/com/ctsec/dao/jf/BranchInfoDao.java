package com.ctsec.dao.jf;

import com.ctsec.vo.BranchInfo;

import java.util.List;

/**
 * 分支机构信息数据访问接口层
 * 通过KAP对分支机构信息查询
 *
 * Created by luchisheng on 2017/11/14.
 */
public interface BranchInfoDao {

    /**
     * 查询分支机构筛选信息
     * @param sqlQuery SQL语句
     * @return 分支机构筛选信息列表
     */
    List<BranchInfo> selectBranchFilter(String sqlQuery);

}
