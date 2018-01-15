package com.ctsec.service;


import com.ctsec.vo.Branch;

import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/11/8.
 */

@Deprecated
public interface DimBranchService {

    List<Branch> getBranch();

    Map<String, Object> mapping(List<Branch> branchList);

}
