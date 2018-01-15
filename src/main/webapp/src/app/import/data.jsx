import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table,Icon,Button} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
import axios from 'axios';
import {getKlineDate,getTableDate,informationCmodelList,importDocument} from '../../api';

require('es6-promise').polyfill();
const Option = Select.Option;

//板块说明配置
export default class Data extends Component {
    constructor(props){
        super(props);
        //this.radioOnChange = this.radioOnChange.bind(this);
        //this.dateTypeValue = 1;
        this.defaultMonth = Tools.getStartDefaultDate({
            //date:this.props.date.c_cashclient_asset_01,
            formart:'YYYY-MM',
        });
        this.commonControllers = {
            importDataType: {
                type: 'select',
                name: 'importDataType',
                placeholder: '请选择数据类型',

                width: 8,
                label: '数据类型:',
                options: [
                    {
                        label: '组织结构-关键指标',
                        value: '11'
                    }, {
                        label: '组织结构-组织结构',
                        value: '2'
                    }
                ],
                defaultValue:'11'

            },
            dateType: {
                type: 'radioGroup',
                name: 'organizationType',
                width: 16,
                label: '时间类型:',

                className: 'ant-branch-left ',
                placeholder: '请选择时间类型',
                defaultValue:'1',
                radioOptions: [
                    // {
                    //     label: '年度',
                    //     value: '1'
                    // }, {
                    //     label: '季度',
                    //     value: '2'
                    // }, {
                    //     label: '月份',
                    //     value: '3'
                    // }
                ],
                onChangBtn:this.onDepTypeChange.bind(this)
            },
            month: {
                type: 'month',
                name: 'month',
                width: 5,
                label: '年月:',
                defaultValue:Tools.getStartDefaultDate({
                    //date:this.props.date.c_cashclient_asset_01,
                    formart:'YYYY-MM',
                }),

            },
            buyType: {
                type: 'select',
                name: 'buyType',
                placeholder: '请选择交易所',
                width: 10,
                label: '交易所:',
                options: [
                    // {
                    //     label: '上海交易所',
                    //     value: '1'
                    // }, {
                    //     label: '深证交易所',
                    //     value: '2'
                    // }
                ]
            },
            uploadcoll:{
                type:'upload',
                name:'uploadcoll',
                width: 23,

                label: '文件上传:',

                uploadprops:{
                    customRequest:this.onFileSelected.bind(this),
                    //showUploadList:{ showPreviewIcon: true, showRemoveIcon: false }
                    onRemove:this.onRemove.bind(this)
                }
            },

            scBtn: {
                type: 'button',
                name: 'scBtn',
                width: 3,
                label: '清除',
                labelCol:'17%',
                wrapperCol:'58%',
                onClickBtn:this.onRemove.bind(this)
            },
            tjBtn: {
                type: 'button',
                name: 'tjBtn',
                width: 2,
                label: '上传',
                className: 'ant-btn-primary',
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.onClickBtn.bind(this)
            },

            simpleBtn: {
                type: 'button',
                //className: 'collection_upload import_data_upload',
                width: 24,
                label: '示例Excel下载',
                labelCol:'10%',
                wrapperCol:'78%',
                className:'ant-btn-primary',
                disabled:false,

                onClickBtn:this.onSimpleBtn.bind(this)

            },

        };
        this.state = {
            commonControllers:[],
            columnsModelsList:[],
            fileList:[],
        }

    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        // this.getTableDateFn(e.target.value);
    }

    getControllers(dataType){
        let commonControllers = this.commonControllers;
        let controllers = [
            []
        ];

        switch( dataType ){
            case '1':
                controllers = [
                    [
                        {...commonControllers.importDataType,labelCol:'30%',wrapperCol:'65%'},
                        {...commonControllers.dateType,labelCol:'10%',wrapperCol:'75%'},
                        {...commonControllers.uploadcoll,labelCol:'10%',wrapperCol:'30%'},
                        {...commonControllers.simpleBtn},
                        {...commonControllers.scBtn},
                        {...commonControllers.tjBtn},
                    ]
                ];
                break;
            case '2':
                controllers = [
                    [
                        {...commonControllers.importDataType,labelCol:'30%',wrapperCol:'65%'},
                        {...commonControllers.month,labelCol:'20%',wrapperCol:'65%'},
                        {...commonControllers.buyType,labelCol:'14%',wrapperCol:'40%'},
                        {...commonControllers.uploadcoll,labelCol:'10%',wrapperCol:'30%'},

                        {...commonControllers.scBtn},
                        {...commonControllers.tjBtn},
                    ]
                ];
                break;
            default:;
        }

        return controllers;
    }

    getCurrentControllers(data){
        //const commonControllers = [];
        let dataList = this.state.columnsModelsList;

        if( data =='财务数据' ){
            this.commonControllers.dateType.radioOptions = dataList['modelList'][data];
            //this.dateTypeValue = dataList['modelList'][data][0]['value'];
            this.refs.filterController.setControllerData({importDataType:data,dateType:dataList['modelList'][data][0]['value']});
            const commonControllers = this.getControllers('1');
            return commonControllers;
        }else{
            //console.log(this.defaultMonth);
            this.commonControllers.buyType.options = dataList['modelList'][data];

            const commonControllers = this.getControllers('2');
            this.refs.filterController.setControllerData({importDataType:data,buyType:dataList['modelList'][data][0]['value'],month:moment(this.defaultMonth,'YYYY-MM')});
            return commonControllers;
        }

    }

