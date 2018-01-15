package com.ctsec.dao.jf;

import com.ctsec.model.jf.ManualAdjust;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ManualAdjustMapper {

    void batchSaveOrUpdate(@Param("adjustItems") List<ManualAdjust> data);

    void deleteByCodeAndTimeAndItem(@Param("adjustItem") ManualAdjust item);

}