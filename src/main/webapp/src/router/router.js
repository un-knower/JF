import React from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import {Bundle} from 'app_common';
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

//这种可以，但是import返回的是promise .bundle要做出相应的修改
const dashboard_kpi = (props) => (
    <Bundle load={() => import('../app/dashboard/kpi.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const dashboard_market = (props) => (
    <Bundle load={() => import('../app/dashboard/market.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const dashboard_branch = (props) => (
    <Bundle load={() => import('../app/dashboard/branch.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const dashboard_branch_detail = (props) => (
    <Bundle load={() => import('../app/dashboard/branch_downstream.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)


const management_transaction = (props) => (
    <Bundle load={() => import('../app/management/transaction.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const management_assetchange = (props) => (
    <Bundle load={() => import('../app/management/assetchange.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const management_cooperatedevelop = (props) => (
    <Bundle load={() => import('../app/management/cooperatedevelop.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const management_limithold = (props) => (
    <Bundle load={() => import('../app/management/limithold.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const management_customercount = (props) => (
    <Bundle load={() => import('../app/management/customercount.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)


const managerxin_businessanalysis = (props) => (
    <Bundle load={() => import('../app/managerxin/businessanalysis.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const managerxin_report = (props) => (
    <Bundle load={() => import('../app/managerxin/report.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const managerxin_assets = (props) => (
    <Bundle load={() => import('../app/managerxin/assets.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const managerxin_analysis = (props) => (
    <Bundle load={() => import('../app/managerxin/analysis.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const query_self = (props) => (
    <Bundle load={() => import('../app/query/self.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)
const query_relation = (props) => (
    <Bundle load={() => import('../app/query/relation.jsx')}>
        {(Page) => <Page {...props} />}
    </Bundle>
)

const import_data = (props) => (
    <Bundle load={() => import('../app/import/data.jsx')}>
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
                    <PrivateRoute path="/dashboard/kpi" component={dashboard_kpi} mlist={mList} date={lastUpdateDate['dashboard_kpi']} />
                    <PrivateRoute path="/dashboard/market" component={dashboard_market} mlist={mList} date={lastUpdateDate['dashboard_market']} />
                    <PrivateRoute path="/dashboard/branch" exact component={dashboard_branch} mlist={mList} date={lastUpdateDate['dashboard_branch']} />
                    <PrivateRoute path="/dashboard/branch/detail:id" exact component={dashboard_branch_detail} mlist={mList} />

                    <PrivateRoute path="/management/transaction" component={management_transaction} mlist={mList} date={lastUpdateDate['management_transaction']} />
                    <PrivateRoute path="/management/assetchange" component={management_assetchange} mlist={mList} date={lastUpdateDate['management_assetchange']} />
                    <PrivateRoute path="/management/cooperatedevelop" component={management_cooperatedevelop} mlist={mList} date={lastUpdateDate['management_cooperatedevelop']} />
                    <PrivateRoute path="/management/limithold" component={management_limithold} mlist={mList} date={lastUpdateDate['management_limithold']} />
                    <PrivateRoute path="/management/customercount" component={management_customercount} mlist={mList} date={lastUpdateDate['management_customercount']} />

                    <PrivateRoute path="/managerxin/businessanalysis" component={managerxin_businessanalysis} mlist={mList} date={lastUpdateDate['managerxin_businessanalysis']} />
                    <PrivateRoute path="/managerxin/report" component={managerxin_report} mlist={mList} date={lastUpdateDate['managerxin_report']} />
                    <PrivateRoute path="/managerxin/assets" component={managerxin_assets} mlist={mList} date={lastUpdateDate['managerxin_assets']} />
                    <PrivateRoute path="/managerxin/analysis" component={managerxin_analysis} mlist={mList} date={lastUpdateDate['managerxin_analysis']} />

                    <PrivateRoute path="/query/self" component={query_self} mlist={mList} date={lastUpdateDate['query_self']} />
                    <PrivateRoute path="/query/relation" component={query_relation} mlist={mList} date={lastUpdateDate['query_relation']} />

                    <PrivateRoute path="/import/data" component={import_data} mlist={mList}  />

                    <Redirect to={this.props.defRouter} />
                </Switch>
            </div>
        )
    }
}

export default RouteList
