package com.ctsec.dao.jf;

import com.ctsec.vo.BranchDevelopment;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/22.
 */
public interface BranchDevelopmentDao {

    List<BranchDevelopment> selectBranchDevelopment(String sqlQuery);

}
