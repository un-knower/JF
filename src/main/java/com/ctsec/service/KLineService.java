package com.ctsec.service;

import com.ctsec.model.jf.KLine;

import java.util.List;

@Deprecated
public interface KLineService {
    List<KLine> getDayKLine(String secuCode, Integer fromDate);

    List<KLine> getMonthKLine(String secuCode, Integer fromDate);

    List<KLine> getYearKLine(String secuCode);
}
