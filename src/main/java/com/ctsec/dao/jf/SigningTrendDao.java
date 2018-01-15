package com.ctsec.dao.jf;

import com.ctsec.vo.SigningTrend;

import java.util.List;

/**
 * Created by luchisheng on 2017/12/14.
 */
public interface SigningTrendDao {

    List<SigningTrend> selectSigningTrend(String sqlQuery);

}
