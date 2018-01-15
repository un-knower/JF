import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio, Row, Col, Spin} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import {PanelContainer, JfTable ,JfCard,TipTable} from 'app_common';
import {getKpiLeftTarget,keyIndicatorsRight} from '../../api';
import DashboardBusiness from './kpi_business';
import DashboardCustomer from './kpi_customer';
import DashboardAsset from './kpi_asset';
import Kpidaytime from './kpi_daytime';
import Kpimonthtime from './kpi_monthtime';
import Kpiyeartime from './kpi_yeartime';

import 'app_css/app/dashboard/index.css';

export default class CockpitDashborard extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.radioOnChangeright = this.radioOnChangeright.bind(this);
        this.state = {
            currentTag:'achievement',
            kpiLeftTargetData:undefined,
            currentTagkpi:'daytime',
        };
    }

    radioOnChange(e,type) {
        if (type == 'type') {
            this.setState({
                currentTag:e.target.value,
            })
        }
    }

    radioOnChangeright(e,date) {
        if (date == 'date') {
            this.setState({
                currentTagkpi:e.target.value,
            })
        }
    }

    returnComponent(){
        if (this.state.currentTag == 'achievement') return <DashboardBusiness />
        else if (this.state.currentTag == 'income') return <DashboardCustomer />
        else if (this.state.currentTag == 'asset') return <DashboardAsset />
    }
    returnComponentkpi(){
        if (this.state.currentTagkpi == 'daytime') return <Kpidaytime />
        if (this.state.currentTagkpi == 'monthtime') return <Kpimonthtime />
        else if (this.state.currentTagkpi == 'yeartime') return <Kpiyeartime />
    }

    async componentDidMount(){
        const kpiLeftTargetData = await getKpiLeftTarget();
        this.setState({ kpiLeftTargetData:kpiLeftTargetData[0] });
        // console.log(kpiLeftTargetData);
        //关键指标右侧
        const keyIndicatorsRightData = await keyIndicatorsRight();
        this.setState({ keyIndicatorsRightData:keyIndicatorsRightData});
        // console.log(keyIndicatorsRightData);
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }


    formatNumber(num){
        num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        return num.substring(0,num.indexOf('.'))
    }

    render() {
        let {keyIndicatorsRightData} = this.state;
        const dateRadio = (
            <RadioGroup onChange={(e)=>{this.radioOnChangeright(e,'date')}} defaultValue="daytime" size='large' >
                <RadioButton value="daytime">{keyIndicatorsRightData?keyIndicatorsRightData.day.init_date.substring(4,6)+'月'+keyIndicatorsRightData.day.init_date.substring(6,8)+'日':'-'}</RadioButton>
                <RadioButton value="monthtime">{keyIndicatorsRightData?keyIndicatorsRightData.month.month_id.substring(5,7)+'月':'-'}</RadioButton>
                <RadioButton value="yeartime">本年累计</RadioButton>
            </RadioGroup>
        )
        const typeRadio = (
            <RadioGroup onChange={(e)=>{this.radioOnChange(e,'type')}} defaultValue="achievement" size='large'>
                <RadioButton value="achievement">业务绩效</RadioButton>
                <RadioButton value="income">收入支出</RadioButton>
                <RadioButton value="asset">客户资产</RadioButton>
            </RadioGroup>
        )

        let {kpiLeftTargetData} = this.state;

        return (<div >
            <PanelContainer title='关键指标' hasTip={()=>{return this.returnTipTable('01')}}  >
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="kpi_card_min">
                            <Col  xs={24} sm={12} md={12} lg={12} xl={12} className="kpi_card_min_boder">
                                <JfCard className="kpi_c_m_b_b">
                                    <div className="kpi_card_time">{kpiLeftTargetData?`* 截止到${kpiLeftTargetData.month_id.substring(0,4)}年${Number(kpiLeftTargetData.month_id.substring(4,6))}月`:'-'}</div>
                                    <div className="ant-card-grid" >
                                        <span>代理买卖净收入(万元)</span>
                                        <em>{kpiLeftTargetData?this.formatNumber(kpiLeftTargetData.buy_sell_net_income_sum).replace(/(\d)(?=(\d{3})+$)/g, "$1,"):<Spin />}</em>
                                    </div>
                                    <div className="ant-card-grid" >
                                        <div className="card_tab">
                                            <strong>同比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.buy_sell_net_income_sum_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.buy_sell_net_income_sum_rate}%`:'-'}</b>
                                        </div>
                                        <div className="card_tab">
                                            <strong>行业占比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.buy_sell_market_rate_sum.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.buy_sell_market_rate_sum}%`:'-'}</b>
                                        </div>
                                    </div>
                                </JfCard>
                                <JfCard className="kpi_min_l_height" >
                                    <div className="ant-card-grid" >
                                        <span>综合业务收入(万元)</span>
                                        <em>{kpiLeftTargetData?this.formatNumber(kpiLeftTargetData.inte_service_income_sum).replace(/(\d)(?=(\d{3})+$)/g, "$1,"):<Spin />}</em>
                                    </div>
                                    <div className="ant-card-grid" >
                                        <div className="card_tab">
                                            <strong>同比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.inte_service_income_sum_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.inte_service_income_sum_rate}%`:'-'}</b>
                                        </div>
                                        <div className="card_tab">
                                            <strong>收入占比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.inte_service_income_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.inte_service_income_rate}%`:'-'}</b>
                                        </div>
                                    </div>
                                </JfCard>
                            </Col>
                            <Col  xs={24} sm={12} md={12} lg={12} xl={12}>
                                <JfCard className="kpi_c_m_b_b">
                                    <div className="kpi_card_time"></div>
                                    <div className="ant-card-grid" >
                                        <span>代理买卖净收入排名</span>
                                        <em>{kpiLeftTargetData?`${kpiLeftTargetData.buy_sell_rank_sum}名`:''}<strong>{kpiLeftTargetData?`/${kpiLeftTargetData.security_company_num}家`:<Spin />}</strong></em>
                                    </div>
                                    <div className="ant-card-grid" >
                                        <div className="card_tab">
                                            <strong>同比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.buy_sell_rank_diff.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.buy_sell_rank_diff.indexOf('-')>-1?'↓'+kpiLeftTargetData.buy_sell_rank_diff.substring(1):'↑'+kpiLeftTargetData.buy_sell_rank_diff}名`:'-'}</b>
                                        </div>
                                        <div className="card_tab">
                                            <strong>考核目标</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.buy_sell_rank_goal.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.buy_sell_rank_goal}名`:'-'}</b>
                                        </div>
                                    </div>
                                </JfCard>
                                <JfCard className="kpi_min_l_height">
                                    <div className="ant-card-grid" >
                                        <span>考核利润(万元)</span>
                                        <em>{kpiLeftTargetData?this.formatNumber(kpiLeftTargetData.inte_service_income_goal).replace(/(\d)(?=(\d{3})+$)/g, "$1,"):<Spin />}</em>
                                    </div>
                                    <div className="ant-card-grid" >
                                        <div className="card_tab">
                                            <strong>同比</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.inte_service_income_goal_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.inte_service_income_goal_rate}%`:'-'}</b>
                                        </div>
                                        <div className="card_tab">
                                            <strong>动态完成率</strong>
                                            <b className={kpiLeftTargetData?kpiLeftTargetData.inte_service_finish_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{kpiLeftTargetData?`${kpiLeftTargetData.inte_service_finish_rate}%`:'-'}</b>
                                        </div>
                                    </div>
                                </JfCard>
                            </Col>
                        </div>
                    </Col>
                    <div className="kpi_radio_right" >
                    <PanelContainer hasRadio={dateRadio} >
                        {this.returnComponentkpi()}
                    </PanelContainer>
                    </div>
                </Row>

            </PanelContainer>
            <PanelContainer title='趋势分析'  hasRadio={typeRadio}>
                {this.returnComponent()}
            </PanelContainer>
            <div className='layout-footer'>本页数据更新至{this.props.date.c_kpi_dashboard_daily_data_01}</div>
        </div>)
    }
}

module.exports = CockpitDashborard;
