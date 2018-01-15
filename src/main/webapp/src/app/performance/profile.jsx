import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,DatePicker} from 'antd';
import _ from 'underscore';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable,DQRankPicker,Tools} from 'app_common';
import {SymmetryBar,NewBar,ChartLine, IndexDotTable,TableModal} from 'app_component';
import {getPlacementPerson01,getOrgOne,getPlacementPerson02,getBenchmarking,getGroup} from '../../api';
const $ =  require('jquery');
import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

export default class Performanceprofile extends Component {

    constructor(props){
        super(props);
        this.radioDefaultValue = 'year';
        this.defaultDateList = [];                  //默认日期区间
        this.seletionLabel = '';                                                                           //组织select 当前label
        this.prveGetDevelopmentOverallParams = [];                                                         //上次请求接口的参数， 第一个接口
        this.DQRankPickerDeafult = {                                                                       //DQRankPicker 默认是值
            Y:{startDate:'',endDate:''},
            Q:{startDate:'',endDate:''},
        };


        this.subOrgChild = [];
        this.onDataChange = this.onDataChange.bind(this);
        this.onRangMonthChange = this.onRangMonthChange.bind(this);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.radioOnChangeType = this.radioOnChangeType.bind(this);
        this.QDSelectChange = this.QDSelectChange.bind(this);
        this.options = Tools.getYearOptions({date:this.props.date.create_date,size:9});
        this.commonControllers = {
            // start: {
            //     type: 'startMonth',
            //     name: 'startMonth',
            //     width: 4,
            //     label: '时间范围:',
            //     defaultValue:moment('2017-01', 'YYYY-MM')
            // },
            // end: {
            //     type: 'endMonth',
            //     name: 'endMonth',
            //     width: 3,
            //     label: '至',
            //     defaultValue:moment('2017-11', 'YYYY-MM')
            // },
            // deptype: {
            //     type: 'radioGroup',
            //     name: 'organizationType',
            //     width: 6,
            //     label: '部门类型:',
            //     className: 'timetype_width',
            //     placeholder: '请选择',
            //     radioOptions: [{
            //             label: '全部',
            //             value: '1'
            //         },{
            //             label: '总部',
            //             value: '2'
            //         }, {
            //             label: '分支机构',
            //             value: '3'
            //         }
            //     ],
            //     defaultValue:'2',
            //     onChangBtn:this.radioOnChange
            // },
            // timetype: {
            //     type: 'radioGroup',
            //     name: 'timetype',
            //     width: 7,
            //     label: '时间类型:',
            //     className: 'timetype_width',
            //     placeholder: '请选择',
            //     radioOptions: [{
            //             label: '年份',
            //             value: '1'
            //         },{
            //             label: '半年',
            //             value: '2'
            //         }, {
            //             label: '季度',
            //             value: '3'
            //         }, {
            //             label: '月份',
            //             value: '4'
            //         }
            //     ],
            //     defaultValue:'4',
            //     onChangBtn:this.radioOnChange
            // },
            branch: {
                type: 'select',
                name: 'groupCode',
                width: 24,
                label: '部门(机构)',
                className: 'ant-branch-left',
                placeholder: '请选择',
                //defaultValue:[],
                options:[],
                labelCol:'30%',
                wrapperCol:'66%',
            },
            startYear: {
                type: 'select',
                name: 'startYear',
                width: 12,
                label: '年份',
                options:this.options,
                defaultValue:'2012'
            },
            endYear: {
                type: 'select',
                name: 'endYear',
                width: 12,
                label: '至',
                options:this.options,
                defaultValue:'2017'
            },
        };
        this.state = {
            commonControllers:[],
            commonControllers02:[],
            commonControllers04:[
                [
                    {...this.commonControllers.startYear,labelCol:'21%',wrapperCol:'77%'},
                    {...this.commonControllers.endYear,labelCol:'15%',wrapperCol:'78%'}
                ]
            ],
            echartDateList:[],
            echartPriceList:[],
            allTableData:{
                stock_fund_trading:[],
                stock_trading:[],
                fund_trading:[],
                margin_trading:[]
            },
            klineLoading:true,
            dateType:'M',
            organizationType:'2'
        };
        this.prevSendParams = {
            organizationType : '2',
            year:'2017',
            dateType:'M',
        };
    }

