import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Layout,Menu,Icon,Avatar,Dropdown,Tag,message,Spin,BackTop} from 'antd';
const {Header, Sider, Content,Footer} = Layout;
const {SubMenu} = Menu;
import {Link} from 'react-router-dom';

import logo from 'app_images/logo.jpg';
import min_logo from 'app_images/min_logo.jpg';
import icon_user from 'app_images/icon_user.png';
import icon_logout from 'app_images/icon_logout.png';

import CONSTANTS from 'app_constants';

//import RouteList from '../../router/router';
import {getTargetDescInfo} from '../../api';

import 'app_css/component/baseLayout/index.css';
require('es6-promise').polyfill();

export default class BaseLayout extends Component{

    constructor(props) {
        super(props);

        //this.defaultSelectedKeys = 'dashboard_kpi';  //默认选中的menu
        this.prveActiveMenu = '';       //上次选中的menu
        this.menuTitleMap = {};
        this.menuDescMap = {};
        this.defaultSelectedKeysList = [];
        this.lastUpdateDate = {};
        this.state = {
            collapsed: false,
            routeRender:true,
            defaultSelectedKeys:this.props.defaultSelectedKeys?this.props.defaultSelectedKeys:[],
            defRouter:this.props.defRouter?this.props.defRouter:'/',

        }

        this.toggleCollapsed = this.toggleCollapsed.bind(this);
        this.onSwichMenu = this.onSwichMenu.bind(this);
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            routeRender: false
        });
    }

    componentWillMount(){
        getTargetDescInfo().then(res=>{
            // console.log(res);
            CONSTANTS.TARGETTIPLIST = res;
        })
    }

    // loginOut(){
    //     signOut().then(res=>{
    //         console.log(res);
    //         //return false;
    //         if(res.code==='1001'){
    //             window.location = res.data.url+'?url='+window.location.href;
    //             //window.location.href = res.data.url;
    //         }else{
    //             return false;
    //         }
    //     })
    // }

    menuItem(data){

      let _this = this;
      //let menuTitleMap = {};
      if(data&&data.length){
        return data.map(function(node,index){
          if(node.children&&node.children.length){
              let currentKey = node.key?node.key:((key||"")+index);
              let nTitle = (<span><Icon className={node.menuClass} /><span>{node.title}</span></span>);
              _this.defaultSelectedKeysList.push(currentKey);
            return (<SubMenu key={currentKey} title={nTitle}>
              {_this.menuItem(node.children)}
            </SubMenu>);
          }
          else{
             let currentKey = node.subKey;
            _this.menuTitleMap[currentKey] = node.subTitle;
            _this.menuDescMap[currentKey] = (node.subTitleDesc != undefined) ? node.subTitleDesc:node.subTitle;
            if (node.buildDate) {
                let date_list = {};
                node.buildDate.map(item=>{
                    date_list[item.cubeName] = item.buildDate;
                });
                _this.lastUpdateDate[node.subKey] = date_list;
            }
            return (
                <Menu.Item key={currentKey}>{node.subTitle}</Menu.Item>
            );
          }
        });

      }
      return null;
    }

    onSwichMenu = (arg) => {
        if(arg.key != this.prveActiveMenu){
            this.props.history.push(`/${arg.key.split('_').join('/')}`)
            this.setState({
                routeRender: true
            });
        }
    }

    render(){
        const { location: { pathname } } = this.props;
        let keys = pathname.split('/').slice(1);
        keys = keys.length>2?keys.slice(0,2).join('_'):keys.join('_');
        this.prveActiveMenu = keys;

        let menuItemList = {};
        let loginName = '';
        if( this.props.userData.menuList != undefined ){
            let menuList = this.props.userData.menuList;
            menuItemList = this.menuItem(menuList);
        }

        if( this.props.userData.user != undefined ){
            loginName = this.props.userData.user.lastname ? this.props.userData.user.lastname : this.props.userData.user.loginid;
        }
        //console.log(this.props.userData.user);
        //console.log(loginName);

        //console.log(this.state.defaultSelectedKeys);
        let selectedKeysList = this.state.defaultSelectedKeys;
        if( selectedKeysList.length < 1){
            //没有指定展开的目录，则默认都展开
            selectedKeysList = this.defaultSelectedKeysList;
        }

        return(
            <Layout >
                <Sider trigger={null} collapsible="collapsible" collapsed={this.state.collapsed} className="sider_leftsidebar">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" className="max_logo" />
                            <img src={min_logo} alt="min_logo" className="min_logo" />
                        </Link>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        //defaultSelectedKeys={[this.state.defaultSelectedKeys]}
                        defaultOpenKeys={selectedKeysList}
                        onClick={this.onSwichMenu}
                        selectedKeys={[keys]}
                    >
                        {/* <SubMenu key="sub1" title={<span><Icon className="leftsidebar_ico_1" /><span>领导驾驶舱</span></span>}>
                            <Menu.Item key="dashboard_kpi">KPI</Menu.Item>
                            <Menu.Item key="dashboard_market">市场环境</Menu.Item>
                            <Menu.Item key="dashboard_branch">分支机构</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon className="leftsidebar_ico_2"  /><span>经营报表</span></span>}>
                            <Menu.Item key="management_transaction">交易统计</Menu.Item>
                            <Menu.Item key="management_assetchange">资产变动</Menu.Item>
                            <Menu.Item key="management_cooperatedevelop">合作开发</Menu.Item>
                            <Menu.Item key="management_limithold">限售持仓</Menu.Item>
                            <Menu.Item key="management_customercount">客户统计</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon className="leftsidebar_ico_3"  /><span>鑫管家</span></span>}>
                            <Menu.Item key="managerxin_businessanalysis">业务分析</Menu.Item>
                            <Menu.Item key="10">申赎报表</Menu.Item>
                            <Menu.Item key="11">资产变动</Menu.Item>
                            <Menu.Item key="12">客户分析</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon className="leftsidebar_ico_4" /><span>关联方证券查询</span></span>}>
                            <Menu.Item key="13">自助设定</Menu.Item>
                            <Menu.Item key="14">关联查询</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><Icon className="leftsidebar_ico_5"  /><span>数据导入</span></span>}>
                            <Menu.Item key="15">数据导入</Menu.Item>
                        </SubMenu> */}
                        {menuItemList}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0 }}>
                       <div className="topnav_left">
                            <Icon
                             className="trigger"
                             type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                             onClick={this.toggleCollapsed}
                            />
                            {/* {CONSTANTS.menu_title_map[keys]} */}
                            {this.menuDescMap[keys]}
                        </div>
                        <div className="topnav_right">
                            <img src={icon_user} /> {loginName}
                            <a href="javascript:void(0);" className="topnav_logout" onClick={this.props.loginOut} ><img src={icon_logout} /></a>
                        </div>
                    </Header>
                    <Content className="baselayout">
                        {/* <RouteList needRender={this.state.routeRender}/> */}
                        {this.props.render(this.state.routeRender,this.menuTitleMap,this.state.defRouter,this.lastUpdateDate)}
                    </Content>
                     <BackTop>
                          <div className="gotoTop">
                              <img src={".."+CONSTANTS.APP_BASE_URL+"/resources/images/backtop.png"} />
                          </div>
                     </BackTop>
                </Layout>
            </Layout>
        )
    }
}
