import axios from 'axios';
import {message} from 'antd';
import _ from 'underscore';
import {Tools} from 'app_common';
require('es6-promise').polyfill();

const serverList = {
    logOutUrl:'http://172.15.1.205/user-center/login/Logout.jsp',     // user loginOut
    localUrl:'http://localhost:8888',                                 //need start local node server
    testUrl:'https://api.github.com/?callback=foo',                   //test url github test api

    //服务器配置 -打包时切换
    jfprodServer:'/jf',                                               //connect prod server
    hrprodServer:'/hr',                                               //connect prod server

    //陆驰胜服务配置
    jflcsServer:'http://172.88.66.34:80',                            //api test server -- lcs
    hrlcsServer:'http://172.88.66.34:88',                            //api test server -- lcs

    //172.88.23.2 服务
    jflTestServer:'http://172.88.5.229:8885/jf',                            //api test server -- lcs
    hrlTestServer:'http://172.88.5.229/hr',
    // jflTestServer:'http://localhost/jf',
}

// const connectWho = 'jfprodServer';
//const connectWho = 'jfprodServer';
const connectWho = 'jfprodServer';
//const connectWho = 'jflcsServer';
// const connectWho = 'zrjServer';

const sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    })
};


const sendPost = (url,method='get',params) => {
    // var Num="";
    // for(var i=0;i<6;i++)
    // {
    //     Num+=Math.floor(Math.random()*10);
    // }
    // params['__qtime__'] = new Date().getTime() +'_'+ Num*Math.random();
    const sendParams = method=='get'?{params}:params;
    axios.defaults.withCredentials=true;
    //axios.defaults.XDomainRequest = true;
    axios.defaults.timeout=20000;
    return axios[method.toLowerCase()](serverList[connectWho]+url,sendParams)
    .then(function (response) {
        //console.log("response");
        //console.log(response.data);
        return response;
    })
    .catch(err=>{
        console.log(err);
    });
}

const handleGraphData = ({xAxisData,seriesData},sfp) => {
    let obj = {};
    xAxisData.map(key=>{
        let item = seriesData[key];
        sfp.map(k=>{
            let addItem = item[k]?item[k]:'-';
             if (!obj[k]){
                 obj[k] = [addItem];
             }else{
                 obj[k].push(addItem);
             }
        })
    })
    return {...obj,xAxisData}
}

/**
 *    领导驾驶舱
 *
 */

// kpi - 关键指标 left
export async function getKpiLeftTarget(params={}){
    const data = await sendPost('/api/kpi/kpiLeft','post',params);
    //some code
    return data.data.data
};
export async function keyIndicatorsRight (params={}){
    const data = await sendPost('/api/kpi/kpiRight','post',params);
    //some code
    return data.data.data
};

// 页面按顺序排 01 - 07

// kpi - kpi - key为请求的接口
export async function getKpiGraph(params={},key,flag=true,sfp){
    const data = await sendPost(`/api/kpi/performance${key}`,'post',params);
    //some code
    const __data = data.data.data;

    if (flag) return handleGraphData(__data,sfp)
    return __data
};

//kpi - 收入支出 01-07
export async function getKpiGraph02(params={},key,flag=true,sfp){
    const data = await sendPost(`/api/kpi/incExp${key}`,'post',params);
    //some code
    const __data = data.data.data;
    if (flag) return handleGraphData(__data,sfp)
    return __data
};

//kpi - 收入支出 01-08
export async function getKpiGraph03(params={},key,flag=true,sfp){
    const data = await sendPost(`/api/kpi/customer${key}`,'post',params);
    //some code
    const __data = data.data.data;
    if (flag) return handleGraphData(__data,sfp)
    return __data
};

//kpi - 分公司排名 - 表格数据
export async function getBranchKpiRank(params={}){
    const data = await sendPost(`/api/kpi/performance05`,'post',params);
    //some code
    return data.data.data
};

//kpi - 分公司排名 - 地图
export async function getBranchKpiRankAeraData(params={}){
    const data = await sendPost(`/api/kpi/performance06`,'post',params);
    //some code
    return data.data.data
};

// 市场环境 - Kline
export async function getKlineDate(params={}){
    const data = await sendPost('/api/market/kLineIndex','post',params);
    //some code
    return data.data.data
};


