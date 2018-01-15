package com.ctsec.service.impl;

import com.ctsec.dao.jf.ManualAdjustMapper;
import com.ctsec.dao.jf.SecuCompanyMapper;
import com.ctsec.dao.jf.TradeStatisticsShMapper;
import com.ctsec.dao.jf.TradeStatisticsSzMapper;
import com.ctsec.model.jf.ManualAdjust;
import com.ctsec.model.jf.SecuCompany;
import com.ctsec.model.jf.TradeStatisticsSh;
import com.ctsec.model.jf.TradeStatisticsSz;
import com.ctsec.service.DataImportService;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("dataImportService")
public class DataImportServiceImpl implements DataImportService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataImportServiceImpl.class);

    @Autowired
    private ManualAdjustMapper manualAdjustMapper;
    @Autowired
    private TradeStatisticsShMapper tradeStatisticsShMapper;
    @Autowired
    private TradeStatisticsSzMapper tradeStatisticsSzMapper;
    @Autowired
    private SecuCompanyMapper secuCompanyMapper;

    @Override
    @Transactional
    public void importManualAdjust(List<ManualAdjust> data) {
        if (CollectionUtils.isNotEmpty(data)) {
            for (int i = 0; i < data.size(); ++i) {
                ManualAdjust manualAdjust = new ManualAdjust();
                manualAdjust.setBranch_code(data.get(i).getBranch_code());
                manualAdjust.setAdjust_time(data.get(i).getAdjust_time());
                manualAdjust.setAdjust_item(data.get(i).getAdjust_item());
                manualAdjustMapper.deleteByCodeAndTimeAndItem(manualAdjust);
            }
            manualAdjustMapper.batchSaveOrUpdate(data);
        }
        LOGGER.info("import data of trade of manual finance{}", CollectionUtils.size(data));
    }

    @Override
    @Transactional
    public void importShTrade(List<TradeStatisticsSh> data) {
        if (CollectionUtils.isNotEmpty(data)) {
            tradeStatisticsShMapper.deleteByMonth(data.get(0).getMonth_id());
            tradeStatisticsShMapper.batchSaveOrUpdate(data);
        }
        LOGGER.info("import data of trade of sh {}", CollectionUtils.size(data));
    }

    @Override
    @Transactional
    public void importSzTrade(List<TradeStatisticsSz> data) {
        if (CollectionUtils.isNotEmpty(data)) {
            tradeStatisticsSzMapper.deleteByMonth(data.get(0).getMonth_id());
            tradeStatisticsSzMapper.batchSaveOrUpdate(data);
        }
        LOGGER.info("import data of trade of sz {}", CollectionUtils.size(data));
    }

    @Override
    public Map<String, Integer> getSecuCompanyNameIdMap() {
        Map<String, Integer> map = new HashMap<>();
        List<SecuCompany> companies = secuCompanyMapper.getAll();
        if (CollectionUtils.isNotEmpty(companies)) {
            for (SecuCompany company : companies) {
                map.put(company.getCompany_name(), company.getCompany_id());
            }
        }
        return map;
    }
}