    radioOnChange(e){
        let _this = this;
        this.prevSendParams.organizationType = e.target.value;
        getOrgOne({organizationType:this.prevSendParams.organizationType}).then((res)=> {
            //console.log(res);
            let commonControllers = _this.getControllers(res);
            //console.log(commonControllers);
            _this.setState({commonControllers02:commonControllers});
            let groupCode = _this.commonControllers.branch.defaultValue;
            _this.refs.filterController02.setControllerData({groupCode});
            _this.prevSendParams.groupCode = groupCode[0] === 'all'?this.subOrgChild.join(','):groupCode.join(',');;
            _this.renderGraphSymmetrybar2();
        });
        this.renderGraphSymmetrybar1();
        this.renderBars();
    }

    radioOnChangeType(e){
        let _this = this;
        //console.log(e.target.value);
        this.prevSendParams.dateType = e.target.value;
        this.setState({
            dateType:e.target.value
        },()=>{
            _this.onRangMonthChange(_this.DQRankPickerDeafult[_this.state.dateType]);
        });
    }

    getControllers(data){
        let _this = this;
        data = this.prevSendParams.organizationType ==='1'?{all:{subOrg:[...data.headquarters.subOrg,...data.organization.subOrg],org_name:'全部'}}:data;
        if(data){
            let groupCode = [];
            let groupOptions = [];
            _.map(data,function(item,key) {
                groupCode = [item.subOrg[0].org_code];
                // return {
                //     label:item.org_name,
                //     value:key,
                //     key,
                //     children:item.subOrg.map((subitem)=>{
                //         _this.subOrgChild.push(item.org_code);
                //         return {
                //             label:subitem.org_name,
                //             value:subitem.org_code,
                //             key:subitem.org_code
                //         }
                //     })
                // };
                //return{
                    _this.commonControllers.branch.options = item.subOrg.map((subitem)=>{
                        //_this.subOrgChild.push(item.org_code);
                        //console.log(subitem);
                        return {
                            label:subitem.org_name,
                            value:subitem.org_code,
                            //key:subitem.org_code
                        }
                    });
                //};
            });
            //console.log();
            this.commonControllers.branch.defaultValue = groupCode;
        }

        let commonControllers = this.commonControllers;
        // let controllers = [
        //     [
        //         {...commonControllers.deptype,labelCol:'25%',wrapperCol:'75%'},
        //         {...commonControllers.timetype,labelCol:'22%',wrapperCol:'78%'},
        //         {...commonControllers.start,labelCol:'38%',wrapperCol:'62%'},
        //         {...commonControllers.end,labelCol:'10%',wrapperCol:'90%'}
        //     ]
        // ];
        let controllers02 = [
            [{...commonControllers.branch}]
        ];
        // return [controllers,controllers02];
        return controllers02;
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

        _.map(this.options,(v,k)=>{
            this.defaultDateList.push(v.value);
        })


        this.DQRankPickerDeafult = {
            Y:{
                startDate:this.defaultDateList[this.defaultDateList.length-1],
                endDate:this.defaultDateList[0]
            },
            Q:{
                startDate:this.defaultDateList[this.defaultDateList.length-1] + '1',
                endDate:this.defaultDateList[0] + '4'
            },
            H:{
                startDate:this.defaultDateList[this.defaultDateList.length-1] + '1',
                endDate:this.defaultDateList[0] + '2'
            },
            M:{
                startDate:Tools.getStartDefaultDate({
                    formart:'YYYY-MM',
                    addType:'months',
                    addVal:-12
                }),
                endDate:Tools.getStartDefaultDate({
                    formart:'YYYY-MM',
                })
            },
        };
        this.setState({});
        //console.log(this.DQRankPickerDeafult);
        //
        this.prevSendParams = {...this.prevSendParams,...this.DQRankPickerDeafult[this.state.dateType]};
        //console.log(this.prevSendParams);

        getOrgOne({organizationType:this.prevSendParams.organizationType}).then((res)=>{
            const commonControllers = _this.getControllers(res);
            _this.setState({
        //        commonControllers:commonControllers[0],
                commonControllers02:commonControllers
            });
            console.log(commonControllers);
            _this.renderPage(commonControllers
                // .concat(commonControllers[1]
                .concat(this.state.commonControllers04));
        });
    }

