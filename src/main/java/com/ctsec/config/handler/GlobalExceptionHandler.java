package com.ctsec.config.handler;

import com.ctsec.util.JsonResult;
import com.ctsec.util.ResultCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public String jsonErrorHandler(HttpServletRequest request, Exception e) {
        LOGGER.error("request error of url: {}", request.getRequestURL().toString(), e);
        return JsonResult.errorJson(ResultCode.ERROR, "请求发生错误");
    }

}