    onClickBtn(){
        let _this = this;
        const returnData = this.refs.filterController.getControllerData();
        //console.log("returnData");
        //console.log(returnData);
        //return false;
        const fileList = this.state.fileList;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('file', file);
        });

        if( returnData['importDataType'] == '财务数据' ){

            formData.append('importId', returnData['dateType']);
        }else if( returnData['importDataType'] == '市场数据' ){

            if( returnData['buyType'] == undefined || returnData['buyType'] == ''   ){
                message.error('请选择交易所！');
                return false;
            }

            if( returnData['endDate'] == undefined || returnData['endDate'] == ''   ){
                message.error('请选择月份！');
                return false;
            }

            formData.append('importId', returnData['buyType']);
            formData.append('month', returnData['endDate']);
        }



        if( fileList.length < 1){
            message.error('请选择要上传的文件！');
            return false;
        }

        importDocument(formData).then(res=>{
            if( res.code == 0 ){
                message.success('上传成功！');
                _this.onRemove();
            }else{
                message.error('上传失败,请检查上传数据的格式！');
                return false;
            }
        });
    }

    onSimpleBtn(){
        const returnData = this.refs.filterController.getControllerData();
        const dateTypeValue = returnData['dateType'];
        let dataList = this.state.columnsModelsList;
        //console.log(dateTypeValue);
        if( dataList['modelDetailList'][dateTypeValue] != undefined ){
            let url = dataList['modelDetailList'][dateTypeValue]['simplePath'];
            //window.open(url,'');
            window.open(url,"_self");
        }
    }

    onDataChange(name,data){
        //console.log(name,data);
        let currentValue = data;
        let dataList = this.state.columnsModelsList;
        if( name == 'importDataType'){
            const commonControllers = this.getCurrentControllers(data);
            this.setState({commonControllers});
        }
    }

    onDepTypeChange(e){
        let _this = this;
        //this.dateTypeValue = e.target.value;
        const returnData = this.refs.filterController.getControllerData();
        returnData['dateType'] = e.target.value;
        //console.log(returnData);

        this.refs.filterController.setControllerData(returnData);
    }

    onFileSelected(params){
        this.file = params.file;
        this.commonControllers.uploadcoll.uploadprops.fileList = [params.file];
    //    this.commonControllers.tjBtn.disabled = false;
        this.setState(({ fileList }) => ({
          fileList: [...fileList, params.file],
        }));

        const returnData = this.refs.filterController.getControllerData();
        if( returnData['importDataType'] ){
            const defaultValue = returnData['importDataType'];
            const commonControllers = this.getCurrentControllers(defaultValue);
            this.setState({commonControllers});
        }

        if( returnData['endDate'] != undefined && returnData['endDate'] != '' ){
            returnData['month'] = moment(moment(returnData['endDate'],'YYYYMM').format('YYYY-MM'),'YYYY-MM');
            delete returnData['endDate'];
        }
        //console.log(returnData);
        this.refs.filterController.setControllerData(returnData);
        //this.changeTjBtnDisabled(false);
    }

    onRemove(){
        this.setState(({ fileList }) => {
          return {
            fileList: []
          };
        });
        this.commonControllers.uploadcoll.uploadprops.fileList = [];
        //this.commonControllers.tjBtn.disabled = true;

        const returnData = this.refs.filterController.getControllerData();
        if( returnData['importDataType'] ){
            const defaultValue = returnData['importDataType'];
            const commonControllers = this.getCurrentControllers(defaultValue);
            this.setState({commonControllers});
        }

        if( returnData['endDate'] != undefined && returnData['endDate'] != '' ){
             // returnData['month'] = moment(returnData['endDate'],'YYYYMM').format('YYYY-MM');
             returnData['month'] = moment(moment(returnData['endDate'],'YYYYMM').format('YYYY-MM'),'YYYY-MM');
             delete returnData['endDate'];
        }
        //console.log(returnData);
        this.refs.filterController.setControllerData(returnData);
        //this.changeTjBtnDisabled(true);
    }

    async componentDidMount(){
        const dataList = await informationCmodelList();
        console.log(dataList);
        this.setState({
            columnsModelsList:dataList
        });

        this.commonControllers.importDataType.options = dataList['columnsList'];

        const defaultValue = dataList['columnsList'][0]['value'];
        const modelsValue = dataList['modelList'][defaultValue][0]['value'];
        const commonControllers = this.getCurrentControllers(defaultValue);
        this.setState({commonControllers});
        //console.log(moment('201712','YYYYMM').format('YYYY-MM'));
        this.refs.filterController.setControllerData({importDataType:defaultValue,dateType:dataList['modelList'][defaultValue][0]['value']});
    }


    render() {

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.onDataChange.bind(this)}
        />;
        return (
            <div><PanelContainer
                // hasFilter={<div> {filterContent} </div>}
                title='数据导入'
            >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard className="collection_upload"   title="数据格式示例及下载" >
                                {filterContent}
                            </JfCard>
                        </Col>
                    </Row>
            </PanelContainer>
            </div>
        )
    }
}

module.exports = Data;
