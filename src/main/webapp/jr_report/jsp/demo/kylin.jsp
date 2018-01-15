<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="UTF-8" %>
<%@ page errorPage="../error.jsp" %>
<%@ page import="com.quantchi.security.Md5Util" %>
<%@ page import="net.sf.jasperreports.engine.*" %>
<%@ page import="net.sf.jasperreports.engine.export.HtmlExporter" %>
<%@ page import="net.sf.jasperreports.engine.export.JRHtmlExporterParameter" %>
<%@ page import="net.sf.jasperreports.engine.util.JRLoader" %>
<%@ page import="net.sf.jasperreports.engine.util.JRSaver" %>
<%@ page import="net.sf.jasperreports.j2ee.servlets.ImageServlet" %>
<%@ page import="java.io.File" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="org.apache.commons.lang3.math.NumberUtils" %>
<%@ page import="com.quantchi.util.AppPropertyUtil" %>
<%@ page import="com.quantchi.dbutils.KylinServerManager" %>


<%
    String report_id = request.getParameter("report_id");
    String third_party = request.getParameter("third_party");
    String level = request.getParameter("levelId");
    Integer levelId = StringUtils.isBlank(level) ? 5 : NumberUtils.toInt(level);
    String baseUrl = AppPropertyUtil.getProperty("baseUrl");
    String time_stamp = null;
    String export_type = null;
    String md5FileName = null;
    int result = 0;
    java.util.Date date = new java.util.Date();
    Calendar cal = Calendar.getInstance();

    if (request.getParameter("md5FileName") != null && !request.getParameter("md5FileName").equals("")) {
        md5FileName = request.getParameter("md5FileName");
    } else {
        if (request.getParameter("time_stamp") != null && !request.getParameter("time_stamp").equals("")) {
            time_stamp = request.getParameter("time_stamp");
        } else {
            SimpleDateFormat timestmpFormater = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss.SSS");
            time_stamp = timestmpFormater.format(date);
        }

        if (request.getParameter("export_type") != null && !request.getParameter("export_type").equals("")) {
            export_type = request.getParameter("export_type");
        } else {
            export_type = "html";
        }

        md5FileName = Md5Util.getMd5(report_id + time_stamp);
    }

    File jrPrintFile = new File(application.getRealPath("/reports/demo/temp/" + md5FileName + ".jrprint"));
    JasperPrint jasperPrint = null;
    File reportFile = null;

    if (jrPrintFile.exists()) {
        jasperPrint = (JasperPrint) JRLoader.loadObjectFromFile(jrPrintFile.getPath());
    } else {

        reportFile = new File(application.getRealPath("/reports/demo/" + report_id + ".jasper"));
        if (!reportFile.exists())
            throw new JRRuntimeException(
                    "File" + report_id + ".jasper not found. The report design must be compiled first.");

        JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportFile.getPath());

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("levelId", levelId);
        parameters.put("baseUrl", baseUrl);

        Connection conn = null;
        conn = KylinServerManager.getConnection();

        jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

        File destFile = new File(reportFile.getParent() + "/temp/", md5FileName + ".jrprint");
        String destFileName = destFile.toString();
        JRSaver.saveObject(jasperPrint, destFileName);
        session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);

        KylinServerManager.closeConnection(conn);
    }

    HtmlExporter exporter = new HtmlExporter();

    int pageIndex = 0;
    int lastPageIndex = 0;
    int maxPageIndex = 0;

    if (jasperPrint.getPages() != null) {
        lastPageIndex = jasperPrint.getPages().size() - 1;
        maxPageIndex = jasperPrint.getPages().size();
    }

    String pageStr = request.getParameter("page");
    try {
        pageIndex = Integer.parseInt(pageStr);
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
    exporter.setParameter(JRHtmlExporterParameter.IMAGES_URI, "../../servlets/image?image=");
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
    <title>Report Service - Quant-Chi</title>
        <%
	if (!"y".equals(third_party)) {
%>
    <link rel="stylesheet"
          href="../../themes/css/fonts/fontawesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../themes/css/bootstrap.css">
    <link rel="stylesheet" href="../../themes/css/xenon-core.css">
    <script type="text/javascript" src="../../scripts/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../scripts/js/TweenMax.min.js"></script>
    <script type="text/javascript" src="../../scripts/js/resizeable.js"></script>
    <script type="text/javascript" src="../../scripts/js/xenon-toggles.js"></script>
    <script type="text/javascript" src="../../scripts/js/xenon-custom.js"></script>
    <script type="text/javascript"
            src="../../scripts/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
        <%
	}
%>

<body class="page-body">

<div class="row">
    <div class="col-md-12">
        <div class="panel-default">
            <div class="row">
                <div class="col-sm-12">
                    <div class="clearfix"></div>
                    <div class="g-jrpagetable">
                        <%=sbuffer.toString()%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>