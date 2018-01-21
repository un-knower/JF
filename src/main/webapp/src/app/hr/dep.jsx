import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Tooltip } from 'antd';
import _ from 'underscore';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {RingPie,LinesBars,NewBar,ConnectedBars,Scatter} from 'app_component';
import axios from 'axios';
import {getKlineDate,getTableDate,getOrgOne,getDistrubiuition} from '../../api';

import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;


const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class Hrdep extends Component {


    constructor(props){
        super(props);

        this.organizationType = '2';
        this.subOrgChild = [];            //机构的子节点
        this.radioOnChange = this.radioOnChange.bind(this);
        this.commonControllers = {
            year: {
                type: 'select',
                name: 'startYear',
                placeholder: '请选择',
                width: 4,
                label: '年份:',
                options: Tools.getYearOptions({date:this.props.date.create_date,size:9}),
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY',
                    addType:'month',
                    addVal:-1
                }).year()+''
            },
            branch: {
                type: 'treeSelect',
                name: 'groupCode',
                width: 5,
                label: '一级部门:',
                className: 'ant-branch-left',
                placeholder: '请选择',
                defaultValue:['all'],
                treeData:[]
            },
            deptype: {
                type: 'radioGroup',
                name: 'organizationType',
                width: 8,
                label: '部门类型:',
                className: 'ant-branch-left',
                placeholder: '请选择',
                radioOptions: [
                    {
                        label: '全部',
                        value: '1'
                    }, {
                        label: '总部',
                        value: '2'
                    }, {
                        label: '分支机构',
                        value: '3'
                    }
                ],
                defaultValue:this.organizationType,
                onChangBtn:this.onDepTypeChange.bind(this)
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
    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        this.getTableDateFn(e.target.value);
    }

    onDepTypeChange(e){
        let _this = this;
        this.prevSendParams.organizationType = e.target.value;
        getOrgOne({organizationType:this.prevSendParams.organizationType}).then((res)=> {
            const params = this.prevSendParams.organizationType==='1'?{all:{subOrg:[...res.headquarters.subOrg,...res.organization.subOrg],org_name:'全部'}}:res;
            const commonControllers = _this.getControllers(params);
            _this.setState({commonControllers});
            _this.renderPage(commonControllers,true,true);
        });
    }

    getControllers(data){
        let _this = this;
        if(data){
            this.subOrgChild = [];
            this.commonControllers.branch.treeData = _.map(data,function(item,key) {
                return {
                    label:item.org_name,
                    value:'all',
                    key,
                    children:item.subOrg.map((item)=>{
                        _this.subOrgChild.push(item.org_code);
                        return {
                            label:item.org_name,
                            value:item.org_code,
                            key:item.org_code
                        };
                    })
                };
            });
        }
        let commonControllers = this.commonControllers;
        return [
            [
                {...commonControllers.deptype,labelCol:'21%',wrapperCol:'79%'},
                {...commonControllers.branch,labelCol:'31%',wrapperCol:'69%'},
                {...commonControllers.year,labelCol:'22%',wrapperCol:'78%'},
            ]
        ];
    }
    //年龄分布
    renderGraphNewBar1(){
        let {groupCode,startYear:startDate} = this.prevSendParams;
        let sfp = ['caitong_num','caitong_rate','org_rate'];
        getDistrubiuition({groupCode,startDate},'ageDistrubiuition',sfp).then((res)=>{
            this.refs.graph_newbar1.refreshGraph({
                seriesData:[
                    {name:'财通',data:res.caitong_rate},
                    {name:'协会',data:res.org_rate}
                ],
                dataUnit:['%','%'],
                tooltipData:[
                    {name:'财通',data:res.caitong_num,unit:'人'},
                    {seriesIndex:'0'},
                    {seriesIndex:1}
                ],
                xAxisData:{data:res.xAxisData},
                extraOption:{
                    series:[{
                        label:{
                            normal:{show:false}
                        }
                    },{
                        label:{
                            normal:{show:false}
                        }
                    }],
                    grid:{
                        bottom:'6%',
                        right:'5%',
                        left:'2%'
                    },
                    legend:{
                        orient: 'horizontal',
                        show:true,
                        left:'center',
                        inactiveColor: '#92aae0',

                    },
                    color:['#95e8ff',  '#fefe9d'],
                    tooltip:{
                        show:true,
                        backgroundColor:'rgba(50,50,50,0.7)'
                    },
                    yAxis:{
                        show:false
                    },
                    xAxis:{
                        axisLine:{
                            lineStyle:{
                                color:'#88aede'
                            }
                        },
                        axisLabel:{
                            color:'#fff',
                            formatter:'{img|}\n{value}',
                            rich:{
                                img:{
                                    backgroundColor:{
                                        image:CONSTANTS.APP_BASE_URL+'/resources/images/icon_i.png'
                                    }
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    //性别比例
    renderGraphRingPie(){
        let {groupCode,startYear:startDate} = this.prevSendParams;
        let sfp = ['caitong_rate','org_rate'];
        getDistrubiuition({groupCode,startDate},'sexDistrubiuition',sfp).then((res)=>{
            let caitong_rate_0 = (res.caitong_rate !=undefined )?res.caitong_rate[0]:0;
            let caitong_rate_1 = (res.caitong_rate !=undefined &&  res.caitong_rate[1]!= undefined )?res.caitong_rate[1]:0;
            let org_rate_0 = (res.org_rate !=undefined )?res.org_rate[0]:0;
            let org_rate_1 = (res.org_rate !=undefined &&  res.org_rate[1]!= undefined )?res.org_rate[1]:0;

            const seriesData=[
                {
                    "name":'财通',
                    'data':[{
                        value: caitong_rate_0,
                        name: caitong_rate_0+'%'
                    }, {
                        value: (100-caitong_rate_0),
                        name: '',
                    }]
                },
                {
                    "name":'协会',
                    'data':[{
                        value: org_rate_0,
                        name: org_rate_0+'%'
                    }, {
                        value: (100-org_rate_0),
                        name: '',
                    }]
                },
                {
                    "name":'财通',
                    'data':[{
                        value: caitong_rate_1,
                        name: caitong_rate_1+'%'
                    }, {
                        value: (100-org_rate_1),
                        name: '',
                    }]
                },
                {
                    "name":'协会',
                    'data':[{
                        value: org_rate_1,
                        name: org_rate_1+'%'
                    }, {
                        value: (100-org_rate_1),
                        name: '',
                    }]
                }
            ];
            const extraOption={
                title : [
                    {
                        text:'男性',
                        left:'26%',
                        bottom:'5%',
                        textStyle:{
                            fontWeight:'light',
                            color: "#fff",
                        }
                    },{
                        text:'女性',
                        left:'66%',
                        bottom:'5%',
                        textStyle:{
                            fontWeight:'light',
                            color: "#fff",

                        }
                    }
                ],
                legend:{
                    data:['财通','协会'],
                    inactiveColor: '#92aae0',
                },
                series:[
                    {
                        radius: ['55%', '61%'],
                        center: ['30%', '57%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'outside'
                                },
                                color: "#6febff",
                                labelLine: {
                                    show: false,
                                    length: 0,
                                    smooth: 0.5
                                },

                            }
                        }
                    },
                    {
                        radius: ['39%', '45%'],
                        center: ['30%', '57%'],
                        itemStyle: {
                            normal: {
                                color: "#fffe9d",
                                label: {
                                    show: true,
                                    position: 'center'
                                },
                            }
                        },
                    },
                    {
                        radius: ['55%', '61%'],
                        center: ['70%', '57%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'outside'
                                },
                                color: "#6febff",
                                labelLine: {
                                    show: false,
                                    length: 0,
                                    smooth: 0.5
                                },

                            }
                        },
                    },
                    {
                        radius: ['39%', '45%'],
                        center: ['70%', '57%'],
                        itemStyle: {
                            normal: {
                                color: "#fffe9d",
                                label: {
                                    show: true,
                                    position: 'center'
                                },
                            }
                        },
                    },
                ]
            };
            // console.log(seriesData);
            this.refs.graph_ringpie.refreshGraph({seriesData,extraOption});
        });
    }
    //司龄-工龄
    renderGraphConnectedBars(){
        let {groupCode,startYear:startDate} = this.prevSendParams;
        let sfp = ['org_sl_rate','caitong_gl_rate','org_gl_rate','caitong_sl_num','caitong_gl_num','caitong_sl_rate'];
        getDistrubiuition({groupCode,startDate},'workageDistrubiuition',sfp).then((res)=>{
            this.refs.graph_connectedbars.refreshGraph({
                totalData:[{
                    name:'财通',
                    data:res.caitong_sl_rate
                },{
                    name:'协会',
                    data:res.org_sl_rate
                }],
                branchData:[{
                    name:'财通',
                    data:res.caitong_gl_rate
                },{
                    name:'协会',
                    data:res.org_gl_rate
                }],
                tooltipData:{
                    total:[{
                        name:'财通',
                        data:res.caitong_sl_num,
                        unit:'人'
                    },{
                        seriesIndex:0
                    },{
                        seriesIndex:1
                    }],

                    branch:[{
                        name:'财通',
                        data:res.caitong_gl_num,
                        unit:'人'
                    },{
                        seriesIndex:0
                    },{
                        seriesIndex:1
                    }]
                },
                dataUnit:[['%','%'],['%','%']],
                xAxisData:{data:res.xAxisData},
                extraOptions:{
                    base:{
                        legend:{
                            inactiveColor: '#92aae0',
                        },
                        grid:{
                            top:'22',
                            bottom:'30',

                            left:'17%'
                        },
                        series:{
                            label:{
                                normal:{
                                    show:true,
                                    formatter:'{c}%',
                                    align:'center'
                                }
                            }
                        },
                        color:['#95e8ff',  '#fffea3'],
                        xAxis:{
                            axisLine:{
                                lineStyle:{
                                    color:'#88aede'
                                }
                            }
                        },
                        yAxis:{
                            axisLabel:{
                                color:'#9fbfe4'
                            }
                        }
                    },
                    totalOption:{
                        legend:{
                            show:true,
                            left:'10',
                            top:'10'
                        },
                        title:{
                            text:'司龄',
                            left:'15',
                            top:'80',
                            textStyle:{
                                fontWeight:'light',
                                color: "#fff",
                            }
                        },
                        series:[{
                            label:{
                                normal:{
                                    position:'top'
                                }
                            }
                        },{
                            label:{
                                normal:{
                                    position:'top'
                                }
                            }
                        }]
                    },
                    branchOption:{
                        title:{
                            text:'工龄',
                            left:'15',
                            top:'80',
                            textStyle:{
                                fontWeight:'light',
                                color: "#fff",
                            }
                        },
                        series:[{
                            label:{
                                normal:{
                                    position:'top'
                                }
                            }
                        },{
                            label:{
                                normal:{
                                    position:'top'
                                }
                            }
                        }]
                    }
                }
            });
        });
    }
    //学历分布
    renderGraphLinebars1(){
        let {groupCode,startYear:startDate} = this.prevSendParams;
        let sfp = ['caitong_number','caitong_rate','org_rate'];
        getDistrubiuition({groupCode,startDate},'eduDistrubiuition',sfp).then((res)=>{
            const seriesData=[
                {
                    name:'财通',
                    data:res.caitong_number,
                    type:'bar',
                    yAxisIndex:1
                },
                {
                    name:'财通',
                    data:res.caitong_rate,
                    type:'line'
                },
                {
                    name:'协会',
                    data:res.org_rate,
                    type:'line'
                }
            ];
            const dataUnit=['人','%','%'];
            const xAxisData={data:res.xAxisData};
            const extraOption={
                series: [
                       {
                         barWidth:'40%',
                       }],
                color:['#95e8ff',  '#ffff79'],
                xAxis:{
                    axisLabel:{
                        color:'#fff'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#88aede'
                        }
                    },
                },
                yAxis:[
                    {show: false},
                    {show: false}
                ],
                legend:{
                    show:true,
                    top:'5.1%',
                    inactiveColor: '#92aae0',

                }
            };
            this.refs.graph_linebars1.refreshGraph({seriesData,xAxisData,dataUnit,extraOption});
        });
    }
    //职业资质对比
    renderGraphLinebars2(){
        let {organizationType,startYear:startDate} = this.prevSendParams;
        let sfp = ['caitong_num','caitong_rate','org_rate'];
        getDistrubiuition({organizationType,startDate},'careerDistrubiuition',sfp).then((res)=>{
            const seriesData=[
                {
                    name:'财通',
                    data:res.caitong_num,
                    type:'bar',
                    yAxisIndex:1
                },
                {
                    name:'财通',
                    data:res.caitong_rate,
                    type:'line'
                },
                {
                    name:'协会',
                    data:res.org_rate,
                    type:'line'
                }
            ];
            const dataUnit=['人','%','%'];
            const xAxisData={data:res.xAxisData};
            const extraOption={
                series: [
                       {
                         barWidth:'45%',
                       }],
                color:['#00eeff',  '#faffa9'],
                xAxis:{
                    axisLabel:{
                        color:'#fff',
                        interval:0,
                        rotate:15
                    },
                    axisLine:{
                            lineStyle:{
                                color:'#88aede'
                            }
                    }
                },
                yAxis:[
                    {show: false},
                    {show: false}
                ],
                legend:{
                    show:true,
                    top:'5.1%',
                    inactiveColor: '#92aae0',
                }
            };
            this.refs.graph_linebars2.refreshGraph({seriesData,xAxisData,dataUnit,extraOption});
        });
    }
    //top10
    renderGraphScatter(){
        let {organizationType,startYear:startDate} = this.prevSendParams;
        let dataUnit = ['','','%','人'];
        getDistrubiuition({organizationType,startDate},'topDistrubiuition').then((res)=>{
            let position = [[1,2],[2,1],[2.5,3],[3.5,2],[5,2],[6,1.5],[7,1],[8,2],[9,1.5],[7,4]];
            this.refs.graph_scatter.refreshGraph({
                chartData:res.map((item,index)=>(
                    {
                        name:item.org_name,
                        value:position[index].concat([item.staff_rate,item.staff_num])
                    }
                )),
                sizeRange:[60,130],
                extraOption:{
                    series:{

                        markLine:{
                            data:null
                        },
                        label:{
                            normal:{
                                fontSize:13,
                                color:'#fff',
                                formatter:(params)=>(
                                    params.name+params.value.map((item,index)=>(
                                        index>1?('\n'+item+dataUnit[index]):''
                                    )).join('')
                                )
                            }
                        }
                    },
                    grid:{
                        left:'center',
                        width:'95%'
                    },
                    tooltip:{
                        show:false
                    },
                    xAxis:{
                        show:false
                    },
                    yAxis:{
                        show:false
                    }
                }
            });
        });
    }
    //MD-职级结构
    renderGraphNewBar2(){
        let {organizationType,startYear:startDate} = this.prevSendParams;
        let sfp = ['rate','num'];
        getDistrubiuition({organizationType,startDate},'mdDistrubiuition',sfp).then((res)=>{
            if(!res.rate){
                res.rate = [];
            }
            this.refs.graph_newbar2.refreshGraph({
                seriesData:[{data:res.num||[]}],
                visualMapColor:['#6febff','#6febff'],
                visualMap:true,
                yAxisData:{data:res.xAxisData},
                extraOption:{
                    series: [{
                        label:{
                            normal:{
                                formatter:(params)=>(
                                    params.value[0]+'人'+'\n'+res.rate[params.dataIndex]+'%'
                                )
                            }
                        },
                       }],

                    xAxis:{
                        scale:true
                    },
                    yAxis:{
                        axisLabel:{
                            color:'#fff'
                        }
                    },
                    grid:{
                        top:'10%',
                        bottom:'4%',
                        right:'7%'
                    }
                }
            });
        });
    }
    //专业资质结构
    renderGraphNewBar3(){
        let {organizationType,startYear:startDate} = this.prevSendParams;
        getDistrubiuition({organizationType,startDate},'proDistrubiuition').then((res)=>{
            this.refs.graph_newbar3.refreshGraph({
                seriesData:[{data:res.map((item)=>(item.pro_cert_num))}],
                visualMap:true,
                dataUnit:['人'],
                visualMapColor:['#6febff','#6febff'],
                yAxisData:{data:res.map((item)=>(item.pro_cert_name))},
                extraOption:{
                    series: [{
                        // label:{normal:{textStyle:{color:"#ffffff"}}},
                       }],
                    grid:{
                        top:'7.2%',
                        bottom:'4%',
                        right:0
                    },
                    yAxis:{
                        boundaryGap:false,
                        axisLabel:{
                                   color:'#fff'
                        }
                    }
                }
            });
        });
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

        getOrgOne({organizationType:this.organizationType}).then((res)=> {
            const commonControllers = _this.getControllers(res);
            //先渲染筛选组件
            _this.setState({commonControllers});
            _this.renderPage(commonControllers,true,false);
        });

    }

    renderPage = async(commonControllers,exceptGroupCode,flag) => {
        let sendParams = {};
        let _this = this;
        if (commonControllers) {
            if (flag) {
                this.refs.filterController.setSignControllerData('groupCode',['all']);
                sendParams = {...this.prevSendParams,groupCode:this.subOrgChild.join(',')};
            }else {
                let defaultControllerData = {};
                commonControllers.map(item=>{   //获取筛选条件默认参数集合
                    item.map(item_in=>{
                        if (item_in.defaultValue != undefined) {
                            defaultControllerData[item_in.name] = item_in.defaultValue;
                        }
                    })
                })
                sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
                sendParams.groupCode = sendParams.groupCode[0] === 'all'?this.subOrgChild.join(','):sendParams.groupCode.join(',');
            }
        }else{
            sendParams = this.prevSendParams;
        }
        this.prevSendParams = sendParams;
        //性别比例
        _this.renderGraphRingPie();
        _this.renderGraphNewBar1();
        //学历分布
        _this.renderGraphLinebars1();


        _this.renderGraphConnectedBars();
        //groupCode改变后不刷新的图
        if(exceptGroupCode){
            //top10
            _this.renderGraphScatter();
            //MD-职级结构
            _this.renderGraphNewBar2();
            //资质对比
            _this.renderGraphLinebars2();
            //专业资质结构
            _this.renderGraphNewBar3();
        }
    }


    onFilterChange(name,data){
        if(name==='groupCode'){
            this.prevSendParams[name] = data.join(',');
        }
        else {
            this.prevSendParams[name] = data;
        }
        this.renderPage(null,(name!=='groupCode'),false);
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
            onDataChange={this.onFilterChange.bind(this)}
        />;

        return (
            <div>

                <div className="conditional_filtering">
                    <PanelContainer
                        hasFilter={<div > <div className="pull-left">条件筛选</div> {filterContent} </div>}
                    >
                    </PanelContainer>
                </div>

                <PanelContainer title='关键图谱'>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <RingPie
                                ref = "graph_ringpie"
                                title="性别比例"
                                hasTip={()=>{return this.returnTipTable('04')}}
                            />

                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <NewBar
                                title='年龄分布'
                                ref="graph_newbar1"
                                hasTip={()=>{return this.returnTipTable('05')}}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <LinesBars
                                ref = "graph_linebars1"
                                title="学历分布"
                                hasTip={()=>{return this.returnTipTable('06')}}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <ConnectedBars
                                hasTip={()=>{return this.returnTipTable('07')}}
                                title='司龄-工龄'
                                ref="graph_connectedbars"
                                tooltipType="plain"
                                xAppendtoTip={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Scatter
                                hasTip={()=>{return this.returnTipTable('08')}}
                                title="Top10 部门人员占比"
                                ref="graph_scatter"
                                colorfulData={true}
                                valueInBubble={true}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='人员素质' className="dep_panel" >
                    <Tooltip placement="topRight"  title="人员素质不与具体部门筛选联动">
                        <i className="anticon anticon-info-circle dep_tooltop"></i>
                   </Tooltip>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div>
                        <NewBar
                            title='MD-职级结构'
                            ref="graph_newbar2"
                            hasTip={()=>{return this.returnTipTable('09')}}
                        />
                        </div>
                        <div>
                        <LinesBars
                            ref="graph_linebars2"
                            title="职业资质对比"
                            hasTip={()=>{return this.returnTipTable('11')}}
                        />
                        </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="dep_bar">
                        <NewBar
                            title="专业资质结构"
                            ref="graph_newbar3"
                            hasTip={()=>{return this.returnTipTable('10')}}
                        />
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Hrdep;
