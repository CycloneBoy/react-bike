/**
 * 工具类
 */
import { Select} from "antd";
import React from "react";
const Option = Select.Option;
export default {
    // 日期格式化
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },

    // 状态词典
    stateConfig(state){
        let config =  {
            "1":"工作",
            "2":"学习",
            "3":"休息",
            "4":"旅行",
            "5":"创业",
            "6":"其它"
        };
        return config[state]
    },

    // 爱好词典
    interestConfig(interest){
        let config =  {
            "1":"骑行",
            "2":"跑步",
            "3":"打球",
            "4":"玩游",
            "5":"徒步",
            "6":"看剧",
            "7":"学习",
            "8":"读书",
            "9":"其他",
        };
        return config[interest]
    },

    // 表格分页封装
    pagination(data,callback){
        return{
            onChange:(current)=>{
                callback(current)
            },
            current:data.data.page,
            pageSize:data.data.pageSize,
            total:data.data.totalCount,
            showTotal:()=>{
                return `共${data.data.totalCount}条`
            },
            showQuickJumper:true,
            showSizeChanger:true,
        }
    },

    // 状态词典
    cityConfig(state){
        let config =  {
            "0":"全部",
            "1":"北京市",
            "2":"天津市",
            "3":"深圳市",
            "4":"武汉市",
            "5":"长沙市",
            "6":"其它"
        };
        return config[state]
    },

    // 用车模式词典
    carModeConfig(state){
        let config =  {
            "0":"全部",
            "1":"指定停车点模式",
            "2":"禁停区模式",
        };
        return config[state]
    },

    // 营运模式词典
    opModeConfig(state){
        let config =  {
            "0":"全部",
            "1":"自营",
            "2":"加盟",
        };
        return config[state]
    },

    // 加盟商授权状态词典
    authStatusConfig(state){
        let config =  {
            "0":"全部",
            "1":"已授权",
            "2":"未授权",
        };
        return config[state]
    },

    getSelectOption(list){
        let opList = []
         list.map((item,index)=>{
             opList.push( "<Option value=" + item.key+ ">" + item.value_+"</Option>")
        });
        return opList;
    },


}