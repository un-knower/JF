<%@page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.quantchi.dbutils.KylinServerManager"%>
<%@ page import="com.quantchi.security.Md5Util"%>
<%@ page import="com.quantchi.util.AppPropertyUtil"%>
<%@ page import="net.sf.jasperreports.engine.*"%>
<%@ page import="net.sf.jasperreports.engine.export.JRCsvExporter"%>
<%@ page import="net.sf.jasperreports.engine.export.JRPdfExporter"%>
<%@ page import="net.sf.jasperreports.engine.export.ooxml.JRDocxExporter"%>
<%@ page import="net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter"%>
<%@ page import="net.sf.jasperreports.engine.util.JRLoader"%>
<%@ page import="net.sf.jasperreports.engine.util.JRSaver"%>
<%@ page import="net.sf.jasperreports.export.SimpleExporterInput"%>
<%@ page import="net.sf.jasperreports.export.SimpleOutputStreamExporterOutput"%>
<%@ page import="net.sf.jasperreports.export.SimpleWriterExporterOutput"%>
<%@ page import="net.sf.jasperreports.j2ee.servlets.ImageServlet"%>
<%@ page import="org.apache.commons.lang.math.NumberUtils"%>
<%@ page import="org.apache.commons.lang3.StringUtils"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>


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

	String report_name = report_id;

	export_type = request.getParameter("export_type");
	if (export_type.equals("pdf")) {

		File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".pdf");
		response.setContentType("application/pdf");
		//response.setHeader("Content-Disposition", "inline; filename="+ URLEncoder.encode(jasperPrint.getName() + ".pdf"));
        response.setHeader("Content-Disposition","attachment; filename=" + report_name + ".pdf");
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

	else if (export_type.equals("xlsx"))

	{
		File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".xlsx");

		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		//response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(jasperPrint.getName() + ".xlsx", "utf8"));
		response.setHeader("Content-Disposition","attachment; filename=" + report_name + ".xlsx");
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
	
	else if (export_type.equals("docx"))

	{
		File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".docx");

		response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
		//response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(jasperPrint.getName() + ".docx", "utf-8"));
		response.setHeader("Content-Disposition","attachment; filename=" + report_name + ".docx");
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

	else if (export_type.equals("csv"))

	{
		File destFile = new File(reportFile.getParent(), jasperPrint.getName() + ".csv");

		response.setContentType("application/csv; charset=gbk");
		//response.setHeader("Content-Disposition","attachment; filename=" + URLEncoder.encode(jasperPrint.getName() + ".csv", "utf-8"));
		response.setHeader("Content-Disposition","attachment; filename=" + report_name + ".csv");
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
