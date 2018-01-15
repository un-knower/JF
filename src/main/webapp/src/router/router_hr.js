import React from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import {Bundle} from 'app_common';
import _ from 'underscore';

// import Page_01 from 'app_page/cockpit/dashboard';
// import Page_02 from '../app/page02';


//第一种
// const Page_02 = () => {
//     require.ensure(['../app/page02'], (require) => {
//         const UserComponent = require('../app/page02');
//         this.setState({
//             currentComponent: <UserComponent />
//         })
// },'jf_')
// 改成这个样子。同时bundle 也要修改
// const Chat = (props) => (
//     <Bundle load={(cb) => {
//         require.ensure([], require => {
//             cb(require('./component/chat'));
//         });
//     }}>
//     {(Chat) => <Chat {...props}/>}
//   </Bundle>
// );

//这种方式也可以
//import Page_02 from 'bundle-loader?lazy&name=pg_1!../app/page02.jsx';
// const Page_02ee = (props) => (
//     <Bundle load={Page_02}>
//         {(Page_02) => <Page_02 {...props}/>}
//     </Bundle>
// )


//
// const Page_02 = (props) => (
//     <Bundle load={() => import('../app/page02.jsx')}>
//         {(Page) => <Page {...props} />}
//     </Bundle>
// )

// const makeBundleFactory = (props,path,pagename) => {
//     return (<Bundle load={() => import(`../app/${path}/${pagename}.jsx`)}>
//         {(Page) =><Page {...props} />}
//     </Bundle>)
// }
//
//const aList = {};

//这种可以，但是import返回的是promise .bundle要做出相应的修改
const router_hr_org = (props) => (
    <Bundle load={() => import('../app/hr/org.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const router_hr_dep = (props) => (
    <Bundle load={() => import('../app/hr/dep.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const router_hr_staff = (props) => (
    <Bundle load={() => import('../app/hr/staff.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const router_hr_personas = (props) => (
    <Bundle load={() => import('../app/hr/personas.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)


const router_performance_join = (props) => (
    <Bundle load={() => import('../app/performance/join.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const router_performance_perf = (props) => (
    <Bundle load={() => import('../app/performance/perf.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const router_performance_profile = (props) => (
    <Bundle load={() => import('../app/performance/profile.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const router_performance_train = (props) => (
    <Bundle load={() => import('../app/performance/train.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const router_information_collection = (props) => (
    <Bundle load={() => import('../app/information/collection.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const PrivateRoute = ({ component: Component, ...rest }) => {

    if( rest['ckey'] == undefined ){
        rest['ckey'] = rest['path'].replace(/\//g,'_').replace(/^_/,'');
    }

    return <Route {...rest} render={props => (<Component {...props} date={rest.date || false}/>)}/>

}

class RouteList extends React.Component{

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.needRender
    }

    render(){
        const {mList,lastUpdateDate} = this.props;
        return(
            <div>
                <Switch>

                    <PrivateRoute path="/hr/org" component={router_hr_org} mlist={mList}  date={lastUpdateDate['hr_org']} />
                    <PrivateRoute path="/hr/dep" component={router_hr_dep} mlist={mList} date={lastUpdateDate['hr_dep']} />
                    <PrivateRoute path="/hr/staff" component={router_hr_staff} mlist={mList}  date={lastUpdateDate['hr_staff']} />
                    <PrivateRoute path="/hr/personas" component={router_hr_personas} mlist={mList} date={lastUpdateDate['hr_personas']}  />


                    <PrivateRoute path="/performance/join" component={router_performance_join} mlist={mList}  date={lastUpdateDate['performance_join']} />
                    <PrivateRoute path="/performance/perf" component={router_performance_perf} mlist={mList}  date={lastUpdateDate['performance_perf']} />
                    <PrivateRoute path="/performance/profile" component={router_performance_profile} mlist={mList}  date={lastUpdateDate['performance_profile']} />
                    <PrivateRoute path="/performance/train" component={router_performance_train} mlist={mList}  date={lastUpdateDate['performance_train']} />

                    <PrivateRoute path="/information/collection" component={router_information_collection} mlist={mList}  date={lastUpdateDate['information_collection']} />

                    <Redirect to={this.props.defRouter} />
                </Switch>
            </div>
        )
    }
}

export default RouteList
