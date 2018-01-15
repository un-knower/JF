package com.ctsec.util;

import com.alibaba.fastjson.JSONObject;

/**
 * 用于构造统一格式的json
 */
public class JsonResult {

    public static String successJson(Object obj) {
        JsonResponse response = new JsonResponse();
        response.setCode(ResultCode.SUCCESS);
        response.setMsg("success");
        response.setData(obj);
        return JSONObject.toJSONString(response);
    }

    public static String successJson(Object obj, String code, String message) {
        JsonResponse response = new JsonResponse();
        response.setCode(code);
        response.setMsg(message);
        response.setData(obj);
        return JSONObject.toJSONString(response);
    }

    public static String successJson() {
        JsonResponse response = new JsonResponse();
        response.setCode(ResultCode.SUCCESS);
        response.setMsg("success");
        return JSONObject.toJSONString(response);
    }

    public static String successJson(String message) {
        JsonResponse response = new JsonResponse();
        response.setCode(ResultCode.SUCCESS);
        response.setMsg(message);
        return JSONObject.toJSONString(response);
    }

    public static String errorJson(String message) {
        JsonResponse response = new JsonResponse();
        response.setCode(ResultCode.ERROR);
        response.setMsg(message);
        return JSONObject.toJSONString(response);
    }

    public static String errorJson(String errorCode, String message) {
        JsonResponse response = new JsonResponse();
        response.setCode(errorCode);
        response.setMsg(message);
        return JSONObject.toJSONString(response);
    }

    public static class JsonResponse {
        private String code;
        private String msg;
        private Object data;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }

    }
}
