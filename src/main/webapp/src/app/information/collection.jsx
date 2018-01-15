import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table,Upload,Icon} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import _ from 'underscore';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
//import axios from 'axios';
import {getKlineDate,getTableDate,importDocument,informationCmodelList} from '../../api';
// import reqwest from 'reqwest';

import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;

const Dragger = Upload.Dragger;


const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class InformationCollection extends Component {


    constructor(props){
        super(props);
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
            klineLoading:true,
            fileList:[],

            columnsModelsList:[]
        };

        this.radioOnChange = this.radioOnChange.bind(this);
        this.commonControllers = {

            navselect: {
                type: 'select',
                name: 'navselect',
                placeholder: '请选择',
                width: 24,
                label: '菜单选择:',
                // options: [
                //     {
                //         label: '组织结构',
                //         value: 'A'
                //     }, {
                //         label: '人员编制',
                //         value: 'B'
                //     }, {
                //         label: '人员招聘',
                //         value: 'C'
                //     }, {
                //         label: '人员画像',
                //         value: 'D'
                //     }, {
                //         label: '人员分布',
                //         value: 'E'
                //     }, {
                //         label: '人员效能',
                //         value: 'F'
                //     }, {
                //         label: '人员配置',
                //         value: 'G'
                //     }, {
                //         label: '培养开发',
                //         value: 'H'
                //     }
                // ],
                options:[],
                onChange:this.onDataChange.bind(this)

            },
            moduleselect: {
                type: 'select',
                name: 'importId',
                placeholder: '请选择模块',
                width: 24,
                label: '模块选择:',
                options: [
                    // {
                    //     label: '组织结构-关键指标',
                    //     value: '1'
                    // }, {
                    //     label: '组织结构-组织结构',
                    //     value: '2'
                    // }, {
                    //     label: '组织结构-机构分布',
                    //     value: '3'
                    // }
                ]

            },
            simpleBtn: {
                type: 'button',
                //className: 'collection_upload import_data_upload',
                width: 24,
                label: '示例Excel下载',
                labelCol:'10%',
                wrapperCol:'78%',
                className:'ant-btn-primary',
                disabled:true,

                onClickBtn:this.onSimpleBtn.bind(this)

            },
            tjBtn: {
                type: 'button',
                name: 'tjBtn',
                width: 10,
                label: '提交',

                labelCol:'25%',
                wrapperCol:'75%',
                // disabled:true,
                onClickBtn:this.onClickBtn.bind(this)

            },
            uploadcoll:{
                type:'upload',
                name:'uploadcoll',
                width: 24,
                label: '上传文件:',
                uploadprops:{
                    customRequest:this.onFileSelected.bind(this),
                    //showUploadList:{ showPreviewIcon: true, showRemoveIcon: false }
                    onRemove:this.onRemove.bind(this)
                }
            }

        };


    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        this.getTableDateFn(e.target.value);
    }

    changeTjBtnDisabled(status = false){
        let nowControllers = this.state.commonControllers;
        nowControllers[0][3]['disabled'] = status;

        this.setState({'commonControllers':nowControllers});
    }

    onClickBtn(){
        let _this = this;
        const returnData = this.refs.filterController.getControllerData();
        //console.log(returnData);
        const fileList = this.state.fileList;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('file', file);
        });

        if( returnData['navselect'] == undefined || returnData['navselect'] == ''   ){
            message.error('请选择菜单！');
            return false;
        }

        if( returnData['importId'] == undefined || returnData['importId'] == ''   ){
            message.error('请选择模块！');
            return false;
        }

        if( fileList.length < 1){
            message.error('请选择要上传的文件！');
            return false;
        }

        _(returnData).map((v,k)=>{
            formData.append(k, v);
        });

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
        //console.log(returnData);
        if( returnData['importId'] && this.state.columnsModelsList['modelDetailList'][returnData['importId']] != undefined ){
            let url = this.state.columnsModelsList['modelDetailList'][returnData['importId']]['simplePath'];
            //window.open(url,'');
            window.open(url,"_self");
        }
    }

    onFileSelected(params){
        this.file = params.file;
        this.commonControllers.uploadcoll.uploadprops.fileList = [params.file];
    //    this.commonControllers.tjBtn.disabled = false;
        this.setState(({ fileList }) => ({
          fileList: [...fileList, params.file],
        }));
        let commonControllers = this.getControllers();
        this.setState({commonControllers});
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
        let commonControllers = this.getControllers();
        this.setState({commonControllers});
        //this.changeTjBtnDisabled(true);
    }

    getControllers(){
        let commonControllers = this.commonControllers;
        let _this = this;
        // const uploadprops = {
        //     'name':'file',
        //     onRemove: (file) => {
        //         this.setState(({ fileList }) => {
        //           return {
        //             fileList: []
        //           };
        //         });
        //         this.changeTjBtnDisabled(true);
        //
        //     },
        //     beforeUpload: (file) => {
        //         this.setState(({ fileList }) => ({
        //           fileList: [...fileList, file],
        //         }));
        //
        //         this.changeTjBtnDisabled(false);
        //         return false;
        //     },
        // };
        // //let onClickBtn =
        //
        // commonControllers.uploadcoll.uploadprops = uploadprops;
        // commonControllers.tjBtn.onClickBtn = ()=>{
        //     const returnData = this.refs.filterController.getControllerData();
        //     //console.log(returnData);
        //     const fileList = this.state.fileList;
        //     const formData = new FormData();
        //     fileList.forEach((file) => {
        //       formData.append('file', file);
        //     });
        //
        //     _(returnData).map((v,k)=>{
        //         formData.append(k, v);
        //     });
        //
        //     importDocument(formData).then(res=>{
        //         console.log(res);
        //     });
        // };
        let controllers = [
            [

                {...commonControllers.navselect,labelCol:'10%',wrapperCol:'30%'},
                {...commonControllers.moduleselect,labelCol:'10%',wrapperCol:'30%'},
                {...commonControllers.uploadcoll,labelCol:'10%',wrapperCol:'30%'},
                {...commonControllers.simpleBtn},
                {...commonControllers.tjBtn},


            ]
        ];
        return controllers;
    }

    async componentDidMount(){
        const  _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        const dataList = await informationCmodelList();
        this.commonControllers.navselect.options = dataList['columnsList'];
        this.setState({
            columnsModelsList:dataList
        });

        const commonControllers = this.getControllers();

        //先渲染筛选组件
        this.setState({commonControllers});
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    onDataChange(name,data){
        let _this = this;
        console.log(name,data);
        if( name == 'navselect' ){

            const mList = this.state.columnsModelsList['modelList'][data];

            this.commonControllers.moduleselect.options = mList;
            this.commonControllers.simpleBtn.disabled = true;
        //    this.commonControllers.moduleselect.defaultValue = mList[0]['value'];
            const commonControllers = this.getControllers();
            //先渲染筛选组件
            this.setState({commonControllers},()=>{
                let cData = _this.refs.filterController.getControllerData();
                if( cData['importId'] != undefined ){
                    delete cData['importId'];
                }
                _this.refs.filterController.setControllerData({...cData,[name]:data});
            });

        }else if(  name == 'importId' ){
            this.commonControllers.simpleBtn.disabled = false;
        //    this.commonControllers.moduleselect.defaultValue = mList[0]['value'];
            const commonControllers = this.getControllers();
            //先渲染筛选组件
            this.setState({commonControllers});
        }

    }



    render() {

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.onDataChange.bind(this)}
        />;

        return (
            <div>
                <PanelContainer title='导入选项' hasTip={()=>{return this.returnTipTable('32')}} >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard className="collection_upload">
                                {filterContent}
                            </JfCard>
                            {/* <div className="import_data">
                                <div className="collection_upload import_data_upload " >
                                   {filterContent}
                                  <Button type="primary"  >示例Excel下载</Button>
                                </div>
                            </div> */}
                        </Col>
                    </Row>
                </PanelContainer>
            </div>
        )
    }
}

module.exports = InformationCollection;
