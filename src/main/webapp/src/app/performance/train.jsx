import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,TreeSelect,Select} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import _ from 'underscore';
import {PanelContainer,FilterController,JfCard,TipTable,DQRankPicker,Tools} from 'app_common';
import {ConnectedLines,KlineIndex,ChartLine, NewBar as Bar,WaterfallBar} from 'app_component';
import {getOrgOne,getDevelopmentOverall,getDevelopmentGroup} from '../../api';
import 'app_css/app/hr/index.css';
require('es6-promise').polyfill();

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const Option = Select.Option;

export default class Performancetrain extends Component {

    constructor(props){
        super(props);

        this.radioDefaultValue = 'Y';
        this.defaultDateList = [];
        this.options = Tools.getYearOptions({date:this.props.date.create_date,size:8});               //默认日期区间
        this.seletionLabel = '';                                                                           //组织select 当前label
        this.prveGetDevelopmentOverallParams = [];                                                         //上次请求接口的参数， 第一个接口
        this.DQRankPickerDeafult = {                                                                       //DQRankPicker 默认是值
            Y:{startDate:'',endDate:''},
            Q:{startDate:'',endDate:''},
        }

        this.radioOnChange = this.radioOnChange.bind(this);
        this.radioOnChangeType = this.radioOnChangeType.bind(this);
        this.orgSelectChange = this.orgSelectChange.bind(this);
        this.dateSelectChange = this.dateSelectChange.bind(this);
        this.QDSelectChange = this.QDSelectChange.bind(this);
        this.organizationList = {},
        this.state = {
            treeSelectData:[],                                            //机构数据 -- treeselect
            selectType:'Y',                                        //组件状态   年或者季度
            orgSelectValue:{key:'',label:''},                             //组织select value
            dateSelectValue:Tools.getStartDefaultDate({
                date:this.props.date.create_date,
                formart:'YYYY',
            }).year()+'',
            organizationType:'2',                                       //年份select value
        }
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
        }
        //console.log(this.DQRankPickerDeafult);

        const orgRes = await getOrgOne({organizationType:'1'});
        //orgRes.headquarters.subOrg.unshift({org_code: "", org_name: "财通"});
        //orgRes.organization.subOrg.unshift({org_code: "", org_name: "财通"});
        this.organizationList = orgRes;

        // const orgDefaultCode = orgRes.headquarters.subOrg[0].org_code;
        // this.seletionLabel = orgRes.headquarters.subOrg[0].org_name;
        this.getShowOrganizationList(this.state.organizationType);


        //console.log(orgRes.headquarters.subOrg);
        this.setState({
            //treeSelectData:orgRes.headquarters.subOrg,
            //orgSelectValue:{key:orgDefaultCode,label:this.seletionLabel},
            //dateSelectValue:'2016'
        })

