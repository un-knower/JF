package com.ctsec.config.aop;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class WebLogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("execution(public * com.ctsec..*Controller.*(..))")
    public void webLog(){}

    @Around("webLog()")
    public Object doAfterReturning(ProceedingJoinPoint joinPoint) throws Throwable {
        Long start = System.currentTimeMillis();
        Object ret = joinPoint.proceed();
        Long time = System.currentTimeMillis() - start;
        // 处理完请求，返回内容
        try {
            LOGGER.info("CLASS_METHOD: {}, time:{} ----> ARGS: {}, ----> RESULT: {}", joinPoint.getSignature().getDeclaringTypeName() + "."
                            + joinPoint.getSignature().getName(), time, joinPoint.getArgs(),
                    ret == null ? "null" : (StringUtils.length(ret.toString()) > 500 ? ret.toString().substring(0, 500) + "......" : ret.toString()));
        } catch (Exception e) {
            LOGGER.error("aspect log error", e);
        }
        return ret;
    }

}
