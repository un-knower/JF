package com.ctsec.util;

import java.io.IOException;
import java.util.Properties;

public class AppPropertyUtil {
    private static Properties prop;

    private AppPropertyUtil() {
    }

    static {
        reload();
    }

    public static boolean reload() {
        boolean flag = true;
        prop = new Properties();
        try {
            prop.load(AppPropertyUtil.class.getClassLoader().getResourceAsStream("application.properties"));
            prop.load(AppPropertyUtil.class.getClassLoader().getResourceAsStream("db_config.properties"));
            flag = false;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public static Properties getSysProperties() {
        return prop;
    }

    /**
     * 获取指定的系统属性值
     *
     * @param key 指定的属性名称
     * @return 指定的系统属性值
     */
    public static String getProperty(String key) {
        return prop.getProperty(key);
    }

    /**
     * 获取指定的系统属性值
     *
     * @param key                指定的属性名称
     * @param defaultVal 默认值
     * @return 指定的系统属性值
     */
    public static String getProperty(String key, String defaultVal) {
        return prop.getProperty(key, defaultVal);
    }

}
