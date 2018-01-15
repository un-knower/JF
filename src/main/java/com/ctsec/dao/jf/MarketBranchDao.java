package com.ctsec.dao.jf;

import com.ctsec.vo.MarketBranch;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */
public interface MarketBranchDao {

    List<MarketBranch> selectMarketBranch(String sqlQuery);
}
