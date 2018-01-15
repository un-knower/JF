import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table,Icon,Popconfirm} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
import axios from 'axios';
import {getTableDate,getRelationGroup2,deleteRelationGroup} from '../../api';

require('es6-promise').polyfill();

//板块说明配置
export default class Delself extends Component {
    constructor(props){
        super(props);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.state = {
            data:[]
        };
        this.columns = [{
          title: '序号',
          dataIndex: 'number',
          key: 'number',

        }, {
          title: '名单组名',
          dataIndex: 'name',
          key: 'name',
          width:'40%'
        }, {
          title: '添加日期',
          dataIndex: 'create_time',
          key: 'create_time',
        },{
          title: '最新更新日期',
          dataIndex: 'update_time',
          key: 'update_time',
        },{
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
                <Popconfirm title="确定要删除吗?"
                onConfirm={this.deleteGroup.bind(this,record.key)}>
                  <a>删除</a>
                </Popconfirm>
            </span>
          ),
        }];
    }

    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        // this.getTableDateFn(e.target.value);
    }

    deleteGroup(key){
        let _this = this;
        let target = this.state.data.filter((item)=>(item.key===key))[0];
        if(target){
            deleteRelationGroup({groupId:target.id}).then((res)=>{
                if(res.code==='0'){
                    message.success('删除成功！');
                    _this.getGroupData();
                }
                else {
                    message.error(res.msg);
                }
            });
        }
        this.setState();
    }

    componentDidMount(){
        this.getGroupData();
    }

    getGroupData(){
        let _this = this;
        getRelationGroup2().then((data)=>{
            _this.setState({
                data:data.map((item,index)=>(
                    {...item,key:index,number:index+1}
                ))
            });
        });
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
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="self_icon">
                            <JfCard className="delself_table"   title="删除关联名单组" hasTip={()=>{return this.returnTipTable('79')}}>
                            <Table bordered columns={this.columns} dataSource={this.state.data} />
                            </JfCard>
                        </Col>
                    </Row>

            </div>
        )
    }
}

module.exports = Delself;
