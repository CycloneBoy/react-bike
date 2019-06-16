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
        let options = [];
        data.map((item)=>(
            options.push(<Option value={parseInt(item.id)} key={item.id}>{item.name}</Option>)
        ));
        return options;
    },

    // 获取domainUrl
    getDomainUrl(){
        var url = document.location.toString();
        var hostUrl = url.split("#");
        return hostUrl[0]
    },

    // 获取词典值
    getDicValue(list,key){
        var value;
        list.forEach(function (item) {
            if(item['id'] === String(key)) {
                value =  item['name'];
            }
        });
        return value
    },

    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },

    // 获取状态列表
    getStateList(){
        return  [
            { id: '0', name: '保密' },
            { id: '1', name: '工作' },
            { id: '2', name: '学习' },
            { id: '3', name: '休息' },
            { id: '4', name: '旅行' },
            { id: '5', name: '创业' },
            { id: '6', name: '其它' },
        ];
    },

    // 状态词典
    stateDic(state){
        return this.getDicValue(this.getStateList(),state);
    },

    // 获取状态列表
    getInterestList(){
        return  [
            { id: '0', name: '骑行' },
            { id: '1', name: '跑步' },
            { id: '2', name: '打球' },
            { id: '3', name: '玩游"' },
            { id: '4', name: '徒步' },
            { id: '5', name: '创业' },
            { id: '6', name: '看剧' },
            { id: '7', name: '学习' },
            { id: '8', name: '读书' },
            { id: '9', name: '其他' },
        ];
    },

    // 爱好词典
    interestDic(state){
        return this.getDicValue(this.getInterestList(),state);
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

    // 获取echarts注册名称
    getEchartsRegisterThemeName(){
        return "echartsTheme"
    },


}