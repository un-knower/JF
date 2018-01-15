package com.ctsec.dao.jf;

import com.ctsec.vo.BranchStatus;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/21.
 */
public interface BranchStatusDao {

    List<BranchStatus> selectBranchStatus(String sqlQuery);

}
