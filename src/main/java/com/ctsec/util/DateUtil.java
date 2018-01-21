package com.ctsec.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;

public class DateUtil {

    private static final String[] WEEK_DAYS_NAME = new String[]{"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};

    public static String getSimpleDate() {
        Date date = new Date();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    public static String getDate() {
        Date date = new Date();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        return formatDate.format(date);
    }

    public static String getStringDate(Date date) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        return formatDate.format(date);
    }

    public static String getDateStringYmdhms(Date date) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMddHHmmss");
        return formatDate.format(date);
    }

    public static String getDateString(Date date) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatDate.format(date);
    }

    public static String getDateTime() {
        Date date = new Date();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatDate.format(date);
    }

    public static Date parseDateTime(String date) throws ParseException {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatDate.parse(date);
    }

    public static Date parseDate(String date) throws ParseException {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        return formatDate.parse(date);
    }

    public static Date parseDate2(String date) throws ParseException {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.parse(date);
    }

    public static String getPointDateTime(String date) {
        Date dateTime = null;
        try {
            dateTime = DateUtil.parseDateTime(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy.M.d");
        String format = formatDate.format(dateTime);
        return format;
    }

    public static String getPointDate(String date) {
        Date dateTime = null;
        try {
            dateTime = DateUtil.parseDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy.M.d");
        String format = formatDate.format(dateTime);
        return format;
    }

    /**
     * @param date
     * @return
     * @throws ParseException
     */
    public static Date parseDateTimeSty1(String date) throws ParseException {
        SimpleDateFormat formatDate = new SimpleDateFormat("M月d日 HH:mm");
        return formatDate.parse(date);
    }


    /**
     * 格式 8月1日 11：06
     *
     * @param date
     * @return
     */
    public static String getDateFormat(String date) {
        Date dateTime = null;
        String format = "";
        try {
            dateTime = DateUtil.parseDateTimeSty1(date);
            if (dateTime != null) {
                SimpleDateFormat formatDate = new SimpleDateFormat("M月d日 HH:mm");
                format = formatDate.format(dateTime);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return format;
    }

    public static String getDateFormat1(String date) {
        Date dateTime = null;
        String format = "";
        try {
            dateTime = DateUtil.parseDateTime(date);
            if (dateTime != null) {
                SimpleDateFormat formatDate = new SimpleDateFormat("M月d日 HH:mm");
                format = formatDate.format(dateTime);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return format;
    }

    public static boolean outOfDate(String date) {
        boolean result = false;//未过期
        try {
            if (!"0".equalsIgnoreCase(date)) {//0自建策略
                Date parseDate = DateUtil.parseDate(date);
                parseDate = DateUtils.addHours(parseDate, 15);
                Date now = new Date();
                if (now.after(parseDate)) {
                    result = true;//过期
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getBeforeDate(int days) {
        Date date = DateUtils.addDays(new Date(), -days);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        return formatDate.format(date);
    }

    public static String getSimpleBeforeDate(int days) {
        Date date = DateUtils.addDays(new Date(), -days);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    public static String getSimpleDate(int days) {
        Date date = DateUtils.addDays(new Date(), days);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    public static String formatDate(Date date) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        return formatDate.format(date);
    }

    public static String formatMD(String date) {
        Date parseDate = null;
        try {
            parseDate = DateUtil.parseDate(date);
        } catch (ParseException e) {
        }
        SimpleDateFormat formatDate = new SimpleDateFormat("M-dd");
        return formatDate.format(parseDate);
    }

    public static String formatMD1(String date) {
        Date parseDate = null;
        try {
            parseDate = DateUtil.parseDate(date);
        } catch (ParseException e) {
        }
        SimpleDateFormat formatDate = new SimpleDateFormat("M.d");
        return formatDate.format(parseDate);
    }

    /**
     * 比date》days的日期
     *
     * @param date
     * @param days
     * @return
     */
    public static Date getAfterDate(Date date, int days) {
        Date datea = DateUtils.addDays(date, days);
        return datea;
    }

    public static Date getAfterMinutes(Date date, int minutes) {
        return DateUtils.addMinutes(date, minutes);
    }

    public static Date getAsertTime(int h, int m) {
        Date date = new Date();
        date.setHours(h);
        date.setMinutes(m);
        date.setSeconds(0);
        return date;
    }

    public static String formatCH(String date) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = null;
        try {
            parse = formatDate.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat f = new SimpleDateFormat("yyyy年MM月dd日");
        String format = f.format(parse);
        return format;
    }

    public static String getCHDate() {
        SimpleDateFormat f = new SimpleDateFormat("yyyy年MM月dd日");
        String format = f.format(new Date());
        return format;
    }

    //获取当前日期的日，格式为d
    public static String getDay() {
        Date date = new Date();
        SimpleDateFormat formatDate = new SimpleDateFormat("d");
        return formatDate.format(date);
    }

    //判断是否是今天
    public static boolean isToday(String lastloginDate) {
        return DateUtil.getDate().equals(lastloginDate);
    }

    //判断是否是今天
    public static boolean isToday1(String lastloginDate) {
        Date date = new Date();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        String ndate = formatDate.format(date);
        if (lastloginDate != null && lastloginDate.startsWith(ndate)) {
            return true;
        } else {
            return false;
        }
    }

    //查看验证码是否过期   min 分钟
    public static boolean isTimeOut(Date date, int min) {
        long sysTime = System.currentTimeMillis();
        if (date == null) {
            return true;
        }
        long CreTime = date.getTime();
        long timeLimit = min * 60 * 1000 - 500;
        if (sysTime - CreTime < timeLimit) {
            return false;
        }
        return true;
    }

    //查看验证码是否过期   days 天
    public static boolean isDateOut(Date date, int days) {
        if (date == null) {
            return true;
        }
        long sysTime = System.currentTimeMillis();
        long CreTime = date.getTime();
        long timeLimit = days * 24 * 60 * 60 * 1000 - 1000;
        if (sysTime - CreTime < timeLimit) {
            return false;
        }
        return true;
    }

    public static String getHMString() {
        SimpleDateFormat formatDate = new SimpleDateFormat("HH:mm");
        return formatDate.format(new Date());
    }

    /**
     * 判断date2的时间点在date1的日期内
     *
     * @param date1(yyyy-MM-dd)
     * @param date2(yyyy-MM-dd HH:mm.ss)
     * @return
     */
    public static boolean checkDate(Date date1, Date date2) {
        long ldate1 = date1.getTime();
        long ldate2 = date2.getTime();
        long ndayTime = 86400000;
        if ((ldate1 <= ldate2) && (ldate2 < (ldate1 + ndayTime))) {
            return true;
        }
        return false;
    }

    public static boolean compareDate(Date date1, Date date2) {
        long ldate1 = date1.getTime();
        long ldate2 = date2.getTime();
        if (date1.before(date2)) {
            return true;
        }
        return false;
    }

    public static boolean isBefore(String date) {
        if (getDate().equals(date)) {
            return false;
        }
        Date date1 = null;
        try {
            date1 = DateUtil.parseDate(date);
        if (new Date().after(date1)) {
            return true;
        }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static Date getSimpleDate(Date date) {
//		Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String format = sdf.format(date);
        Date parse = null;
        try {
            parse = sdf.parse(format);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return parse;
    }

    //现在时间
    public static String printNowDateTime() {
        String temp_str = "";
        Date dt = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm.ss");
        temp_str = sdf.format(dt);
        return temp_str;
    }

    /**
     * 是否过期
     *
     * @param endDate
     * @return
     */
    public static boolean outOfDate(Date endDate) {
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = new Date();
        try {
            parse = fmt.parse(getDate());
        } catch (ParseException e) {
        }
        return parse.after(endDate);
    }

    public static java.sql.Date getSqlDate(String datestr) {
        Date parseDate = new Date();
        java.sql.Date date = new java.sql.Date(0);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        try {
            parseDate = formatDate.parse(datestr);
            date = new java.sql.Date(parseDate.getTime());
        } catch (ParseException e) {
        }
        return date;
    }

    /**
     * 计算两个日期之间相差的天数
     * 格式 yyyy-MM-dd
     * @param sdateStr 较小的时间
     * @param bdateStr 较大的时间
     * @return 相差天数
     * @throws ParseException
     */
    public static long daysBetween(String sdateStr, String bdateStr) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date sdate = sdf.parse(sdateStr);
        Date bdate = sdf.parse(bdateStr);
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdate);
        long time1 = cal.getTimeInMillis();
        cal.setTime(bdate);
        long time2 = cal.getTimeInMillis();
        return (time2 - time1) / (1000 * 3600 * 24) + 1;
    }

    /**
     * 返回农历日期，如2016-11-24返回“十月廿五”
     */
    /*public static String getLundarDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        LunarCalendar lunarCalendar = new LunarCalendar(calendar);
        return lunarCalendar.getLunarMonth() + "月" + lunarCalendar.getLunarDate();
    }*/

    /**
     * 返回星期几
     */
    public static String getDayInWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int inWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        return WEEK_DAYS_NAME[inWeek];
    }

    /**
     * 获取 yyyyMMdd 格式的 过去几天
     */
    public static String getSimplePastDay(String simpleDate, Integer offset) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.add(Calendar.DATE, - offset);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 过去几周的今天
     */
    public static String getSimplePastWeekDay(String simpleDate, Integer offset) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.add(Calendar.DATE, - offset * 7);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 过去几月的今天
     */
    public static String getSimplePastMonthDay(String simpleDate, Integer offset) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, - offset);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 过去几年的今天
     */
    public static String getSimplePastYearDay(String simpleDate, Integer offset) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, - offset);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 这个周第一天
     */
    public static String getSimpleWeekMinDay(String simpleDate) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar. DAY_OF_WEEK) - 1;
        if (dayOfWeek == 0 ) {
            dayOfWeek = 7 ;
        }
        calendar.add(Calendar.DATE , -dayOfWeek + 1);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 这个周最后一天
     */
    public static String getSimpleWeekMaxDay(String simpleDate) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar. DAY_OF_WEEK) - 1;
        if (dayOfWeek == 0 ) {
            dayOfWeek = 7 ;
        }
        calendar.add(Calendar.DATE , -dayOfWeek + 7);
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 这个月第一天
     */
    public static String getSimpleMonthMinDay(String simpleDate) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 这个月最后一天
     */
    public static String getSimpleMonthMaxDay(String simpleDate) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        Date date = parseDate2(simpleDate);
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        date = calendar.getTime();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 今年第一天
     */
    public static String getSimpleYearMinDay(String simpleDate) throws ParseException {
        Integer year = Integer.valueOf(simpleDate.substring(0, 4));
        Date date = getYearMinDay(year);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取 yyyyMMdd 格式的 今年最后一天
     */
    public static String getSimpleYearMaxDay(String simpleDate) throws ParseException {
        Integer year = Integer.valueOf(simpleDate.substring(0, 4));
        Date date = getYearMaxDay(year);
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");
        return formatDate.format(date);
    }

    /**
     * 获取某年第一天日期
     * @param year 年份
     * @return Date
     */
    private static Date getYearMinDay(int year){
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        Date currYearFirst = calendar.getTime();
        return currYearFirst;
    }

    /**
     * 获取某年最后一天日期
     * @param year 年份
     * @return Date
     */
    private static Date getYearMaxDay(int year){
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        Date currYearLast = calendar.getTime();

        return currYearLast;
    }

}

