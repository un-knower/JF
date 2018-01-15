import React from 'react'
import ReactDOM from 'react-dom';
import {Icon} from 'antd';
import {BaseLayout} from 'app_component';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import {userAuth,signOut,signInRedirect} from './api';
import 'app_css/common.css';
// const basename = location.hostname + location.pathname;
// console.log(location.hostname)
// console.log(location.pathname)
import RouteList from './router/router';


const loginOut = ()=>{
    signOut().then(res=>{
    })
}

const App = (props) => {
    let userData = props.userData;
    const defRouter = userData.menuList[0].children[0].menuLink;
    return (
        <Router basename='/'>
            <Switch>
                {/* <Route path='/' render={(props)=>{return <BaseLayout  menuList={menuList} {...props} />}} /> */}
                  <Route path='/' render={(props)=><BaseLayout defRouter={defRouter} loginOut={loginOut} userData={userData} {...props} render={(needRender,mList,defRouter,lastUpdateDate)=><RouteList mList={mList} lastUpdateDate={lastUpdateDate} defRouter={defRouter} needRender={needRender} />} />} />
            </Switch>
        </Router>
    )
}



userAuth().then(res=>{
    //return false;;
    //res = {"code":"0","data":{"menuList":[{"key":"sub1","title":"领导驾驶舱","menuClass":"leftsidebar_ico_1","children":[{"menuLink":"/dashboard/kpi","subKey":"dashboard_kpi","subTitle":"KPI"},{"menuLink":"/dashboard/market","subKey":"dashboard_market","subTitle":"市场环境"}]}],"roles":[{"cn":"manager"},{"cn":"user"}],"branch":[{"gtId":"900","name":"信息技术中心-应用研发部","id":665}],"user":{"loginid":"zhumn","userid":"CT06609","lastname":"祝茂农"}},"msg":"success"};
    if(res.code==='1001'){
        signInRedirect(res.data);
    }else{
        let userData = res.data;
        //console.log(menuList);
        ReactDOM.render(<App userData={userData} />, document.getElementById("container"));
    }
    //return false;
});
// ReactDOM.render(<App />, document.getElementById("container"));
