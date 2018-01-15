package com.ctsec.util;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;

public class IpUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(IpUtil.class);

    public static boolean isRunHere(String thisIp) {
        Collection<InetAddress> colInetAddress = getAllHostAddress();
        for (InetAddress address : colInetAddress) {
            if (thisIp.equals(address.getHostAddress())) {
                return true;
            }
        }
        return false;
    }

    public static String getAllIps() {
        Collection<InetAddress> colInetAddress = getAllHostAddress();
        StringBuilder sb = new StringBuilder();
        for (InetAddress address : colInetAddress) {
            sb.append(address.getHostAddress()).append(" ");
        }
        return sb.toString();
    }

    // 获取本机ipv4
    public static String getHostAddressOfIpv4() {
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();

            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    if (inetAddress != null && inetAddress instanceof Inet4Address && !"127.0.0.1".equals(inetAddress.getHostAddress())) {
                        return inetAddress.getHostAddress();
                    }
                }
            }
        } catch (SocketException e) {
            LOGGER.error("get host address Of Ipv4 error", e);
        }
        return StringUtils.EMPTY;
    }

    // 获取本机所有ip
    public static Collection<InetAddress> getAllHostAddress() {
        Collection<InetAddress> addresses = new ArrayList<InetAddress>();
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();

            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    addresses.add(inetAddress);
                }
            }
        } catch (SocketException e) {
            LOGGER.error("get host addresses error", e);
        }
        return addresses;
    }

    /**
     * 根据HttpServletRequest获取用户IP.
     */
    public static String getRemoteIpAddr(final HttpServletRequest request) {
        // 先通过BFE传递的request header获取remoteIP
        String remoteIp = request.getHeader("x-forwarded-for");
        if (StringUtils.isBlank(remoteIp) || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(remoteIp) || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(remoteIp) || "unknown".equalsIgnoreCase(remoteIp)) {
            remoteIp = request.getRemoteAddr();
        }

        // 多个路由时，取第一个非unknown的ip
        String[] ips = remoteIp.split(",");
        for (String ip : ips) {
            if (!"unknown".equalsIgnoreCase(ip)) {
                return ip;
            }
        }
        return remoteIp;
    }
}
