webpackJsonp([9],{1364:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(186),l=r(n),i=a(1385),o=r(i),s=a(34),u=r(s),d=a(281),c=r(d),p=a(7),f=r(p),h=a(279),m=r(h),b=a(280),C=r(b),g=a(96),v=r(g),y=a(12),D=r(y),x=a(2),_=r(x),S=a(6),w=r(S),k=a(4),L=r(k),N=a(5),I=r(N);a(187),a(282);var B=a(0),T=r(B),E=a(11),P=(r(E),a(25)),Y=a(183),M=a(30),R=r(M),O=a(1),V=r(O),F=a(184),q=r(F),J=a(569),K=r(J),z=a(20),A=r(z);a(135).polyfill();var j=function(e){function t(e){(0,_.default)(this,t);var a=(0,L.default)(this,(t.__proto__||(0,D.default)(t)).call(this,e));return a.getBranchChildNameList=function(e){var t=(0,v.default)(a.branchChildrenList),r=e.map(function(e){return t.indexOf(e)>=0?a.branchChildrenList[e]:e});return R.default.reduceRight(r,function(e,t){return e.concat("number"==typeof t?[t]:t)},[]).join(",")},a.state={reportDataSources:[],commonControllers:[],tableCurrentPage:1,reportDataSourcesTotal:0,tableLoading:!1,reportTitle:""},a.handlePaginationOnChange=a.handlePaginationOnChange.bind(a),a.commonControllers={start:{type:"startDate",name:"startDate",width:5,label:"统计开始日期：",defaultValue:P.Tools.getStartDefaultDate({date:a.props.date.c_cashclient_business_01,formart:"YYYY-MM-DD",addType:"months",addVal:-1}),labelCol:"48%",wrapperCol:"52%"},end:{type:"endDate",name:"endDate",width:5,label:"统计结束日期：",defaultValue:P.Tools.getStartDefaultDate({date:a.props.date.c_cashclient_business_01,formart:"YYYY-MM-DD"}),labelCol:"48%",wrapperCol:"52%"},productid:{type:"tagSelect",name:"prodCode",placeholder:"请选择",width:4,label:"产品编号:",labelCol:"42%",wrapperCol:"58%",options:[],defaultValue:""},indicator:{type:"select",name:"indexId-1",width:9,label:"指标筛选：",className:"ant-branch-left",options:[],placeholder:"请选择",defaultValue:"",labelCol:"25.5%",wrapperCol:"74%"},inputstart:{type:"input",name:"inputstart-1",placeholder:"输入资金",width:3,label:"从",labelCol:"20%",wrapperCol:"80%",defaultValue:"",checkInput:!0},inputend:{type:"input",name:"inputend-1",placeholder:"输入资金",width:3,label:"到",labelCol:"20%",wrapperCol:"80%",defaultValue:"",checkInput:!0},branchNo:{type:"treeSelect",name:"branchId",width:5,label:"营业部名称：",placeholder:"请选择",className:"ant-branch-left",treeData:[],defaultValue:[],labelCol:"43%",wrapperCol:"57%"},customerid:{type:"searchSelect",name:"customerNo",placeholder:"输入客户号",width:5,label:"客户ID:",labelCol:"26%",wrapperCol:"65%"},queryBtn:{type:"button",name:"query",width:2,label:"查询",className:"ant-btn-primary",labelCol:"2%",wrapperCol:"98%",onClickBtn:a.clickQueryBtn.bind(a)},exportBtn:{type:"dropdown",name:"export",dropList:[{label:T.default.createElement("div",{className:"pdf_ico"},"PDF"),id:"pdf"},{label:T.default.createElement("div",{className:"xlsx_ico"},"XLSX"),id:"xlsx"}],labelCol:"2%",wrapperCol:"98%",width:1,label:"导出",className:"",onClickBtn:a.exportReport.bind(a)},addBtn:{type:"button",name:"query",width:3,label:"+",className:"ant-btn-primary analysis_add_btn",style:{width:40},labelCol:"2%",wrapperCol:"98%",onClickBtn:a.clickAddBtn.bind(a)},delBtn:{type:"button",name:"del",width:3,label:"×",className:"ant-btn-danger",style:{width:40},labelCol:"2%",wrapperCol:"98%",value:"",onClickBtn:a.clickDelBtn.bind(a)}},a.reportId="18",a.ctrlList=[],a.branchChildrenList={},a.prevInputData={},a.targetNameIdMap={},a.handleSearchSelect=a.handleSearchSelect.bind(a),a.indexKey=2,a}return(0,I.default)(t,e),(0,w.default)(t,[{key:"handleSearchSelect",value:function(){function e(e,a){return t.apply(this,arguments)}var t=(0,C.default)(m.default.mark(function e(t,a){var r,n,l;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,Y.queryCustomerNumberList)({searchKeyword:t});case 2:r=e.sent,n=r.length>20?r.slice(0,20):r,l=n.map(function(e){var a=e.cust_no,r=e.customer,n=r.indexOf("|"),l=null;return l=0==r.indexOf(t)?T.default.createElement("span",null,T.default.createElement("span",{style:{color:"red"}},t),r.substring(t.length,r.length)):T.default.createElement("span",null,r.substring(0,n+2),T.default.createElement("span",{style:{color:"red"}},t),r.substring(t.length+n+2,r.length)),{value:a,text:T.default.createElement("span",null,l),noHighLight:r}}),a(l);case 6:case"end":return e.stop()}},e,this)}));return e}()},{key:"getControllers",value:function(){var e=this.commonControllers;return[[e.start,e.end,e.productid,e.branchNo,e.customerid,e.queryBtn,e.exportBtn],[e.indicator,e.inputstart,e.inputend,(0,f.default)({},e.delBtn,{value:1}),e.addBtn]]}},{key:"componentDidMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,C.default)(m.default.mark(function e(){var t,a,r,n,l,i,o,s,u=this;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,Y.queryTargetList)({reportId:this.reportId});case 2:return t=e.sent,a=t.map(function(e){return u.targetNameIdMap[e.index_id]=e.field_name,{label:e.name,value:e.index_id}}),this.commonControllers.indicator.options=a,e.next=7,(0,Y.getBusinessProdCode)();case 7:return r=e.sent,this.commonControllers.productid.options=r.map(function(e){return{value:e.prod_code,label:e.prod_code}}),this.commonControllers.productid.defaultValue=[r[0].prod_code],e.next=12,(0,Y.queryBranchList)();case 12:return n=e.sent,l=n.branchList,i=n.childrenList,this.branchChildrenList=i,this.commonControllers.branchNo.treeData=l,this.commonControllers.branchNo.defaultValue=["1000"],e.next=20,(0,Y.queryCustomerName)();case 20:o=e.sent,s=o.map(function(e){return{label:e.customer,value:e.cust_no}}),this.commonControllers.customerid.options=s,this.filterReportFn();case 24:case"end":return e.stop()}},e,this)}));return e}()},{key:"filterReportFn",value:function(){function e(){return t.apply(this,arguments)}var t=(0,C.default)(m.default.mark(function e(){var t,a,r;arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.reportId;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.ctrlList=this.getControllers(),this.setState({commonControllers:this.ctrlList,tableLoading:!0}),t={},this.ctrlList.map(function(e){e.map(function(e){void 0!=e.defaultValue&&(t[e.name]=e.defaultValue)})}),a=this.refs.filterController.setControllerData(t),r=this.warpSendParams(a),r&&(this.prevInputData=r,this.getReportDateFn(r));case 7:case"end":return e.stop()}},e,this)}));return e}()},{key:"getReportDateFn",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,C.default)(m.default.mark(function e(t){var a,r,n,l,i;return m.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.checkFromNull(t)){e.next=10;break}return a=this.getBranchChildNameList(t.branchId),r=(0,f.default)({},t,{branchId:a}),e.next=5,(0,Y.getBusinessReport)(r);case 5:n=e.sent,l=n.data.map(function(e,t){return e.key=t,e.index=t+1,e}),i=this.formatReportTitle(t.startDate,t.endDate),this.prevInputData=t,this.setState({reportDataSources:l,tableLoading:!1,reportDataSourcesTotal:n.total,reportTitle:i});case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"checkFromNull",value:function(e){var t=!0;for(var a in e)if("customerNo"!==a&&"index"!==a){var r=e[a];if(""===r||void 0===r||null===r||0===r.length){c.default.info("请填写完整后再查询！"),this.setState({tableLoading:!1}),t=!1;break}}return t}},{key:"clickAddBtn",value:function(){var e=this.commonControllers;if(this.refs.filterController.getControllerData()[this.ctrlList[this.ctrlList.length-1][0].name]){var t=[(0,f.default)({},e.indicator,{name:"indexId-"+this.indexKey}),(0,f.default)({},e.inputstart,{name:"inputstart-"+this.indexKey,defaultValue:""}),(0,f.default)({},e.inputend,{name:"inputend-"+this.indexKey,defaultValue:""}),(0,f.default)({},e.delBtn,{value:this.indexKey}),e.addBtn];this.ctrlList[this.ctrlList.length-1].splice(4),this.ctrlList.push(t),this.setState({commonControllers:this.ctrlList}),this.indexKey+=1}}},{key:"clickDelBtn",value:function(e){var t=e.target.value,a=this.state.commonControllers;if(2===a.length){var r=this.refs.filterController.getControllerData();for(var n in r)switch(n){case"startDate":r.startDate=(0,V.default)(r.startDate,"YYYYMMDD");break;case"endDate":r.endDate=(0,V.default)(r.endDate,"YYYYMMDD");break;case"customerNo":r.customerNo=r.customerNo.split(",");break;case"prodCode":r.prodCode=r.prodCode.split(",");break;default:if(n.indexOf("index")>-1){r[n]="";var l=n.split("-")[1];r["inputstart-"+l]="",r["inputend-"+l]=""}}this.refs.filterController.setControllerData(r)}else this.ctrlList=a.filter(function(e){return"del"!==e[3].name||e[3].value+""!==t}),this.ctrlList[this.ctrlList.length-1][4]=this.commonControllers.addBtn,this.setState({commonControllers:this.ctrlList})}},{key:"formatDate",value:function(e){return e.substring(0,4)+"."+e.substring(4,6)+"."+e.substring(6,8)}},{key:"formatReportTitle",value:function(e,t){return"签约客户资金变动情况（"+this.formatDate(e)+"-"+this.formatDate(t)+"）"}},{key:"warpSendParams",value:function(e){for(var t=this,a=[],r=[],n=1;n<this.ctrlList.length;n++)r.push(this.ctrlList[n][0].name);var l=!0;return R.default.map(e,function(n,i){if(r.indexOf(i)>-1){var o=i.indexOf("-")<=-1?"":"-"+i.split("-")[1];if(n){var s=e["inputstart"+o],u=e["inputend"+o];s&&u?a.push({name:t.targetNameIdMap[n],from:parseFloat(s),to:parseFloat(u)}):l=!1}}}),l?{startDate:e.startDate,endDate:e.endDate,prodCode:e.prodCode,branchId:e.branchId,customerNo:e.customerNo,reportId:this.reportId,pageSize:q.default.report_default_page_size,page:this.state.tableCurrentPage,index:a}:(c.default.error("资金范围未填写完整！"),!1)}},{key:"exportReport",value:function(e){var t=R.default.extend({},this.prevInputData);t.reportId="18";var a=(t.page,t.pageSize,(0,u.default)(t,["page","pageSize"]));a.index=(0,o.default)(a.index),a.branchId=this.getBranchChildNameList(a.branchId);var r=A.default.param((0,f.default)({},a,{exportType:e.key}));window.open(q.default.APP_BASE_URL+"/jr_report/jsp/reportExp.jsp?"+r)}},{key:"clickQueryBtn",value:function(){var e=this.refs.filterController.getControllerData(),t=K.default.fromJS(this.prevInputData),a=this.warpSendParams(e);if(a){var r=K.default.fromJS(a);K.default.is(t,r)||(this.setState({tableLoading:!0}),this.getReportDateFn(a))}}},{key:"handlePaginationOnChange",value:function(e){this.setState({tableLoading:!0,tableCurrentPage:e});var t=(0,f.default)({},this.prevInputData,{page:e});this.getReportDateFn(t)}},{key:"returnTipTable",value:function(e){var t=q.default.TARGETTIPLIST.category,a=q.default.TARGETTIPLIST.index,r=t[e].index.map(function(e){return a[e]});return T.default.createElement(P.TipTable,{info:r})}},{key:"render",value:function(){var e=this,t=T.default.createElement(P.FilterController,{ref:"filterController",controllers:this.state.commonControllers,handleSearchSelect:this.handleSearchSelect}),a=this.state.reportDataSources.length>0;return T.default.createElement("div",null,T.default.createElement(P.PanelContainer,{hasFilter:T.default.createElement("div",{className:"analysis_sx"}," ",t," "),title:"签约客户分析",hasTip:function(){return e.returnTipTable("76")}},T.default.createElement("div",{className:"transaction_table_bb analysis_table assets_table "},T.default.createElement("div",{className:"management_pagination_bg"}),T.default.createElement(P.JfCard,{title:T.default.createElement("div",null,T.default.createElement("span",null,this.state.reportTitle),T.default.createElement("span",{className:"pull-right"},"单位：万元")),loading:this.state.tableLoading},a?T.default.createElement(l.default,{columns:q.default.analysis_table_title,scroll:{x:1500},dataSource:this.state.reportDataSources,pagination:{current:this.state.tableCurrentPage,pageSize:q.default.report_default_page_size,total:this.state.reportDataSourcesTotal,onChange:this.handlePaginationOnChange}}):T.default.createElement("div",{className:"ant-table-placeholder"},T.default.createElement("span",null,T.default.createElement("i",{className:"anticon anticon-frown-o"}),"暂无数据"))))),T.default.createElement("div",{className:"layout-footer"},"本页数据更新至",this.props.date.c_cashclient_business_01))}}]),t}(B.Component);t.default=j,e.exports=j},1385:function(e,t,a){e.exports={default:a(1386),__esModule:!0}},1386:function(e,t,a){var r=a(31),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}}});