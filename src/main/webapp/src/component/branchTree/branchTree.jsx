import React,{Component} from 'react';
import _ from 'underscore';
import BranchTreeNode from './component/branchTreeNode';
import {Row} from 'antd';

/*
treeData:[{
    label:'',
    children:[]
}]
initialExpandedNodes:[0,3] 每层默认打开的节点index,null或不设置表示全部关闭
*/

export default class BranchTree extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandedNodes:this.props.initialExpandedNodes||[0],
            treeData:this.props.treeData
        };
    }
    //根节点levelIndex为0,切换对应层的展开节点
    onExpandChange(levelIndex,nodeIndex,expanded){
        //console.log(levelIndex,nodeIndex);
        let expandedNodes = this.state.expandedNodes.slice(0,levelIndex);
        if(expanded){
            expandedNodes[levelIndex] = nodeIndex;
        }
        else {
            expandedNodes[levelIndex] = null;
        }
        this.setState({expandedNodes});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            treeData:nextProps.treeData,
            expandedNodes:nextProps.initialExpandedNodes||[0]
        });
    }

    //自定义title悬浮框是否显示控制
    showTitleLevelFun(levelIndex,parent_id){
        if( levelIndex > 1 ){
            if (parent_id==='GFGSJYYB001') return true
            return false;
        }

        return true;
    }

    render(){
        let levelData = [this.state.treeData];
        let currentLevelData = this.state.treeData;
        let expandedNodes = this.state.expandedNodes;
        for(let i=0;i<expandedNodes.length;i++){
            if(expandedNodes[i]||expandedNodes[i]===0){
                let expandedIndex = expandedNodes[i];
                levelData.push(currentLevelData[expandedIndex].children||[]);
                currentLevelData = currentLevelData[expandedIndex].children||[];
            }
            else {
                break;
            }
        }
        let _this = this;
        let icons = this.props.levelIcon||[];
        return (<div>
            {_.map(levelData,function(level,levelIndex) {
                //一层
                return (<Row key={levelIndex} style={{width:level.length*29}}>
                    {_.map(level,function(node,nodeIndex) {
                        //一个节点
                        return (<BranchTreeNode
                        nodeData={node}
                        isRootNode={levelIndex===0&&level.length===1}
                        key={levelIndex+'-'+nodeIndex}
                        expandedNodeCurrent={expandedNodes[levelIndex]}
                        nodeIndex={nodeIndex}
                        icon={icons[levelIndex]}
                        currentLevelTotal={level.length}
                        levelIndex={levelIndex}
                        showTitleLevelFun = {_this.showTitleLevelFun.bind(this,levelIndex,node.parent_id)}
                        onExpandChange={_this.onExpandChange.bind(_this,levelIndex,nodeIndex)}
                        />);
                    })}
                    </Row>);
            })}
            </div>);
    }
}
