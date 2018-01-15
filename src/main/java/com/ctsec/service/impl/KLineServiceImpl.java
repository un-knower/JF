package com.ctsec.service.impl;

import com.ctsec.dao.jf.KLineMapper;
import com.ctsec.model.jf.KLine;
import com.ctsec.service.KLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("kLineService")
@Deprecated
public class KLineServiceImpl implements KLineService {

    @Autowired
    private KLineMapper kLineMapper;

    @Override
    public List<KLine> getDayKLine(String secuCode, Integer fromDate) {
        return kLineMapper.selectDayKLine(secuCode, fromDate);
    }

    @Override
    public List<KLine> getMonthKLine(String secuCode, Integer fromDate) {
        return kLineMapper.selectMonthKLine(secuCode, fromDate);
    }

    @Override
    public List<KLine> getYearKLine(String secuCode) {
        return kLineMapper.selectYearKLine(secuCode);
    }

}
