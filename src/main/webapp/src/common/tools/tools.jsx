import _ from 'underscore';
import moment from 'moment';
require('es6-promise').polyfill();

const Tools = {};

/**
 * 页面默认时间获取方法
 * @param args | {date,formart,addType,addVal}
 * @return moment数据
 */
function getStartDefaultDate(args={}) {

    if( args.date ){
        if( args.addType && args.addVal ){
            return moment(args.date,args.formart?args.formart:'YYYY-MM-DD').add(args.addVal,args.addType);
        }else{
            //console.log(moment(args.date,args.formart?args.formart:'YYYY-MM-DD'));
            //return moment(args.date).format(args.formart?args.formart:'YYYY-MM-DD');
            return moment(args.date,args.formart?args.formart:'YYYY-MM-DD');
        }
    }else{
        if( args.addType && args.addVal ){
            //console.log(moment().add(args.addVal,args.addType));
            return moment().add(args.addVal,args.addType).format(args.formart?args.formart:'YYYY-MM-DD');
        }else{
            return moment().format(args.formart?args.formart:'YYYY-MM-DD');
        }

    }

};

/**
 * 年份选择框数据列表
 * @param args | {date 日期, size 长度}
 * @return yearOptions | [{label:‘2018年’,value:2018},{label:‘2018年’,value:2018}]
 */
function getYearOptions( args={} ){
    let baseYear = '';
    if( args.date != undefined ){
        baseYear = moment(args.date).format('YYYY');
    }else{
        baseYear = moment().format('YYYY');
    }

    let size = (args.size!=undefined)?Math.abs(args.size):10;
    let yearOptions = []
    let lastUpdateTime = Number(baseYear);

    for (var i = 0; i < size; i++) {
        yearOptions.push({
            label:lastUpdateTime+'年',
            value:lastUpdateTime+''
        })

        if( args.size==undefined || args.size >= 0 ){
            lastUpdateTime =  --lastUpdateTime;
        }else{
            lastUpdateTime =  ++lastUpdateTime;
        }

    }

    return yearOptions;
    //console.log(baseYear);
}

/**
 * 年份选择框数据列表
 * @param args | {date 日期, size 长度}
 * @return yearOptions | ['2018','2017'}]
 */
function getYearOptionsArray( args={} ){
    let baseYear = '';
    if( args.date != undefined ){
        baseYear = moment(args.date).format('YYYY');
    }else{
        baseYear = moment().format('YYYY');
    }

    let size = (args.size!=undefined)?Math.abs(args.size):10;
    let yearOptions = []
    let lastUpdateTime = Number(baseYear);

    for (var i = 0; i < size; i++) {
        yearOptions.push(lastUpdateTime);

        if( args.size==undefined || args.size >= 0 ){
            lastUpdateTime =  --lastUpdateTime;
        }else{
            lastUpdateTime =  ++lastUpdateTime;
        }

    }

    return yearOptions;
    //console.log(baseYear);
}

/**
 * [getRandom description]
 * @return {string} [description]
 */
function getRandom(){
    let Num="";
    for(let i=0;i<10;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }

    return new Date().getTime() +'_'+ Num*Math.random();
}

Tools.getStartDefaultDate = getStartDefaultDate;
Tools.getYearOptions = getYearOptions;
Tools.getYearOptionsArray = getYearOptionsArray;
Tools.getRandom = getRandom;

export default Tools;
