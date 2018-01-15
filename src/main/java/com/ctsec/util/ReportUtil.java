package com.ctsec.util;

import org.apache.commons.collections.map.HashedMap;

import java.util.Map;

/**
 * Created by luchisheng on 2017/11/13.
 */
public class ReportUtil {

    private static final HashedMap reportUtil = new HashedMap();
    static {
        reportUtil.put("1", new HashedMap(){{
            put("reportName","Trade_Statistics_Detail");
            put("reportDesc","交易统计原始日报");
            put("baseDir","/jr_report/reports/01TradeStatistics/");
        }});
        reportUtil.put("2", new HashedMap(){{
            put("reportName","Trade_Statistics_Daily");
            put("reportDesc","分支机构统计日报");
            put("baseDir","/jr_report/reports/01TradeStatistics/");
        }});
        reportUtil.put("3", new HashedMap(){{
            put("reportName","Trade_Statistics_Weekly");
            put("reportDesc","分支机构统计周报");
            put("baseDir","/jr_report/reports/01TradeStatistics/");
        }});
        reportUtil.put("4", new HashedMap(){{
            put("reportName","Trade_Statistics_Monthly");
            put("reportDesc","分支机构统计月报");
            put("baseDir","/jr_report/reports/01TradeStatistics/");
        }});
        reportUtil.put("5", new HashedMap(){{
            put("reportName","Trade_Statistics_Anually");
            put("reportDesc","分支机构统计年报");
            put("baseDir","/jr_report/reports/01TradeStatistics/");
        }});
        reportUtil.put("6", new HashedMap(){{
            put("reportName","Asset_Change_Detail");
            put("reportDesc","分支机构资产变动原始日报");
            put("baseDir","/jr_report/reports/02AssetsChanges/");
        }});
        reportUtil.put("7", new HashedMap(){{
            put("reportName","Asset_Change_Daily");
            put("reportDesc","分支机构资产变动日报");
            put("baseDir","/jr_report/reports/02AssetsChanges/");
        }});
        reportUtil.put("8", new HashedMap(){{
            put("reportName","Asset_Change_Monthly");
            put("reportDesc","分支机构资产变动月报");
            put("baseDir","/jr_report/reports/02AssetsChanges/");
        }});
        reportUtil.put("9", new HashedMap(){{
            put("reportName","Co_Development_Statistics");
            put("reportDesc","合作开发统计报表");
            put("baseDir","/jr_report/reports/03CooperativeDev/");
        }});
        reportUtil.put("10", new HashedMap(){{
            put("reportName","Co_Business_Statistics");
            put("reportDesc","合作开发客户报表");
            put("baseDir","/jr_report/reports/03CooperativeDev/");
        }});
        reportUtil.put("11", new HashedMap(){{
            put("reportName","Restricted_Flow_Statistics");
            put("reportDesc","限售非流通股份变动流水");
            put("baseDir","/jr_report/reports/04RestrictedPosition/");
        }});
        reportUtil.put("12", new HashedMap(){{
            put("reportName","Restricted_Hold_Statistics");
            put("reportDesc","限售非流通股份持仓");
            put("baseDir","/jr_report/reports/04RestrictedPosition/");
        }});
        reportUtil.put("13", new HashedMap(){{
            put("reportName","Open_Cust_Statistics");
            put("reportDesc","开户情况统计报表");
            put("baseDir","/jr_report/reports/05CustStatistics/");
        }});
        reportUtil.put("1301", new HashedMap(){{
            put("reportName","Open_Cust_Statistics_Detail");
            put("reportDesc","开户情况明细报表");
            put("baseDir","/jr_report/reports/05CustStatistics/");
        }});
        reportUtil.put("14", new HashedMap(){{
            put("reportName","Asset_Section_Query");
            put("reportDesc","分支机构资产分段查询");
            put("baseDir","/jr_report/reports/05CustStatistics/");
        }});
        reportUtil.put("15", new HashedMap(){{
            put("reportName","Margin_Trading_Statistics");
            put("reportDesc","融资融券日常业务统计");
            put("baseDir","/jr_report/reports/05CustStatistics/");
        }});
        reportUtil.put("16", new HashedMap(){{
            put("reportName","Thou_Shalt_Redeem");
            put("reportDesc","申购赎回情况表");
            put("baseDir","/jr_report/reports/06OperatingReport/");
        }});
        reportUtil.put("17", new HashedMap(){{
            put("reportName","Asset_Change");
            put("reportDesc","资金变动情况");
            put("baseDir","/jr_report/reports/06OperatingReport/");
        }});
        reportUtil.put("18", new HashedMap(){{
            put("reportName","Cust_Analysis");
            put("reportDesc","签约客户分析情况");
            put("baseDir","/jr_report/reports/06OperatingReport/");
        }});
        reportUtil.put("19", new HashedMap(){{
            put("reportName","Associated_Search");
            put("reportDesc","关联方证券经纪业务报表");
            put("baseDir","/jr_report/reports/07AssociatedSearch/");
        }});
    }

    public static String getReportName(String reportId) {
        return ((Map<String, String>) reportUtil.get(reportId)).get("reportName");
    }
    public static String getReportDesc(String reportId) {
        return ((Map<String, String>) reportUtil.get(reportId)).get("reportDesc");
    }
    public static String getBaseDir(String reportId) {
        return ((Map<String, String>) reportUtil.get(reportId)).get("baseDir");
    }
}
