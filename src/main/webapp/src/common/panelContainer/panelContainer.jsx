import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card,Radio,Tooltip,Icon,Alert} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import 'app_css/common/panelContainer/index.css';

const PanelContainer = (props) => {
    return (
        <div style={{marginBottom:22,display:props.hide?'none':''}}>
            <div className='pc-title'>
                <div className='pc-title-left'>
                    {props.title}
                    {props.hasTip?<Tooltip placement="rightTop" title={props.hasTip} arrowPointAtCenter={true}>
                        <Icon type="info-circle" style={{marginLeft:16,fontSize: 14}}/>
                    </Tooltip>:undefined}
                </div>
                {props.hasRadio?<div className='pc-title-right'>
                    {props.hasRadio}
                </div>:undefined}
            </div>

                {props.alert?<Alert message={props.alert} className="alert_color" type="warning"  closable />:undefined}

            {props.hasFilter?<div className='pc-filter'>
                {props.hasFilter}
            </div>:undefined}
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default PanelContainer
