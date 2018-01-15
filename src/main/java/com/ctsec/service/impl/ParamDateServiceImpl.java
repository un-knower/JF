package com.ctsec.service.impl;

import com.ctsec.config.query.SQLQueryConfig;
import com.ctsec.dao.jf.DimDateMapper;
import com.ctsec.dao.jf.ParamDateDao;
import com.ctsec.vo.TradingDay;
import com.ctsec.service.ParamDateService;
import com.ctsec.util.AppConstant;
import com.ctsec.util.DateUtil;
import com.ctsec.web.TestController;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 日期参数获取服务实现层
 *
 * Created by luchisheng on 2017/11/9.
 */

@Service("paramDateService")
public class ParamDateServiceImpl implements ParamDateService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private SQLQueryConfig sqlQueryConfig;

    @Autowired
    @Qualifier("ParamDateDao")
    private ParamDateDao paramDateDao;
    @Autowired
    private DimDateMapper dimDateMapper;

    @Override
    public String getPreDay(String date, String dateType) {

        String result = "";

        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                 result = DateUtil.getSimplePastDay(date, 1);
            }
            else if (AppConstant.TIME_TYPE_WEEK.equals(dateType)) {
                result = DateUtil.getSimplePastWeekDay(date, 1);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                result = DateUtil.getSimplePastMonthDay(date, 1);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                result = DateUtil.getSimplePastYearDay(date, 1);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getPreDay with date = {}!", date);
            throw e;
        }
        finally {
            return result;
        }
    }

    @Override
    public String getKPIRightFromDay(String date, String dateType, String index) {

        String fromDate = "";
        try {
            if (index.equals("0") && AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                fromDate = DateUtil.getSimpleMonthMinDay(date);
            }
            else if (index.equals("0") && AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                fromDate = DateUtil.getSimpleYearMinDay(date);
            }
            else if (index.equals("1") && AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                fromDate = DateUtil.getSimplePastMonthDay(date, 1);
                fromDate = DateUtil.getSimpleMonthMinDay(fromDate);
            }
            else if (index.equals("1") && AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                fromDate = DateUtil.getSimplePastYearDay(date, 1);
                fromDate = DateUtil.getSimpleYearMinDay(fromDate);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getFromDay!");
            throw e;
        }
        finally {
            return fromDate;
        }
    }

    @Override
    public String getKPIRightToDay(String date, String dateType) {

        String toDate = "";
        try {
            if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                toDate = DateUtil.getSimplePastMonthDay(date, 1);
                toDate = DateUtil.getSimpleMonthMaxDay(toDate);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                toDate = DateUtil.getSimplePastYearDay(date, 1);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getFromDay!");
            throw e;
        }
        finally {
            return toDate;
        }
    }

    @Override
    public String getTradingInfoPreDay(String date, String dateType) {

        String preDate = "";
        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                preDate = DateUtil.getSimplePastDay(date, 1);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                preDate = DateUtil.getSimplePastYearDay(date, 1);
                preDate = DateUtil.getSimpleMonthMaxDay(preDate);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                preDate = DateUtil.getSimplePastYearDay(date, 1);
                preDate = DateUtil.getSimpleYearMaxDay(preDate);
            }
            result = this.getTradingDay(preDate);
        }
        catch (Exception e) {
            LOGGER.error("error getFromDay!");
            throw e;
        }
        finally {
            return result;
        }

    }

    @Override
    public String getMarginFromDay(String date, String dateType) {

        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                result = date;
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                result = DateUtil.getSimpleMonthMinDay(date);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                result = DateUtil.getSimpleYearMinDay(date);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getFromDay!");
            throw e;
        }
        finally {
            return result;
        }
    }

    @Override
    public String getMarginToDay(String date) {

        String result = "";
        try {
            result = DateUtil.getSimplePastDay(date, 1);
        }
        catch (Exception e) {
            LOGGER.error("error getToDay!");
            throw e;
        }
        finally {
            return result;
        }

    }

    @Override
    public String getPolylineFromDay(String date, String dateType) {
        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                result = DateUtil.getSimpleYearMinDay(date);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                String PastDate = DateUtil.getSimplePastYearDay(date, 3);
                result = DateUtil.getSimpleYearMinDay(PastDate);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                result = "20100101";
            }
        }
        catch (Exception e) {
            LOGGER.error("error getPreDay with date = {}!", date);
            throw e;
        }
        finally {
            return result;
        }
    }

    @Override
    public String getPolylineToDay(String date, String dateType) {
        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                result = DateUtil.getSimplePastDay(date,1);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                String PastDate = DateUtil.getSimplePastMonthDay(date, 1);
                result = DateUtil.getSimpleMonthMaxDay(PastDate);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                String PastDate = DateUtil.getSimplePastYearDay(date, 1);
                result = DateUtil.getSimpleYearMaxDay(PastDate);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getPreDay with date = {}!", date);
            throw e;
        }
        finally {
            return result;
        }
    }

    @Override
    public String getTradingDay(String date) {
        TradingDay tradingDay = dimDateMapper.selectTradingDay(NumberUtils.toInt(date));
        return tradingDay.getTrade_day_id();
    }

    @Override
    public String getPreTradingDay(String date, String dateType){
        String preDay = this.getPreDay(date, dateType);
        return getTradingDay(preDay);
    }

    @Override
    public List<String> getDayTradingDay(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_UNIVERSAL_TRADING_BY_DAY();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        List<TradingDay> tradingDay = paramDateDao.selectTradingDay(sqlQuery);
        return tradingDayMapping(tradingDay);
    }

    @Override
    public List<String> getMonthTradingDay(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_UNIVERSAL_TRADING_BY_MONTH();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        List<TradingDay> tradingDay = paramDateDao.selectTradingDay(sqlQuery);
        return tradingDayMapping(tradingDay);
    }

    @Override
    public List<String> getYearTradingDay(String fromDate, String toDate) {
        String sqlQuery = sqlQueryConfig.getSEL_UNIVERSAL_TRADING_BY_YEAR();
        sqlQuery = MessageFormat.format(sqlQuery, fromDate, toDate);
        List<TradingDay> tradingDay = paramDateDao.selectTradingDay(sqlQuery);
        return tradingDayMapping(tradingDay);
    }

    private List<String> tradingDayMapping(List<TradingDay> tradingDayList) {
        List<String> mappingResult = new ArrayList<>();
        for (TradingDay tradingDay: tradingDayList) {
            mappingResult.add(tradingDay.getDay_id());
        }
        return mappingResult;
    }

    @Override
    public String getRangeTradingDay(String date, String dateType) {
        String polylineFromDay = this.getPolylineFromDay(date, dateType);
        String polylineToDay = this.getPolylineToDay(date, dateType);
        List<String> tridingDayList = new ArrayList<>();
        if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
            tridingDayList = this.getDayTradingDay(polylineFromDay, polylineToDay);
        }
        else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
            tridingDayList = this.getMonthTradingDay(polylineFromDay, polylineToDay);
        }
        else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
            tridingDayList = this.getYearTradingDay(polylineFromDay, polylineToDay);
        }
        StringBuilder result = new StringBuilder();
        for (String tradingDay: tridingDayList) {
            result.append("'").append(tradingDay).append("'").append(",");
        }
        result = new StringBuilder(result.substring(0, result.length() - 1));
        return result.toString();
    }

    @Override
    public String getClearDate() {
        String sqlQuery = sqlQueryConfig.getSEL_UNIVERSAL_CLEAR_DATE();
        return paramDateDao.selectClearDate(sqlQuery).get(0).getClear_date();
    }

    @Override
    public String getKpiCurrentMonth(String date) {
        return date.substring(0, 6);
    }

    @Override
    public String getKpiLastMonth(String date) {
        try {
            date = DateUtil.getSimplePastMonthDay(date, 1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.substring(0, 6);
    }

    @Override
    public String getKpiMinMonth(String date) {
        return date.substring(0, 4) + "01";
    }

    @Override
    public String getKpiLastYearMonth(String date) {
        try {
            date = DateUtil.getSimplePastYearDay(date, 1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.substring(0, 6);
    }

    @Override
    public String getKpiLastMinMonth(String date) {
        try {
            date = DateUtil.getSimplePastYearDay(date, 1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.substring(0, 4) + "01";
    }

    @Override
    public String getKpiLastMaxMonth(String date) {
        try {
            date = DateUtil.getSimplePastYearDay(date, 1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.substring(0, 4) + "12";
    }

    @Override
    public String getStatusInFromDay(String date, String dateType) {

        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                result = DateUtil.getSimplePastDay(date, 15);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                date = DateUtil.getSimplePastYearDay(date, 1);
                result = DateUtil.getSimpleMonthMinDay(date);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                date = DateUtil.getSimplePastYearDay(date, 5);
                result = DateUtil.getSimpleYearMinDay(date);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getFromDay!");
            throw e;
        }
        finally {
            return result;
        }
    }

    @Override
    public String getReportPreTradingDay(String date, String dateType) {
        String preMaxDate = "";
        String result;
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                preMaxDate = date;
            }
            if (AppConstant.TIME_TYPE_WEEK.equals(dateType)) {
                String preDate = this.getPreDay(date, dateType);
                preMaxDate = DateUtil.getSimpleWeekMaxDay(preDate);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                String preDate = this.getPreDay(date, dateType);
                preMaxDate = DateUtil.getSimpleMonthMaxDay(preDate);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                preMaxDate = date;
            }
        }
        catch (Exception e) {
            LOGGER.error("error getPreTradingDay!");
            try {
                throw e;
            } catch (ParseException e1) {
                e1.printStackTrace();
            }
        }
        finally {
            result = this.getTradingDay(preMaxDate);
        }
        return result;
    }

    @Override
    public String getReportFromDay(String date, String dateType) {
        String result = "";
        try {
            if (AppConstant.TIME_TYPE_DAY.equals(dateType)) {
                result = date;
            }
            else if (AppConstant.TIME_TYPE_WEEK.equals(dateType)) {
                result = DateUtil.getSimpleWeekMinDay(date);
            }
            else if (AppConstant.TIME_TYPE_MONTH.equals(dateType)) {
                result = DateUtil.getSimpleMonthMinDay(date);
            }
            else if (AppConstant.TIME_TYPE_YEAR.equals(dateType)) {
                result = DateUtil.getSimpleYearMinDay(date);
            }
        }
        catch (Exception e) {
            LOGGER.error("error getPreDay with date = {}!", date);
            throw e;
        }
        finally {
            return result;
        }
    }
}
