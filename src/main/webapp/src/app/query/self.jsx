import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio, Row, Col, Spin} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {PanelContainer, JfTable ,JfCard,Table} from 'app_common';
import {getKpiLeftTarget} from '../../api';
import AddSelf from './add_self';
import EditSelf from './edit_self';
import DelSelf from './del_self';
import CONSTANTS from 'app_constants';

export default class Self extends Component {
    constructor(props) {
        super(props);
        this.radioOnChange = this.radioOnChange.bind(this);
        this.state = {
            currentTag:'achievement',


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
        if (this.state.currentTag == 'achievement') return <AddSelf />
        else if (this.state.currentTag == 'income') return <EditSelf />
        else if (this.state.currentTag == 'asset') return <DelSelf />
    }





    render() {

        const typeRadio = (
            <RadioGroup onChange={(e)=>{this.radioOnChange(e,'type')}} defaultValue="achievement" size='large'>
                <RadioButton value="achievement">添加关联名单组</RadioButton>
                <RadioButton value="income">修改关联名单组</RadioButton>
                <RadioButton value="asset">删除关联名单组</RadioButton>
            </RadioGroup>
        )

        return (<div >

            <PanelContainer title='关联名单自助设定'  hasRadio={typeRadio}>
                {this.returnComponent()}
            </PanelContainer>
            <div className='layout-footer'>本页数据更新至{this.props.date.c_related_trade_statistics_01}</div>
        </div>)
    }
}

module.exports = Self;
