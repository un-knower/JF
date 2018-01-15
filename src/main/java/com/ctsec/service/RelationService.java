package com.ctsec.service;

import com.ctsec.model.jf.RelationGroup;
import com.ctsec.model.jf.RelationItem;
import com.ctsec.vo.Relation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by luchisheng on 2017/12/15.
 */
public interface RelationService {

    Boolean ifGroupExist(String groupName);

    RelationGroup getOneGroup(String groupName);

    void insertOneGroup(String groupName);

    void insertBatchItem(List<RelationItem> relationItemList);

    List<RelationGroup> getGroup();

    List<RelationItem> getItemByGroupId(String groupId);

    List<RelationItem> getItemByCode(String code);

    Boolean ifItemExist(String groupId, String code);

    Boolean ifItemExistById(String groupId, String code, String itemId);

    List<String> getMatchGroupName(String groupName);

    void insertItem(String groupId, String name, String tradeCheck, String code, String job, String sex, String remark);

    void updateItem(String id, String name, String tradeCheck, String code, String job, String sex, String remark);

    void removeItem(String id);

    List<RelationGroup> getGroup2();

    List<Map<String, String>> getGroup2Mapping(List<RelationGroup> relationGroupList);

    void removeGroup(String id);

    void removeAllItem(String groupId);

    List<Relation> getGroupAndItem();

    ArrayList groupAndItemMapping(List<Relation> relationList);

    void removeGroupByName(String groupName);

    void removeAllItemByGroupName(String groupName);

}
