package com.ctsec.dao.jf;

import com.ctsec.vo.BranchRank;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/20.
 */
public interface BranchRankDao {

    List<BranchRank> selectBranchRank(String sqlQuery);

}
