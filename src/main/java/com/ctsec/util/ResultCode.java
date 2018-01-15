package com.ctsec.util;

public class ResultCode {

    // 成功
    public static final String SUCCESS = "0";
    // 异常
    public static final String ERROR = "1";

    // 参数错误,9开头
    public static final String PARAM_EMPTY = "9001";
    public static final String PARAM_ERROR = "9002";

    // 权限错误，1开头
    public static final String NO_AUTH = "1001";

    // 文件错误，2开头
    public static final String FILE_FORMAT_ERROR = "2001";
}
