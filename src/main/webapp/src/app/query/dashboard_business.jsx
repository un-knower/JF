import React, {Component} from 'react'
import {Row, Col, Table,Radio} from 'antd';
import {JfCard} from 'app_common';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {KlineLine,ChartLine,ConnectedMap,ChartPie,Bar} from 'app_component';

// Top30家券商交易量(股+基)排名 (按当月)
const { Column, ColumnGroup } = Table;

const branchRankColumns = [
    {
        title: '营业部名称',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '交易金额',
        dataIndex: 'transaction',
        key: 'transaction'
    }, {
        title: '客户数',
        dataIndex: 'customer',
        key: 'customer'
    }, {
        title: '资金总数',
        dataIndex: 'capital',
        key: 'capital'
    }
];
const branchRankData = [];
for (let i = 0;i<10; i++) {
    branchRankData.push({
        key: i+1,
        name: '营业部A',
        transaction: '¥345,456',
        customer: '4,456',
        capital:'¥453,443'
    });
}

const brokerRankColumns = [
    {
        title: '券商名称',
        dataIndex: 'brokerName',
        key: 'brokerName'
    }, {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
    }, {
        title: '2017/10',
        children: [
            {
                title: '交易额(亿元)',
                dataIndex: 'jiaoyie',
                key: 'jiaoyie'
            }, {
                title: '交易占比(%)',
                dataIndex: 'jiaoyizhanbi',
                key: 'jiaoyizhanbi'
            }, {
                title: '环比变动(%)',
                dataIndex: 'biandong',
                key: 'biandong'
            }
        ]
    }, {
        title: '2017年1-10月',
        children: [
            {
                title: '交易额(亿元)',
                dataIndex: 'jiaoyie2',
                key: 'jiaoyie2'
            }, {
                title: '交易占比(%)',
                dataIndex: 'jiaoyizhanbi2',
                key: 'jiaoyizhanbi2'
            }, {
                title: '同比变动(%)',
                dataIndex: 'biandong2',
                key: 'biandong2'
            }
        ]
    }
]

const brokerRankData = [];
for (let i = 0; i < 30; i++) {
    brokerRankData.push(
        {
            key: i+1,
            brokerName: '华泰证券',
            index: i+1,
            jiaoyie: '55,342'+i,
            jiaoyizhanbi: 8.45+i,
            biandong: 1.45+i,
            jiaoyie2: '34,234'+i,
            jiaoyizhanbi2: 0.12+i,
            biandong2: 2.55+i
        }
    );
}

export default class DashboardBusiness extends Component {

    constructor(props) {
        super(props);

        this.branchRankOnChange = this.branchRankOnChange.bind(this);
        this.getProvinceData = this.getProvinceData.bind(this);
    }

    getProvinceData(province){
        return {
            provinceData:[],
            provinceScatterData:[]
        };
    }

