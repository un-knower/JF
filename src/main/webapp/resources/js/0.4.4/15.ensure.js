webpackJsonp([15],{1367:function(e,t,l){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=l(283),r=o(a),n=l(566),i=o(n),s=l(279),u=o(s),d=l(280),p=o(d),f=l(57),m=o(f),c=l(281),C=o(c),h=l(7),y=o(h),v=l(12),D=o(v),b=l(2),T=o(b),Y=l(6),g=o(Y),M=l(4),w=o(M),L=l(5),k=o(L),B=l(136),S=o(B),_=l(134),E=o(_);l(284),l(567),l(282),l(137),l(185);var x=l(0),R=o(x),j=l(11),O=(o(j),l(184)),F=(o(O),l(1)),N=o(F),P=l(25),V=(l(568),l(570)),G=(o(V),l(183));E.default.Button,E.default.Group;l(135).polyfill();var I=(S.default.Option,function(e){function t(e){(0,T.default)(this,t);var l=(0,w.default)(this,(t.__proto__||(0,D.default)(t)).call(this,e));return l.defaultMonth=P.Tools.getStartDefaultDate({formart:"YYYY-MM"}),l.commonControllers={importDataType:{type:"select",name:"importDataType",placeholder:"请选择数据类型",width:8,label:"数据类型:",options:[{label:"组织结构-关键指标",value:"11"},{label:"组织结构-组织结构",value:"2"}],defaultValue:"11"},dateType:{type:"radioGroup",name:"organizationType",width:16,label:"时间类型:",className:"ant-branch-left ",placeholder:"请选择时间类型",defaultValue:"1",radioOptions:[],onChangBtn:l.onDepTypeChange.bind(l)},month:{type:"month",name:"month",width:5,label:"年月:",defaultValue:P.Tools.getStartDefaultDate({formart:"YYYY-MM"})},buyType:{type:"select",name:"buyType",placeholder:"请选择交易所",width:10,label:"交易所:",options:[]},uploadcoll:{type:"upload",name:"uploadcoll",width:23,label:"文件上传:",uploadprops:{customRequest:l.onFileSelected.bind(l),onRemove:l.onRemove.bind(l)}},scBtn:{type:"button",name:"scBtn",width:3,label:"清除",labelCol:"17%",wrapperCol:"58%",onClickBtn:l.onRemove.bind(l)},tjBtn:{type:"button",name:"tjBtn",width:2,label:"上传",className:"ant-btn-primary",labelCol:"2%",wrapperCol:"98%",onClickBtn:l.onClickBtn.bind(l)},simpleBtn:{type:"button",width:24,label:"示例Excel下载",labelCol:"10%",wrapperCol:"78%",className:"ant-btn-primary",disabled:!1,onClickBtn:l.onSimpleBtn.bind(l)}},l.state={commonControllers:[],columnsModelsList:[],fileList:[]},l}return(0,k.default)(t,e),(0,g.default)(t,[{key:"radioOnChange",value:function(e){this.setState({tableLoading:!0})}},{key:"getControllers",value:function(e){var t=this.commonControllers,l=[[]];switch(e){case"1":l=[[(0,y.default)({},t.importDataType,{labelCol:"30%",wrapperCol:"65%"}),(0,y.default)({},t.dateType,{labelCol:"10%",wrapperCol:"75%"}),(0,y.default)({},t.uploadcoll,{labelCol:"10%",wrapperCol:"30%"}),(0,y.default)({},t.simpleBtn),(0,y.default)({},t.scBtn),(0,y.default)({},t.tjBtn)]];break;case"2":l=[[(0,y.default)({},t.importDataType,{labelCol:"30%",wrapperCol:"65%"}),(0,y.default)({},t.month,{labelCol:"20%",wrapperCol:"65%"}),(0,y.default)({},t.buyType,{labelCol:"14%",wrapperCol:"40%"}),(0,y.default)({},t.uploadcoll,{labelCol:"10%",wrapperCol:"30%"}),(0,y.default)({},t.scBtn),(0,y.default)({},t.tjBtn)]]}return l}},{key:"getCurrentControllers",value:function(e){var t=this.state.columnsModelsList;if("财务数据"==e){this.commonControllers.dateType.radioOptions=t.modelList[e],this.refs.filterController.setControllerData({importDataType:e,dateType:t.modelList[e][0].value});return this.getControllers("1")}this.commonControllers.buyType.options=t.modelList[e];var l=this.getControllers("2");return this.refs.filterController.setControllerData({importDataType:e,buyType:t.modelList[e][0].value,month:(0,N.default)(this.defaultMonth,"YYYY-MM")}),l}},{key:"onClickBtn",value:function(){var e=this,t=this.refs.filterController.getControllerData(),l=this.state.fileList,o=new FormData;if(l.forEach(function(e){o.append("file",e)}),"财务数据"==t.importDataType)o.append("importId",t.dateType);else if("市场数据"==t.importDataType){if(void 0==t.buyType||""==t.buyType)return C.default.error("请选择交易所！"),!1;if(void 0==t.endDate||""==t.endDate)return C.default.error("请选择月份！"),!1;o.append("importId",t.buyType),o.append("month",t.endDate)}if(l.length<1)return C.default.error("请选择要上传的文件！"),!1;(0,G.importDocument)(o).then(function(t){if(0!=t.code)return C.default.error("上传失败,请检查上传数据的格式！"),!1;C.default.success("上传成功！"),e.onRemove()})}},{key:"onSimpleBtn",value:function(){var e=this.refs.filterController.getControllerData(),t=e.dateType,l=this.state.columnsModelsList;if(void 0!=l.modelDetailList[t]){var o=l.modelDetailList[t].simplePath;window.open(o,"_self")}}},{key:"onDataChange",value:function(e,t){this.state.columnsModelsList;if("importDataType"==e){var l=this.getCurrentControllers(t);this.setState({commonControllers:l})}}},{key:"onDepTypeChange",value:function(e){var t=this.refs.filterController.getControllerData();t.dateType=e.target.value,this.refs.filterController.setControllerData(t)}},{key:"onFileSelected",value:function(e){this.file=e.file,this.commonControllers.uploadcoll.uploadprops.fileList=[e.file],this.setState(function(t){var l=t.fileList;return{fileList:[].concat((0,m.default)(l),[e.file])}});var t=this.refs.filterController.getControllerData();if(t.importDataType){var l=t.importDataType,o=this.getCurrentControllers(l);this.setState({commonControllers:o})}void 0!=t.endDate&&""!=t.endDate&&(t.month=(0,N.default)((0,N.default)(t.endDate,"YYYYMM").format("YYYY-MM"),"YYYY-MM"),delete t.endDate),this.refs.filterController.setControllerData(t)}},{key:"onRemove",value:function(){this.setState(function(e){e.fileList;return{fileList:[]}}),this.commonControllers.uploadcoll.uploadprops.fileList=[];var e=this.refs.filterController.getControllerData();if(e.importDataType){var t=e.importDataType,l=this.getCurrentControllers(t);this.setState({commonControllers:l})}void 0!=e.endDate&&""!=e.endDate&&(e.month=(0,N.default)((0,N.default)(e.endDate,"YYYYMM").format("YYYY-MM"),"YYYY-MM"),delete e.endDate),this.refs.filterController.setControllerData(e)}},{key:"componentDidMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,p.default)(u.default.mark(function e(){var t,l,o,a;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,G.informationCmodelList)();case 2:t=e.sent,console.log(t),this.setState({columnsModelsList:t}),this.commonControllers.importDataType.options=t.columnsList,l=t.columnsList[0].value,o=t.modelList[l][0].value,a=this.getCurrentControllers(l),this.setState({commonControllers:a}),this.refs.filterController.setControllerData({importDataType:l,dateType:t.modelList[l][0].value});case 11:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=R.default.createElement(P.FilterController,{ref:"filterController",controllers:this.state.commonControllers,onDataChange:this.onDataChange.bind(this)});return R.default.createElement("div",null,R.default.createElement(P.PanelContainer,{title:"数据导入"},R.default.createElement(r.default,{gutter:8},R.default.createElement(i.default,{xs:24,sm:24,md:24,lg:24,xl:24},R.default.createElement(P.JfCard,{className:"collection_upload",title:"数据格式示例及下载"},e)))))}}]),t}(x.Component));t.default=I,e.exports=I}});