// 市场环境 - table数据
export async function getTableDate(params={}){
    const data = await sendPost('/api/market/tradingInfo','post',params);
    //some code
    return data.data.data
};

//市场环境 - 排名表格
export async function getRankTable(params={}){
    const data = await sendPost('/api/market/branch','post',params);
    //some code
    return data.data.data
};
//市场环境 - 排名表格-下钻
export async function getBranchIn(params={}){
    const data = await sendPost('/api/market/branchIn','post',params);
    //some code
    return data.data.data
};

//市场环境 - 股基交易切片
export async function getmarketMarketLine(params={},sfp){
    const data = await sendPost('/api/market/marketLine','post',params);
    const {stockFund,stock,fund,margin} = data.data.data;
    const re_stockFund = handleGraphData(stockFund,sfp.stockFund);
    const re_stock = handleGraphData(stock,sfp.stock);
    const re_fund = handleGraphData(fund,sfp.fund);
    const re_margin = handleGraphData(margin,sfp.margin);

    return {re_stockFund,re_stock,re_fund,re_margin}
};
/**
 *    经营报表
 *
 */

// 交易统计 - 报表
export async function getReportDate(params={}){
    const data = await sendPost(`/api/report/report`,'post',params);

    if( data == undefined ){
        return false;
    }

    if (data.data.code === '1') {
        message.error('网络请求异常，请联系管理员！');
        return []
    }
    return data.data.data
};

// 交易统计 - 分支机构查询
export async function queryBranchList(params={}){
    const data = await sendPost('/api/report/branch','post',params);

    if( data == undefined ){
        return false;
    }

    let childrenList = {};
    const renderTreeNodes = (data) => {
        return data.map((item) => {
            let {name,id,children} = item;
            id = String(id);
            if (item.children.length > 0) {
                const loop = (_data) => {
                    return _data.map(child => {
                    if (child.children.length > 0) return loop(child.children)
                        return String(child.id)
                    });
                }
                if (id==1000 || id=='1000') {
                    childrenList[id] = [id];
                }else{
                    childrenList[id] = loop(item.children);
                }
                return {label:name,value:id,key:id,children:renderTreeNodes(item.children)}
            }else{
                return {label:name,value:id,key:id}
            }
        });
    }
    return {branchList:renderTreeNodes([data.data.data]),childrenList};
};

// 交易统计 - 指标查询
export async function queryTargetList(params={}){
    const data = await sendPost('/api/report/index','post',params);
    if( data == undefined ){
        return false;
    }

    return data.data.data
};

// 合作开发 - 查询客户

