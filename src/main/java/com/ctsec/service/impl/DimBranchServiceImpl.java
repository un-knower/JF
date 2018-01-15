package com.ctsec.service.impl;

import com.ctsec.dao.jf.DimBranchMapper;
import com.ctsec.service.DimBranchService;
import com.ctsec.vo.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/11/8.
 */

@Service("branchService")
@Deprecated
public class DimBranchServiceImpl implements DimBranchService {

    @Autowired
    private DimBranchMapper dimBranchMapper;

    @Override
    public List<Branch> getBranch() {
        return dimBranchMapper.selectBranch();
    }

    @Override
    public Map<String, Object> mapping(List<Branch> branchList) {

        Branch superNode = new Branch(1000, "财通证券股份有限公司");
        return recursive(branchList, superNode);

    }

    private Map<String, Object> recursive(List<Branch> branchList, Branch branch) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", branch.getBranch_id());
        result.put("name", branch.getBranch_name());
        List<Object> childrenList = new ArrayList<>();
        List<Branch> children = getChildren(branchList, branch.getBranch_id());
        for (Branch child: children) {
            Map<String, Object> childMap = recursive(branchList, child);
            childrenList.add(childMap);
        }
        result.put("children", childrenList);
        return result;
    }

    private List<Branch> getChildren(List<Branch> branchList, Integer subcompanyId) {
        List<Branch> result = new ArrayList<>();
        for (Branch branch: branchList) {
            if (branch.getSubcompany_id().equals(subcompanyId)) {
                result.add(branch);
            }
        }
        return result;
    }
}
