package com.ctsec.service.impl;

import com.ctsec.dao.jf.KapCubeInfoMapper;
import com.ctsec.service.CubeInfoService;
import com.ctsec.service.ParamDateService;
import com.ctsec.vo.CubeInfo;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by luchisheng on 2017/12/19.
 */
@Service("cubeInfoService")
public class CubeInfoServiceImpl implements CubeInfoService {

    private static Map<String, List<String>> clearDateMap = new HashMap<>();
    static {
        clearDateMap.put("dashboard_kpi", Collections.singletonList("c_kpi_dashboard_daily_data_01"));
        clearDateMap.put("dashboard_market", Collections.singletonList("c_kpi_dashboard_daily_data_01"));
        clearDateMap.put("dashboard_branch", Collections.singletonList("c_branch_dashboard_01"));
        clearDateMap.put("management_transaction", Arrays.asList("c_trade_statistics_detail_01", "c_trade_statistics_daily_01",
                "c_trade_statistics_weekly_01", "c_trade_statistics_monthly_01", "c_trade_statistics_yearly_01"));
        clearDateMap.put("management_assetchange", Arrays.asList("c_asset_change_detail_daily_01", "c_asset_change_daily_01",
                "c_asset_change_monthly_01"));
        clearDateMap.put("management_cooperatedevelop", Arrays.asList("c_coop_statistics_01", "c_coop_client_01"));
        clearDateMap.put("management_limithold", Arrays.asList("c_restricted_statistics_01", "c_restricted_statistics_01"));
        clearDateMap.put("management_customercount", Arrays.asList("c_open_client_statistics_01", "c_asset_section_statistics_01",
                "c_margin_trading_statistics_01"));
        clearDateMap.put("managerxin_businessanalysis", Collections.singletonList("c_cashclient_asset_01"));
        clearDateMap.put("managerxin_report", Collections.singletonList("c_cashclient_redemption_01"));
        clearDateMap.put("managerxin_assets", Collections.singletonList("c_cashclient_business_01"));
        clearDateMap.put("managerxin_analysis", Collections.singletonList("c_cashclient_business_01"));
        clearDateMap.put("query_self", Collections.singletonList("c_related_trade_statistics_01"));
        clearDateMap.put("query_relation", Collections.singletonList("c_related_trade_statistics_01"));
        clearDateMap.put("import_data", new ArrayList<>());
    }

    @Autowired
    KapCubeInfoMapper kapCubeInfoMapper;

    @Autowired
    ParamDateService paramDateService;

    @Override
    public List<CubeInfo> getCubeInfo() {
        return kapCubeInfoMapper.selectAll();
    }

    @Override
    public CubeInfo getByCube(String cubeName) {
        return kapCubeInfoMapper.selectOne(cubeName).get(0);
    }

    @Override
    public ArrayList mapping(ArrayList menuList) {
        for (int i = 0; i < menuList.size(); i++) {
            HashedMap menuItem = (HashedMap) menuList.get(i);
            ArrayList children = (ArrayList) menuItem.get("children");
            List<HashedMap> newChildren = new ArrayList<>();
            for (Object child: children) {
                HashedMap childItem = (HashedMap) child;
                String subKey = childItem.get("subKey").toString();
                List<String> clearDateList = clearDateMap.get(subKey);
                List<Map<String, String>> buildDateList = new ArrayList<>();
                for (String clearDate: clearDateList) {
                    CubeInfo cubeInfo = this.getByCube(clearDate);
                    String cubeName = cubeInfo.getCube_name();
                    String buildDate = cubeInfo.getLast_build_date();
                    Map<String, String> dateItem = new HashMap<>();
                    dateItem.put("cubeName", cubeName);
                    if (cubeName.equals("c_cashclient_asset_01")) {
                        buildDate = paramDateService.getTradingDay(buildDate.replaceAll("-", ""));
                        buildDate = buildDate.substring(0, 4) + "-" + buildDate.substring(4, 6) + "-" + buildDate.substring(6, 8);
                    }
                    dateItem.put("buildDate", buildDate);
                    buildDateList.add(dateItem);
                }
                childItem.put("buildDate", buildDateList);
                newChildren.add(childItem);
            }
            ((HashedMap) menuList.get(i)).put("children", newChildren);
        }
        return menuList;
    }
}