export async function queryCustomerName(params={}){
    const data = await sendPost('/api/report/customer','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

// 限售持仓 - 证券查询
export async function querySecurityNumberList(params={}){
    const data = await sendPost('/api/report/secuSearch','post',params);
    if( data == undefined ){
        return false;
    }
    if (data.data.msg === 'Empty!') {
        return []
    }
    return data.data.data
};

// 限售持仓 - 根据客户号查询证券账号
export async function queryStockAccountList(params={}){
    const data = await sendPost('/api/report/stockAccount','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

// 客户统计-资产范围列表
export async function queryAssetList(params={}){
    const data = await sendPost('/api/report/asset','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

/*
    分支机构

 */
//机构现状
export async function queryBranchStatus(params={}){
    const data = await sendPost('/api/branch/status','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};
//机构现状下钻
export async function queryBranchStatusIn(params={}){
    const data = await sendPost('/api/branch/statusIn','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};
// 分支机构类目对应关系
export async function queryCategoryFilter(params={}){
    const data = await sendPost('/api/branch/categoryFilter','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};
//分支机构-排名折线图
export async function getBranchRank(params={}){
    const data = await sendPost('/api/branch/rank','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};
//分支机构-机构发展
export async function getBranchDevelopment(params={},key){
    const data = await sendPost('/api/branch/development'+key,'post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//分支机构-机构绩效-筛选
export async function getBranchSubFilter(params={}){
    const data = await sendPost('/api/branch/subFilter','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//分支机构-绩效
export async function getBranchPerformance(params={}){
    const data = await sendPost('/api/branch/performance','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//获取所有指标提示信息
export async function getTargetDescInfo(params={}){
    const data = await sendPost('/api/home/indexInfo','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

//获取所有最后更新时间
export async function getHmoeClearDate(params={}){
    const data = await sendPost('/api/home/clearDate','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

/*
    现金理财
 */

//业务分析 - 客户统计
export async function getBusinessStatistics(params={}){
    const data = await sendPost('/api/business/statistics','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};


//业务分析 - 客户统计
export async function getBusinessProdCode(params={}){
    const data = await sendPost('/api/business/prodCode','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

//申赎报表 资产变动
export async function getBusinessReport(params={}){
    const data = await sendPost('/api/business/report','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

//业务分析 - 签约趋势
export async function getBusinessTrend(params={},sfp){
    const data = await sendPost('/api/business/trend','post',params);
    if( data == undefined ){
        return false;
    }
    return handleGraphData(data.data.data,sfp)
};

//业务分析 - 现金理财产品份额变化
export async function getBusinessChange(params={},sfp){
    const data = await sendPost('/api/business/change','post',params);
    if( data == undefined ){
        return false;
    }
    return handleGraphData(data.data.data,sfp)
};

//客户ID搜索
export async function queryCustomerNumberList(params={}){
    const data = await sendPost('/api/business/custSearch','post',params);
    if( data == undefined ){
        return false;
    }
    if (data.data.msg === 'Empty!') {
        return []
    }
    return data.data.data
};

//关联方证券查询 - 自助设定 - 模糊搜索名称
export async function queryGroupNameList(params={}){
    const data = await sendPost('/api/relation/groupMatch','post',params);
    if( data == undefined ){
        return false;
    }
    if (data.data.msg === 'Empty!') {
        return []
    }
    return data.data.data
};

//关联方证券查询 - 关联查询
export async function getRelationFilter(params={}){
    const data = await sendPost('/api/relation/filter','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};

//关联方证券查询 - 关联查询 - 报表
export async function getRelationReport(params={}){
    const data = await sendPost('/api/relation/report','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data
};



/*
    权限验证
*/
export async function userAuth(params={}){
    const data = await sendPost('/api/auth?__qtime__='+Tools.getRandom(),'get',params);
    if( data == undefined ){
        return false;
    }
    //some code
    return data.data
};

export async function signOut(params={}){
    let data = await sendPost('/signOut?__qtime__='+Tools.getRandom(),'get',params);
    await sleep(1000);

    window.location = data.data.data.url;

    return true;
};

export function signInRedirect(params={}){
    let regex = /^http:\/\//;
    let url = '';
    if( !regex.test(params.url) ){
        url = serverList[connectWho]+params.url;
    }else{
        url = params.url;
    }
    //console.log(url);
    window.location = url+'?url='+window.location.href;
    //return true;
};

//api_hr
//组织架构-关键指标
export async function getStructureKey(params={}) {
    const data = await sendPost('/api/structure/keyIndex','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//筛选条件中的一级部门选项
export async function getOrgOne(params={}) {
    const data = await sendPost('/api/universal/orgOne','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};

//人员编制
export async function getStaffingData(params={}) {
    const data = await sendPost('/api/staffing/staffing','post',params);
    if( data == undefined ){
        return false;
    }
    const __data = data.data.data;
    return {recruitData:__data}
};

//人员招聘
export async function getRecruitData(params={},sfp) {
    const data = await sendPost('/api/recruit/recruit','post',params);
    if( data == undefined ){
        return false;
    }
    const __data = data.data.data;
    return {recruitData:__data,formartData:handleGraphData(__data.trend,sfp)}
};
//培养开发 - 上面俩图
export async function getDevelopmentOverall(params={},sfp) {
    const data = await sendPost('/api/development/overall','post',params);
    if( data == undefined ){
        return false;
    }
    const __data = data.data.data;
    return handleGraphData(__data,sfp)
};

export async function getDevelopmentGroup(params={}) {
    const data = await sendPost('/api/development/group','post',params);
    if( data == undefined ){
        return false;
    }
    const __data = data.data.data;
    return __data
};

//组织架构图
export async function getStructure(params={}) {
    const data = await sendPost('/api/structure/structure','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//地图
export async function getDistribution(params={}) {
    const data = await sendPost('/api/structure/distribution','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//人员效能
export async function getEffectiveness(params={}) {
    const data = await sendPost('/api/effectiveness/effectiveness','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};

//人员画像 - 1
export async function getPortraitFilter(params={}) {
    const data = await sendPost('/api/portrait/filter','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//人员画像 - 2
export async function getPortraitDetails(params={}) {
    const data = await sendPost('/api/portrait/details','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};

//人员画像 - 导出
export async function getPortraitExport(urlParams) {
    window.open(serverList[connectWho]+'/api/portrait/export?'+urlParams,'_self');

    // const data = await sendPost('/api/portrait/export','get',params);
    // if( data == undefined ){
    //     return false;
    // }
    // return data.data.data;
};

//人员配置01
export async function getPlacementPerson01(params={}) {
    const data = await sendPost('/api/placement/person01','post',params);
    if( data == undefined ){
        return false;
    }
    return data.data.data;
};
//人员配置02
export async function getPlacementPerson02(params={}) {
    const data = await sendPost('/api/placement/person02','post',params);
    return data.data.data;
};
//人员配置03
export async function getGroup(params={}) {
    const data = await sendPost('/api/placement/group','post',params);
    return data.data.data;
};
//人员配置04
export async function getBenchmarking(params={}) {
    const data = await sendPost('/api/placement/benchmarking','post',params);
    return data.data.data;
};

//信息补录，文件上传
export async function importDocument(params={}) {
    //let formData = new FormData();
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }

    const data = await sendPost('/data/import/excel','post',params,config);

    return data.data;
};

//关联方-自助设定-文件上传
export async function relationImport(params={}) {
    const data = await sendPost('/api/relation/import','post',params);
    return data.data;
};
//自助设定-修改-组别
export async function getRelationGroup(params={}) {
    const data = await sendPost('/api/relation/getGroup','post',params);
    return data.data.data;
};
//自助设定-修改-分组查询
export async function getRelationItem(params={}) {
    const data = await sendPost('/api/relation/getItem','post',params);
    return data.data.data;
};
//自助设定-修改-新增
export async function insertRelationItem(params={}) {
    const data = await sendPost('/api/relation/insertItem','post',params);
    return data.data;
};
//自助设定-修改-编辑
export async function updateRelationItem(params={}) {
    const data = await sendPost('/api/relation/updateItem','post',params);
    return data.data;
};
//自助设定-修改-删除
export async function deleteRelationItem(params={}) {
    const data = await sendPost('/api/relation/deleteItem','post',params);
    return data.data;
};
//自助设定-删除-列表
export async function getRelationGroup2(params={}) {
    const data = await sendPost('/api/relation/getGroup2','post',params);
    return data.data.data;
};
//自助设定-删除
export async function deleteRelationGroup(params={}) {
    const data = await sendPost('/api/relation/deleteGroup','post',params);
    return data.data;
};
//人员分布
export async function getDistrubiuition(params={},key,sfp) {
    const data = await sendPost(`/api/staffDistrubition/${key}`,'post',params);
    let __data = data.data.data;
    if(sfp) return handleGraphData(__data,sfp);
    return __data;
};

//信息补录-栏目及模块信息
export async function informationCmodelList(params={}) {
    const data = await sendPost('/data/import/excelConfig','post',params);
    const dataList = data.data;
    const columnsList = [];
    const modelList = {};
    const modelDetailList = {};
    //console.log(data);
    _(dataList.data).map((v,k) => {
        ///console.log(v);
        let category = v['category1'];
        let category2 = v['category2'];
        columnsList.push({label:category,value:category});

        let cateChildren = [];
        _(category2).map((cv,ck)=>{
            cateChildren.push({'label':cv['category2'],'value':cv['id']+''});
            modelDetailList[cv['id']] = cv;
        });
        modelList[category] = cateChildren;
    });

    return {columnsList:columnsList,modelList:modelList,modelDetailList:modelDetailList};
};

/**
 * 关联查询数据导出
 * @param  string urlParams [description]
 * @return {[type]}           [description]
 */
export async function getRelationExport(urlParams) {
    window.open(serverList[connectWho]+'/api/relation/export?'+urlParams,'_self');

    // const data = await sendPost('/api/portrait/export','get',params);
    // if( data == undefined ){
    //     return false;
    // }
    // return data.data.data;
};
