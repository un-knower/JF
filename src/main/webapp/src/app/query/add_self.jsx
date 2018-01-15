import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table,Upload,Icon} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
import axios from 'axios';
import {getKlineDate,getTableDate,relationImport,queryGroupNameList} from '../../api';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;

const Dragger = Upload.Dragger;


const Option = Select.Option;


export default class Addself extends Component {


    constructor(props){
        super(props);

        this.radioOnChange = this.radioOnChange.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.commonControllers = {

            inputname: {
                type: 'searchSelect',
                name: 'groupName',
                placeholder:'请输入名称',
                width: 24,
                label: '名称设定:',
                mode:'combobox'
            },
            qrBtn: {
                type: 'button',
                name: 'qrBtn',
                width: 3,
                label: '保存',
                className: 'ant-btn-primary',
                labelCol:'20%',
                wrapperCol:'58%',
                onClickBtn:this.onSave.bind(this)
            },
            tjBtn: {
                type: 'button',
                name: 'tjBtn',
                width: 2,
                label: '取消',
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.removeFile.bind(this)
            },
            uploadcoll:{
                type:'upload',
                name:'uploadcoll',
                width: 24,
                label: '上传文件:',
                uploadprops:{
                    customRequest:this.onFileSelected.bind(this),
                    showUploadList:{ showPreviewIcon: true, showRemoveIcon: false }
                }
            }

        };

        this.state = {
            commonControllers:[],
            echartDateList:[],
            echartPriceList:[],
            allTableData:{
                stock_fund_trading:[],
                stock_trading:[],
                fund_trading:[],
                margin_trading:[]
            },
            tableLoading:true,
            klineLoading:true
        }
        this.groupName = '';
        this.isExist = false;
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        // this.getTableDateFn(e.target.value);
    }

    //  处理名称搜索
    async handleSearchSelect(value,CB){
        this.groupName = value;
        const groupNameList = await queryGroupNameList({'groupName':value});
        let __list = groupNameList.length>20?groupNameList.slice(0,20):groupNameList;
        const __cb_list = __list.map(groupName=>{
            let show_text = null;
            let position = groupName.indexOf(value);
            if (position == 0) {
                show_text = <span><span style={{color:'red'}}>{value}</span>{groupName.substring(value.length,groupName.length)}</span>
            }else{
                show_text = <span>{groupName.substring(0,position)}<span style={{color:'red'}}>{value}</span>{customer.substring(value.length+position,customer.length)}</span>
            }
            return {
                value:groupName,
                text:<span>{show_text}</span>,
                noHighLight:groupName
            }
        })
        CB(__cb_list);
    }

    onFileSelected(params){
        this.file = params.file;
        this.commonControllers.uploadcoll.uploadprops.fileList = [params.file];
        let commonControllers = this.getControllers();
        this.setState({commonControllers});
    }

    removeFile(){
        this.commonControllers.uploadcoll.uploadprops.fileList = [];
        let commonControllers = this.getControllers();
        this.file = undefined;
        this.setState({commonControllers});
    }

    onSave(){
        let _this = this;
        if(this.groupName===''){
            message.error("名称未设定！");
            return;
        }
        if (!this.file) {
            message.error('文件未选择！');
            return;
        }
        let {groupName} = this;
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('groupName',this.groupName);
        relationImport(formData).then((res)=>{
            if(res.code==='0'){
                message.success(res.msg);
                _this.removeFile();
            }
            else {
                message.error(res.msg);
            }
        });
    }

    getControllers(){
        let commonControllers = this.commonControllers;

        let controllers = [
            [


                {...commonControllers.inputname,labelCol:'10%',wrapperCol:'30%'},
                {...commonControllers.uploadcoll,labelCol:'10%',wrapperCol:'30%'},
                {...commonControllers.qrBtn},
                {...commonControllers.tjBtn},


            ]
        ];
        return controllers;
    }

    componentDidMount(){
        const  _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        const commonControllers = this.getControllers();
        //先渲染筛选组件
        this.setState({commonControllers});
    }

    onDataChange(name,value){
        if(name==='groupName'){
            this.groupName = value;
        }
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    render() {
        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            handleSearchSelect={this.handleSearchSelect}
            onDataChange={this.onDataChange}
        />;



        return (
            <div>

                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="self_icon">
                            <JfCard className="collection_upload" title="添加关联名单组" hasTip={()=>{return this.returnTipTable('77')}} >
                                {filterContent}
                            </JfCard>
                        </Col>
                    </Row>

            </div>
        )
    }
}

module.exports = Addself;
