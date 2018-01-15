import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {message } from 'antd';
import $ from 'jquery';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Table,Column, Cell, HeaderCell,TipTable,Tools} from 'app_common';
import {getRelationFilter,getRelationReport,exportReportAPI,getRelationExport} from '../../api';
import _ from 'underscore';
import moment from 'moment';

import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

export default class Relation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetList:[],
            reportDataSources:[],
            commonControllers:[],
            sortType:undefined,
            sortColumn:undefined,
            tableLoading:false,
            reportTitle:'',
            renderErrorMsg:(<span>无满足条件信息，请重新筛选条件或进行<a onClick={this.querySelf.bind(this)} className="relation_href" >关联名单设定</a></span>),
            hasSumRow:true
        };

        this.handleSortColumn = this.handleSortColumn.bind(this);

        this.commonControllers = {
            start: {
                type: 'startDate',
                name: 'startDate',
                width: 4,
                label: '开始日期：',
                //defaultValue:moment('2017-11-01', 'YYYY-MM-DD'),
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_related_trade_statistics_01,
                    formart:'YYYY-MM-DD',
                    addType:'months',
                    addVal:-1
                }),
                labelCol:'43%',
                wrapperCol:'57%'
            },
            end: {
                type: 'endDate',
                name: 'endDate',
                width: 4,
                label: '结束日期：',
                //defaultValue:moment('2017-11-02', 'YYYY-MM-DD'),
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_related_trade_statistics_01,
                //    formart:'YYYY-MM-DD'
                }),
                labelCol:'43%',
                wrapperCol:'57%'
            },
            queryType:{
                type: 'select',
                name: 'queryType',
                width: 4,
                placeholder:'请选择',
                label: '查询方式：',
                options: [{label:'组查询',value:'group'},{label:'证件号查询',value:'id'}],
                defaultValue:'group',
                labelCol:'43%',
                wrapperCol:'57%'
            },
            groupQuery: {
                type: 'select',
                name: 'groupId',
                width: 6,
                placeholder:'请选择',
                label: '组名称：',
                options: [],
                defaultValue:'1',
                labelCol:'23%',
                wrapperCol:'77%',
            },
            idQuery: {
                type: 'select',
                name: 'idNo',
                placeholder:'输入证件号',
                multiple:true,
                width: 6,
                label: '证件号：',
                options: [],
                defaultValue:['1'],
                labelCol:'23%',
                wrapperCol:'77%'
            },
            queryBtn: {
                type: 'button',
                name: 'query',
                width: 2,
                label: '查询',
                className: 'ant-btn-primary',
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.clickQueryBtn.bind(this)
            },
            exportBtn: {
                type: 'dropdown',
                name: 'export',
                dropList: [
                    // {
                    //     label:<div className="pdf_ico">PDF</div>,
                    //     id:'pdf'
                    // },
                    {
                        label:<div className="xlsx_ico">XLSX</div>,
                        id:'xlsx'
                    },
                    // {
                    //     label:<div className="csv_ico">CSV</div>,
                    //     id:'csv'
                    // },
                    // {
                    //     label:<div className="docx_ico">DOCX</div>,
                    //     id:'docx'
                    // },
                ],
                labelCol:'2%',
                wrapperCol:'98%',
                width: 2,
                label: '导出',
                className: '',
                onClickBtn:this.exportReport.bind(this)
            }
        };

        this.reportId = '19';
        this.idQueryOptions = [];                                       //idNo 对应的option
        this.reportTitleList = CONSTANTS.relation_table_title_defatlt;       //表头列表

        this.targetChildrenList = [];
        this.transaction_id_name_map = CONSTANTS.transaction_id_name_map;
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.reportList = [];                 //查询回来的报表列表
        this.defaultTargetList = [];
    };

    getControllers() {
        const commonControllers = this.commonControllers;

        const controllers = [
            [
                commonControllers.queryType,
                commonControllers.groupQuery,
                commonControllers.start,
                commonControllers.end,
                commonControllers.queryBtn,
                commonControllers.exportBtn
            ]
        ];

        return controllers;
    }

    async componentDidMount(){
        //获取指标
        const relationFilter = await getRelationFilter();
        this.groupItemList = {};
        let key = 0;
        this.itemCodeArray = [];
        this.commonControllers.groupQuery.options = relationFilter.map(item=>{
            this.groupItemList[item.groupId] = '';
            let itemCodeGroupList = [];
            item.itemList.map(item_in=>{
                this.idQueryOptions.push({
                    value:key+'',
                    label:item_in.itemName
                });
                this.itemCodeArray.push(item_in.itemCode);
                key++;
                itemCodeGroupList.push(item_in.itemCode);
            })
            this.groupItemList[item.groupId] = itemCodeGroupList.join(',');
            return {
                value:item.groupId,
                label:item.groupName,
                key:item.groupId

            }
        })
        let groupQueryDefaultVal = '';
        if(this.commonControllers.groupQuery.options.length>0){
            groupQueryDefaultVal = this.commonControllers.groupQuery.options[0].value;
        }
        this.commonControllers.groupQuery.defaultValue = groupQueryDefaultVal;

        this.commonControllers.idQuery.options = this.idQueryOptions;
        let idQueryDefaultVal = '';
        if(this.commonControllers.idQuery.options.length>0){
             idQueryDefaultVal = this.commonControllers.idQuery.options[0].value;
        }
        this.commonControllers.idQuery.defaultValue = idQueryDefaultVal;
        this.filterReportFn();
    }

    onDataChange(name,value){
        if(name==='queryType'){
            const controllers = this.commonControllers;
            const commonControllers = [
                [
                    controllers.queryType,
                    controllers[value+'Query'],
                    controllers.start,
                    controllers.end,
                    controllers.queryBtn,
                    controllers.exportBtn
                ]
            ];
            this.setState({commonControllers});
        }
    }

    async filterReportFn(){
        //2. 获取指标列表，转化出默认表头，指标的子节点，
        //3. 配置筛选form的默认值，和相关配置（select-option）
        const commonControllers = this.getControllers();
        //4. 渲染筛选from
        this.setState({commonControllers});
        //5. 给筛选from设置默认值，并拿到转化后的参数，用默认的筛选条件第一次请求报表接口
        let defaultControllerData = {};
        commonControllers.map(item=>{   //获取筛选条件默认参数集合
            item.map(item_in=>{
                if (item_in.defaultValue != undefined) {
                    defaultControllerData[item_in.name] = item_in.defaultValue;
                }
            })
        })
        const sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
        //6. 把这一次的参数设置为上次一使用的参数，用于下次切换筛选条件后的查询，如果和一样，则不进行查询，还用于报表的筛选和翻页
        this.prevInputData = sendParams;
        let {startDate,endDate,groupId,queryType} = sendParams;
        if(queryType==='group'){
            sendParams.idNo = this.groupItemList[groupId];
        }
        else {
            sendParams.idNo = sendParams.idNo.map((item)=>(
                this.itemCodeArray[item]
            )).join(',');
        }
        if(sendParams.idNo){
            //1. show loading
            this.setState({tableLoading:true})
            //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
            this.getReportDateFn({startDate,endDate,idNo:sendParams.idNo,reportId:this.reportId,queryType});
        }
    }

    async getReportDateFn(arg){
        //获取表内容
        const reportList = await getRelationReport(arg);
        if( reportList == false ){
            this.setState({
                renderErrorMsg:(<span>数据获取失败，<a href="javascript:void(0);" onClick={()=>{window.location.reload();}}>请重试！</a></span>),
                tableLoading:false,
            });
            return false;
        }else{
            let reportDataSources = [];
            reportList.map((item,key)=>{
                let list = {};
                _.map(this.reportTitleList,(column)=>{
                    if (item[column.field_name]) {
                        list[column.field_name] = item[column.field_name]
                    }
                })
                reportDataSources.push({row_index:key+1,cust_name:item.cust_name,id_no:item.id_no,cust_status:item.cust_status,...list,key});
            })
            let hasSumRow = (arg.queryType==='group');
            this.setState({reportDataSources,tableLoading:false,hasSumRow});
        }
    }

    //报表导出
    exportReport(e){
        const {startDate,endDate,idNo,queryType} = this.prevInputData;
        const urlParams = $.param({startDate,endDate,idNo,reportId:this.reportId,exportType:e.key,queryType:queryType});
        getRelationExport(urlParams).then(res=>{
            console.log(res);
        });
        //window.open(CONSTANTS.APP_BASE_URL+'/api/relation/exportExcel?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj)) {
            if(returnData.queryType==='group'){
                returnData.idNo = this.groupItemList[returnData.groupId];
            }
            else {
                if(returnData.idNo){
                    returnData.idNo = returnData.idNo.map((item)=>(
                        this.itemCodeArray[item]
                    )).join(',');
                }
            }
            this.prevInputData = {...returnData};
            this.setState({tableLoading:true});
            this.getReportDateFn({...returnData,reportId:this.reportId});
        }
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            sortColumn,
            sortType
        });
    }

    getReportData() {
        const { reportDataSources, sortColumn, sortType } = this.state;
        let reportData = reportDataSources.slice();
        let sumRow = [];
        if(reportData.length&&reportData[0].cust_name==='合计'){
            sumRow = reportData.splice(0,1);
        }
        if (sortColumn && sortType) {
            const sortArr = reportData.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if(!isNaN(Number(x))){
                    x = Number(x);
                }else{
                    if (typeof x === 'object') {
                        x = Number(x.props.children);
                    }else if(['%','‰'].indexOf(x.substring(x.length-1)) > -1){
                        if (x.substring(0,1) === '-' && x.length === 1) {
                            x = 9999999999;
                        }else{
                            x = Number(x.substring(0,x.length-1));
                        }
                    }else{
                        x = x.charCodeAt();
                    }
                }

                if(!isNaN(Number(y))){
                    y = Number(y);
                }else{
                    if (typeof y === 'object') {
                        y = Number(y.props.children);
                    }else if(['%','‰'].indexOf(y.substring(y.length-1)) > -1){
                        if (y.substring(0,1) === '-' && y.length === 1) {
                            y = 9999999999;
                        }else{
                            y = Number(y.substring(0,y.length-1));
                        }
                    }else{
                        y = y.charCodeAt();
                    }
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
            //序号不变  1,2,3,4
            sortArr.map((item,key)=>{
                item.row_index = key+1 ;
            })
            return sumRow.concat(sortArr);
        }else{
            //序号不变  1,2,3,4
            reportData.map((item,key)=>{
                item.row_index = key+1;
            })
            return sumRow.concat(reportData);
        }
    }
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    querySelf(){
        this.props.history.push('/query/self');
    }
    render() {
        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.onDataChange.bind(this)}
        />;

        let reportTitleList = [
            <Column align="center" width={50} key='row_index' resizable fixed width={50}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>,
            <Column align="center" key='cust_name' resizable fixed width={120}>
                <HeaderCell>客户姓名</HeaderCell>
                <Cell dataKey='cust_name' />
            </Column>,
            <Column align="center" key='id_no' resizable fixed width={180}>
                <HeaderCell>身份证号/营业执照号</HeaderCell>
                <Cell dataKey='id_no' />
            </Column>,
            <Column align="center" key='cust_status' resizable  width={80}>
                <HeaderCell>账户状态</HeaderCell>
                <Cell dataKey='cust_status' />
            </Column>
        ];

        this.reportTitleList.map(item=>{
            reportTitleList.push(
                <Column align="center" key={item.index_id} resizable sortable width={200}>
                    <HeaderCell width={41}>{item.name}</HeaderCell>
                    <Cell dataKey={item.field_name} />
                </Column>
            )
        })

        const hasDate = this.state.reportDataSources.length>0;

        return (
            <div>
                <PanelContainer
                    hasFilter={<div> {filterContent} </div>}
                    title='关联方证券经纪业务查询'
                    hasTip={()=>{return this.returnTipTable('80')}}
                >
                    <div className='transaction_table_bb customercount_pagination'>
                        <div className="transaction_table_bb relation_first_td">
                            <div className="management_pagination_bg"></div>
                            <JfCard loading={this.state.tableLoading}>
                                {hasDate?<Table
                                    data={this.getReportData()}
                                    sortColumn={this.state.sortColumn}
                                    sortType={this.state.sortType}
                                    onSortColumn={this.handleSortColumn}
                                    height={770}
                                    hasSumRow={this.state.hasSumRow}
                                >
                                    {reportTitleList}
                                </Table>:<div className="ant-table-placeholder"><span><i className="anticon anticon-frown-o"></i>
                                {this.state.renderErrorMsg}
                                </span></div>}
                            </JfCard>
                        </div>
                    </div>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.c_related_trade_statistics_01}</div>
            </div>
        );
    }

}

module.exports = Relation;
