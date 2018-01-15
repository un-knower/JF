package com.ctsec.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.Date;

public class ReflectUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReflectUtil.class);

    public static void setFieldValueByType(Field field, Object object, String value) {
        try {
            field.setAccessible(true);
            if (value != null) {
                if (!field.getType().equals(String.class) && StringUtils.isBlank(value)) {
                    return;
                }
                if (field.getType().equals(Integer.class) || field.getType().equals(int.class)) {
                    field.set(object, NumberUtils.toInt(value));
                } else if (field.getType().equals(Long.class) || field.getType().equals(long.class)) {
                    field.set(object, NumberUtils.toLong(value));
                } else if (field.getType().equals(Double.class) || field.getType().equals(double.class)) {
                    field.set(object, NumberUtils.toDouble(value));
                } else if (field.getType().equals(Float.class) || field.getType().equals(float.class)) {
                    field.set(object, NumberUtils.toFloat(value));
                } else if (field.getType().equals(Date.class)) {
                    field.set(object, StringUtils.contains(value, " ") ? DateUtil.parseDateTime(value) : DateUtil.parseDate(value));
                } else {
                    field.set(object, value);
                }
            }
        } catch (Exception e) {
            LOGGER.error("set field value by type error of {}, {}, {}", field, object, value);
        }
    }

}
