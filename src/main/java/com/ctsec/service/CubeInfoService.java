package com.ctsec.service;

import com.ctsec.vo.CubeInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by luchisheng on 2017/12/19.
 */
public interface CubeInfoService {

    List<CubeInfo> getCubeInfo();

    CubeInfo getByCube(String cubeName);

    ArrayList mapping(ArrayList menuList);

}
