webpackJsonp([12],{1360:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(10),l=n(r),i=a(56),o=n(i),s=a(281),d=n(s),u=a(279),p=n(u),c=a(280),h=n(c),b=a(7),f=n(b),m=a(571),g=n(m),x=a(96),C=n(x),v=a(12),w=n(v),D=a(3),_=n(D),y=a(6),k=n(y),S=a(4),L=n(S),T=a(5),I=n(T),E=a(134),Y=n(E);a(282),a(572),a(185);var N=a(0),R=n(N),z=a(11);n(z);a(1368);var V=a(25),B=a(183),P=a(20),M=n(P),q=a(30),F=n(q),O=a(1),A=n(O),j=a(184),K=n(j),H=a(569),J=n(H),G=Y.default.Button,U=Y.default.Group;a(135).polyfill();var Q=function(e){function t(e){(0,_.default)(this,t);var a=(0,L.default)(this,(t.__proto__||(0,w.default)(t)).call(this,e));return a.getBranchChildNameList=function(e){"string"==typeof e&&(e=[e]);var t=(0,C.default)(a.branchChildrenList),n=e.map(function(e){return t.indexOf(e)>=0?a.branchChildrenList[e]:e});return F.default.reduceRight(n,function(e,t){return e.concat("number"==typeof t?[t]:t)},[]).join(",")},a.getTable=function(e){return a.isChild?R.default.createElement("div",null,R.default.createElement(V.Table,{data:a.state.reportDataSources,sortColumn:a.state.childSortColumn,sortType:a.state.childSortType,onSortColumn:a.handleChildSortColumn,height:770},e),R.default.createElement(g.default,{current:a.state.tableCurrentPage,pageSize:K.default.report_default_page_size,total:a.state.reportDataSourcesTotal,onChange:a.handlePaginationOnChange})):R.default.createElement("div",null,R.default.createElement(V.Table,{data:a.getReportData(),sortColumn:a.state.sortColumn,sortType:a.state.sortType,onSortColumn:a.handleSortColumn,height:770},e))},a.state={targetList:[],reportDataSources:[],commonControllers:[],tableLoading:!1,reportTitle:"",sortColumn:void 0,sortType:void 0,childSortColumn:void 0,childSortType:void 0,reportDataSourcesTotal:0,tableCurrentPage:1,tipTableIndex:"63"},a.commonControllers={startDate:{type:"startDate",name:"startDate",width:6,label:"开户起始时间：",labelCol:"42%",wrapperCol:"58%"},endDate:{type:"endDate",name:"endDate",width:6,label:"开户结束时间：",labelCol:"42%",wrapperCol:"58%"},month:{type:"month",name:"month",width:5,label:"时间选择：",labelCol:"37%",wrapperCol:"63%"},range:{type:"treeSelect",name:"assetSection",width:5,label:"资产范围：",placeholder:"请选择",className:"ant-branch-left",treeData:[],labelCol:"37%",wrapperCol:"63%"},branch:{type:"treeSelect",name:"branchId",width:5,label:"分支机构：",placeholder:"请选择",className:"ant-branch-left",treeData:[],labelCol:"37%",wrapperCol:"63%"},indicator:{type:"treeSelect",name:"indexId",width:5,label:"指标筛选：",className:"ant-branch-left",treeData:[],placeholder:"请选择",defaultValue:[],labelCol:"37%",wrapperCol:"63%"},queryBtn:{type:"button",name:"query",width:2,label:"查询",className:"ant-btn-primary",onClickBtn:a.clickQueryBtn.bind(a),labelCol:"2%",wrapperCol:"98%"},backBtn:{type:"button",name:"back",width:2,label:"返回",className:"ant-btn-primary",onClickBtn:a.clickBackBtn.bind(a),labelCol:"2%",wrapperCol:"98%"},exportBtn:{type:"dropdown",name:"export",dropList:[{label:R.default.createElement("div",{className:"pdf_ico"},"PDF"),id:"pdf"},{label:R.default.createElement("div",{className:"xlsx_ico"},"XLSX"),id:"xlsx"}],width:2,label:"导出",className:"",onClickBtn:a.exportReport.bind(a),labelCol:"2%",wrapperCol:"98%"}},a.childRadioName="origin_child",a.isChild=!1,a.lastOriginCtrlValue={},a.radioDefaultValue="origin",a.branchChildrenList={},a.targetChildrenList=[],a.rangeChildrenList=[],a.tipTableIndexMap={origin:"63",subquery:"64",serquery:"65"},a.lastUpdateDateMap={origin:"c_open_client_statistics_01",subquery:"c_asset_section_statistics_01",serquery:"c_margin_trading_statistics_01"},a.customercount_id_name_map=K.default.customercount_id_name_map,a.prevInputData={},a.targetList=[],a.reportList=[],a.isSortAndList={},a.defaultTargetList=[],a.exportParamsList={},a.radioOnChange=a.radioOnChange.bind(a),a.handleSortColumn=a.handleSortColumn.bind(a),a.onClickReportDesc=a.onClickReportDesc.bind(a),a.handlePaginationOnChange=a.handlePaginationOnChange.bind(a),a.handleChildSortColumn=a.handleChildSortColumn.bind(a),a}return(0,I.default)(t,e),(0,k.default)(t,[{key:"getControllers",value:function(e){var t=[[]],a=this.commonControllers;switch(e){case"origin":t=[[(0,f.default)({},a.startDate,{label:"统计起始时间："}),(0,f.default)({},a.endDate,{label:"统计结束时间："}),a.branch,a.queryBtn,a.exportBtn]];break;case"subquery":t=[[a.month,(0,f.default)({},a.branch,{width:5}),(0,f.default)({},a.range,{width:4,labelCol:"46%",wrapperCol:"54%"}),a.queryBtn,a.exportBtn]];break;case"serquery":t=[[(0,f.default)({},a.startDate,{label:"统计起始时间：",width:5,labelCol:"48%",wrapperCol:"52%"}),(0,f.default)({},a.endDate,{label:"统计结束时间：",width:5,labelCol:"48%",wrapperCol:"52%"}),(0,f.default)({},a.branch,{width:5}),(0,f.default)({},a.indicator,{width:4,labelCol:"46%",wrapperCol:"54%"}),a.queryBtn,a.exportBtn]];break;case"origin_child":t=[[a.startDate,a.endDate,a.branch,a.queryBtn,a.exportBtn,a.backBtn]]}return t}},{key:"componentDidMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,h.default)(p.default.mark(function e(){var t,a,n,r,l,i=this;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,B.queryBranchList)();case 2:return t=e.sent,a=t.branchList,n=t.childrenList,e.next=7,(0,B.queryAssetList)();case 7:r=e.sent,this.branchChildrenList=n,this.commonControllers.branch.treeData=a,this.commonControllers.branch.defaultValue=["1000"],l=r.map(function(e){return i.rangeChildrenList.push(e.businessflag_code),{label:e.businessflag_name,value:e.businessflag_code,key:e.businessflag_code}}),this.commonControllers.range.treeData=[{label:"全部",value:"all",key:"all",children:l}],this.commonControllers.range.defaultValue=this.rangeChildrenList,this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue]);case 15:case"end":return e.stop()}},e,this)}));return e}()},{key:"radioOnChange",value:function(e){this.isChild=!1,this.isSortAndList={},this.prevInputData={},this.radioDefaultValue=e.target.value,this.setState({tableLoading:!0,reportDataSources:[],sortColumn:void 0,sortType:void 0,childSortColumn:void 0,childSortType:void 0,tipTableIndex:this.tipTableIndexMap[e.target.value]}),this.lastOriginCtrlValue={},this.exportParamsList={},this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue])}},{key:"clickBackBtn",value:function(){this.isChild=!1,this.isSortAndList={},this.prevInputData={},this.setState({tableLoading:!0,tableCurrentPage:1,childSortColumn:void 0,childSortType:void 0,reportDataSources:[]}),this.radioDefaultValue="origin",this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue],this.lastOriginCtrlValue),this.lastOriginCtrlValue={}}},{key:"onClickReportDesc",value:function(e,t){this.prevInputData={},this.setState({tableLoading:!0}),this.isChild=!0,this.childReportParams={page:1,pageSize:K.default.report_default_page_size,branchId:[t]},this.exportParamsList={},this.lastOriginCtrlValue={startDate:(0,A.default)(e.startDate,"YYYY-MM-DD"),endDate:(0,A.default)(e.endDate,"YYYY-MM-DD"),branchId:e.branchId.split(",")},this.filterReportFn("1301",{startDate:(0,A.default)(e.startDate,"YYYY-MM-DD"),endDate:(0,A.default)(e.endDate,"YYYY-MM-DD"),branchId:[t]})}},{key:"filterReportFn",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,h.default)(p.default.mark(function e(t){var a,n,r,l,i,o,s,d,u,c,h=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this,this.setState({tableLoading:!0}),n=this.isChild?this.childRadioName:this.radioDefaultValue,r=[],"serquery"!==this.radioDefaultValue){e.next=15;break}return e.next=7,(0,B.queryTargetList)({reportId:t});case 7:this.targetList=e.sent,l=[],i=this.targetList.map(function(e){return l.push(e.index_id),r.push(e),{label:e.name,value:e.index_id}}),this.targetChildrenList=l,this.commonControllers.indicator.treeData=[{label:"全部",value:"all",key:"all",children:i}],this.commonControllers.indicator.defaultValue=["all"],e.next=16;break;case 15:r=K.default["customercount_table_title_"+n];case 16:this.defaultTargetList=r,o=this.getControllers(n),s=this.isChild?{childSortColumn:r[0].field_name,childSortType:"desc"}:{sortColumn:r[0].field_name,sortType:"desc"},this.setState((0,f.default)({commonControllers:o},s)),d={},o.map(function(e){e.map(function(e){void 0!=e.defaultValue&&(d[e.name]=e.defaultValue)})}),h&&(d=h),u=this.refs.filterController.setControllerData(d),this.prevInputData=u,c=this.isChild?(0,f.default)({},u,this.childReportParams,{reportId:t,orderKey:r[0].field_name,order:"desc"}):(0,f.default)({},u,{reportId:t}),this.getReportDateFn(r,c);case 27:case"end":return e.stop()}},e,this)}));return e}()},{key:"getReportDateFn",value:function(){function e(e,a){return t.apply(this,arguments)}var t=(0,h.default)(p.default.mark(function e(t,a){var n,r,l,i,o,s,d,u,c=this;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=F.default.extend({},a),n.branchId=this.getBranchChildNameList(n.branchId),n.assetSection&&(n.assetSection="all"===n.assetSection?this.rangeChildrenList.join(","):n.assetSection),n.indexId&&(n.indexId="all"===n.indexId[0]?this.targetChildrenList:n.indexId),!this.checkFromNull(n)){e.next=38;break}return e.next=7,(0,B.getReportDate)(n);case 7:if(r=e.sent,l=(0,f.default)({},n,r.params),this.reportList=r.reportData,i=a.reportId,this.exportParamsList=n,this.prevInputData=n,o=[],s=this.isChild?this.reportList.data:this.reportList,s.map(function(e,a){var n={};F.default.map(t,function(t){e[t.field_name]&&("open_cust_num"==t.field_name&&"origin"===c.radioDefaultValue?n[t.field_name]=R.default.createElement("span",{className:"coop-dev-branch-list",onClick:function(){c.onClickReportDesc(l,e.branch_no)}},e[t.field_name]):n[t.field_name]=e[t.field_name])}),o.push((0,f.default)({row_index:a+1,branch_name:e.branch_name},n,{key:a}))}),d=K.default.customercount_report_title_map[this.radioDefaultValue],!this.isChild){e.next=21;break}"origin"===this.radioDefaultValue&&this.setState({targetList:t,reportDataSources:o,reportTitle:d,tableLoading:!1,reportDataSourcesTotal:this.reportList.total}),e.next=38;break;case 21:u=(0,f.default)({},a),e.t0=this.radioDefaultValue,e.next="origin"===e.t0?25:"subquery"===e.t0?28:"serquery"===e.t0?31:34;break;case 25:return u.startDate=(0,A.default)(r.params.startDate,"YYYYMMDD"),u.endDate=(0,A.default)(r.params.endDate,"YYYYMMDD"),e.abrupt("break",35);case 28:return u.month=(0,A.default)(r.params.endDate,"YYYYMM"),u.assetSection=a.assetSection.split(","),e.abrupt("break",35);case 31:return u.startDate=(0,A.default)(r.params.startDate,"YYYYMMDD"),u.endDate=(0,A.default)(r.params.endDate,"YYYYMMDD"),e.abrupt("break",35);case 34:case 35:this.prevInputData=this.refs.filterController.setControllerData(u),this.exportParamsList=(0,f.default)({},this.prevInputData),this.customercount_id_name_map[this.radioDefaultValue]===n.reportId&&this.setState({targetList:t,reportDataSources:o,reportTitle:d,tableLoading:!1});case 38:case"end":return e.stop()}},e,this)}));return e}()},{key:"getChildReportDateFn",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,h.default)(p.default.mark(function e(t){var a,n,r,l,i,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{page:"1"};return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=K.default["customercount_table_title_"+this.childRadioName],n=F.default.extend({},t),n.branchId=this.getBranchChildNameList(n.branchId),!this.checkFromNull(n)){e.next=8;break}return e.next=6,(0,B.getReportDate)((0,f.default)({},n,o,{pageSize:K.default.report_default_page_size}));case 6:this.reportList=e.sent,void 0!=this.reportList.reportData&&void 0!=this.reportList.reportData.data?(r=this.reportList.reportData,l=t.reportId,this.prevInputData=n,i=[],r.data.map(function(e,t){var n={};F.default.map(a,function(t){e[t.field_name]&&(n[t.field_name]=e[t.field_name])}),i.push((0,f.default)({row_index:t+1,branch_name:e.branch_name},n,{key:t}))}),this.setState({reportDataSources:i,tableLoading:!1,reportDataSourcesTotal:r.total})):this.setState({tableLoading:!1});case 8:case"end":return e.stop()}},e,this)}));return e}()},{key:"checkFromNull",value:function(e){var t=!0,a=[],n="";this.isChild?(a=["branchId","startDate","endDate"],n="请选择日期和分支机构后再查询！"):(a=["branchId"],n="请选择分支机构后再查询！");for(var r=0;r<a.length;r++){var l=e[a[r]];if(""==l||void 0==l||null==l||0==l.length){d.default.info(n),this.setState({tableLoading:!1}),t=!1;break}}return t}},{key:"exportReport",value:function(e){var t=F.default.extend({},this.exportParamsList);t.indexId&&(t.indexId="all"===t.indexId[0]?this.targetChildrenList.join(","):t.indexId.join(","));var a=M.default.param((0,f.default)({},t,{exportType:e.key}));window.open(K.default.APP_BASE_URL+"/jr_report/jsp/reportExp.jsp?"+a)}},{key:"clickQueryBtn",value:function(){var e=this.refs.filterController.getControllerData(),t=J.default.fromJS(this.prevInputData),a=J.default.fromJS(e);if(!J.default.is(t,a))if(this.isChild)this.setState({tableLoading:!0,childSortColumn:void 0,childSortType:void 0,tableCurrentPage:1}),this.isSortAndList={},this.getChildReportDateFn((0,f.default)({},e,{reportId:"1301"}));else{this.setState({tableLoading:!0,sortType:void 0,sortColumn:void 0,tableCurrentPage:1});var n=[];if(!J.default.is(a.get("indexId"),t.get("indexId"))){var r=[];r="all"==e.indexId[0]?this.targetChildrenList:e.indexId,this.targetList.map(function(e,t){r.indexOf(e.index_id)>=0&&n.push(e)}),this.defaultTargetList=n}this.setState({tableLoading:!0,sortColumn:this.defaultTargetList[0].field_name,sortType:"desc",tableCurrentPage:1}),this.getReportDateFn(0==n.length?this.defaultTargetList:n,(0,f.default)({},e,{reportId:this.customercount_id_name_map[this.radioDefaultValue]}))}}},{key:"handleSortColumn",value:function(e,t){this.setState({sortColumn:e,sortType:t})}},{key:"handlePaginationOnChange",value:function(e){this.setState({tableLoading:!0,tableCurrentPage:e}),this.getChildReportDateFn((0,f.default)({},this.prevInputData,{reportId:"1301"}),(0,f.default)({page:e},this.isSortAndList))}},{key:"handleChildSortColumn",value:function(e,t){this.setState({childSortColumn:e,childSortType:t,tableLoading:!0}),this.isSortAndList={orderKey:e,order:t},this.getChildReportDateFn((0,f.default)({},this.prevInputData,{reportId:"1301"}),(0,f.default)({},this.isSortAndList,{page:this.state.tableCurrentPage}))}},{key:"getReportData",value:function(){var e=this.state,t=e.reportDataSources,a=e.sortColumn,n=e.sortType;if(a&&n){var r=t.sort(function(e,t){var r=e[a],l=t[a];return r=isNaN(Number(r))?"object"===(void 0===r?"undefined":(0,o.default)(r))?Number(r.props.children):["%","‰"].indexOf(r.substring(r.length-1))>-1?"-"===r.substring(0,1)&&1===r.length?9999999999:Number(r.substring(0,r.length-1)):r.charCodeAt():Number(r),l=isNaN(Number(l))?"object"===(void 0===l?"undefined":(0,o.default)(l))?Number(l.props.children):["%","‰"].indexOf(l.substring(l.length-1))>-1?"-"===l.substring(0,1)&&1===l.length?9999999999:Number(l.substring(0,l.length-1)):l.charCodeAt():Number(l),"asc"===n?r-l:l-r});return r.map(function(e,t){e.row_index=t+1}),r}return t.map(function(e,t){e.row_index=t+1}),t}},{key:"returnTipTable",value:function(e){var t=K.default.TARGETTIPLIST.category,a=K.default.TARGETTIPLIST.index,n=t[e].index.map(function(e){return a[e]});return R.default.createElement(V.TipTable,{info:n})}},{key:"render",value:function(){var e=this,t=R.default.createElement(U,{onChange:this.radioOnChange,defaultValue:this.radioDefaultValue,size:"large"},R.default.createElement(G,{value:"origin"},"开户情况统计报表"),R.default.createElement(G,{value:"subquery"},"分支机构资产分段查询"),R.default.createElement(G,{value:"serquery"},"融资融券日常业务统计")),a=R.default.createElement(V.FilterController,{ref:"filterController",controllers:this.state.commonControllers,onDataChange:this.handleFilterContent}),n="subquery"==this.radioDefaultValue?[R.default.createElement(V.Column,(0,l.default)({align:"center",width:50,key:"row_index",resizable:!0,fixed:!0},"width",70),R.default.createElement(V.HeaderCell,null,"序号"),R.default.createElement(V.Cell,{dataKey:"row_index"}))]:[R.default.createElement(V.Column,(0,l.default)({align:"center",width:50,key:"row_index",resizable:!0,fixed:!0},"width",70),R.default.createElement(V.HeaderCell,null,"序号"),R.default.createElement(V.Cell,{dataKey:"row_index"})),R.default.createElement(V.Column,{align:"center",key:"branch_name",resizable:!0,fixed:!0,width:200},R.default.createElement(V.HeaderCell,null,"营业部名称"),R.default.createElement(V.Cell,{dataKey:"branch_name"}))];this.state.targetList.map(function(e){n.push(R.default.createElement(V.Column,{align:"center",key:e.index_id,resizable:!0,sortable:!0,width:200},R.default.createElement(V.HeaderCell,{width:41},e.name),R.default.createElement(V.Cell,{dataKey:e.field_name})))});var r=this.state.reportDataSources.length>0,i=this.isChild?"transaction_table_bb":"transaction_table_bb customercount_pagination";return R.default.createElement("div",null,R.default.createElement(V.PanelContainer,{hasFilter:R.default.createElement("div",null," ",a," "),title:"客户统计报表",hasTip:function(){return e.returnTipTable(e.state.tipTableIndex)},hasRadio:t},R.default.createElement("div",{className:i},R.default.createElement("div",{className:"management_pagination_bg"}),R.default.createElement(V.JfCard,{title:this.state.reportTitle,loading:this.state.tableLoading},r?this.getTable(n):R.default.createElement("div",{className:"ant-table-placeholder"},R.default.createElement("span",null,R.default.createElement("i",{className:"anticon anticon-frown-o"}),"暂无数据"))))),R.default.createElement("div",{className:"layout-footer"},"本页数据更新至",this.props.date[this.lastUpdateDateMap[this.radioDefaultValue]]))}}]),t}(N.Component);t.default=Q,e.exports=Q},1368:function(e,t,a){var n=a(1369);"string"==typeof n&&(n=[[e.i,n,""]]);a(18)(n,{});n.locals&&(e.exports=n.locals)},1369:function(e,t,a){t=e.exports=a(17)(),t.push([e.i,'.rsuite-table {\n  border: 1px solid #eee;\n  position: relative;\n  overflow: hidden;\n}\n.rsuite-table.column-resizing {\n  cursor: ew-resize;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.rsuite-table-sortable {\n  position: absolute;\n}\n.rsuite-table-sortable .icon-sort {\n  color: #aaa;\n}\n.rsuite-table-sortable .icon-sort-asc,\n.rsuite-table-sortable .icon-sort-desc {\n  color: #0ae;\n}\n.rsuite-table-row {\n  overflow: hidden;\n  position: absolute;\n  height: 36px;\n  width: 100%;\n  top: 0;\n  border-bottom: 1px solid #eee;\n}\n.rsuite-table-row:hover {\n  background: #f5f5f5;\n}\n.rsuite-table-row:hover .rsuite-table-cell-group {\n  background: #f5f5f5;\n}\n.rsuite-table-row:hover .rsuite-table-cell {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header .rsuite-table-cell {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header.shadow {\n  -moz-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  z-index: 5;\n}\n.rsuite-table-header-row-wrapper {\n  z-index: 2;\n  position: relative;\n}\n.rsuite-table-body-row-wrapper {\n  position: relative;\n  overflow: hidden;\n  z-index: 0;\n}\n.rsuite-table-body-info {\n  width: 100%;\n  text-align: center;\n  top: 50%;\n  position: absolute;\n  margin-top: -20px;\n  line-height: 40px;\n}\n.rsuite-table-body-info .icon {\n  margin: 0 10px;\n}\n.rsuite-table-body-info-wheel-area {\n  width: 100%;\n}\n.rsuite-table-loading-wrapper {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  background: rgba(45, 45, 45, 0.5);\n  color: #fff;\n}\n.rsuite-table-loading {\n  width: 100%;\n  text-align: center;\n  top: 50%;\n  position: absolute;\n  margin-top: -20px;\n  line-height: 40px;\n}\n.rsuite-table-loading .icon {\n  margin: 0 10px;\n}\n.rsuite-table-cell {\n  height: 36px;\n  border-style: solid;\n  border-width: 0;\n  border-color: #eee;\n  display: block;\n  overflow: hidden;\n  position: absolute;\n  white-space: normal;\n  background: #fff;\n}\n.rsuite-table-cell.sortable {\n  cursor: pointer;\n}\n.rsuite-table-cell.first {\n  border-left-width: 0;\n}\n.rsuite-table-cell-wrap1 {\n  display: table;\n}\n.rsuite-table-cell-wrap2 {\n  display: table-row;\n}\n.rsuite-table-cell-wrap3 {\n  display: table-cell;\n  vertical-align: middle;\n}\n.rsuite-table-cell-content {\n  padding: 8px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  -o-text-overflow: ellipsis;\n  width: 100%;\n}\n.rsuite-table-column-resize-spanner {\n  height: 36px;\n  width: 6px;\n  z-index: 3;\n  position: absolute;\n  cursor: ew-resize !important;\n  outline: none;\n}\n.rsuite-table-column-resize-spanner:hover {\n  background: #00bcd4;\n}\n.rsuite-table-cell-group.fixed {\n  position: absolute;\n  z-index: 4;\n  background: #fff;\n}\n.rsuite-table-cell-group.shadow {\n  -moz-box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n  -webkit-box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n  box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n}\n.rsuite-table-mouse-area {\n  display: none;\n  background: #00bcd4;\n  left: -1px;\n  top: 0;\n  position: absolute;\n  width: 1px;\n  z-index: 6;\n}\n.rsuite-table-bordered .rsuite-table-cell {\n  border-width: 0 1px 0 0;\n}\n.rsuite-table-pagination-wrapper {\n  background: #f5f5f5;\n  padding: 10px;\n}\n.rsuite-table-length-menu {\n  display: inline-block;\n  margin-left: 10px;\n}\n.rsuite-table-page-info {\n  display: inline-block;\n  margin-left: 10px;\n}\n.rsuite-table-pagination {\n  float: right;\n}\n.rsuite-table-pagination .pagination {\n  margin: 0;\n}\n.rsuite-table-pagination .disabled a {\n  background: #f5f5f5;\n  border-color: #f5f5f5;\n  color: #999;\n}\n.rsuite-table-treetable .rsuite-table-row {\n  position: relative;\n}\n.rsuite-table-treetable .rsuite-table-row .expand-icon {\n  width: 10px;\n  cursor: pointer;\n  outline: none;\n}\n.rsuite-table-treetable .rsuite-table-row .expand-icon:before {\n  content: "\\F0DA";\n}\n.rsuite-table-treetable .children {\n  display: none;\n}\n.rsuite-table-treetable .open > .children {\n  display: block;\n}\n.rsuite-table-treetable .open > .rsuite-table-row .expand-icon:before {\n  content: "\\F0D7";\n}\n.rsuite-table-scrollbar-wrapper {\n  background: rgba(45, 45, 45, 0.05);\n  position: absolute;\n  transition: background 1s;\n}\n.rsuite-table-scrollbar-wrapper.active {\n  background: rgba(45, 45, 45, 0.1);\n}\n.rsuite-table-scrollbar-wrapper.hide {\n  display: none;\n}\n.rsuite-table-scrollbar-wrapper .scrollbar-handle {\n  position: absolute;\n  background: rgba(45, 45, 45, 0.5);\n  border-radius: 4px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal {\n  width: 100%;\n  height: 10px;\n  bottom: 2px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal:hover,\n.rsuite-table-scrollbar-wrapper.horizontal.active {\n  height: 14px;\n  box-shadow: 1px 1px 2px #ddd inset;\n}\n.rsuite-table-scrollbar-wrapper.horizontal:hover .scrollbar-handle,\n.rsuite-table-scrollbar-wrapper.horizontal.active .scrollbar-handle {\n  top: 2px;\n  height: 10px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal .scrollbar-handle {\n  height: 8px;\n  left: 0px;\n  top: 1px;\n}\n.rsuite-table-scrollbar-wrapper.vertical {\n  top: 0;\n  right: 0px;\n  width: 10px;\n  bottom: 2px;\n}\n.rsuite-table-scrollbar-wrapper.vertical:hover,\n.rsuite-table-scrollbar-wrapper.vertical.active {\n  width: 14px;\n  box-shadow: 1px 1px 2px #ddd inset;\n}\n.rsuite-table-scrollbar-wrapper.vertical:hover .scrollbar-handle,\n.rsuite-table-scrollbar-wrapper.vertical.active .scrollbar-handle {\n  left: 2px;\n  width: 10px;\n}\n.rsuite-table-scrollbar-wrapper.vertical .scrollbar-handle {\n  min-height: 20px;\n  width: 8px;\n  top: 0px;\n  left: 1px;\n}\n',""])}});