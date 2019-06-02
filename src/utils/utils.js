/**
 * 工具类
 */
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
    }
}