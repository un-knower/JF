package com.ctsec.service;

import com.ctsec.vo.MarketBranch;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */
public interface MarketBranchService {

    List<MarketBranch> getMarketBranch(String endDate);

    List<MarketBranch> getMarketBranchIn(String secuName, String endDate);

}
