webpackJsonp([6],{1366:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(10),l=r(a),o=n(56),i=r(o),s=n(7),u=r(s),d=n(279),p=r(d),c=n(280),b=r(c),f=n(12),h=r(f),m=n(2),g=r(m),w=n(6),x=r(w),y=n(4),v=r(y),C=n(5),_=r(C),k=n(0),E=r(k),D=n(11),T=(r(D),n(20)),N=r(T);n(1368);var S=n(25),I=n(183),z=n(30),L=r(z),R=n(1),Q=(r(R),n(184)),q=r(Q),A=n(567),B=r(A);n(135).polyfill();var F=function(e){function t(e){(0,g.default)(this,t);var n=(0,v.default)(this,(t.__proto__||(0,h.default)(t)).call(this,e));return n.state={targetList:[],reportDataSources:[],commonControllers:[],sortType:void 0,sortColumn:void 0,tableLoading:!1,reportTitle:"",renderErrorMsg:E.default.createElement("span",null,"无满足条件信息，请重新筛选条件或进行",E.default.createElement("a",{onClick:n.querySelf.bind(n),className:"relation_href"},"关联名单设定")),hasSumRow:!0},n.handleSortColumn=n.handleSortColumn.bind(n),n.commonControllers={start:{type:"startDate",name:"startDate",width:4,label:"开始日期：",defaultValue:S.Tools.getStartDefaultDate({date:n.props.date.c_related_trade_statistics_01,formart:"YYYY-MM-DD",addType:"months",addVal:-1}),labelCol:"43%",wrapperCol:"57%"},end:{type:"endDate",name:"endDate",width:4,label:"结束日期：",defaultValue:S.Tools.getStartDefaultDate({date:n.props.date.c_related_trade_statistics_01}),labelCol:"43%",wrapperCol:"57%"},queryType:{type:"select",name:"queryType",width:4,placeholder:"请选择",label:"查询方式：",options:[{label:"组查询",value:"group"},{label:"证件号查询",value:"id"}],defaultValue:"group",labelCol:"43%",wrapperCol:"57%"},groupQuery:{type:"select",name:"groupId",width:6,placeholder:"请选择",label:"组名称：",options:[],defaultValue:"1",labelCol:"23%",wrapperCol:"77%"},idQuery:{type:"select",name:"idNo",placeholder:"输入证件号",multiple:!0,width:6,label:"证件号：",options:[],defaultValue:["1"],labelCol:"23%",wrapperCol:"77%"},queryBtn:{type:"button",name:"query",width:2,label:"查询",className:"ant-btn-primary",labelCol:"2%",wrapperCol:"98%",onClickBtn:n.clickQueryBtn.bind(n)},exportBtn:{type:"dropdown",name:"export",dropList:[{label:E.default.createElement("div",{className:"pdf_ico"},"PDF"),id:"pdf"},{label:E.default.createElement("div",{className:"xlsx_ico"},"XLSX"),id:"xlsx"}],labelCol:"2%",wrapperCol:"98%",width:2,label:"导出",className:"",onClickBtn:n.exportReport.bind(n)}},n.reportId="19",n.idQueryOptions=[],n.reportTitleList=q.default.relation_table_title_defatlt,n.targetChildrenList=[],n.transaction_id_name_map=q.default.transaction_id_name_map,n.prevInputData={},n.reportList=[],n.defaultTargetList=[],n}return(0,_.default)(t,e),(0,x.default)(t,[{key:"getControllers",value:function(){var e=this.commonControllers;return[[e.queryType,e.groupQuery,e.start,e.end,e.queryBtn,e.exportBtn]]}},{key:"componentDidMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,b.default)(p.default.mark(function e(){var t,n,r,a,l=this;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,I.getRelationFilter)();case 2:t=e.sent,this.groupItemList={},n=0,this.itemCodeArray=[],this.commonControllers.groupQuery.options=t.map(function(e){l.groupItemList[e.groupId]="";var t=[];return e.itemList.map(function(e){l.idQueryOptions.push({value:n+"",label:e.itemName}),l.itemCodeArray.push(e.itemCode),n++,t.push(e.itemCode)}),l.groupItemList[e.groupId]=t.join(","),{value:e.groupId,label:e.groupName,key:e.groupId}}),r="",this.commonControllers.groupQuery.options.length>0&&(r=this.commonControllers.groupQuery.options[0].value),this.commonControllers.groupQuery.defaultValue=r,this.commonControllers.idQuery.options=this.idQueryOptions,a="",this.commonControllers.idQuery.options.length>0&&(a=this.commonControllers.idQuery.options[0].value),this.commonControllers.idQuery.defaultValue=a,this.filterReportFn();case 15:case"end":return e.stop()}},e,this)}));return e}()},{key:"onDataChange",value:function(e,t){if("queryType"===e){var n=this.commonControllers,r=[[n.queryType,n[t+"Query"],n.start,n.end,n.queryBtn,n.exportBtn]];this.setState({commonControllers:r})}}},{key:"filterReportFn",value:function(){function e(){return t.apply(this,arguments)}var t=(0,b.default)(p.default.mark(function e(){var t,n,r,a,l,o,i,s=this;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.getControllers(),this.setState({commonControllers:t}),n={},t.map(function(e){e.map(function(e){void 0!=e.defaultValue&&(n[e.name]=e.defaultValue)})}),r=this.refs.filterController.setControllerData(n),this.prevInputData=r,a=r.startDate,l=r.endDate,o=r.groupId,i=r.queryType,r.idNo="group"===i?this.groupItemList[o]:r.idNo.map(function(e){return s.itemCodeArray[e]}).join(","),r.idNo&&(this.setState({tableLoading:!0}),this.getReportDateFn({startDate:a,endDate:l,idNo:r.idNo,reportId:this.reportId,queryType:i}));case 9:case"end":return e.stop()}},e,this)}));return e}()},{key:"getReportDateFn",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,b.default)(p.default.mark(function e(t){var n,r,a,l=this;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,I.getRelationReport)(t);case 2:if(0!=(n=e.sent)){e.next=8;break}return this.setState({renderErrorMsg:E.default.createElement("span",null,"数据获取失败，",E.default.createElement("a",{href:"javascript:void(0);",onClick:function(){window.location.reload()}},"请重试！")),tableLoading:!1}),e.abrupt("return",!1);case 8:r=[],n.map(function(e,t){var n={};L.default.map(l.reportTitleList,function(t){e[t.field_name]&&(n[t.field_name]=e[t.field_name])}),r.push((0,u.default)({row_index:t+1,cust_name:e.cust_name,id_no:e.id_no,cust_status:e.cust_status},n,{key:t}))}),a="group"===t.queryType,this.setState({reportDataSources:r,tableLoading:!1,hasSumRow:a});case 12:case"end":return e.stop()}},e,this)}));return e}()},{key:"exportReport",value:function(e){var t=this.prevInputData,n=t.startDate,r=t.endDate,a=t.idNo,l=N.default.param({startDate:n,endDate:r,idNo:a,reportId:this.reportId,exportType:e.key});window.open(q.default.APP_BASE_URL+"/jr_report/jsp/reportExp.jsp?"+l)}},{key:"clickQueryBtn",value:function(){var e=this,t=this.refs.filterController.getControllerData(),n=B.default.fromJS(this.prevInputData),r=B.default.fromJS(t);B.default.is(n,r)||("group"===t.queryType?t.idNo=this.groupItemList[t.groupId]:t.idNo&&(t.idNo=t.idNo.map(function(t){return e.itemCodeArray[t]}).join(",")),this.prevInputData=(0,u.default)({},t),this.setState({tableLoading:!0}),this.getReportDateFn((0,u.default)({},t,{reportId:this.reportId})))}},{key:"handleSortColumn",value:function(e,t){this.setState({sortColumn:e,sortType:t})}},{key:"getReportData",value:function(){var e=this.state,t=e.reportDataSources,n=e.sortColumn,r=e.sortType,a=t.slice(),l=[];if(a.length&&"合计"===a[0].cust_name&&(l=a.splice(0,1)),n&&r){var o=a.sort(function(e,t){var a=e[n],l=t[n];return a=isNaN(Number(a))?"object"===(void 0===a?"undefined":(0,i.default)(a))?Number(a.props.children):["%","‰"].indexOf(a.substring(a.length-1))>-1?"-"===a.substring(0,1)&&1===a.length?9999999999:Number(a.substring(0,a.length-1)):a.charCodeAt():Number(a),l=isNaN(Number(l))?"object"===(void 0===l?"undefined":(0,i.default)(l))?Number(l.props.children):["%","‰"].indexOf(l.substring(l.length-1))>-1?"-"===l.substring(0,1)&&1===l.length?9999999999:Number(l.substring(0,l.length-1)):l.charCodeAt():Number(l),"asc"===r?a-l:l-a});return o.map(function(e,t){e.row_index=t+1}),l.concat(o)}return a.map(function(e,t){e.row_index=t+1}),l.concat(a)}},{key:"returnTipTable",value:function(e){var t=q.default.TARGETTIPLIST.category,n=q.default.TARGETTIPLIST.index,r=t[e].index.map(function(e){return n[e]});return E.default.createElement(S.TipTable,{info:r})}},{key:"querySelf",value:function(){this.props.history.push("/query/self")}},{key:"render",value:function(){var e=this,t=E.default.createElement(S.FilterController,{ref:"filterController",controllers:this.state.commonControllers,onDataChange:this.onDataChange.bind(this)}),n=[E.default.createElement(S.Column,(0,l.default)({align:"center",width:50,key:"row_index",resizable:!0,fixed:!0},"width",50),E.default.createElement(S.HeaderCell,null,"序号"),E.default.createElement(S.Cell,{dataKey:"row_index"})),E.default.createElement(S.Column,{align:"center",key:"cust_name",resizable:!0,fixed:!0,width:120},E.default.createElement(S.HeaderCell,null,"客户姓名"),E.default.createElement(S.Cell,{dataKey:"cust_name"})),E.default.createElement(S.Column,{align:"center",key:"id_no",resizable:!0,fixed:!0,width:180},E.default.createElement(S.HeaderCell,null,"身份证号/营业执照号"),E.default.createElement(S.Cell,{dataKey:"id_no"})),E.default.createElement(S.Column,{align:"center",key:"cust_status",resizable:!0,width:80},E.default.createElement(S.HeaderCell,null,"账户状态"),E.default.createElement(S.Cell,{dataKey:"cust_status"}))];this.reportTitleList.map(function(e){n.push(E.default.createElement(S.Column,{align:"center",key:e.index_id,resizable:!0,sortable:!0,width:200},E.default.createElement(S.HeaderCell,{width:41},e.name),E.default.createElement(S.Cell,{dataKey:e.field_name})))});var r=this.state.reportDataSources.length>0;return E.default.createElement("div",null,E.default.createElement(S.PanelContainer,{hasFilter:E.default.createElement("div",null," ",t," "),title:"关联方证券经纪业务查询",hasTip:function(){return e.returnTipTable("80")}},E.default.createElement("div",{className:"transaction_table_bb customercount_pagination"},E.default.createElement("div",{className:"transaction_table_bb relation_first_td"},E.default.createElement("div",{className:"management_pagination_bg"}),E.default.createElement(S.JfCard,{loading:this.state.tableLoading},r?E.default.createElement(S.Table,{data:this.getReportData(),sortColumn:this.state.sortColumn,sortType:this.state.sortType,onSortColumn:this.handleSortColumn,height:770,hasSumRow:this.state.hasSumRow},n):E.default.createElement("div",{className:"ant-table-placeholder"},E.default.createElement("span",null,E.default.createElement("i",{className:"anticon anticon-frown-o"}),this.state.renderErrorMsg)))))),E.default.createElement("div",{className:"layout-footer"},"本页数据更新至",this.props.date.c_related_trade_statistics_01))}}]),t}(k.Component);t.default=F,e.exports=F},1368:function(e,t,n){var r=n(1369);"string"==typeof r&&(r=[[e.i,r,""]]);n(18)(r,{});r.locals&&(e.exports=r.locals)},1369:function(e,t,n){t=e.exports=n(17)(),t.push([e.i,'.rsuite-table {\n  border: 1px solid #eee;\n  position: relative;\n  overflow: hidden;\n}\n.rsuite-table.column-resizing {\n  cursor: ew-resize;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.rsuite-table-sortable {\n  position: absolute;\n}\n.rsuite-table-sortable .icon-sort {\n  color: #aaa;\n}\n.rsuite-table-sortable .icon-sort-asc,\n.rsuite-table-sortable .icon-sort-desc {\n  color: #0ae;\n}\n.rsuite-table-row {\n  overflow: hidden;\n  position: absolute;\n  height: 36px;\n  width: 100%;\n  top: 0;\n  border-bottom: 1px solid #eee;\n}\n.rsuite-table-row:hover {\n  background: #f5f5f5;\n}\n.rsuite-table-row:hover .rsuite-table-cell-group {\n  background: #f5f5f5;\n}\n.rsuite-table-row:hover .rsuite-table-cell {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header .rsuite-table-cell {\n  background: #f5f5f5;\n}\n.rsuite-table.table-hover .rsuite-table-row-header.shadow {\n  -moz-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.28);\n  z-index: 5;\n}\n.rsuite-table-header-row-wrapper {\n  z-index: 2;\n  position: relative;\n}\n.rsuite-table-body-row-wrapper {\n  position: relative;\n  overflow: hidden;\n  z-index: 0;\n}\n.rsuite-table-body-info {\n  width: 100%;\n  text-align: center;\n  top: 50%;\n  position: absolute;\n  margin-top: -20px;\n  line-height: 40px;\n}\n.rsuite-table-body-info .icon {\n  margin: 0 10px;\n}\n.rsuite-table-body-info-wheel-area {\n  width: 100%;\n}\n.rsuite-table-loading-wrapper {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  background: rgba(45, 45, 45, 0.5);\n  color: #fff;\n}\n.rsuite-table-loading {\n  width: 100%;\n  text-align: center;\n  top: 50%;\n  position: absolute;\n  margin-top: -20px;\n  line-height: 40px;\n}\n.rsuite-table-loading .icon {\n  margin: 0 10px;\n}\n.rsuite-table-cell {\n  height: 36px;\n  border-style: solid;\n  border-width: 0;\n  border-color: #eee;\n  display: block;\n  overflow: hidden;\n  position: absolute;\n  white-space: normal;\n  background: #fff;\n}\n.rsuite-table-cell.sortable {\n  cursor: pointer;\n}\n.rsuite-table-cell.first {\n  border-left-width: 0;\n}\n.rsuite-table-cell-wrap1 {\n  display: table;\n}\n.rsuite-table-cell-wrap2 {\n  display: table-row;\n}\n.rsuite-table-cell-wrap3 {\n  display: table-cell;\n  vertical-align: middle;\n}\n.rsuite-table-cell-content {\n  padding: 8px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  -o-text-overflow: ellipsis;\n  width: 100%;\n}\n.rsuite-table-column-resize-spanner {\n  height: 36px;\n  width: 6px;\n  z-index: 3;\n  position: absolute;\n  cursor: ew-resize !important;\n  outline: none;\n}\n.rsuite-table-column-resize-spanner:hover {\n  background: #00bcd4;\n}\n.rsuite-table-cell-group.fixed {\n  position: absolute;\n  z-index: 4;\n  background: #fff;\n}\n.rsuite-table-cell-group.shadow {\n  -moz-box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n  -webkit-box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n  box-shadow: 3px 0px 5px rgba(9, 9, 9, 0.08);\n}\n.rsuite-table-mouse-area {\n  display: none;\n  background: #00bcd4;\n  left: -1px;\n  top: 0;\n  position: absolute;\n  width: 1px;\n  z-index: 6;\n}\n.rsuite-table-bordered .rsuite-table-cell {\n  border-width: 0 1px 0 0;\n}\n.rsuite-table-pagination-wrapper {\n  background: #f5f5f5;\n  padding: 10px;\n}\n.rsuite-table-length-menu {\n  display: inline-block;\n  margin-left: 10px;\n}\n.rsuite-table-page-info {\n  display: inline-block;\n  margin-left: 10px;\n}\n.rsuite-table-pagination {\n  float: right;\n}\n.rsuite-table-pagination .pagination {\n  margin: 0;\n}\n.rsuite-table-pagination .disabled a {\n  background: #f5f5f5;\n  border-color: #f5f5f5;\n  color: #999;\n}\n.rsuite-table-treetable .rsuite-table-row {\n  position: relative;\n}\n.rsuite-table-treetable .rsuite-table-row .expand-icon {\n  width: 10px;\n  cursor: pointer;\n  outline: none;\n}\n.rsuite-table-treetable .rsuite-table-row .expand-icon:before {\n  content: "\\F0DA";\n}\n.rsuite-table-treetable .children {\n  display: none;\n}\n.rsuite-table-treetable .open > .children {\n  display: block;\n}\n.rsuite-table-treetable .open > .rsuite-table-row .expand-icon:before {\n  content: "\\F0D7";\n}\n.rsuite-table-scrollbar-wrapper {\n  background: rgba(45, 45, 45, 0.05);\n  position: absolute;\n  transition: background 1s;\n}\n.rsuite-table-scrollbar-wrapper.active {\n  background: rgba(45, 45, 45, 0.1);\n}\n.rsuite-table-scrollbar-wrapper.hide {\n  display: none;\n}\n.rsuite-table-scrollbar-wrapper .scrollbar-handle {\n  position: absolute;\n  background: rgba(45, 45, 45, 0.5);\n  border-radius: 4px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal {\n  width: 100%;\n  height: 10px;\n  bottom: 2px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal:hover,\n.rsuite-table-scrollbar-wrapper.horizontal.active {\n  height: 14px;\n  box-shadow: 1px 1px 2px #ddd inset;\n}\n.rsuite-table-scrollbar-wrapper.horizontal:hover .scrollbar-handle,\n.rsuite-table-scrollbar-wrapper.horizontal.active .scrollbar-handle {\n  top: 2px;\n  height: 10px;\n}\n.rsuite-table-scrollbar-wrapper.horizontal .scrollbar-handle {\n  height: 8px;\n  left: 0px;\n  top: 1px;\n}\n.rsuite-table-scrollbar-wrapper.vertical {\n  top: 0;\n  right: 0px;\n  width: 10px;\n  bottom: 2px;\n}\n.rsuite-table-scrollbar-wrapper.vertical:hover,\n.rsuite-table-scrollbar-wrapper.vertical.active {\n  width: 14px;\n  box-shadow: 1px 1px 2px #ddd inset;\n}\n.rsuite-table-scrollbar-wrapper.vertical:hover .scrollbar-handle,\n.rsuite-table-scrollbar-wrapper.vertical.active .scrollbar-handle {\n  left: 2px;\n  width: 10px;\n}\n.rsuite-table-scrollbar-wrapper.vertical .scrollbar-handle {\n  min-height: 20px;\n  width: 8px;\n  top: 0px;\n  left: 1px;\n}\n',""])}});