    onDataChange(name,data){
        //console.log(name,data);
        //const groupCode = data[0] === 'all'?this.subOrgChild.join(','):data.join(',');
        const groupCode = data;
        this.prevSendParams = {...this.prevSendParams,[name]:groupCode};
        this.renderGraphSymmetrybar2();
    }

    renderPage(commonControllers){
        //console.log(commonControllers);
        let sendParams = {};
        if (commonControllers) {
            let defaultControllerData = {};
            commonControllers.map(item=>{   //获取筛选条件默认参数集合
            //    console.log("item");
            //    console.log(item);
                item.map(item_in=>{
                    if (item_in.defaultValue != undefined) {
                        defaultControllerData[item_in.name] = item_in.defaultValue;
                    }
                })
            })
            console.log(defaultControllerData);
            //sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
            this.refs.filterController02.setControllerData(defaultControllerData);
            this.refs.filterController04.setControllerData(defaultControllerData);
            sendParams = defaultControllerData;
            sendParams.groupCode = sendParams.groupCode[0] === 'all'?this.subOrgChild.join(','):sendParams.groupCode.join(',');
            //sendParams.year = this.prevSendParams.year;

            sendParams = $.extend(true,sendParams,this.prevSendParams);
            // sendParams = {
            //     sendParams,
            //     ...this.DQRankPickerDeafult[this.state.dateType]
            // }
        }else{
            sendParams = this.prevSendParams;
        }
        //console.log("sendParams");
        //console.log(sendParams);
        this.prevSendParams = sendParams;
        this.renderGraphSymmetrybar1();
        this.renderGraphSymmetrybar2();
        this.renderBenchmarking();
        this.renderBars();
    }

    renderGraphSymmetrybar2 = async()=>{
        let sendParams = this.prevSendParams;
        let {startDate,endDate,groupCode,dateType} = sendParams;
        //console.log(groupCode);
        //console.log("groupCode");
        const data = await getPlacementPerson02({startDate,endDate,groupCode,dateType});
        let leaveNum = [];
        let leaveRate = [];
        let growthRate = [];
        let growthNum = _.map(data.seriesData,(item)=>{
            growthRate.push(item.growth_rate);
            leaveNum.push(item.leave_num);
            leaveRate.push(item.leave_rate);
            return item.growth_num;
        });
        this.refs.graph_symmetrybar2.refreshGraph({
            positiveSeriesData:{
                name:'人员新增',
                data:growthNum
            },
            negativeSeriesData:{
                name:'人员减少',
                data:leaveNum
            },
            axisData:{
                data:data.xAxisData
            },
            extraOption:{
                tooltip:{
                    formatter:(params)=>{
                        if(params.seriesIndex===2){
                            return params.name+'<br />'
                            +'人员增加:'+growthNum[params.dataIndex]+'人'+'<br />'
                            +'占比:'+growthRate[params.dataIndex]+'%';
                        }
                        else if (params.seriesIndex===3) {
                            return params.name+'<br />'
                            +'人员减少:'+leaveNum[params.dataIndex]+'人'+'<br />'
                            +'占比:'+leaveRate[params.dataIndex]+'%';
                        }
                    }
                }
            }
        });
    }

    renderGraphSymmetrybar1 = async()=>{
        let sendParams = this.prevSendParams;
        //console.log("renderGraphSymmetrybar1");
        //console.log(sendParams);
        let {startDate,endDate,organizationType,dateType} = sendParams;
        const data01 = await getPlacementPerson01({startDate,endDate,organizationType,dateType});
        let leaveNum = [];
        let leaveRate = [];
        let growthRate = [];
        let growthNum = _.map(data01.seriesData,(item)=>{
            growthRate.push(item.growth_rate);
            leaveNum.push(item.leave_num);
            leaveRate.push(item.leave_rate);
            return item.growth_num;
        });
        this.refs.graph_symmetrybar1.refreshGraph({

            positiveSeriesData:{
                name:'人员新增',
                data:growthNum
            },
            negativeSeriesData:{
                name:'人员减少',
                data:leaveNum
            },
            axisData:{
                data:data01.xAxisData
            },
            extraOption:{
                tooltip:{
                    formatter:(params)=>{
                        if(params.seriesIndex===2){
                            return params.name+'<br />'
                            +'人员增加:'+growthNum[params.dataIndex]+'人'+'<br />'
                            +'占比:'+growthRate[params.dataIndex]+'%';
                        }
                        else if (params.seriesIndex===3) {
                            return params.name+'<br />'
                            +'人员减少:'+leaveNum[params.dataIndex]+'人'+'<br />'
                            +'占比:'+leaveRate[params.dataIndex]+'%';
                        }
                    }
                }
            }
        });
    }

