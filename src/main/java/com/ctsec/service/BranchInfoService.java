package com.ctsec.service;

import com.ctsec.vo.BranchInfo;

import java.util.List;

/**
 * 分支结构基本信息服务接口层
 *
 * Created by luchisheng on 2017/11/14.
 */

public interface BranchInfoService {

    /**
     * 获得分支机构类别信息
     * @return 分支机构类别信息列表
     */
    List<BranchInfo> getBranchCategory();

    List<BranchInfo> getSubCompany();
}
