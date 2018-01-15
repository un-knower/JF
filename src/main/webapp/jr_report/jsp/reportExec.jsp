<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="UTF-8" %>
<%@ page errorPage="error.jsp" %>
<%@ page import="net.sf.jasperreports.engine.*"%>
<%@ page import="net.sf.jasperreports.export.*"%>
<%@ page import="net.sf.jasperreports.engine.util.*"%>
<%@ page import="net.sf.jasperreports.engine.export.*"%>
<%@ page import="net.sf.jasperreports.j2ee.servlets.*"%>
<%@ page import="java.io.File" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.ctsec.util.AppPropertyUtil" %>
<%@ page import="com.ctsec.util.KylinServerManager" %>
<%@ page import="com.ctsec.util.ReportUtil" %>

<%
    String reportId = request.getParameter("reportId");
    String endDate = request.getParameter("endDate");

    String exportType = request.getParameter("exportType");
    File reportFile;

    String reportName = ReportUtil.getReportName(reportId);
    String baseDir = ReportUtil.getBaseDir(reportId);

    String branchNo;
    if (request.getParameter("branchId") != null && !request.getParameter("branchId").equals("")) {
        branchNo = request.getParameter("branchId");
        if (branchNo.equals("1000")){
            branchNo = "1=1";
        }
        else{
            branchNo = "BRANCH_CODE IN ("+"'"+branchNo.replaceAll(",","','")+"')";
        }
    } else {
        branchNo = "1=1";
    }

    String yearBegin = endDate.substring(0,4)+"0101";

    String startDate;
    if (request.getParameter("startDate") != null && !request.getParameter("startDate").equals("")) {
        startDate = request.getParameter("startDate");
    } else {
        startDate = "19700101";
    }

    String indexId;
    if (request.getParameter("indexId") != null && !request.getParameter("indexId").equals("")) {
        indexId = request.getParameter("indexId");
    } else {
        indexId = "";
    }
    //String pageNo = request.getParameter("pageNo");
    //String third_party = "y";

    String coopBranchNo;
    if (request.getParameter("coopBranchId") != null && !request.getParameter("coopBranchId").equals("")) {
        coopBranchNo = request.getParameter("coopBranchId");
        if (coopBranchNo.equals("1000")){
            coopBranchNo = "1=1";
        }
        else{
            coopBranchNo = "BRANCH_CODE IN ("+"'"+coopBranchNo.replaceAll(",","','")+"')";
        }
    } else {
        coopBranchNo = "1=1";
    }
    String assetSection;
    if (request.getParameter("assetSection") != null && !request.getParameter("assetSection").equals("")) {
        assetSection = request.getParameter("assetSection");
        assetSection = "AVG_ASSET_SECTION IN ("+"'"+assetSection.replaceAll(",","','")+"')";
    } else {
        assetSection = "1=1";
    }

    String customerNo;
    if (request.getParameter("customerNo") != null && !request.getParameter("customerNo").equals("")) {
        customerNo = request.getParameter("customerNo");
        customerNo = "a.CUST_NO IN ("+"'"+customerNo.replaceAll(",","','")+"')";
    } else {
        customerNo = "1=1";
    }

    String exchangeType;
    if (request.getParameter("exchangeType") != null && !request.getParameter("exchangeType").equals("")) {
        exchangeType = request.getParameter("exchangeType");
        exchangeType = "a.EXCHANGE_TYPE IN ("+"'"+exchangeType.replaceAll(",","','")+"')";
    } else {
        exchangeType = "1=1";
    }

    String secuCode;
    if (request.getParameter("secuCode") != null && !request.getParameter("secuCode").equals("")) {
        secuCode = request.getParameter("secuCode");
        secuCode = "a.STOCK_CODE IN ("+"'"+secuCode.replaceAll(",","','")+"')";
    } else {
        secuCode = "1=1";
    }

    String stockAccount;
    if (request.getParameter("stockAccount") != null && !request.getParameter("stockAccount").equals("")) {
        stockAccount = request.getParameter("stockAccount");
        stockAccount = "a.STOCK_ACCOUNT IN ("+"'"+stockAccount.replaceAll(",","','")+"')";
    } else {
        stockAccount = "1=1";
    }

    String startDate1;
    if (request.getParameter("startDate1") != null && !request.getParameter("startDate1").equals("")) {
        startDate1 = request.getParameter("startDate1");
    } else {
        startDate1 = "19700101";
    }

    String endDate1;
    if (request.getParameter("endDate1") != null && !request.getParameter("endDate1").equals("")) {
        endDate1 = request.getParameter("endDate1");
    } else {
        endDate1 = "19700101";
    }

    String prodCode;
    if (request.getParameter("prodCode") != null && !request.getParameter("prodCode").equals("")) {
        prodCode = request.getParameter("prodCode");
        prodCode = "PROD_CODE IN ("+"'"+prodCode.replaceAll(",","','")+"')";
    } else {
        prodCode = "1=1";
    }

    String whereClause;
    if (request.getParameter("index") != null && !request.getParameter("index").equals("")) {
        whereClause = request.getParameter("index");
        whereClause = whereClause.replaceAll("\\[","").replaceAll("]",",");
        whereClause = whereClause.replaceAll("\\{\"name\":\"","and ").replaceAll("\",\"from\":"," between ").replaceAll(",\"to\":"," and ").replaceAll("},"," ");
    } else {
        whereClause = "1=1";
    }

    String idNo;
    if (request.getParameter("idNo") != null && !request.getParameter("idNo").equals("")) {
        idNo = request.getParameter("idNo");
        idNo = "ID_NO IN ("+"'"+idNo.replaceAll(",","','")+"')";
    } else {
        idNo = "1=1";
    }

    reportFile = new File(application.getRealPath(baseDir + reportName + ".jasper"));
        if (!reportFile.exists())
            throw new JRRuntimeException(
             "File " + baseDir + reportName + ".jasper not found. The report design must be compiled first.");

    JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportFile.getPath());

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("startDate", startDate);
    parameters.put("endDate", endDate);
    parameters.put("branchNo", branchNo);
    parameters.put("indexId", indexId);
    parameters.put("exportType", exportType);
    parameters.put("yearBegin", yearBegin);
    parameters.put("assetSection", assetSection);
    parameters.put("customerNo", customerNo);
    parameters.put("exchangeType", exchangeType);
    parameters.put("secuCode", secuCode);
    parameters.put("stockAccount", stockAccount);
    parameters.put("startDate1", startDate1);
    parameters.put("endDate1", endDate1);
    parameters.put("coopBranchNo", coopBranchNo);
    parameters.put("prodCode", prodCode);
    parameters.put("whereClause", whereClause);
    parameters.put("idNo", idNo);

    Connection conn = null;
