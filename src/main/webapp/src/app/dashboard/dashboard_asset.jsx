import React, {Component} from 'react'
import {Row, Col} from 'antd';
import {JfCard} from 'app_common';
import {KlineLine,ChartLine,ChartPie} from 'app_component';

export default class DashboardAsset extends Component {

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
                                title='资产总额与上证指数'
                                seriesKData={{name:'上证指数',data:[[3258.63,3350.52,3253.88,3369.28],[3330.8,3351.45,3303.18,3394.22],[3326.65,3373.95,3312.21,3374.9],[3371.96,3293.46,3285.09,3381.57],[3276.97,3285.41,3267.51,3404.83],[3258.21,3229.32,3191.58,3275.19],[3223.54,3235.3,3214.41,3259.39],[3242.34,3222.44,3193.98,3268.48],[3224.07,3336.46,3207.54,3337.08],[3343.6,3376.5,3340.49,3400.32],[3189.73,3116.35,3095.07,3262.21],[3114.56,3173.05,3100.48,3190.25],[3189.08,3323.61,3178.34,3337],[3327.32,3343.34,3293.9,3352.38],[3357.1,3351.76,3328.29,3406.79],[3347.26,3383.18,3321.31,3384.8]]}}
                                seriesOtherData={[{name:'资产总额',data:[1620, 932, 901, 934, 1290, 3330, 3620, 3932, 3901,3620, 3932, 3901, 2934, 3290, 3330, 2934]}]}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartLine1'
                                title='近一月新增客户总资产'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}} 
                                seriesData={[{name:'',data:[80, 132, 101, 154, 130, 230, 210]}]}
                                extraOptions={{legend:{show:false}}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartPie
                                ref='graph_pie1'
                                title="资产结构"
                                seriesData={[{"name":'资产结构','data':[{value:2355, name:'广告访问'},{value:1355, name:'直接访问'},{value:3355, name:'直接访问222'}]}]}
                                extraOptions={{legend:{show:false}}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartLine2'
                                title='融资融券余额'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'融资融券余额',data:[80, 132, 101, 154, 130, 230, 210]},{name:'市场融资融券余额',data:[20, 152, 171, 254, 30, 130, 110]}]}
                                extraOptions={{legend:{show:true,x :'left',orient: 'vertical'}}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartLine3'
                                title='资产效率趋势'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'资产保值率',data:[80, 132, 101, 154, 130, 230, 210]},{name:'资产周转率',data:[130, 232, 101, 154, 130, 330, 610]},{name:'资产变动率',data:[20, 152, 171, 254, 30, 130, 110]}]}
                                extraOptions={{legend:{show:true,x :'left'}}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ChartLine
                                ref='graph_chartLine4'
                                title='持仓证券市值'
                                xAxisData = {{name:'',data:['201701','201702','201703','201704','201705','201706','201707']}}
                                seriesData={[{name:'持仓证券市值',data:[80, 132, 101, 154, 130, 230, 210]}]}
                                extraOptions={{extra:{itemAreaStyle:{normal: {areaStyle: {type: 'default'}}}}}}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
