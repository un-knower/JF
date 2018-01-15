import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio, Row, Col, Spin} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {PanelContainer, JfTable ,JfCard} from 'app_common';
import {getKpiLeftTarget,keyIndicatorsRight} from '../../api';

import 'app_css/app/dashboard/index.css';

export default class Kpiyeartime extends Component {

    constructor(props) {
        super(props);

        this.radioOnChange = this.radioOnChange.bind(this);

        this.state = {
            currentTagkpi:'yeartime',
        };


    }


    radioOnChange(e,date) {
        if (date == 'date') {
            this.setState({
                currentTagkpi:e.target.value,
            })
        }
    }



    async componentDidMount(){

        //关键指标右侧
        const keyIndicatorsRightData = await keyIndicatorsRight();
        this.setState({ keyIndicatorsRightData:keyIndicatorsRightData});



    }



    formatNumber (num){
        return num.replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }

    render() {

        let {keyIndicatorsRightData} = this.state;




        return (<div className="kpi_time_right">
            <Col xs={24} sm={12} md={12} lg={6} xl={6} >
                <div className="kpi_card_left">
                    <JfCard>
                        <div className="ant-card-grid" >
                            <span>股基交易金额(亿元)</span>
                            <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.sf_amount_mth):<Spin />}</em>
                            <div className="card_tab">
                                <strong>同比</strong>
                                <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.sf_amount_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.sf_amount_mth_rate}%`:'-'}</b>
                            </div>
                        </div>
                        <div className="ant-card-grid" >
                            <span>累计市占率(%)</span>
                            <em>{keyIndicatorsRightData?keyIndicatorsRightData.year.sf_amount_market_mth_rate:<Spin />}</em>
                            <div className="card_tab">
                                <strong>同比</strong>
                                <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.sf_amount_market_mth_rate_hb.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.sf_amount_market_mth_rate_hb}`:'-'}<div className="kpi_size">个百分点</div></b>
                            </div>

                        </div>
                    </JfCard>
                    <JfCard className="kpi_card_left_bottom">
                        <div className="ant-card-grid" >
                            <span>股票佣金费率(‰)</span>
                            <em>{keyIndicatorsRightData?keyIndicatorsRightData.year.stock_commission_mth_rate:<Spin />}</em>
                            <div className="card_tab">
                                <strong>同比</strong>
                                <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.stock_commission_mth_rate_hb.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.stock_commission_mth_rate_hb}`:'-'}<div className="kpi_size">个百分点</div></b>

                            </div>
                        </div>
                        <div className="ant-card-grid" >
                            <span>佣金收入(万元)</span>
                            <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.commission_mth):<Spin />}</em>

                            <div className="card_tab">
                                <strong>同比</strong>
                                <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.commission_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.commission_mth_rate}%`:'-'}</b>
                            </div>
                        </div>
                    </JfCard>
                </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <div className="kpi_card_left">
                <JfCard>
                    <div className="ant-card-grid" >
                        <span>客户资产(亿元)</span>
                        <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.last_asset_mth):<Spin />}</em>
                        <div className="card_tab">
                            <strong>同比</strong>
                            <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.last_asset_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.last_asset_mth_rate}%`:'-'}</b>
                        </div>

                    </div>
                    <div className="ant-card-grid" >
                        <span>两融余额(亿元)</span>
                        <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.last_margin_balance_mth):<Spin />}</em>
                        <div className="card_tab">
                            <strong>同比</strong>
                            <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.last_margin_balance_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.last_margin_balance_mth_rate}%`:'-'}</b>

                        </div>
                        <div className="card_tab">
                            <strong>市占率</strong>
                            <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.margin_balance_market_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.margin_balance_market_rate}%`:'-'}</b>
                        </div>
                    </div>
                </JfCard>

                <JfCard className="kpi_card_left_bottom">
                    <div className="ant-card-grid" >
                        <span>新开户</span>
                        <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.open_cust_num):<Spin />}</em>
                        <div className="card_tab">
                            <strong>同比</strong>
                            <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.open_cust_num_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.open_cust_num_mth_rate}%`:'-'}</b>
                        </div>
                    </div>
                    <div className="ant-card-grid" >
                        <span>新增日均资产(亿元)</span>
                        <em>{keyIndicatorsRightData?this.formatNumber(keyIndicatorsRightData.year.avg_asset_mth):<Spin />}</em>
                        <div className="card_tab">
                            <strong>同比</strong>
                            <b className={keyIndicatorsRightData?keyIndicatorsRightData.year.avg_asset_mth_rate.indexOf('-')>=0?"card_tab_green":"card_tab_red":''}>{keyIndicatorsRightData?`${keyIndicatorsRightData.year.avg_asset_mth_rate}%`:'-'}</b>
                        </div>
                    </div>

                </JfCard>
            </div>
            </Col>
        </div>)
    }
}

module.exports = Kpiyeartime;
