import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Icon} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import {PanelContainer,JfCard,TipTable} from 'app_common';
import {DistributionMap,BranchTree,ChartLine, IndexDotTable,TableModal} from 'app_component';
import {getStructureKey,getStructure,getDistribution} from '../../api';
import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();
const symbolObj = {'-':' I ','（':'︵','）':'︶'};

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;
export default class Hrorg extends Component {

    constructor(props){
        super(props);
        
        this.radioOnChange = this.radioOnChange.bind(this);

        this.state = {
            echartDateList:[],
            echartPriceList:[],
            allTableData:{
                stock_fund_trading:[],
                stock_trading:[],
                fund_trading:[],
                margin_trading:[]
            },
            tableLoading:true,
            klineLoading:true,
            structureData:{},
            orgTreeData:[{}]
        }
    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        this.getTableDateFn(e.target.value);
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
        const structureData = await getStructureKey();
        let orgTreeData = await getStructure();
        _this.prepareTreeData(orgTreeData);
        this.setState({
            structureData:(structureData||{}),
            orgTreeData:[orgTreeData]
        });
        _this.provinceData = {};
        getDistribution().then((res)=>{
            let countryData = [];
            for(let i=0;i<res.length;i++){
                countryData.push({name:res[i].provinceName});
                _this.provinceData[res[i].provinceName] = res[i].cityList;
            }
            _this.refs.graph_map1.refreshGraph({
                countryData,
                provinceData:_this.provinceData['浙江'].map((item)=>(
                    {
                        name:item.cityName,
                        scatterData:item.branchList.map((branchItem)=>(
                            {
                                name:branchItem.branchName,
                                value:[parseFloat(branchItem.lng),parseFloat(branchItem.lat)]
                            }
                        ))
                    }
                ))
            });
        });
    }

    prepareTreeData(data){
        let __org_name = data.org_name;
        for (let s in symbolObj) {
            __org_name = __org_name.replace(eval('/'+ s +'/g'),symbolObj[s]);
        }
        data.label = __org_name;
        data.tooltipData = [
            {name:'部门负责人',value:data.principal_name},
            {name:'部门人数',value:data.staff_num+'人'}
        ];
        if(data.children){
            for(let i=0;i<data.children.length;i++){
                this.prepareTreeData(data.children[i]);
            }
        }
    }

    getProvinceData(province){
        return this.provinceData[province].map((item)=>(
            {
                name:item.cityName,
                scatterData:item.branchList.map((branchItem)=>(
                    {
                        name:branchItem.branchName,
                        value:[parseFloat(branchItem.lng),parseFloat(branchItem.lat)]
                    }
                ))
            }
        ));
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render() {

        let {structureData} = this.state;

        return (
            <div>
                <PanelContainer title='关键指标' hasTip={()=>{return this.returnTipTable('01')}}>
                    <Row gutter={16}>
                        <Col >
                        <JfCard className="org_card_bg">
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>集团员工数</i>
                                    <span>{structureData.company_staff_num||'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>总部员工数</i>
                                    <span>{structureData.headquarters_staff_num||'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>分支机构员工数</i>
                                    <span>{structureData.branch_staff_num||'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>子公司员工数</i>
                                    <span>{structureData.sub_company_staff_num||'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>分公司个数</i>
                                    <span>{structureData.sub_company_num||'-'}</span><em>个</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                                <div className="org_card_title">
                                    <i>营业网点数</i>
                                    <span>{structureData.sales_department_num||'-'}</span><em>个</em>
                                </div>
                            </Col>

                        </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='组织结构' hasTip={()=>{return this.returnTipTable('02')}}>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard className="org_barch_tree"  >
                            <BranchTree
                              treeData={this.state.orgTreeData}
                              levelIcon={[<Icon type="home" />,<Icon type="environment-set" />,<Icon type="setting" />]}
                              initialExpandedNodes={[0]}
                              />
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='机构分布' hasTip={()=>{return this.returnTipTable('03')}}>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="org_height">
                        <DistributionMap
                            ref='graph_map1'
                            title="浙江省"
                            getProvinceData={this.getProvinceData.bind(this)}
                        />
                        </div>
                        </Col>

                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>

            </div>
        )
    }
}

module.exports = Hrorg;