    renderBenchmarking = async()=>{
        let {startYear:startDate,endYear:endDate} = this.prevSendParams;
        const data = await getBenchmarking({startDate,endDate});
        this.refs.graph_chartline1.refreshGraph({
            seriesData:[{
                name:'财通',
                data:_.map(data.seriesData,(item)=>(item['1_growth_rate'])),
            },{
                name:'协会',
                data:_.map(data.seriesData,(item)=>(item['0_growth_rate'])),
            }],
            xAxisData:{data:data.xAxisData},
            extraOption:{
                tooltip:{
                    trigger:'item',
                    formatter:'{b}<br />{a}:{c}%'
                },
                color:['#00eeff','#ffff71'],
                legend:{
                    show:true,
                    left:'center',
                    top:'10',
                    inactiveColor: '#92aae0',
                },
                xAxis:{

                    axisLine:{
                        lineStyle:{
                            color:'#88aede'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#fff',
                      }
                    }
                },
                yAxis:{
                    splitLine : {
                      show:true,
                      lineStyle: {
                          color: '#5972a1',

                      }
                    },
                    axisLabel:{
                        show:false
                    }
                },
                grid:{
                    top:'16%'
                }
            }
        });
        this.refs.graph_chartline2.refreshGraph({
            seriesData:[{
                name:'财通',
                data:_.map(data.seriesData,(item)=>(item['1_leave_rate'])),
            },{
                name:'协会',
                data:_.map(data.seriesData,(item)=>(item['0_leave_rate'])),
            }],
            xAxisData:{data:data.xAxisData},
            extraOption:{
                tooltip:{
                    trigger:'item',
                    formatter:'{b}<br />{a}:{c}%'
                },
                color:['#00eeff','#ffff71'],
                legend:{
                    show:true,
                    left:'center',
                    top:'10',
                    inactiveColor: '#92aae0',
                },
                xAxis:{

                    axisLine:{
                        lineStyle:{
                            color:'#88aede'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#fff',
                      }
                    }
                },
                yAxis:{
                    axisLabel:{
                      textStyle: {
                      color: '#93c2e2',
                      }
                  },
                    splitLine : {
                      show:true,

                      lineStyle: {
                          color: '#5972a1',

                      }
                    },

                },
                grid:{
                    top:'16%'
                }
            }
        });
    }

    renderBars = async()=>{
        let {organizationType,year:endDate} = this.prevSendParams;
        const data = await getGroup({endDate,organizationType});
        let rate1 = [];
        let name1 = [];
        let num1 = _.map(data['+'],(item)=>{
            rate1.push(item.growth_rate);
            name1.push(item.name);
            return item.growth_num;
        });
        this.refs.graph_newbar1.refreshGraph({
            visualMapColor:['#00eeff','#00eeff'],
            extraOption:{
                grid:{
                    top:'5%',
                    bottom:'0%',
                    right:'8%'
                },
                tooltip:{
                    show:true,
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:(params)=>(
                        params[0].name+'<br />'
                        +'新增:'+params[0].value[0]+'人'
                        +'<br />占比:'+rate1[params[0].dataIndex]+'%'
                    )
                },
                yAxis:{
                    axisLabel:{
                        textStyle: {
                     color: '#fff',
                     }
                    }
                }
            },
            seriesData:[{data:num1}],
            yAxisData:{data:_.map(data['+'],(item)=>(item.name))},
            visualMap:true
        });
        let name2 = [];
        let rate2 = [];
        let num2 = _.map(data['-'],(item)=>{
            rate2.push(item.growth_rate);
            name2.push(item.name);
            return item.growth_num;
        });
        this.refs.graph_newbar2.refreshGraph({
            visualMapColor:['#00eeff','#00eeff'],
            extraOption:{
                grid:{
                    top:'5%',
                    bottom:'0%',
                    right:'10%'
                },
                tooltip:{
                    show:true,
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:(params)=>(
                        params[0].name+'<br />'
                        +'减少:'+params[0].value[0]+'人'
                        +'<br />占比:'+rate2[params[0].dataIndex]+'%'
                    )
                },
                yAxis:{
                    axisLabel:{
                        textStyle: {
                     color: '#fff',
                     }
                    }
                }
            },
            seriesData:[{data:num2}],
            yAxisData:{data:name2},
            visualMap:true
        });
    };

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    onRangMonthChange(obj){
        this.prevSendParams = {...this.prevSendParams,...obj};
        this.renderGraphSymmetrybar1();
        this.renderGraphSymmetrybar2();
    }

