package com.ctsec.util;

import java.util.ArrayList;
import java.util.List;

public class MyCollectionUtil {
    /**
     * 拆分集合
     *
     * @param resList 要拆分的集合
     * @param count   每个集合的元素个数
     * @return 返回拆分后的各个集合
     */
    public static <T> List<List<T>> split(List<T> resList, int count) {

        if (resList == null || count < 1) {
            return null;
        }
        List<List<T>> ret = new ArrayList<>();
        int size = resList.size();
        if (size <= count) { // 数据量不足count指定的大小
            ret.add(resList);
        } else {
            int pre = size / count;
            int last = size % count;
            // 前面pre个集合，每个大小都是count个元素
            for (int i = 0; i < pre; i++) {
                List<T> itemList = new ArrayList<>();
                itemList.addAll(resList.subList(i * count, count * (i + 1)));
                ret.add(itemList);
            }
            // last的进行处理
            if (last > 0) {
                List<T> itemList = new ArrayList<>();
                itemList.addAll(resList.subList(pre * count, size));
                ret.add(itemList);
            }
        }
        return ret;
    }
}