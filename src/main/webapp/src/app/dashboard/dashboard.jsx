import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio, Row, Col} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {PanelContainer, JfTable ,JfCard} from 'app_common';
import DashboardBusiness from './dashboard_business';
import DashboardCustomer from './dashboard_customer';
import DashboardAsset from './dashboard_asset';

import 'app_css/app/dashboard/index.css';

export default class CockpitDashborard extends Component {

    constructor(props) {
        super(props);

        this.radioOnChange = this.radioOnChange.bind(this);

        this.state = {
            currentTag:'business',
        };
    }

    radioOnChange(e,type) {
        if (type == 'type') {
            this.setState({
                currentTag:e.target.value,
            })
        }
    }

    returnComponent(){
        if (this.state.currentTag == 'business') return <DashboardBusiness />
        else if (this.state.currentTag == 'customer') return <DashboardCustomer />
        else if (this.state.currentTag == 'asset') return <DashboardAsset />
    }


    render() {
        const dateRadio = (
            <RadioGroup onChange={(e)=>{this.radioOnChange(e,'date')}} defaultValue="day" size='large'>
                <RadioButton value="day">天</RadioButton>
                <RadioButton value="month">月</RadioButton>
                <RadioButton value="year">年</RadioButton>
            </RadioGroup>
        )
        const typeRadio = (
            <RadioGroup onChange={(e)=>{this.radioOnChange(e,'type')}} defaultValue="business" size='large'>
                <RadioButton value="business">业务分析</RadioButton>
                <RadioButton value="customer">客户分析</RadioButton>
                <RadioButton value="asset">资产分析</RadioButton>
            </RadioGroup>
        )
        return (<div>
            <PanelContainer title='指数概览' hasTip={<span><b> 测试</b><br/> ddd</span>} hasRadio={dateRadio}>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>正常客户数</span>
                                <em>344,556</em>
                            </div>
                            <div className="ant-card-grid" >
                                <span>限售股客户总数</span>
                                <em>3,445,645</em>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>新增客户数</span>
                                <em>4,455</em>
                                <div className="card_tab">
                                    <b className="card_tab_red">+8.72%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>两融新增资金账户</span>
                                <em>3,565</em>
                                <div className="card_tab">
                                    <b className="card_tab_green">-2.76%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>资产总额</span>
                                <i>¥</i><em>3,565</em>
                            </div>
                            <div className="ant-card-grid" >
                                <span>资金总额</span>
                                <i>¥</i><em>5,345</em>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>持仓证券市值</span>
                                <i>¥</i><em>4,455</em>
                                <div className="card_tab">
                                    <b className="card_tab_red">+8.72%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>新增客户资产</span>
                                <i>¥</i><em>76,565</em>
                                <div className="card_tab">
                                    <b className="card_tab_green">-2.76%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>交易金额</span>
                                <i>¥</i><em>4,455</em>
                                <div className="card_tab">
                                    <b className="card_tab_red">+8.72%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>交易市占率</span>
                                <em>0.67</em><i>%</i>
                                <div className="card_tab">
                                    <b className="card_tab_green">-0.76百分点</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>交易总金额</span>
                                <i>¥</i><em>4,455</em>
                                <div className="card_tab">
                                    <b className="card_tab_red">+8.72%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>股票交易佣金费率</span>
                                <em>0.22</em><i>%</i>
                                <div className="card_tab">
                                    <b className="card_tab_green">-1.72百分点</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>两融余额</span>
                                <i>¥</i><em>345,556</em>
                                <div className="card_tab">
                                    <b className="card_tab_red">+8.7%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>两融余额市占率</span>
                                <em>0.63</em><i>%</i>
                                <div className="card_tab">
                                    <b className="card_tab_green">-2.73百分点</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <JfCard>
                            <div className="ant-card-grid" >
                                <span>两融股票费率</span>
                                <em>0.22</em><i>%</i>
                                <div className="card_tab">
                                    <b className="card_tab_red">+0.2百分点</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                            <div className="ant-card-grid" >
                                <span>两融交易总金额</span>
                                <i>¥</i><em>54,545</em>
                                <div className="card_tab">
                                    <b className="card_tab_green">-2.73%</b>
                                    <strong>环比</strong>
                                </div>
                            </div>
                        </JfCard>
                    </Col>
                </Row>
            </PanelContainer>
            <PanelContainer title='趋势分析' hasTip='各大券商营业部变化情况' hasRadio={typeRadio}>
                {this.returnComponent()}
            </PanelContainer>
        </div>)
    }
}

module.exports = CockpitDashborard;
