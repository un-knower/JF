package com.ctsec.service;

import com.ctsec.model.jf.ExcelImportConfig;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by luchisheng on 2017/12/22.
 */
public interface ExcelImportService {

    List<ExcelImportConfig> getExcelImportConfig();

    ArrayList getExcelConfigMapping(List<ExcelImportConfig> excelImportConfigList);

    String importYearFinance(MultipartFile file);

    String importQuarterFinance(MultipartFile file);

    String importMonthFinance(MultipartFile file);

    String importShTrade(Integer month, MultipartFile file);

    String importSzTrade(Integer month, MultipartFile file);
}