        this.prveGetDevelopmentOverallParams = {
            dateType:this.radioDefaultValue,
            groupCode:'',
            ...this.DQRankPickerDeafult[this.radioDefaultValue]
        }
        this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);

        const params_2 = {
            // endDate:this.defaultDateList[this.defaultDateList.length-1]
            endDate:2016
        }
        this.getDevelopmentGroupFn(params_2);
    }

    getDevelopmentOverallFn(arg){
        getDevelopmentOverall(arg,['0_study_hour_avg','study_hour_avg','plan_finish_rate']).then(res=>{
            // 0_study_hour_avg   协会人均学时
            // study_hour_avg     企业人均学时
            // plan_finish_rate   计划完成率
            //计划完成率
            this.renderPlanCompletionRate(res.plan_finish_rate,res.xAxisData);
            //人均学时
            this.renderGraphChartline2(res['0_study_hour_avg'],this.seletionLabel,res['study_hour_avg'],res.xAxisData);
        });
    }

    getDevelopmentGroupFn(arg){
        getDevelopmentGroup(arg).then(res=>{
            const {x:x1,v:v1} = this.returnFormatData(res['01_+']);
            this.renderGraphBar('1',v1,x1);
            const {x:x2,v:v2} = this.returnFormatData(res['01_-']);
            this.renderGraphBar('2',v2,x2);

            const {x:x3,v:v3} = this.returnFormatData(res['02_+']);
            this.renderGraphWaterfallbar('1',v3,x3);
            const {x:x4,v:v4} = this.returnFormatData(res['02_-']);
            this.renderGraphWaterfallbar('2',v4,x4);
        })
    }

    returnFormatData(data){
        let x = [];
        let v = [];
        data.map(k=>{
            x.push(k.org_name);
            v.push(k.plan_finish_rate || k.study_hour_avg);
        })
        return {x,v}
    }

    getShowOrganizationList(organizationType){
        let dataList = [];
        switch (organizationType) {
            case '1':
                //dataList = [...this.organizationList.headquarters.subOrg,...this.organizationList.organization.subOrg];
                _.map(this.organizationList.headquarters.subOrg,(v,k)=>{
                    if( v.org_code != '' ){
                        dataList.push(v);
                    }
                });
                _.map(this.organizationList.organization.subOrg,(v,k)=>{
                    if( v.org_code != '' ){
                        dataList.push(v);
                    }
                });
                break;
            case '2':
                dataList = this.organizationList.headquarters.subOrg;
                break;
            case '3':
                dataList = this.organizationList.organization.subOrg;

                break;
            default:

        }
        if( dataList[0].org_code != '' ){
            dataList.unshift({org_code: "", org_name: "财通"});
        }

        const orgDefaultCode = dataList[0].org_code;
        this.seletionLabel = dataList[0].org_name;
        //console.log(dataList);
        this.setState({
            treeSelectData:dataList,
            orgSelectValue:{key:orgDefaultCode,label:this.seletionLabel},
        });
    }

    radioOnChange(e){
        this.prveGetDevelopmentOverallParams = {...this.prveGetDevelopmentOverallParams,organizationType:e.target.value};
        this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);
        this.getShowOrganizationList(e.target.value);
        // this.setState({
        //     selectType:e.target.value
        // })
    }

    radioOnChangeType(e){
        this.prveGetDevelopmentOverallParams = {...this.prveGetDevelopmentOverallParams,dateType:e.target.value,...this.DQRankPickerDeafult[e.target.value]};
        this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);
        this.setState({
            selectType:e.target.value
        })
    }

    orgSelectChange(value){
        this.seletionLabel = value.label;
        this.prveGetDevelopmentOverallParams = {...this.prveGetDevelopmentOverallParams,groupCode:value.key};
        this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);
        this.setState({
            orgSelectValue:value
        })
    }

    dateSelectChange(value){
        this.getDevelopmentGroupFn({endDate:value});
        this.setState({
            dateSelectValue:value
        })
    }

    QDSelectChange(arg){
        const key = Object.keys(arg)[0];
        if (this.state.selectType === 'Q') {
            arg = {[key]:arg[key].join('')}
        }
        this.prveGetDevelopmentOverallParams = {...this.prveGetDevelopmentOverallParams,...arg};
        this.getDevelopmentOverallFn(this.prveGetDevelopmentOverallParams);
    }

    //计划完成率
    renderPlanCompletionRate(a,x){
        const seriesData = [{name:'计划完成率',data:a}];
        const dataUnit = ['%'];
        const xAxisData = {name:'',data:x};

        const extraOption={
            yAxis:{
                show:false,
                scale:true
            },
            xAxis:{
                axisLabel:{
                    textStyle: {
                        color: '#fff',
                    },
                    rotate:30,
                    interval:0
                },
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                },
            }
        };
        this.refs.graph_chartline1.refreshGraph({seriesData,dataUnit,xAxisData,extraOption});
    }

    //人均学时
    renderGraphChartline2(a,b,c,x){
        const seriesData = [
            {name:'协会',data:a},
            {name:b,data:c},
        ];
        const dataUnit = ['%','%'];
        const xAxisData = {name:'',data:x};

        const extraOption={
                color:['#95e8ff',  '#faffa9'],
                yAxis:{
                    show:false,
                    scale:true
                },
                xAxis:{
                    axisLabel:{
                        textStyle: {
                            color: '#fff',
                        },
                        rotate:30,
                        interval:0
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#88aede'
                        },
                    },
                },
                legend:{
                    show:true,
                    top:'5.1%',
                    left:'center',
                    inactiveColor: '#92aae0',
                }
            };

        this.refs.graph_chartline2.refreshGraph({seriesData,dataUnit,xAxisData,extraOption});
    }

    //部门计划完成率
    renderGraphBar(a,b,x){
        const seriesData = [{name:'计划完成率',data:b}];
        const dataUnit = ['%'];
        const xAxisData = {data:x};
        const extraOption = {

            title:{
                text:a === '1'?'排名靠前5个部门':'排名靠后5个部门',
                left:'center',
                bottom:'2%',
                textStyle:{
                    'fontSize':12,
                    'color':'#c4d3ff',
                }
            },
            grid:{
                top:'9%',
                bottom:'23%',
                right:'2%'
            },
            legend:{
                show:false,
            },
            color:a === '1'?['#fefe97','#ffffe9']:undefined,
            tooltip:{
                show:true,
                backgroundColor:'rgba(50,50,50,0.7)'
            },
            yAxis:{
                show:false,
                max:100
            },
            xAxis:{

                    axisLabel:{
                        rotate:30,
                        textStyle: {
                        color: '#fff',
                        fontWeight:'100'
                    }
                    },

                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    },

                },

            },
            series:[ { barCategoryGap:'60%' } ],
        }
        this.refs[`graph_bar${a}`].refreshGraph({seriesData,dataUnit,xAxisData,extraOption});
    }

    //部门人均学时
    renderGraphWaterfallbar(a,b,x){
        const extraOptions =  {
            grid:{
                top:'9%',
                left:'11%',
                bottom:'23%'
            },
            xAxis:{
                axisLabel:{
                    rotate:30,
                    textStyle: {
                    color: '#fff',
                    fontWeight:'100'
                }
                },
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                }
            },
            yAxis:{
                show:false
            },
            legend:{
                show:false,
                data:['部门人均学时']
            },
            title:{
                text:a==='1'?'排名靠前5个部门':'排名靠后5个部门',
                left:'center',
                bottom:'2%',
                textStyle:{
                    'fontSize':12,
                    'color':a==='1'?'#c4d3ff':'#c4d3ff',
                }
            },
            series:[
                {barCategoryGap:'40%'},

                {
                    itemStyle:{
                    normal:{
                        color:a==='1'?'#fefe91':'#00d5fa',
                    }
                },
                    label:{
                        normal:{
                            show:true,
                            position:'top'
                        }
                    }
                }
            ]
        };
        const totalSeriseData = {
            name:"",
            position:'last',
            show:false
        };
        const viewType = "down";
        const dataUnit = ['%'];
        const xAxisData = {name:'日期',data:x};
        const seriesData = {
            name:"部门人均学时",
            data:b,
        };

        this.refs[`graph_waterfallbar${a}`].refreshGraph({dataUnit,seriesData,totalSeriseData,xAxisData,viewType,extraOptions});
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render() {
        return (
            <div>
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
                                <div className="train-filter-con train_padding">
                                    一级部门：
                                    <Select
                                        onChange={e=>{this.orgSelectChange(e)}}
                                        style={{width:100}}
                                        placeholder='请选择部门'
                                        labelInValue
                                        value={this.state.orgSelectValue}
                                    >
                                        {this.state.treeSelectData.map((item,k)=>{
                                            return <Option key={item.org_code} value={item.org_code}>{item.org_name}</Option>
                                        })}
                                    </Select>
                                </div>
                                <div className="train-filter-con">
                                    <div className="train-filter-con train_padding">时间类型：</div>
                                    <RadioGroup onChange={this.radioOnChangeType} defaultValue={this.state.selectType} size='large' className='train_width'>
                                        <RadioButton value="Y">年</RadioButton>
                                        <RadioButton value="Q">季度</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className="train-filter-con train_date">
                                    <div className="train-filter-con train_padding">时间范围：</div>
                                    <DQRankPicker
                                        className="train-filter-con"
                                        dateList={this.defaultDateList}
                                        placeholder="请选择"
                                        defaultValue={this.DQRankPickerDeafult[this.state.selectType]}
                                        selectType={this.state.selectType}
                                        QDSelectChange={this.QDSelectChange}
                                    />
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        }
                    >
                        </PanelContainer>
                </div>

                    <PanelContainer title='整体培养情况'>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                                <ChartLine
                                    ref = "graph_chartline1"
                                    hasTip={()=>{return this.returnTipTable('28')}}
                                    title="计划完成率"
                                />
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <ChartLine
                                    ref = "graph_chartline2"
                                    title="人均学时"
                                    hasTip={()=>{return this.returnTipTable('29')}}
                                />
                            </Col>
                        </Row>
                    </PanelContainer>


                <PanelContainer
                    title='部门培养情况'
                    hasFilter = {
                        <div>
                            <div className="pull-left train_lineheight">筛选条件</div>
                        <div className=" pull-right ">
                            <div className="ant-col-lg-24 train_right_padding">
                                <div className="train_padding pull-left">时间范围：</div>
                                    <div className="pull-left">
                                    <Select
                                        onChange={e=>{this.dateSelectChange(e)}}
                                        style={{width:110}}
                                        value={this.state.dateSelectValue}
                                        placeholder='请选择年份'
                                    >
                                        {this.defaultDateList.map(year=>{
                                            return <Option key={year} value={year}>{year}年</Option>
                                        })}
                                    </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    }
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <JfCard title='部门计划完成率' hasTip={()=>{return this.returnTipTable('30')}}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                    <Bar
                                        ref='graph_bar1'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                    <Bar
                                        ref='graph_bar2'
                                    />
                                </Col>
                            </JfCard>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <JfCard title="部门人均学时"  hasTip={()=>{return this.returnTipTable('31')}}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <WaterfallBar
                                        ref = "graph_waterfallbar1"
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <WaterfallBar
                                        ref = "graph_waterfallbar2"
                                    />
                                </Col>
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Performancetrain;