    componentDidMount(){
        const _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }
    }

    branchRankOnChange(e){
        console.log(e.target.value);
    }

    render(){
        return (
            <div>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <KlineLine title='交易金额与上证指数' ref='graph_kline1'
                            seriesKData={{name:'k线',data:[[3258.63,3350.52,3253.88,3369.28],[3330.8,3351.45,3303.18,3394.22],[3326.65,3373.95,3312.21,3374.9],[3371.96,3293.46,3285.09,3381.57],[3276.97,3285.41,3267.51,3404.83],[3258.21,3229.32,3191.58,3275.19],[3223.54,3235.3,3214.41,3259.39],[3242.34,3222.44,3193.98,3268.48],[3224.07,3336.46,3207.54,3337.08],[3343.6,3376.5,3340.49,3400.32],[3189.73,3116.35,3095.07,3262.21],[3114.56,3173.05,3100.48,3190.25],[3189.08,3323.61,3178.34,3337],[3327.32,3343.34,3293.9,3352.38],[3357.1,3351.76,3328.29,3406.79],[3347.26,3383.18,3321.31,3384.8]]}}
                            seriesOtherData={[{name:'交易金额',data:[1620, 932, 901, 934, 1290, 3330, 3620, 3932, 3901,3620, 3932, 3901, 2934, 3290, 3330, 2934]}]} />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartline1'
                                title='近一月新增客户交易金额及佣金'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'新增客户交易金额',data:[80, 132, 101, 154, 130, 230, 210]},{name:'新增客户交易佣金',data:[20, 152, 171, 254, 30, 130, 110]}]}
                                extraOptions={{legend:{show:true}}}
                            >
                                    近一月新增客户总资产
                            </ChartLine>
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartline2'
                                title='交易佣金'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'新增客户交易金额',data:[100, 102, 131, 164, 130, 230, 110]}]}
                            >
                                    近一月新增客户总资产
                            </ChartLine>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartline3'
                                title='股票佣金费率变化'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'股票交易佣金费率',data:[150, 132, 101, 114, 130, 230, 310]},{name:'股基交易佣金费率',data:[20, 122, 71, 154, 30, 130, 110]}]}
                                extraOptions={{legend:{show:true}}}
                            >
                                股票佣金费率变化
                            </ChartLine>
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <JfCard title='交易金额及佣金类型'>
                            <div className="business_pie_height">
                                <div className="text-center">交易金额分布</div>
                                    <ChartPie
                                        ref='graph_pie1'
                                        seriesData={[{"name":'交易金额分布','data':[{value:1155, name:'搜索访问'},{value:3355, name:'直接访问'},{value:3355, name:'直接访问222'}]}]}
                                        extraOptions={{legend:{show:false,data:['']},extra:{selectedIndex:0,label:{normal:{show:false}},serisesCenter:['50%','60%']}}}
                                    >
                                    </ChartPie>
                            </div>
                            <div className="business_pie_height">
                                <div className="text-center">交易佣金分布</div>
                                    <ChartPie
                                        ref='graph_pie2'
                                        seriesData={[{"name":'交易佣金分布','data':[{value:2355, name:'广告访问'},{value:1355, name:'直接访问'},{value:3355, name:'直接访问222'}]}]}
                                        extraOptions={{legend:{show:false},extra:{selectedIndex:0,label:{normal:{show:false}},serisesCenter:['50%','60%']}}}
                                    >

                                    </ChartPie>
                            </div>
                            <div className="clear"></div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_bar_height">
                            <Bar
                                ref='graph_bar1'
                                title="经纪业务主要收入占比变动"
                                seriesData={[{name:'2017-10',data:[12,15,19,22]},{name:'2017-09',data:[15,22,11,9]}]}
                                xAxisData={{name:'',data:['手续费及佣金净收入','利息净收入','两融息费收入','综合业务收入']}}
                                showLegend={true}
                                dataUnit={['','']}
                                percentData={[['15%','18%','28%','35%'],['11%','22%','31%','39%']]}
                            />
                       </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <JfCard title='top10营业部排名'>
                            <div className="business_top ">
                                <div className="business_sort">
                                    <RadioGroup defaultValue="customer" onChange={this.branchRankOnChange}>排序方式：
                                        <RadioButton value="amount">交易金额</RadioButton>
                                        <RadioButton value="customer">客户数</RadioButton>
                                        <RadioButton value="assets">资产总额</RadioButton>
                                    </RadioGroup>
                                </div>
                                <Table columns={branchRankColumns} dataSource={branchRankData} pagination={false}/>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={16} lg={16} xl={16}>
                        <div className="business_height">
                            <ConnectedMap
                                ref='graph_map1'
                                title="浙江省营业部分布"
                                countryData={{name:'业务量',data:[{name:'浙江',value:[10,2]}]}}
                                provinceData={[{name:'金华市',value:1}]}
                                provinceScatterData={[{name:'杭州XX营业部',value:[120.0,29.18,1,4,7]}]}
                                provinceScatterName={['交易量','资产总额','客户数']}
                                provinceScatterUnit={['','','']}
                                getProvinceData={this.getProvinceData}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col >
                        <JfCard title='Top30家券商交易量(股+基)排名 (按当月)'>
                            <Table dataSource={brokerRankData} pagination={{pageSize:15}} bordered columns={brokerRankColumns}>
                            </Table>
                        </JfCard>
                    </Col>
                </Row>
            </div>
        )
    }
}
