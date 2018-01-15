package com.ctsec.service;

import com.ctsec.vo.BranchRank;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/20.
 */
public interface BranchRankService {

    List<BranchRank> getDayMarketBranch(String endDate);

    List<BranchRank> getYearMarketBranch(String endDate);

    Map<String,  Map<String, Object>> marketBranchMapping(List<BranchRank> branchRankList);

}
