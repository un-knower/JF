import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Button} from 'antd';
import {PanelContainer,JfCard} from 'app_common';
import {ChartLine} from 'app_component';
import CONSTANTS from 'app_constants';
import 'app_css/app/dashboard/index.css';
import {queryBranchStatusIn} from '../../api';

export default class CockpitBranchDownstream extends Component {

    constructor(props){
        super(props);

        this.goBack = this.goBack.bind(this);
        this.series = {
            asset:[],
            amount:[],
            commission:[],
            open_cust_num:[]
        };
        this.titleNameMap = {
            ZX:'中心',
            A:'A ',
            B:'B ',
            C:'C ',
            D:'D ',
            E:'E ',
            F:'F ',
            X:'X ',

        }
    }

    componentDidMount(){
        const {match} = this.props;
        let paramsArray = match.params.id.split('_');
        let categoryId = paramsArray[1];
        let dateType = paramsArray[2];
        let endDate = paramsArray[3];
        let extraOption = {

            legend:{
                show:true,
            },
            grid:{
                bottom:40,
                top:'30%'
            },
            tooltip:{},
            yAxis:{},
            xAxis:{
                boundaryGap:true,
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                            rotate:40,
                      textStyle: {
                      color: '#7d919e'
                      }
                    },

            }
        };
        let typeArray = ['commission','asset','amount','open_cust_num'];
        queryBranchStatusIn({categoryId,dateType,endDate}).then((res)=>{
            let xAxisData = res.xAxisData;
            let seriesData = xAxisData.map((item)=>(
                res.seriesData[item]?res.seriesData[item]:[]
            ));
            seriesData[0].map((item,index)=>{
                typeArray.map(type=>{
                    this.series[type].push({
                        name:item.name,
                        data:seriesData.map((data)=>data[index]?data[index][type]:'-')
                    })
                });
            });
            typeArray.map(type=>{
                this.refs['graph_'+type].refreshGraph({
                    seriesData:this.series[type],
                    xAxisData:{data:xAxisData},
                    showTopN:3,
                    extraOption
                });
            });
        });
    }

    goBack(history){
        history.goBack();
    }

    render() {
        const {history,match} = this.props;
        const backButton = (
            <div>
                <Button onClick={()=>{this.goBack(history)}}>返回</Button>
            </div>
        )
        let paramsArray = match.params.id.split('_');
        let categoryId = paramsArray[1];




        return (
            <div>
                <PanelContainer title={this.titleNameMap[categoryId]+'类营业部'}  hasRadio={backButton}>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="branch_card_title">
                                <div className="branch_container_title"> <span>单位:万元</span></div>
                            <ChartLine title="交易佣金变化趋势" ref="graph_commission"

                            />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="branch_card_title">
                                <div className="branch_container_title"> <span>单位:万元</span></div>
                            <ChartLine title="资产变化趋势" ref="graph_asset"/>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="branch_card_title">
                                <div className="branch_container_title"> <span>单位:万元</span></div>
                            <ChartLine title="交易金额变化趋势" ref="graph_amount"/>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="branch_card_title">
                                <div className="branch_container_title"> <span>单位:人</span></div>
                            <ChartLine title="新开户趋势" ref="graph_open_cust_num"/>
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>
            </div>
        )
    }
}

module.exports = CockpitBranchDownstream;
