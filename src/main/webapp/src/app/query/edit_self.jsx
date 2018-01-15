import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table, Input, Popconfirm,Icon,Button,Modal } from 'antd';
import _ from 'underscore';
import $ from 'jquery';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
import axios from 'axios';
import {getTableDate,getRelationGroup,getRelationItem,
    insertRelationItem,updateRelationItem,deleteRelationItem} from '../../api';

const Option = Select.Option;
require('es6-promise').polyfill();

//板块说明配置
// 表格
const EditableCell = ({ editable, value, onChange,editableselect }) => {
    let addItem = undefined;
    if (editableselect === 'trade_check' ) {
        addItem = <Select dropdownMatchSelectWidth value={value} onChange={e => onChange(e)} className="edit_self_select">
            <Option value="持续核查">持续核查</Option>
            <Option value="待定">待定</Option>
        </Select>
    }else if (editableselect === 'sex' ){
        addItem = <Select dropdownMatchSelectWidth value={value} onChange={e => onChange(e)} className="edit_self_select">
            <Option value="无">无</Option>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
        </Select>
    }else {
        addItem = <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    }
    return (
        <div>
          {editable
            ? addItem
            : value
          }

        </div>
    )
}
export default class Editself extends Component {
    constructor(props){
        super(props);
        this.radioOnChange = this.radioOnChange.bind(this);

        //
    this.columns = [{
     title: '序号',
     dataIndex: 'ordinal',
     width: 60,

   }, {
     title: '名称',
     dataIndex: 'name',
     width:320,
     render: (text, record) => this.renderColumns(text, record, 'name'),
   }, {
     title: '营业执照(统一社会信用码)/身份证号',
     dataIndex: 'code',
     width: '24%',
     render: (text, record) => this.renderColumns(text, record, 'code'),
   },{
     title: '关联交易核查期间',
     dataIndex: 'trade_check',
     width:180,
     render: (text, record) => this.renderColumns(text, record, 'trade_check'),
   },{
     title: '职务',
     dataIndex: 'job',
     width: 90,

     render: (text, record) => this.renderColumns(text, record, 'job'),
 },{
   title: '性别',
   dataIndex: 'sex',
    width: 100,

   render: (text, record) => this.renderColumns(text, record, 'sex'),
 },{
   title: '备注',
   dataIndex: 'remark',
    width: 90,

   render: (text, record) => this.renderColumns(text, record, 'remark'),
 },
  {
     title: '操作',
     dataIndex: 'operation',
     width: '16%',
     render: (text, record) => {
       const { editable } = record;
       return (
         <div className="editable-row-operations">
         <Popconfirm title="确定要删除吗?" onConfirm={this.deleteItem.bind(this,record.key)}>
           <a>删除</a>
         </Popconfirm>
           {
             editable ?
               <span className="edit_self_btn">
                   <a onClick={() => this.cancel(record.key)}>取消</a>
                   <a onClick={() => this.save(record.key)}>保存</a>
               </span>
               : <a onClick={() => this.edit(record.key)}>编辑</a>
           }
         </div>
       );
     },
   }];
   this.initialItem = {
       itemName:'',
       itemTradeCheck:'',
       itemCode:'',
       itemSex:'',
       itemJob:'',
       itemRemark:'',
   };
   this.state = {
       data:[],
       groupOptions:[],
       groupId:'',
       insertItem:this.initialItem
   };

 }

