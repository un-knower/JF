import React,{Component} from 'react';
import {Button,Tooltip} from 'antd';
import _ from 'underscore';

export default class BranchTreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded:(this.props.nodeIndex===this.props.expandedNodeCurrent),
            nextLevelExist:(this.props.expandedNodeCurrent||this.props.expandedNodeCurrent===0)
        };
        let width = '50%';
        //层级连接线的样式
        let levelLineStyle = 'solid 1px #ccc';
        //层级连接线一半的高度
        let halfLevelLineHeight = 15;
        //上半截层级连接线
        this.levelLinesTop = {
            //只有向下的线
            down:<div key="top"
            style={{
                width,
                height:halfLevelLineHeight,
                borderRight:levelLineStyle,
            }}></div>,
            //先向下后向左
            downLeft:<div key="top"
            style={{
                width,
                height:halfLevelLineHeight,
                borderRight:levelLineStyle,
                borderBottom:levelLineStyle
            }}></div>,
            downRight:<div key="top"
            style={{
                width,
                height:halfLevelLineHeight,
                borderLeft:levelLineStyle,
                borderBottom:levelLineStyle,
                marginLeft:width
            }}></div>,
            //位于中间的层级连接线
            pass:<div key="top"
            style={{
                width:'100%',
                height:halfLevelLineHeight,
                borderBottom:levelLineStyle
            }}></div>,
            //只有左边一半的连接线
            passLeft:<div key="top"
            style={{
                width,
                height:halfLevelLineHeight,
                borderBottom:levelLineStyle
            }}></div>,
            passRight:<div key="top"
            style={{
                width,
                height:halfLevelLineHeight,
                borderBottom:levelLineStyle,
                marginLeft:width
            }}></div>,
            //无连接线
            empty:<div key="top"
            style={{
                height:halfLevelLineHeight
            }}></div>
        };
        //下半截层级连接线
        this.levelLinesBottom = {
            left:<div key="bottom"
            style={{
                height:halfLevelLineHeight,
                borderLeft:levelLineStyle
            }}></div>,
            center:<div key="bottom"
            style={{
                width,
                height:halfLevelLineHeight,
                borderRight:levelLineStyle
            }}></div>,
            empty:<div key="bottom"
            style={{
                height:halfLevelLineHeight
            }}></div>
        };
    }
    onClickIcon(){
        let expanded = (!this.state.expanded);
        this.props.onExpandChange(expanded);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.expandedNodeCurrent!=this.props.expandedNodeCurrent){
            let nextLevelExist = (nextProps.expandedNodeCurrent||nextProps.expandedNodeCurrent===0);
            let expanded = (this.props.nodeIndex===nextProps.expandedNodeCurrent);
            this.setState({
                expanded,
                nextLevelExist
            });
        }
    }
    render(){
        let centerPosition = this.props.currentLevelTotal/2;
        let nodeIndex = this.props.nodeIndex;
        let expandedIndex = this.props.expandedNodeCurrent;
        let bottom = 'empty';
        if(centerPosition-nodeIndex===0.5){
            bottom = 'center';
        }
        else if (centerPosition===nodeIndex) {
            bottom = 'left';
        }
        let levelLines = [];
        levelLines[1] = this.levelLinesBottom[bottom];
        let top = 'empty';
        if(this.state.expanded){
            if(bottom==='center'){
                top = 'down';
            }
            else if (centerPosition<=nodeIndex) {
                top = 'downLeft';
            }
            else {
                top = 'downRight';
            }
        }
        else {
            if(bottom==='center'){
                if(nodeIndex>expandedIndex){
                    top = 'passLeft';
                }
                else {
                    top = 'passRight';
                }
            }
            else {
                if((nodeIndex>=centerPosition&&nodeIndex<expandedIndex)
                ||(nodeIndex>expandedIndex&&nodeIndex<centerPosition)){
                    top = 'pass';
                }
            }
        }
        levelLines[0] = this.levelLinesTop[top];
        let label;
        if(this.props.nodeData.tooltipData&&(!this.props.isRootNode)){
            let title='';
            //console.log(this.props.showTitleLevelFun());
            if( this.props.showTitleLevelFun() ){
                title=_.map(this.props.nodeData.tooltipData,function(item,index) {
                    return <div key={index}>{item.name+' : '+item.value}</div>;
                })
            }

            label = <Tooltip title={title} >
                <div className="org_tree_first" >
                  {this.props.nodeData.label}
                </div>
            </Tooltip>;
        }
        else {
            label = <div className="branch_width_ico" >
              {this.props.nodeData.label}
            </div>;
        }
        return (
            <div
            className={this.props.isRootNode?"branch_tree_fristno":"branch_tree_frist"}
            style={{
                height:'100%',
                float:'left',

            }}>
                <div style={{
                    padding:4,
                    width:'100%',
                    height:'100%'
                }}>
                    {this.props.icon}
                    {label}
                    {
                        (this.props.nodeData.children&&this.props.nodeData.children.length)?
                        (<Button size='small'
                        onClick={this.onClickIcon.bind(this)}>
                        {this.state.expanded?'-':'+'}
                        </Button>):<div style={{height:'22px'}}></div>
                    }
                </div>
                {this.state.nextLevelExist?levelLines:null}
            </div>
        );
    }
}
