import React, {Component} from 'react'
import {Row, Col} from 'antd';
import {JfCard} from 'app_common';
import {KlineLine,ChartLine,Bar,Scatter} from 'app_component';

export default class DashboardCustomer extends Component {

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

    render(){
        return (
            <div>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <KlineLine
                                ref='graph_kline1'
                                title='正常客户总数与上证指数'
                                seriesKData={{name:'上证指数',data:[[3258.63,3350.52,3253.88,3369.28],[3330.8,3351.45,3303.18,3394.22],[3326.65,3373.95,3312.21,3374.9],[3371.96,3293.46,3285.09,3381.57],[3276.97,3285.41,3267.51,3404.83],[3258.21,3229.32,3191.58,3275.19],[3223.54,3235.3,3214.41,3259.39],[3242.34,3222.44,3193.98,3268.48],[3224.07,3336.46,3207.54,3337.08],[3343.6,3376.5,3340.49,3400.32],[3189.73,3116.35,3095.07,3262.21],[3114.56,3173.05,3100.48,3190.25],[3189.08,3323.61,3178.34,3337],[3327.32,3343.34,3293.9,3352.38],[3357.1,3351.76,3328.29,3406.79],[3347.26,3383.18,3321.31,3384.8]]}}
                                seriesOtherData={[{name:'正常客户总数',data:[1620, 932, 901, 934, 1290, 3330, 3620, 3932, 3901,3620, 3932, 3901, 2934, 3290, 3330, 2934]}]}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height" >
                            <ChartLine
                                ref='graph_charLine1'
                                title='新增开户数'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'',data:[80, 132, 101, 154, 130, 230, 210]}]}
                                extraOptions={{legend:{show:true}}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Bar
                            ref='graph_bar1'
                            title={'客户业务类型（截止到目前所有客户）'}
                            seriesData={[{name:'',data:[50,123,222,435,976]}]}
                            yAxisData={{name:'',data:['个股期权','港股通','股票质押','约定式购回','限售股']}}
                            visualMap={true}
                            dataUnit={['人']}
                            percentData={[['3%','6%','10%','20%','49%']]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Bar
                            ref='graph_bar2'
                            title={'客户资产结构'}
                            seriesData={[{name:'',data:[50,123,222,435,976]}]}
                            yAxisData={{name:'',data:['普通客户','潜力客户','核心客户','VIP-白金','VIP-钻石']}}
                            visualMap={true}
                            dataUnit={['人']}
                            percentData={[['3%','6%','10%','20%','49%']]}
                        />
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Scatter
                            ref='graph_scatter1'
                            title="近一月新增客户及佣金分布"
                            chartData={[{name:'浙江',value:[120,100,30]},{name:'江苏',value:[100,150,50]}]}
                            dataUnit={['人','人','万']}
                            dataNames={['新增开户','有效奖励','交易佣金']}
                            axisNames={['新增开户客户数','有效奖励客户']}
                            markLineLabel={["平均新增开户客户数","平\n均\n有\n效\n奖\n励\n客\n户\n"]}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Scatter
                            ref='graph_scatter2'
                            title="浙江省的新客及新客交易佣金"
                            chartData={[{name:'杭州',value:[20,10,3]},{name:'衢州',value:[34,16,5]}]}
                            dataUnit={['人','人','万']}
                            dataNames={['新增开户','有效奖励','交易佣金']}
                            axisNames={['新增开户客户数','有效奖励客户']}
                            markLineLabel={["平均新增开户客户数","平\n均\n有\n效\n奖\n励\n客\n户\n"]}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