//    conn = MysqlDBManager.getConnection();
    conn = KylinServerManager.getConnection();

    JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

    File destFile = new File(reportFile.getParent() + ".jrprint");
    String destFileName = destFile.toString();
    JRSaver.saveObject(jasperPrint, destFileName);
    session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);

//    MysqlDBManager.closeConnection(conn);
    KylinServerManager.closeConnection(conn);

    HtmlExporter exporter = new HtmlExporter();

    int pageIndex = 0;
    int lastPageIndex = 0;
    int maxPageIndex = 0;

    if (jasperPrint.getPages() != null) {
        lastPageIndex = jasperPrint.getPages().size() - 1;
        maxPageIndex = jasperPrint.getPages().size();
    }
    try {
        pageIndex = Integer.parseInt(pageNo) - 1;
    } catch (Exception e) {
    }

    if (pageIndex < 0) {
        pageIndex = 0;
    }

    if (pageIndex > lastPageIndex) {
        pageIndex = lastPageIndex;
    }

    StringBuffer sbuffer = new StringBuffer();
    exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
    exporter.setParameter(JRExporterParameter.OUTPUT_STRING_BUFFER, sbuffer);
    exporter.setParameter(JRExporterParameter.PAGE_INDEX, Integer.valueOf(pageIndex));
    //exporter.setParameter(JRHtmlExporterParameter.HTML_HEADER, "");
    //exporter.setParameter(JRHtmlExporterParameter.BETWEEN_PAGES_HTML, "");
    //exporter.setParameter(JRHtmlExporterParameter.HTML_FOOTER, "");
    //exporter.setParameter(JRExporterParameter.OFFSET_X, 0);

    exporter.exportReport();
%>


<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Xenon Boostrap Admin Panel">
    <meta name="author" content="">
    <title>Report Service - JF</title>

<body class="page-body">

<div class="row">
    <div class="col-md-12">
        <div class="panel-default">
            <div class="row">
                <div class="col-sm-12">
                    <div class="clearfix"></div>
                    <%
                        int startIndex = 0;
                        int endIndex = 0;
                        String pageflag = "y";
                        if (pageIndex - 2 >0){
                            startIndex = pageIndex - 2;
                        } else {
                            startIndex = 0;
                        }
                        if (pageIndex + 8 > maxPageIndex){
                            endIndex = maxPageIndex;
                            if (maxPageIndex - 10 > 0) {
                                startIndex = maxPageIndex - 10;
                            } else {
                                startIndex = 0;
                            }
                        } else {
                            endIndex = pageIndex + 8;
                        }
                        if(pageIndex + 8 >= maxPageIndex){
                            pageflag = "n";
                        } else {
                            pageflag = "y";
                        }
                    %>
                    <div class="g-jrpagetable">
                        <div class="ant-table-wrapper">
                            <div class="ant-spin-container">
                                <div class="ant-table ant-table-large ant-table-fixed-header ant-table-scroll-position-middle">
                                    <div class="ant-table-content">
                                        <div class="ant-table-scroll">
                                            <div class="ant-table-body" style="overflow-x: auto; max-height: 495px; overflow-y: scroll;">
                        <%=sbuffer.toString()%>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <% if (maxPageIndex > 1) {%>
                        <ul class="pagination">
                            <%
                                if (third_party.equals("y")) {
                            %>
                            <li><a href="javascript:void(0);" page=<%=pageIndex - 1%>><i
                                    class="fa-angle-left"></i></a></li>
                            <%
                                for (int i = startIndex; i < endIndex; i++) {
                                    if(i==pageIndex){
                            %>
                                    <li class="active"><a href="javascript:void(0);" page=<%=i%>><%=i+1%></a></li>
                            <%
                                    } else {
                            %>
                            <li ><a href="javascript:void(0);" page=<%=i%>><%=i+1%></a></li>
                            <%
                                    }
                                }
                                if (pageflag.equals("y")) {
                            %>
                            <li class="disabled"><a href="#">...</a></li>
                            <%
                                }
                            %>
                            <li><a href="javascript:void(0);" page=<%=pageIndex + 1%>><i class="fa-angle-right"></i></a></li>
                            <%
                            }
                            %>
                        </ul>
                        <% }%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>