package com.ctsec.dao.jf;

import com.ctsec.vo.ProductShareChange;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/14.
 */
public interface ProductShareChangeDao {

    List<ProductShareChange> selectProductShareChange(String sqlQuery);

}
