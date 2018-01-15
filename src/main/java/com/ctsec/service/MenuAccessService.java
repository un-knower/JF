package com.ctsec.service;

import com.ctsec.vo.MenuAccessInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * 权限管理-菜单访问权限信息服务接口层
 *
 * Created by luchisheng on 2017/12/5.
 */

public interface MenuAccessService {

    List<MenuAccessInfo> getMenuAccess(String roleId);

    ArrayList mapping(List<MenuAccessInfo> menuAccessInfoList);

}