    onFilterChange(name,data){
        let controller = this.state.commonControllers04[0].slice();
        if(name==='startYear'){
            let options = this.options.map((item)=>(
                {
                    ...item,
                    disabled:(item.value)<data
                }
            ));
            controller[1].options = options;
            this.setState({commonControllers04:[controller]});
        }
        else if (name==='endYear') {
            let options = this.options.map((item)=>(
                {
                    ...item,
                    disabled:(item.value)>data
                }
            ));
            controller[0].options = options;
            this.setState({commonControllers04:[controller]});
        }
        this.prevSendParams[name] = data;
        this.renderBenchmarking();
    }

    onYearChange(year){
        this.prevSendParams.year = year;
        this.renderBars();
    }

    QDSelectChange(arg){

        const key = Object.keys(arg)[0];
        if (this.state.dateType === 'Q' || this.state.dateType === 'H' ) {
            arg = {[key]:arg[key].join('')}
        }
        if (this.state.dateType === 'M'){
            arg = {[key]:arg[key].format('YYYYMM')}
        }
        //console.log("arg");
        //console.log(arg);
        //this.prevSendParams = {...this.prevSendParams,...arg};
        //this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);
        this.onRangMonthChange(arg);
    }

    render() {
        const filterContent = <FilterController
            ref='filterController'
            onRangMonthChange={this.onRangMonthChange}
            controllers={this.state.commonControllers}
        />;
        console.log(this.DQRankPickerDeafult);
        return (
            <div>
                {/* <div className="conditional_filtering">
                    <PanelContainer
                        hasFilter={<div > <div className="pull-left">筛选条件</div> {filterContent} </div>}
                        >
                    </PanelContainer>
                </div> */}

                <div className="conditional_filtering">
                    <PanelContainer

                        hasFilter = {
                            <div>
                                <div className="pull-left">筛选条件</div>
                                <div className="train-filter-con">
                                    <div className="train-filter-con train_padding " style={{paddingLeft:0}}>部门类型：</div>
                                    <RadioGroup onChange={this.radioOnChange} defaultValue={this.state.organizationType} size='large' className='train_width'>
                                        <RadioButton value="1">全部</RadioButton>
                                        <RadioButton value="2">总部</RadioButton>
                                        <RadioButton value="3">分支机构</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className="train-filter-con">
                                    <div className="train-filter-con train_padding">时间类型：</div>
                                    <RadioGroup onChange={this.radioOnChangeType} defaultValue={this.state.dateType} size='large' className='train_width'>
                                        <RadioButton value="Y">年</RadioButton>
                                        <RadioButton value="H">半年</RadioButton>
                                        <RadioButton value="Q">季度</RadioButton>
                                        <RadioButton value="M">月份</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className="train-filter-con train_date">
                                    <div className="train-filter-con train_padding">时间范围：</div>
                                    <DQRankPicker
                                        className="train-filter-con"
                                        dateList={this.defaultDateList}
                                        placeholder="请选择"
                                        defaultValue={this.DQRankPickerDeafult[this.state.dateType]}
                                        selectType={this.state.dateType}
                                        QDSelectChange={this.QDSelectChange}
                                    />
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        }
                    >
                        </PanelContainer>
                </div>

                <PanelContainer title='人员变动趋势'>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard title="整体人员流动趋势" hasTip={()=>{return this.returnTipTable('23')}}>
                                <SymmetryBar
                                    ref="graph_symmetrybar1"

                                    extraOption={{
                                        color:['#6febff','#f5d862'],
                                        xAxis:{
                                            axisLine:{
                                                lineStyle:{
                                                    color:'#88aede'
                                                }
                                            },
                                        axisLabel:{
                                          textStyle: {
                                          color: '#80c5e1',
                                          }
                                        }
                                    },
                                    legend:{
                                        show:true,
                                        left:'center',
                                        inactiveColor: '#92aae0',
                                        orient: 'horizontal',
                                        itemWidth:12,
                                        itemHeight:8,
                                        top:'3.1%',
                                        textStyle:{
                                            color:'#fff',

                                        },

                                    },
                                    // tooltip:{
                                    //     trigger: 'axis',
                                    //     backgroundColor:'rgba(50,50,50,0.7)',
                                    //
                                    //     show:true,
                                    //     },
                                    grid:{
                                        top:'10%',
                                        left:'4%',
                                        right:'4%'
                                    }
                                    }}
                                />
                            </JfCard>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard title="部门人员流动现状" hasTip={()=>{return this.returnTipTable('24')}}>
                                <div className="personas_export">
                                    <div className="profile_DatePicker profile_select_yj">
                                    <FilterController ref='filterController02'
                                        controllers={this.state.commonControllers02}
                                        onDataChange={this.onDataChange}
                                    />
                                    </div>
                                    <SymmetryBar
                                        ref="graph_symmetrybar2"
                                        extraOption={{
                                            color:['#6febff','#f5d862'],
                                            xAxis:{
                                                axisLine:{
                                                    lineStyle:{
                                                        color:'#88aede'
                                                    }
                                                },
                                            axisLabel:{
                                              textStyle: {
                                              color: '#80c5e1',
                                              }
                                            }
                                        },
                                        // tooltip:{
                                        //     trigger: 'axis',
                                        //     backgroundColor:'rgba(50,50,50,0.7)',
                                        //
                                        //     show:true,
                                        //     },
                                        legend:{
                                            show:true,
                                            left:'center',
                                            inactiveColor: '#92aae0',
                                            orient: 'horizontal',
                                            itemWidth:12,
                                            itemHeight:8,
                                            top:'3.1%',
                                            textStyle:{
                                                color:'#fff',

                                            },

                                        },
                                        grid:{
                                            top:'10%',
                                            left:'4%',
                                            right:'4%'
                                        }
                                        }}
                                    />
                                </div>
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>
                <PanelContainer title='部门流动TOP5'>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <JfCard title="部门新增及减少" className="profile_flow" hasTip={()=>{return this.returnTipTable('25')}}>
                                <div className="personas_export">
                                    <div className="profile_DatePicker">年份 &nbsp;
                                        <Select defaultValue={this.prevSendParams.year} onChange={this.onYearChange.bind(this)}>
                                            {/* <Option value="2018">2018</Option>
                                            <Option value="2017">2017</Option>
                                            <Option value="2016">2016</Option>
                                            <Option value="2015">2015</Option>
                                            <Option value="2014">2014</Option>
                                            <Option value="2013">2013</Option>
                                            <Option value="2012">2012</Option> */}
                                            {_.map(this.options,(v,k)=>{
                                                return (<Option key={k} value={v.value}>{v.label}</Option>)
                                            })}
                                      </Select>
                                    </div>
                                </div>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="profile_flow_first">
                                    <NewBar
                                    ref="graph_newbar1"
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <NewBar
                                    ref="graph_newbar2"
                                    />
                                </Col>
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className="profile_name">
                    <PanelContainer title='协会对标'
                    hasFilter = {
                        <div>
                            <div className="pull-left train_lineheight">筛选条件</div>
                            <div className=" pull-left ">
                                <div className="personas_export">
                                    <div className=" profile_select_data">
                                        <FilterController ref='filterController04'
                                        controllers={this.state.commonControllers04}
                                        onDataChange={this.onFilterChange.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    }
                        >
                        <Row gutter={8}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                <JfCard  className="profile_xhdb ">
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="profile_flow_first">
                                        <ChartLine title="人员增长率"
                                            hasTip={()=>{return this.returnTipTable('26')}}
                                            ref="graph_chartline1"
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <ChartLine title="人员离职率"
                                            hasTip={()=>{return this.returnTipTable('27')}}
                                            ref="graph_chartline2"
                                        />
                                    </Col>
                                </JfCard>
                            </Col>
                        </Row>
                    </PanelContainer>
                </div>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Performanceprofile;
