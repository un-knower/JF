package com.ctsec.util;

import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
/**
 *
 * 导出Excel模板
 * <p>Title:ExportUtil.java</p>
 * <p>Company: quant-chi</p>
 * <p>Description:</p>
 * @author:maxj
 * @date: 2017年12月21日
 *
 */
public class ExportUtil {

    /**
     * 查询结构输出Excel
     * @param fileName
     * @param Title
     * @param listContent
     * @return
     */
    public  final static String exportExcel(HttpServletResponse response,String fileName,String title, String[] titleArray, List<? extends Object> listContent) {
        String result="Excel文件导出成功！";
        try {
            OutputStream os = response.getOutputStream();
            response.reset();// 清空输出流
            response.setHeader("Content-disposition", "attachment; filename="+ new String(fileName.getBytes("GB2312"),"ISO8859-1")+".xls");
            response.setContentType("application/msexcel");

            WritableWorkbook workbook = Workbook.createWorkbook(os);
            WritableSheet sheet = workbook.createSheet("Sheet1", 0);
            jxl.SheetSettings sheetset = sheet.getSettings();
            sheetset.setProtected(false);
            //WritableFont BoldFont = new WritableFont(WritableFont.ARIAL, 10,WritableFont.BOLD);
            WritableFont NormalFont = new WritableFont(WritableFont.ARIAL, 10);

            WritableCellFormat wcf_center = new WritableCellFormat(NormalFont);
            wcf_center.setBorder(Border.ALL, BorderLineStyle.THIN);
            wcf_center.setVerticalAlignment(VerticalAlignment.CENTRE);
            wcf_center.setAlignment(Alignment.CENTRE);
            wcf_center.setWrap(false);

            WritableCellFormat wcf_left = new WritableCellFormat(NormalFont);
            wcf_left.setBorder(Border.ALL, BorderLineStyle.THIN);
            wcf_left.setVerticalAlignment(VerticalAlignment.CENTRE);
            wcf_left.setAlignment(Alignment.LEFT);
            wcf_left.setWrap(false);

            sheet.setColumnView(0, 10);
            sheet.setColumnView(1, 20);
            sheet.setColumnView(2, 30);
            sheet.setColumnView(3, 20);
            sheet.setColumnView(4, 20);
            sheet.setColumnView(5, 20);
            sheet.setColumnView(6, 20);
            sheet.setColumnView(7, 20);
            sheet.setColumnView(8, 20);

            sheet.addCell(new Label(0, 0, title ,wcf_center));
            sheet.mergeCells(0,0,8,0);
            for (int i = 0; i < titleArray.length; i++) {
                sheet.addCell(new Label(i, 1,titleArray[i],wcf_center));
            }
            Field[] fields;
            int i=2;
            Integer index = 0;
            for(Object obj:listContent){
                ++ index;
                sheet.addCell(new Label(0, i, index.toString() ,wcf_center));
                fields=obj.getClass().getDeclaredFields();
                int j=1;
                for(Field v:fields){
                    v.setAccessible(true);
                    Object va=v.get(obj);
                    if(va==null){
//                        va="";
                        continue;
                    }
                    sheet.addCell(new Label(j, i,va.toString().replaceAll("9999999999.(00)+", "-").replaceAll("9.999999999E9", "-"),wcf_center));
                    j++;
                }
                i++;
            }
            workbook.write();
            workbook.close();
        } catch (Exception e) {
            result="文件导出失败，原因："+ e.toString();
            System.out.println(result);
            e.printStackTrace();
        }
        return result;
    }
}