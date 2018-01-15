package com.ctsec.service.impl;

import com.ctsec.service.UniversalService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

/**
 * Created by luchisheng on 2018/1/3.
 */

@Service("universalService")
public class UniversalServiceImpl implements UniversalService {

    @Override
    public List<String> xAxisOrder(List<String> xAxisDataList) {
        xAxisDataList.sort(Comparator.comparing(Integer::valueOf));
        return xAxisDataList;
    }

}
