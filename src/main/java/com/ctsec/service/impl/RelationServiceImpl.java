package com.ctsec.service.impl;

import com.ctsec.dao.jf.RelationGroupMapper;
import com.ctsec.dao.jf.RelationItemMapper;
import com.ctsec.model.jf.RelationGroup;
import com.ctsec.model.jf.RelationItem;
import com.ctsec.service.RelationService;
import com.ctsec.vo.Relation;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by luchisheng on 2017/12/15.
 */

@Service("relationService")
public class RelationServiceImpl implements RelationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataImportServiceImpl.class);

    @Autowired
    private RelationGroupMapper relationGroupMapper;

    @Autowired
    private RelationItemMapper relationItemMapper;

    @Override
    public Boolean ifGroupExist(String groupName) {
        Integer count = relationGroupMapper.selectOneCount(groupName);
        if (count == 0)
            return false;
        else
            return true;
    }

    @Override
    public RelationGroup getOneGroup(String groupName) {
        return relationGroupMapper.selectOne(groupName);
    }

    @Override
    public void insertOneGroup(String groupName) {
        RelationGroup relationGroup = new RelationGroup();
        relationGroup.setName(groupName);
        relationGroupMapper.insertOne(relationGroup);
    }

    @Override
    public void insertBatchItem(List<RelationItem> relationItemList) {
        relationItemMapper.insertBatch(relationItemList);
        LOGGER.info("import data of relationItem {}", CollectionUtils.size(relationItemList));
    }

    @Override
    public List<RelationGroup> getGroup() {
        return relationGroupMapper.selectAll();
    }

    @Override
    public List<RelationItem> getItemByGroupId(String groupId) {
        return relationItemMapper.selectByGroupId(Long.parseLong(groupId));
    }

    @Override
    public List<RelationItem> getItemByCode(String code) {
        return relationItemMapper.selectByCode(code);
    }

    @Override
    public Boolean ifItemExist(String groupId, String code) {
        RelationItem relationItem = new RelationItem();
        relationItem.setGroup_id(Long.parseLong(groupId));
        relationItem.setCode(code);
        Integer count = relationItemMapper.selectOneCount(relationItem);
        return count >= 1;
    }

    @Override
    public Boolean ifItemExistById(String groupId, String code, String itemId) {
        RelationItem relationItem = new RelationItem();
        relationItem.setGroup_id(Long.parseLong(groupId));
        relationItem.setCode(code);
        relationItem.setId(Long.parseLong(itemId));
        Integer count = relationItemMapper.selectOneCountById(relationItem);
        return count >= 1;
    }

    @Override
    public List<String> getMatchGroupName(String groupName) {
        groupName = "'%" + groupName + "%'";
        return relationGroupMapper.selectMatch(groupName);
    }

    @Override
    public void insertItem(String groupId, String name, String tradeCheck, String code, String job, String sex, String remark) {
        RelationItem relationItem = new RelationItem();
        relationItem.setGroup_id(Long.parseLong(groupId));
        relationItem.setName(name);
        relationItem.setTrade_check(tradeCheck);
        relationItem.setCode(code);
        relationItem.setJob(job);
        relationItem.setSex(sex);
        relationItem.setRemark(remark);
        relationItemMapper.insertOne(relationItem);
    }

    @Override
    public void updateItem(String id, String name, String tradeCheck, String code, String job, String sex, String remark) {
        RelationItem relationItem = new RelationItem();
        relationItem.setId(Long.parseLong(id));
        relationItem.setName(name);
        relationItem.setTrade_check(tradeCheck);
        relationItem.setCode(code);
        relationItem.setJob(job);
        relationItem.setSex(sex);
        relationItem.setRemark(remark);
        relationItemMapper.updateOne(relationItem);
    }

    @Override
    public void removeItem(String id) {
        relationItemMapper.deleteOne(Long.parseLong(id));
    }

    @Override
    public List<RelationGroup> getGroup2() {
        return relationGroupMapper.selectAll2();
    }

    @Override
    public List<Map<String, String>> getGroup2Mapping(List<RelationGroup> relationGroupList) {
        String format = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        List<Map<String, String>> result = new ArrayList<>();
        for (RelationGroup relationGroup: relationGroupList) {
            String name = relationGroup.getName();
            Date create_time = relationGroup.getCreate_time();
            Date update_time = relationGroup.getUpdate_time();
            String createTime = sdf.format(create_time);
            String updateTiem = sdf.format(update_time);
            Map<String, String> item = new HashMap<>();
            item.put("name", name);
            item.put("create_time", createTime);
            item.put("update_time", updateTiem);
            item.put("id", relationGroup.getId().toString());
            result.add(item);
        }
        return result;
    }

    @Override
    public void removeGroup(String id) {
        relationGroupMapper.deleteOne(Long.parseLong(id));
    }

    @Override
    public void removeAllItem(String groupId) {
        relationItemMapper.deleteAll(Long.parseLong(groupId));
    }

    @Override
    public List<Relation> getGroupAndItem() {
        return relationGroupMapper.selectGroupAndItem();
    }

    @Override
    public ArrayList groupAndItemMapping(List<Relation> relationList) {
        Map<String, HashedMap> groupMap = new HashMap<>();
        Set<String> groupSet = new HashSet<>();
        for (Relation relation: relationList) {
            String groupName = relation.getGroup_name();
            String groupId = relation.getGroup_id();
            HashedMap groupItem = new HashedMap();
            List<HashedMap> itemList = new ArrayList<>();
            if (groupSet.contains(groupName)) {
                groupItem = groupMap.get(groupName);
                itemList = (List<HashedMap>) groupItem.get("itemList");
            }
            else {
                groupSet.add(groupName);
                groupItem.put("groupName", groupName);
                groupItem.put("groupId", groupId);
            }
            HashedMap item = new HashedMap();
            item.put("itemCode", relation.getItem_code());
            item.put("itemName", relation.getItem_name());
            itemList.add(item);
            groupItem.put("itemList", itemList);
            groupMap.put(groupName, groupItem);
        }
        return new ArrayList<>(groupMap.values());
    }

    @Override
    public void removeGroupByName(String groupName) {
        relationGroupMapper.deleteOneByName(groupName);
    }

    @Override
    public void removeAllItemByGroupName(String groupName) {
        relationItemMapper.deleteAllByGroupName(groupName);
    }

}