 // 弹出框
 state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
      let {insertItem} = this.state;
      let _this = this;
      let groupId = this.state.groupId;
      if((!insertItem.itemName)||insertItem.itemName.trim()===''){
          message.error('请输入名称！');
          return;
      }
      if(!insertItem.itemTradeCheck){
          message.error('请选择关联交易核查期间！');
          return;
      }
      if((!insertItem.itemCode)||insertItem.itemCode.trim()===''){
          message.error('请输入营业执照/身份证号！');
          return;
      }
      insertRelationItem({
          ...this.state.insertItem,
          groupId
      }).then((res)=>{
          if(res.msg==='success'){
              message.success('新增成功！');
              _this.setState({
                  visible: false,
                  insertItem:_this.initialItem
              });
              getRelationItem({groupId}).then((data)=>{
                  _this.cacheData = _.map(data,(item,index)=>(
                      {...item,ordinal:index+1,key:index}
                  ));
                  _this.setState({
                      data:_this.cacheData
                  });
              });
          }
          else {
              message.error(res.msg);
          }
      });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      insertItem:{}
    });
  }

    //表格可编辑
    renderColumns(text, record, column) {
      return (
        <EditableCell
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, column)}
          editableselect={column}
        />
      );
    }
    handleChange(value, key, column) {
      const newData = $.extend(true,[],this.state.data);
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.setState({ data: newData });
      }
    }
    edit(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.setState({ data: newData });
      }
    }

    deleteItem(key){
        let _this = this;
        let target = this.state.data.filter(item => key===item.key)[0];
        if(target){
            deleteRelationItem({itemId:target.id}).then((res)=>{
                if(res.code==='0'){
                    message.success('删除成功！');
                    getRelationItem({groupId:_this.state.groupId}).then((data)=>{
                        _this.cacheData = _.map(data,(item,index)=>(
                            {...item,ordinal:index+1,key:index}
                        ));
                        _this.setState({
                            data:_this.cacheData
                        });
                    });
                }
                else {
                    message.error(res.msg);
                }
            });
        }
    }

    save(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      let _this = this;
      if (target) {
          let {id,name,trade_check,code,job,sex,remark} = target;
          console.log(target);
          updateRelationItem({
              itemId:id,
              itemName:name,
              itemTradeCheck:trade_check,
              itemCode:code,
              itemJob:job,
              itemSex:sex,
              itemRemark:remark,
              groupId:this.state.groupId
          }).then((res)=>{
              if(res.msg==='success'){
                  message.success('修改成功！');
                  delete target.editable;
                  _this.setState({ data: newData });
                  _this.cacheData = newData.map(item => ({ ...item }));
              }
              else {
                  message.error(res.msg);
              }
          });
      }
    }
    cancel(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      let oldItem = this.cacheData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, oldItem);
        delete target.editable;
        this.setState({ data: newData });
      }
    }
    radioOnChange(e){
        this.setState({
            tableLoading:true
        })
        // this.getTableDateFn(e.target.value);
    }

    componentDidMount(){
        let _this = this;
        getRelationGroup().then(function(res) {
            let groupId = res[0]?((res[0].id||'')+''):'';
            if(groupId!==''){
                getRelationItem({groupId}).then((data)=>{
                    _this.cacheData = _.map(data,(item,index)=>(
                        {...item,ordinal:index+1,key:index}
                    ));
                    _this.setState({
                        data:_this.cacheData,
                        groupOptions:res,
                        groupId
                    });

                });
            }
            else {
                _this.setState({groupOptions:res,groupId});
            }
        });
    }

    selectGroup(groupId){
        let _this = this;
        getRelationItem({groupId}).then(function (data) {
            _this.cacheData = _.map(data,(item,index)=>(
                {...item,ordinal:index+1,key:index}
            ));
            _this.setState({
                data:_this.cacheData,
                groupId
            });
        });
    }

    onModalDataChange(name,data){
        let insertItem = this.state.insertItem;
        switch (name) {
            case 'itemTradeCheck':
            case 'itemSex':
                insertItem[name] = data;
                break;
            default:
                insertItem[name] = data.target.value;
        }
        this.setState({insertItem});
    }
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    render() {
        return(
            <div>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="self_icon">
                            <JfCard className="edit_self" title="修改关联名单组"  hasTip={()=>{return this.returnTipTable('78')}}>
                                <div className="edit_self_sx">
                                名单组选择：
                                <Select value={this.state.groupId} onChange={this.selectGroup.bind(this)}>
                                  {_.map(this.state.groupOptions,(option,index)=>(
                                      <Option key={index} value={option.id+''} title={option.name}>{option.name}</Option>
                                  ))}
                                </Select> <Button type="primary" icon="plus" onClick={this.showModal} ></Button>

                                <Modal
                                  title="新增"
                                  visible={this.state.visible}
                                  onOk={this.handleOk}
                                  onCancel={this.handleCancel}
                                  className="modal_form"
                                >
                                  <p><label>名称：</label><Input
                                  value={this.state.insertItem.itemName}
                                  placeholder="请填入名称"
                                  onChange={this.onModalDataChange.bind(this,'itemName')}/></p>
                                  <div className="edit_self_label">
                                      <label>关联交易核查期间：</label>
                                      <Select value={this.state.insertItem.itemTradeCheck}
                                      onChange={this.onModalDataChange.bind(this,'itemTradeCheck')}>
                                        <Option value="持续核查">持续核查</Option>
                                        <Option value="待定">待定</Option>
                                      </Select>
                                  </div>
                                  <p><label>营业执照/身份证号：</label><Input value={this.state.insertItem.itemCode}
                                  onChange={this.onModalDataChange.bind(this,'itemCode')}/></p>
                                  <div className="edit_self_label"><label>性别：</label>
                                      <Select
                                      placeholder="请选择"
                                      value={this.state.insertItem.itemSex}
                                      onChange={this.onModalDataChange.bind(this,'itemSex')}>
                                        <Option value="无">无</Option>
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                      </Select>
                                  </div>
                                  <p><label>职务：</label><Input
                                  value={this.state.insertItem.itemJob}
                                  placeholder="请填入职务"
                                  onChange={this.onModalDataChange.bind(this,'itemJob')}/></p>
                                  <p><label>备注：</label><Input value={this.state.insertItem.itemRemark}
                                  onChange={this.onModalDataChange.bind(this,'itemRemark')}/></p>
                                </Modal>
                                </div>

                              <Table bordered dataSource={this.state.data} columns={this.columns} className="edit_self_table" />
                            </JfCard>
                        </Col>
                    </Row>

            </div>
        )
    }
}

module.exports = Editself;
