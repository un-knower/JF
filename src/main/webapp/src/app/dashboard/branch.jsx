import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card,Radio,Row,Col,Table,Modal, Button,Select,Tooltip,Slider} from 'antd';
import _ from 'underscore';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import {PanelContainer,JfCard,ButtonGroup,TipTable} from 'app_common';
import {RankLines,PolarBar,DbgridBar,SymmetryBar,ChartLine} from 'app_component';
import {Link} from 'react-router-dom';
import 'app_css/app/dashboard/index.css';
import {queryCategoryFilter,getBranchRank,queryBranchStatus,
    getBranchDevelopment,getBranchSubFilter,getBranchPerformance} from '../../api';
import CONSTANTS from 'app_constants';

const branch_sort_tags_zc = [
    {label:'资产总额',value:'asset'},
    {label:'交易金额',value:'amount'}
];
const branch_sort_tags_time = [
    {label:'按天',value:'D'},
    {label:'按年',value:'Y'}
];
export default class CockpitBranch extends Component {

    constructor(props){
        super(props);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.state={
            visible: false,
            branch_sort_tags: [],
            branchStatus:{
                ZX_category:{},
                A_category:{},
                B_category:{},
                C_category:{},
                D_category:{},
                E_category:{},
                F_category:{},
                X_category:{}
            },
            dateType_status:'D',
            devTableData:{},
            subFilter:[],
            performanceTableData:{
                trade_year:[],
                profit:[],
                profit_yoy:[],
                profit_index:[],
                profit_complete_rate:[],
                market_rate:[],
                market_rate_yoy:[],
                market_rate_complete_rate:[]
            },
            branchId:'2060',
            branchTypeName:'A类',
            rankLineTitle_branch:'A类',
            showSlider:true,
            dayMax:0,
            dayRange:[0,0],
            dayMarks:{},
            dataTypeName:'新增开户',
            asset_amount:'资产总额',
            dateString:''
        };
        this.dayRange = [0,0];
        this.dateType = 'D';
        this.dateType_lines = 'D';
        this.category_type_rank = 'A';
        this.category_type_dep = 'A'
        this.branchRankData = {};
        this.linesData = {};
        this.asset_amount = 'asset';
        //新增开户、资产总额、交易金额
        this.dep_data_type = 'open_cust_num';
        this.categoryNameMap = {};
        this.dataTypeNameMap = {
            open_cust_num:'新增开户',
            asset:'资产总额',
            amount:'交易金额'
        };
        this.polarbarData = {};
        this.developData04 = {};
    }

    componentDidMount(){


        queryCategoryFilter().then((res)=>{
            let branch_sort_tags = res.map((item)=>(
                {
                    label:item.category_desc,
                    value:item.category_id,
                    rank:item.category_rank,
                    id:item.category_id,
                    disabled:(['E','F'].indexOf(item.category_id)>=0)
                }
            ));
            res.map((item)=>{
                this.categoryNameMap[item.category_id] = item.category_desc;
            });
            this.getStatusData();
            branch_sort_tags.sort((a,b)=>(
                a.rank-b.rank
            ));
            this.setState({branch_sort_tags});
        });
        this.getRankLinesData();
        getBranchDevelopment({},'02').then((res)=>{
            this.polarbarData = {...res};
            this.renderPolarBar();
        });

        this.getLinesData();
        getBranchDevelopment({"startDate":"201701","endDate":"201710"},'03').then((res)=>{
            this.dbgridBarData = {...res.data};
            this.setState({dateString:res.date});
            this.renderDbgridBar();
        });
        getBranchDevelopment({},'04').then((res)=>{
            this.developData04 = {...res};
            this.renderDev04();
        });
        getBranchSubFilter().then((res)=>{
            this.setState({subFilter:res});
            if(res[0]){
                let branchId = this.state.branchId;
                this.setState({branchId});
                this.renderPerformance(branchId);
            }
        });
    }
    //机构现状
    getStatusData(){
        queryBranchStatus({
            "dateType":this.state.dateType_status,
            "endDate":"20171201"
        }).then((data)=>{
            let branchStatus = {
                ZX_category:{},
                A_category:{},
                B_category:{},
                C_category:{},
                D_category:{},
                E_category:{},
                F_category:{},
                X_category:{}
            };
            data.map((item)=>{
                branchStatus[item.category_id+'_category'] = {...item};
            });
            this.setState({branchStatus});
        });
    }

