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

    // 通用表单查询
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = []; //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });
        return options;
    },

    // 状态词典
    getDicValue(list,key){
        var value;
        list.forEach(function (item) {
            if(item['id'] === key.toString()) {
                value =  item['name'];
            }
        });
        return value
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

    // 城市词典
    getCityList(){
        return  [
            { id: '0', name: '全部' },
            { id: '1', name: '北京' },
            { id: '2', name: '天津' },
            { id: '3', name: '深圳' },
            { id: '4', name: '武汉' },
            { id: '5', name: '长沙' },
            { id: '6', name: '其他' }
        ];
    },

    // 状态词典
    cityDic(state){
        return this.getDicValue(this.getCityList(),state);
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

    // 订单状态
    getOrderStatusList(){
        return  [
            { id: '0', name: '全部' },
            { id: '1', name: '进行中' },
            { id: '2', name: '结束行程' }
            ];
    },

    // 订单状态词典
    orderStatusDic(state){
         return this.getDicValue(this.getOrderStatusList(),state);
    },



}