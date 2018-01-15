package com.ctsec.service;

import com.ctsec.model.jf.ManualAdjust;
import com.ctsec.model.jf.TradeStatisticsSh;
import com.ctsec.model.jf.TradeStatisticsSz;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface DataImportService {

    void importManualAdjust(List<ManualAdjust> data);

    void importShTrade(List<TradeStatisticsSh> data);

    @Transactional
    void importSzTrade(List<TradeStatisticsSz> data);

    Map<String, Integer> getSecuCompanyNameIdMap();
}
