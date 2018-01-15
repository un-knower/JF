<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="UTF-8" %>
<%@ page errorPage="error.jsp" %>
<%@ page import="net.sf.jasperreports.engine.*"%>
<%@ page import="net.sf.jasperreports.export.*"%>
<%@ page import="net.sf.jasperreports.engine.util.*"%>
<%@ page import="net.sf.jasperreports.engine.export.*"%>
<%@ page import="net.sf.jasperreports.engine.export.ooxml.*"%>
<%@ page import="net.sf.jasperreports.j2ee.servlets.*"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="java.io.File" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.ctsec.util.AppPropertyUtil" %>
<%@ page import="com.ctsec.util.KylinServerManager" %>
<%@ page import="com.ctsec.util.ReportUtil" %>
<%@ page import="java.net.URLEncoder" %>


<%
    String reportId = request.getParameter("reportId");
    String endDate = request.getParameter("endDate");

    String exportType = request.getParameter("exportType");
    File reportFile;
    String reportName = ReportUtil.getReportName(reportId);
    String reportDesc = ReportUtil.getReportDesc(reportId);
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
    String yearId = endDate.substring(0,4);


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
    if (request.getParameter("index") != null && !request.getParameter("index").equals("") && !request.getParameter("index").equals("[]") ) {
        whereClause = request.getParameter("index");
        whereClause = whereClause.replaceAll("\\[\\{\"name\":\"","").replaceAll("]",",");
        whereClause = whereClause.replaceAll("\\{\"name\":\"","and ").replaceAll("\",\"from\":","*10000 between ").replaceAll(",\"to\":"," and ").replaceAll("},"," ");
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
    parameters.put("yearId", yearId);

    Connection conn;
//    conn = MysqlDBManager.getConnection();
    conn = KylinServerManager.getConnection();

    JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

    //File destFile = new File(reportFile.getParent() + ".jrprint");
    //String destFileName = destFile.toString();
    //JRSaver.saveObject(jasperPrint, destFileName);
    session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);

//    MysqlDBManager.closeConnection(conn);
    KylinServerManager.closeConnection(conn);

    if (exportType.equals("pdf")) {

        File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".pdf");
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "inline; filename="+ URLEncoder.encode(reportDesc,"UTF-8") + ".pdf");
        //response.setHeader("Content-Disposition","attachment; filename=" + reportDesc + ".pdf");
        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        OutputStream outputStream = response.getOutputStream();
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        //SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();

        try {
            exporter.exportReport();
        } catch (JRException e) {
            throw new ServletException(e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException ex) {
                }
            }
        }
    }

    else if (exportType.equals("xlsx"))

    {
        File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".xlsx");

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(reportDesc,"UTF-8") + ".xlsx");
        //response.setHeader("Content-Disposition","attachment; filename=" + reportDesc + ".xlsx");
        JRXlsxExporter exporter = new JRXlsxExporter();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        OutputStream outputStream = response.getOutputStream();
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        try {
            exporter.exportReport();
        } catch (JRException e) {
            throw new ServletException(e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException ex) {
                }
            }
        }
    }

    else if (exportType.equals("docx"))

    {
        File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".docx");

        response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        //response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(jasperPrint.getName() + ".docx", "utf-8"));
        response.setHeader("Content-Disposition","attachment; filename=" + reportDesc + ".docx");
        JRDocxExporter exporter = new JRDocxExporter();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        OutputStream outputStream = response.getOutputStream();
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        try {
            exporter.exportReport();
        } catch (JRException e) {
            throw new ServletException(e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException ex) {
                }
            }
        }
    }

    else if (exportType.equals("csv"))

    {
        File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".csv");

        response.setContentType("application/csv; charset=utf-8");
        //response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(jasperPrint.getName() + ".csv", "utf-8"));
        response.setHeader("Content-Disposition","attachment; filename=" + reportDesc + ".csv");
        JRCsvExporter exporter = new JRCsvExporter();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(new   byte []{( byte ) 0xEF ,( byte ) 0xBB ,( byte ) 0xBF });
        exporter.setExporterOutput(new SimpleWriterExporterOutput(outputStream));

        try {
            exporter.exportReport();
        } catch (JRException e) {
            throw new ServletException(e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException ex) {
                }
            }
        }
    } else {
        throw new JRRuntimeException("Not found the export type. ");
    }
%>