package com.ctsec.dao.jf;

import com.ctsec.vo.BranchPerformance;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/26.
 */
public interface BranchPerformanceDao {

    List<BranchPerformance> selectBranchPerformance(String sqlQuery);

}
