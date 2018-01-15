package com.ctsec.web;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ctsec.bcuser.CtsecUserRoleContext;
import com.ctsec.service.CubeInfoService;
import com.ctsec.service.MenuAccessService;
import com.ctsec.util.JsonResult;
import com.ctsec.util.ResultCode;
import com.ctsec.vo.MenuAccessInfo;
import io.swagger.annotations.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
@RequestMapping("")
@Api(value = "IndexController")
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);

    @Value("${base.url}")
    private String baseUrl;

    @Value("${usercenter.base.url}")
    private String userCenter;

    @Autowired
    private MenuAccessService menuAccessService;

    @Autowired
    private CubeInfoService cubeInfoService;

    @RequestMapping("")
    public String index() {
        return "redirect:/index_prod.html";
    }

    @ApiOperation(value = "权限验证", notes = "权限验证", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "api/auth",  method = {RequestMethod.GET})
    public String auth(HttpServletRequest request) {
        /**
         * 上权限
         */
        if (request.getSession().getAttribute("ctsecUserRole") == null) {
            Map<String, String> result = new HashMap<>(1);
            result.put("url", baseUrl + "/login");
//            result.put("url", "http://172.88.66.34/login");
            return JsonResult.successJson(result, ResultCode.NO_AUTH, "NotLogin");
        } else {
            String ctsecUserRole = JSONObject.toJSONString(request.getSession().getAttribute("ctsecUserRole"));
            LOGGER.info("session user {}", ctsecUserRole);
            JSONObject userRole = JSONObject.parseObject(ctsecUserRole);
            JSONArray roles = (JSONArray) userRole.get("roles");
            StringBuilder roleId = new StringBuilder();
            for (Object role: roles) {
                String cn = ((JSONObject) role).get("cn").toString();
                roleId.append("'").append(cn).append("',");
            }

            roleId.delete(roleId.length() - 1, roleId.length());
            List<MenuAccessInfo> menuAccessList = menuAccessService.getMenuAccess(roleId.toString());
            ArrayList mappingResult = menuAccessService.mapping(menuAccessList);
            mappingResult = cubeInfoService.mapping(mappingResult);
            userRole.put("menuList", mappingResult);
            return JsonResult.successJson(userRole);
        }

        /**
         * 不上权限
         */
//        if (false) {
//            Map<String, String> result = new HashMap<>(1);
//            result.put("url", baseUrl + "/login");
//            return JsonResult.successJson(result, ResultCode.NO_AUTH, "NotLogin");
//        } else {
//            StringBuilder roleId = new StringBuilder();
//            roleId.append("'manager'").append(",");
//            JSONObject userRole = new JSONObject();
//            roleId.delete(roleId.length() - 1, roleId.length());
//            List<MenuAccessInfo> menuAccessList = menuAccessService.getMenuAccess(roleId.toString());
//            ArrayList mappingResult = menuAccessService.mapping(menuAccessList);
//            mappingResult = cubeInfoService.mapping(mappingResult);
//            userRole.put("menuList", mappingResult);
//            return JsonResult.successJson(userRole);
//        }
    }

    @ApiOperation(value = "登录跳转", notes = "登录跳转", produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "url", value = "跳转地址", required = false, dataType = "String")
    })

    @RequestMapping(value = "login", method = {RequestMethod.GET})
    public String login(String url) {
        if (url == null) {
            url = "/";
        }
        url = StringUtils.removeEnd(url, "?");
        LOGGER.info("use login jump to url {}", url);
        return "redirect:" + url;
    }

    @ApiOperation(value = "退出登录", notes = "退出登录，清除session", produces = "application/json")
    @ResponseBody
    @RequestMapping(value = "signOut", method = {RequestMethod.GET})
    public String signOut(HttpServletRequest request, HttpServletResponse response) {
        Enumeration<String> em = request.getSession().getAttributeNames();
        while (em.hasMoreElements()) {
            request.getSession().removeAttribute(em.nextElement());
        }
        if (request.getSession().getAttribute("ctsecUserRole") != null) {
            request.getSession().removeAttribute("ctsecUserRole");
        }
        request.getSession().invalidate();
        Cookie cookies[] = request.getCookies();
        if (cookies != null)
        {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("SSOToken")) {
                    Cookie newCookie = new Cookie("SSOToken", "");
                    newCookie.setPath("");
                    newCookie.setMaxAge(0);
                    response.addCookie(newCookie);
                }
            }
        }
        Map<String, String> result = new HashMap<>(1);
        result.put("url", userCenter + "/login/Logout.jsp");
        return JsonResult.successJson(result, ResultCode.NO_AUTH, "SignOut");
    }

}