    getRankLinesData(){
        getBranchRank({
        	"dateType":this.dateType,
        	"startDate":"20171201",
        	"endDate":"20171209"
        }).then((res)=>{
            _.map(res,(item,key)=>{
                this.branchRankData[key] = {
                    seriesData:item.xAxisData.map((xItem)=>(
                        item.seriesData[xItem]?item.seriesData[xItem]:{amount:{},asset:{}}
                    )),
                    xAxisData:item.xAxisData
                };
            });
            this.renderRankLines(true);
        });
    }

    getLinesData(){
        getBranchDevelopment({"dateType":this.dateType_lines},'01').then((res)=>{
            _.map(res,(item,key)=>{
                this.linesData[key] = {
                    seriesData:item.xAxisData.map((xItem)=>(
                        item.seriesData[xItem]?item.seriesData[xItem]:{amount:{},asset:{}}
                    )),
                    xAxisData:item.xAxisData
                };
            });
            this.renderLines();
        });
    }

    renderLines(){
        let type = this.dep_data_type;
        // console.log(this.category_type_dep);
        const _unit = type === 'open_cust_num'?'人':'万';
        let seriesData = this.linesData[this.category_type_dep].seriesData;
        let lineData = _.map(seriesData[0],(item,key)=>{
            return {
                name:item.branch_name,
                data:seriesData.map((itemX)=>(
                    itemX[key][type]
                ))
            }
        });
        let xAxisData = this.linesData[this.category_type_dep].xAxisData;

        this.refs.graph_chartline.refreshGraph({

            seriesData:lineData,
            xAxisData:{data:xAxisData},
            showTopN:3,
            //dataUnit:['万元'],
            extraOption:{
                legend:{
                    show:true,
                    orient:'vertical',
                    type:'scroll',
                    left:'10',
                    top:8
                },
                grid:{
                    left:'23%',
                    right:'5%',
                    top:'5%',

                    containLabel:true
                },
                tooltip:{
                    trigger:'axis',
                    // formatter:'{b}<br />{a}:{c}'+_unit,
                    formatter:function(params){
                        console.log(params);
                        //let info = params[0].name + '<br/>';
                        let info = _.map(params,(v,k)=>{
                            return v.seriesName + ' : ' + v.value +_unit + '<br/>';
                        })
                        return params[0].name + '<br/>'+ info.join("");
                    },
                    textStyle:{
                        color:'#fff'
                    }
                },
                yAxis:{
                    show:true,
                    offset:0,
                    splitLine:{
                        lineStyle:{
                            type:'solid'
                        }
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel:{
                        color:'#fff'
                    }
                },
                xAxis:{
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#7d919e'
                      }
                    },
                }
            }
        });
    }
    //排名图
    renderRankLines(resetDayRange){
        let xAxisData = this.branchRankData[this.category_type_rank].xAxisData;
        if(resetDayRange){
            let dayMarks = {};
            for(let key in xAxisData){
                dayMarks[key] =xAxisData[key];
            }
            this.setState({
                dayMax:xAxisData.length-1,
                dayRange:[0,xAxisData.length-1],
                dayMarks
            });
            this.dayRange = [0,xAxisData.length-1];
        }
        xAxisData = xAxisData.slice(this.dayRange[0],this.dayRange[1]+1);
        let asset_amount = this.asset_amount;
        let rankSeriesData = this.branchRankData[this.category_type_rank].seriesData
        .slice(this.dayRange[0],this.dayRange[1]+1);
        let lineData = _.map(rankSeriesData[0][asset_amount],(item,key)=>{
            return {
                name:item.branchName,
                data:rankSeriesData.map((itemX)=>(
                    itemX[asset_amount][key][asset_amount+'Rank']
                ))
            }
        });
        this.refs.graph_ranklines.refreshGraph({
            lineData,
            xAxisData:(this.dateType==='Y')?xAxisData:xAxisData.map((item)=>(
                moment(item,'YYYYMMDD').format('YYYY-MM-DD')
            )),
            timeType:this.dateType
        });
    }

    renderPolarBar(){
        let seriesData = {
            common_cust_num:[],
            potential_cust_num:[],
            core_cust_num:[],
            vip_cust_num:[],
            vip_platina_cust_num:[],
            vip_diamond_cust_num:[],
            vip_super_diamond_cust_num:[]
        };
        this.polarbarData.xAxisData.map((itemX)=>{
            let data = this.polarbarData.seriesData[itemX];
            if(data&&data[this.category_type_dep]){
                for(let key in seriesData){
                    let item = data[this.category_type_dep][key];
                    if(item==null||item==undefined){
                        seriesData[key].push('-');
                    }
                    else {
                        seriesData[key].push(item);
                    }
                }
            }
            else {
                for(let key in seriesData){
                    seriesData[key].push('-');
                }
            }
        });

        this.refs.graph_polarbar.refreshGraph({

            seriesData:[
                {name:'普通客户',data:seriesData.common_cust_num},
                {name:'潜力客户',data:seriesData.potential_cust_num},
                {name:'核心客户',data:seriesData.core_cust_num},
                {name:'VIP客户',data:seriesData.vip_cust_num},
                {name:'VIP白金客户',data:seriesData.vip_platina_cust_num},
                {name:'VIP钻石客户',data:seriesData.vip_diamond_cust_num},
                {name:'VIP超钻客户',data:seriesData.vip_super_diamond_cust_num}
            ],

            radiusAxisData:{data:this.polarbarData.xAxisData}
        });
    }

    //机构发展
    renderDbgridBar(){
        let data = {
            branch_name:[],
            inte_service_income:[],
            inte_service_income_rate:[],
            interest_income:[],
            interest_income_rate:[],
            margin_service_income:[],
            margin_service_income_rate:[],
            service_income:[],
            service_income_rate:[],
            total_income:[]
        };
        this.dbgridBarData[this.category_type_dep].map(item=>{
            for(let key in data){
                data[key].push(item[key]);
            }
        });
        console.log(data);
        let leftSeriesData = [
            {
                name:'手续费净收入',
                tipData:data.service_income,
                data:data.service_income_rate,
            },
            {
                name:'利差收入减存管费',
                tipData:data.interest_income,
                data:data.interest_income_rate,
            },
            {
                name:'信用业务收入',
                tipData:data.margin_service_income,
                data:data.margin_service_income_rate,
            },
            {
                name:'综合业务收入',
                tipData:data.inte_service_income,
                data:data.inte_service_income_rate,
            },
        ];

        this.refs.graph_dbgridbar.refreshGraph({
            chartTitles:['收入结构','总收入'],
            leftSeriesData,

            rightSeriesData:[{data:data.total_income}],
            yAxisData:{data:data.branch_name},
            extraOption:{
                series:[{
                    label:{
                        normal:{formatter:'{c}%'}
                    }
                },{
                    label:{
                        normal:{formatter:'{c}%'}
                    }
                },{
                    label:{
                        normal:{show:false}
                    }
                },{
                    label:{
                        normal:{show:false}
                    }
                }],
                tooltip:{
                    formatter:(params)=>(
                        params[0].name+'<br />'+params.map((item)=>{
                            if(item.seriesIndex>1){
                                return item.seriesName+':'+leftSeriesData[item.seriesIndex].tipData[item.dataIndex]+'万元'
                                +'<br />'+item.seriesName+'占比:'+item.value+'%';
                            }
                            return item.seriesName+':'+leftSeriesData[item.seriesIndex].tipData[item.dataIndex]+'万元';
                        }).join('<br />')
                    )
                }
            }
        });
    }
    radioOnChange(e){
        this.setState({dateType_status:e.target.value},()=>{
            this.getStatusData();
        });
    }

    //营业部考核利润表现
    renderDev04(){
        this.setState({
            devTableData:this.developData04['01'][this.category_type_dep]
        });
        let chartData = this.developData04['02'][this.category_type_dep];
        let pData = [];
        let pDataY = [];
        let nData = [];
        let nDataY = [];
        let axisData = [];
        pData = _.map(chartData.seriesData,(item)=>{
            let pItem = item[chartData.xAxisData[1]];
            let nItem = item[chartData.xAxisData[0]];
            axisData.push(pItem.branch_name);
            pDataY.push(parseFloat(pItem.profit_yoy));
            nData.push(nItem.profit);
            nDataY.push(parseFloat(nItem.profit_yoy||'0'));
            return pItem.profit;
        });
        this.refs.graph_symmetrybar1.refreshGraph({

            positiveSeriesData:{
                data:pData
            },
            negativeSeriesData:{
                data:nData
            },
            axisData:{
                data:axisData
            },
            percentData:{
                positive:pDataY,
                negative:nDataY
            },
            positiveTitle:['同比',chartData.xAxisData[1]],
            negativeTitle:[chartData.xAxisData[0],'同比']
        });
    }
    renderPerformance(branchId){
        getBranchPerformance({branchId}).then((res)=>{
            //01
            let performanceTableData = {
                trade_year:[],
                profit:[],
                profit_yoy:[],
                profit_index:[],
                profit_complete_rate:[],
                market_rate:[],
                market_rate_yoy:[],
                market_rate_complete_rate:[]
            };
            res['01'].map((item)=>{
                for(let key in performanceTableData){
                    performanceTableData[key].push(item[key]||'');
                }
            });
            this.setState({performanceTableData});
            //02
            let performanceData02 = res['02'];
            let pData = [];
            let axisData = [];
            let nData = [];
            let xData = performanceData02.xAxisData[0];
            let pXData = xData;
            let nXData = '';
            if(performanceData02.xAxisData.length===1){
                _.map(performanceData02.seriesData,(item)=>{
                    pData.push(item[xData].market_rate);
                    axisData.push(item[xData].subcompany_name);
                    nData.push('0');
                });
            }
            else {
                nXData = xData;
                pXData = performanceData02.xAxisData[1];
                if(performanceData02.xAxisData[1]<xData){
                    nXData = performanceData02.xAxisData[1];
                    pXData = xData;
                }
                _.map(performanceData02.seriesData,(item)=>{
                    pData.push(item[pXData].market_rate||'0');
                    axisData.push(item[pXData].subcompany_name);
                    nData.push(item[nXData].market_rate||'0');
                });
            }
            this.refs.graph_symmetrybar2.refreshGraph({
                positiveSeriesData:{data:pData},
                negativeSeriesData:{data:nData},
                axisData:{
                    data:axisData
                },
                positiveTitle:pXData,
                negativeTitle:nXData
            });
            //03
            let performanceData03 = res['03'];
            let pData03 = [];
            let axisData03 = [];
            let nData03 = [];
            let xData03 = performanceData03.xAxisData[0];
            let pXData03 = xData03;
            let nXData03 = '';
            let pDataY = [];
            let nDataY = [];
            if(performanceData03.xAxisData.length===1){
                _.map(performanceData03.seriesData,(item)=>{
                    pData03.push(item[xData03].profit);
                    pDataY.push(parseFloat(item[xData03].profit_yoy||'0'));
                    nDataY.push(0);
                    axisData03.push(item[xData03].subcompany_name);
                    nData03.push('0');
                });
            }
            else {
                nXData03 = xData03;
                pXData03 = performanceData03.xAxisData[1];
                if(performanceData03.xAxisData[1]<xData03){
                    nXData03 = performanceData03.xAxisData[1];
                    pXData03 = xData03;
                }
                _.map(performanceData03.seriesData,(item)=>{
                    pData03.push(item[pXData03].profit||'0');
                    axisData03.push(item[pXData03].subcompany_name);
                    nData03.push(item[nXData03].profit||'0');
                    nDataY.push(parseFloat(item[nXData03].profit_yoy||'0'));
                    pDataY.push(parseFloat(item[pXData03].profit_yoy||'0'));
                });
            }
            this.refs.graph_symmetrybar3.refreshGraph({
                positiveSeriesData:{data:pData03},
                negativeSeriesData:{data:nData03},
                axisData:{data:axisData03},
                percentData:{positive:pDataY,negative:nDataY},
                positiveTitle:['同比',pXData03],
                negativeTitle:[nXData03,'同比']
            });
        });
    }

    depFilterChange(name,tag){
        this[name] = tag;
        switch (name) {
            case 'dateType_lines':
                this.getLinesData();
                break;
            case 'dep_data_type':
                this.renderLines();
                let dataTypeName = this.dataTypeNameMap[tag];
                this.setState({dataTypeName});
                break;
            default:

                let branchTypeName = this.categoryNameMap[tag];
                this.setState({branchTypeName});
                this.renderLines();
                this.renderPolarBar();
                this.renderDbgridBar();
                this.renderDev04();
        }
    }
    subFilterChange(value){
        this.setState({branchId:value});
        this.renderPerformance(value);
    }

    rankLineFilterChange(name,tag){
        this[name] = tag;
        if(name==='dateType'){
            this.getRankLinesData();
            this.setState({showSlider:(tag==='D')});
        }
        else if (name==='category_type_rank') {
            this.setState({rankLineTitle_branch:this.categoryNameMap[tag]});
            this.renderRankLines();
        }
        else {
            this.setState({asset_amount:this.dataTypeNameMap[tag]});
            this.renderRankLines();
        }
    }
    onDayRangeChange(value){
        this.setState({dayRange:value});
        this.dayRange = value;
        this.renderRankLines();
    }
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    formatNumber (num){

        return num.replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }

    render() {
        const PcRadio = (
            <div>
                <RadioGroup onChange={this.radioOnChange} defaultValue="D" size='large' >
                    <RadioButton value="D">天</RadioButton>
                    <RadioButton value="M">月</RadioButton>
                    <RadioButton value="Y">年</RadioButton>
                </RadioGroup>
            </div>
        )
        let {devTableData,performanceTableData,subFilter,branchId} = this.state;
        let branchName = '';
        for(let i=0;i<subFilter.length;i++){
            if(subFilter[i].subcompany_id+''===branchId){
                branchName = subFilter[i].subcompany_name;
                break;
            }
        }
        return (
            <div>
                <PanelContainer title='机构现状' hasTip={()=>{return this.returnTipTable('42')}} hasRadio={PcRadio}>
                    <Row gutter={12} className="branch_top_relative">
                    <div className="branch_top_bg"></div>
                    {_.map(this.state.branch_sort_tags,(tag,index)=>{
                        let item = this.state.branchStatus[tag.id+'_category'];
                        let linkTo = '/dashboard/branch/detail_'
                        +item.category_id+'_'+this.state.dateType_status+'_'+'20171201';
                        return (
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} key={index}>
                                <div className="branch_card_title">
                                    <JfCard title={(this.categoryNameMap[item.category_id]||'')+'营业部'}>
                                        <div className="branch_card_right">{item.branch_num?this.formatNumber(item.branch_num):'-'}家</div>
                                        <div className="ant-card-grid" ><span>部均佣金(万元)</span><i>¥</i><em><Tooltip title={()=>{return this.formatNumber(item.avg_commission)+' 万'}}  ><Link to={linkTo}>
                                        {item.avg_commission?this.formatNumber(item.avg_commission):'-'}
                                        </Link></Tooltip></em></div>
                                        <div className="ant-card-grid" ><span>部均资产(万元)</span><i>¥</i><em><Tooltip title={()=>{return this.formatNumber(item.avg_asset)+' 万'}} ><Link to={linkTo}>
                                          {item.avg_asset?this.formatNumber(item.avg_asset):'-'}
                                        </Link></Tooltip></em></div>
                                        <div className="ant-card-grid" ><span>部均交易量(万元)</span><i>¥</i><em><Tooltip title={()=>{return this.formatNumber(item.avg_amount)+' 万'}} ><Link to={linkTo}>
                                        {item.avg_amount?this.formatNumber(item.avg_amount):'-'}
                                        </Link></Tooltip></em></div>
                                        <div className="ant-card-grid" ><span>部均新开户</span><em className="branch_center"><Tooltip title={()=>{return this.formatNumber(item.avg_cust_num)+'人'}} ><Link to={linkTo}>
                                        {item.avg_cust_num?this.formatNumber(item.avg_cust_num):'-'}


                                    </Link></Tooltip></em></div>
                                    </JfCard>

                                </div>

                            </Col>
                        );
                    })}
                    </Row>

                </PanelContainer>
                <PanelContainer title='机构排名' hasTip={()=>{return this.returnTipTable('43')}} hasFilter={
                    <div className="screen_condition">
                        <div className="screen_condition_content">
                            <div className="screen_column_title">筛选条件</div>
                            <div className="branch_btn_first">
                            <ButtonGroup tags={this.state.branch_sort_tags} defaultTag='A'
                            onClick={this.rankLineFilterChange.bind(this,'category_type_rank')}
                            />
                            </div>
                            <div className="branch_btn_sx">
                                <ButtonGroup tags={branch_sort_tags_zc} defaultTag='asset'
                                onClick={this.rankLineFilterChange.bind(this,'asset_amount')}
                                />
                             </div>
                             <div className="branch_btn_sx">
                                <ButtonGroup tags={branch_sort_tags_time} defaultTag='D'
                                onClick={this.rankLineFilterChange.bind(this,'dateType')}
                                />
                            </div>
                            {/* {this.state.showSlider&&
                                <Slider dots={true} marks={this.state.dayMarks} className="branch_slider"
                                max={this.state.dayMax} range={true} value={this.state.dayRange}
                                tipFormatter={((value)=>(this.state.dayMarks[value]))}
                                onChange={this.onDayRangeChange.bind(this)}/>} */}
                        </div>
                    </div>
                }>
                    <Row gutter={8} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="card_layout_module">
                                <RankLines title={this.state.rankLineTitle_branch+'营业部'+this.state.asset_amount+'排名变化'}
                                ref="graph_ranklines"

                                />
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>


               <PanelContainer title='机构发展'  hasFilter={
                    <div className="screen_condition">
                        <div className="screen_condition_content">
                            <div className="screen_column_title">营业网点类别</div>
                            <div className="branch_btn_first">
                                <ButtonGroup tags={this.state.branch_sort_tags} defaultTag='A'
                                onClick={this.depFilterChange.bind(this,'category_type_dep')}/>
                            </div>
                        </div>
                    </div>
                }>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="card_layout_module">
                                <JfCard title={this.state.branchTypeName+'营业部'+this.state.dataTypeName+'趋势对比'} hasTip={()=>{return this.returnTipTable('44')}} bordered={false}>
                                    <div className="branch_btn">
                                        <div>
                                        <ButtonGroup tags={[
                                            {label:'新增开户',value:'open_cust_num'},
                                            {label:'资产总额',value:'asset'},
                                            {label:'交易金额',value:'amount'}
                                        ]} defaultTag='open_cust_num'
                                        onClick={this.depFilterChange.bind(this,'dep_data_type')}


                                    />
                                        </div>
                                        <div>
                                        <ButtonGroup tags={[
                                            {label:'按天',value:'D'},
                                            {label:'按年',value:'Y'}
                                        ]} defaultTag="D"
                                        onClick={this.depFilterChange.bind(this,'dateType_lines')}/>
                                        </div>
                                    </div>
                                    <div className="branch_chartline_height">
                                        <ChartLine ref="graph_chartline"/>
                                    </div>
                                </JfCard>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="card_layout_module">
                                <PolarBar
                                title={"营业部客户结构分析"}
                                hasTip={()=>{return this.returnTipTable('45')}}
                                ref="graph_polarbar"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="card_layout_module">
                                <DbgridBar title={this.state.dateString+"营业部收入结构分布"}
                                    hasTip={()=>{return this.returnTipTable('46')}}
                                ref="graph_dbgridbar"
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="card_layout_module">
                                <div className="branch_container_title"> <span>单位:万元</span></div>
                                <JfCard title={this.state.branchTypeName+'营业部考核利润表现'} bordered={false} hasTip={()=>{return this.returnTipTable('47')}}>
                                    <div className="branch-ant-table">
                                        <table>
                                            <thead >
                                                <tr>
                                                    {_.map(devTableData.xAxisData,(item,index)=>(
                                                        <th key={index}>{item}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                {_.map(devTableData.xAxisData,(item,index)=>{
                                                    let trData = devTableData.seriesData[item][0];
                                                    let profit_yoy = parseFloat(trData.profit_yoy);
                                                    let className = '';
                                                    let pre = '';
                                                    if(profit_yoy>0){
                                                        className = 'anticon-upp';
                                                        pre = '+';
                                                    }
                                                    else if (profit_yoy<0) {
                                                        className = 'card_tab_green';
                                                    }
                                                    return (<td key={index}>
                                                    <div className="pull-left">
                                                        <img src={".."+CONSTANTS.APP_BASE_URL+"/resources/images/money_ico.png"} />
                                                    </div>
                                                    <div className="pull-left">
                                                        <em>¥</em><b>{trData.profit}</b>
                                                        <div>同比 <span className={className}>
                                                        {pre+profit_yoy+'%'}</span></div>
                                                    </div>
                                                    </td>)
                                                })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="barnch_symmetrybar_heihgt">
                                    <SymmetryBar ref="graph_symmetrybar1"
                                        extraOption={{
                                            grid:{
                                                left:'5%',
                                                right:'5%',
                                                top:'0',
                                                bottom:'31%'
                                            },
                                            dataZoom : {
                                              show : true,
                                              realtime:false,
                                              height: 15,
                                              x:'5%',
                                              y:'92%',
                                              start:0,
                                              end:70,
                                              textStyle:{
                                                  color:'#9db7c0'
                                              },
                                            },

                                            xAxis:{

                                                axisLabel:{
                                                    formatter: function(val) {
                                                       var strs = val.split(''); //字符串数组
                                                       var str = ''
                                                       for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                                                           str += s;
                                                           if (!(i % 1)) str += '\n';
                                                       }
                                                       return str
                                                    },
                                                    fontSize:12,
                                                    fontWeight:100
                                                }
                                            },
                                        }}
                                    />
                                    </div>
                                </JfCard>
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='机构绩效' hasFilter={
                    <div className="screen_condition">
                        <div className="screen_condition_content">
                            <div className="branch_header_right">
                                <span className="edit_self_sx business_sx_color">
                                分支机构名称：<Select style={{width:'170px'}} value={branchId}
                                onChange={this.subFilterChange.bind(this)}>
                                    {_.map(subFilter,(option,index)=>(
                                        <Option value={option.subcompany_id+''} key={index}>
                                        {option.subcompany_name}
                                        </Option>
                                    ))}
                                </Select>
                            </span>
                            </div>
                        </div>
                    </div>
                }>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="card_layout_module">
                                <JfCard title='' bordered={false} >
                                    <div className="branch_employee_table ">
                                        <div className="branch_employee_table_l">
                                            <JfCard hasTip={()=>{return this.returnTipTable('48')}} title='机构绩效考核表' className="title">
                                            <div> <span className="branch_tip">*部分机构考核收入</span></div>
                                            <table>
                                                <tbody className="ant-table-tbody">
                                                    <tr>
                                                        <td style={{width:'70px'}}>名称</td>
                                                        {_.map(performanceTableData.trade_year,(item,index)=>(
                                                            <td key={index}>{item}年</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>利润(万元)</td>
                                                        {_.map(performanceTableData.profit,(item,index)=>(
                                                            <td key={index}>{item}</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>同比变动</td>
                                                        {_.map(performanceTableData.profit_yoy,(item,index)=>{
                                                            let className = '';
                                                            let pre = '';
                                                            let value = parseFloat(item);
                                                            if(value>0){
                                                                className = 'branch_table_red';
                                                                pre = '+';
                                                            }
                                                            else if (value<0) {
                                                                className = 'branch_table_green';
                                                            }
                                                            return (<td key={index}>
                                                            <b className={className}>{pre+item}%</b>
                                                            </td>);
                                                        })}
                                                    </tr>
                                                    <tr>
                                                        <td>考核利润(万元)</td>
                                                        {_.map(performanceTableData.profit_index,(item,index)=>(
                                                            <td key={index}>{item}</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>利润达成</td>
                                                        {_.map(performanceTableData.profit_complete_rate,(item,index)=>(
                                                            <td key={index}>{item}%</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>交易金额市占率</td>
                                                        {_.map(performanceTableData.market_rate,(item,index)=>(
                                                            <td key={index}>{item}%</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>同比变动</td>
                                                        {_.map(performanceTableData.market_rate_yoy,(item,index)=>{
                                                            let className = '';
                                                            let pre = '';
                                                            let value = parseFloat(item);
                                                            if(value>0){
                                                                className = 'branch_table_red';
                                                                pre = '+';
                                                            }
                                                            else if (value<0) {
                                                                className = 'branch_table_green';
                                                            }
                                                            return (<td key={index}>
                                                            <b className={className} title={pre+item+'百分点'}>{pre+item}百分点</b>
                                                            </td>);
                                                        })}
                                                    </tr>
                                                    <tr>
                                                        <td>市占达成</td>
                                                        {_.map(performanceTableData.market_rate_complete_rate,(item,index)=>(
                                                            <td key={index}>{item}%</td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </JfCard>
                                        </div>
                                    </div>
                                    <div className="branch_employee_table">
                                        <JfCard hasTip={()=>{return this.returnTipTable('49')}} title={branchName+'交易金额市占率(%)'} className="title">
                                        {/* <div className="title">杭州第一公司交易金额市占率</div> */}
                                        <div className="branch_symmetrybar_bottom">
                                            <SymmetryBar ref="graph_symmetrybar2"
                                            orient="vertical"
                                            extraOption={{
                                                color:['#7be5ff', '#2f97f0'],


                                                    grid:{

                                                        left:'38%',
                                                        right:'2%'
                                                    },
                                                    yAxis:{
                                                        axisLabel:{
                                                                padding:[0,25,0,0],
                                                            formatter: function(val) {
                                                               var strs = val.split(''); //字符串数组
                                                               var str = ''
                                                               for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                                                                   str += s;
                                                                   if (!(i % 6)) str += '\n';
                                                               }
                                                               return str
                                                            },
                                                            fontSize:10.5,
                                                            fontWeight:100
                                                        },
                                                    }

                                            }}/>
                                        </div>
                                            </JfCard>
                                    </div>
                                </JfCard>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="branch_symmetrybar_bottom_right">
                            <div className="branch_container_title"> <span>单位:万元</span></div>
                                <SymmetryBar ref="graph_symmetrybar3"
                                hasTip={()=>{return this.returnTipTable('50')}}
                                title={branchName+"利润表现"}
                                extraOption={{

                                    grid:{
                                        left:'5%',
                                        right:'4%',
                                        top:'6%',
                                        bottom:'23%',

                                    },
                                    dataZoom : {
                                      show : true,
                                      realtime:false,
                                      height: 15,
                                      x:'4%',
                                      y:'92%',
                                      right:50,
                                      start:0,
                                      end:70,
                                      textStyle:{
                                          color:'#9db7c0'
                                      },},
                                    xAxis:{

                                        axisLabel:{
                                            formatter: function(val) {
                                               var strs = val.split(''); //字符串数组
                                               var str = ''
                                               for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                                                   str += s;
                                                   if (!(i % 4)) str += '\n';
                                               }
                                               return str
                                            },
                                            fontSize:10.5,
                                            fontWeight:100
                                        }
                                    },
                                }}/>
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.c_branch_dashboard_01}</div>
            </div>
        )
    }
}

module.exports = CockpitBranch;
