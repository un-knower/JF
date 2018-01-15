import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card,Spin,Tooltip,Icon} from 'antd';

import 'app_css/common/jfCard/index.css';

const JfCard = (props) => {
    const title = props.title?<span>
        {props.title}
        {props.hasTip?<Tooltip placement="rightTop" title={props.hasTip} arrowPointAtCenter={true}>
            <Icon type="info-circle" className="righttop_color" />
        </Tooltip>:undefined}
    </span>:undefined
    return (
        <div className="card_layout_module">
            <div className="card_branch">
                <Card bordered={false} title={title} className={props.className} >
                	<Spin spinning={props.loading?props.loading:false} tip="正在加载...">
                    	{props.children}
                    </Spin>
                </Card>
            </div>
        </div>
    )
}

export default JfCard
