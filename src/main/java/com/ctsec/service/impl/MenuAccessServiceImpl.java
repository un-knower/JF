package com.ctsec.service.impl;

import com.ctsec.dao.jf.MenuAccessMapper;
import com.ctsec.service.MenuAccessService;
import com.ctsec.vo.MenuAccessInfo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 权限管理-菜单访问权限信息服务实现层
 *
 * Created by luchisheng on 2017/12/5.
 */

@Service("menuAccessService")
public class MenuAccessServiceImpl implements MenuAccessService {

    @Autowired
    MenuAccessMapper menuAccessMapper;

    @Override
    public List<MenuAccessInfo> getMenuAccess(String roleId) {
        return menuAccessMapper.selectByRoleId(roleId);
    }

    @Override
    public ArrayList mapping(List<MenuAccessInfo> menuAccessInfoList) {
        Map<String, Object> menuMap = new LinkedHashMap<>();
        Set<String> keySet = new HashSet<>();
        for (MenuAccessInfo menuAccessInfo: menuAccessInfoList) {
            String key = menuAccessInfo.getKey();
            HashedMap menuItem = new HashedMap();
            if (keySet.contains(key)) {
                menuItem = (HashedMap) menuMap.get(key);
            }
            else {
                keySet.add(key);
                menuItem.put("key", key);
                menuItem.put("title", menuAccessInfo.getTitle());
                menuItem.put("menuClass", menuAccessInfo.getMenu_class());
                menuItem.put("children", new ArrayList<>());
            }
            ArrayList<HashedMap> children = (ArrayList) menuItem.get("children");
            HashedMap subMenuItem = new HashedMap();
            subMenuItem.put("subKey", menuAccessInfo.getSub_key());
            subMenuItem.put("subTitle", menuAccessInfo.getSub_title());
            subMenuItem.put("subTitleDesc", menuAccessInfo.getSub_title_desc());
            subMenuItem.put("menuLink", menuAccessInfo.getMenu_link());
            children.add(subMenuItem);
            menuItem.put("children", children);
            menuMap.put(key, menuItem);
        }
        return new ArrayList<>(menuMap.values());
    }
}
