import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options){
        return new Promise((resolve, reject) =>{
           JsonP(options.url, {
               param: 'callback'
           },function (err, response) {
               if (response.status === 'success') {
                   resolve(response);
               } else {
                   reject(response.messsage);
               }
           })
        } )
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://easy-mock.com/mock/5cf380b5cfcb92308b8d04cd/react-bike';
        return new Promise((resolve,reject) =>{
            axios({
                url: options.url,
                method: options.method,
                baseURL: baseApi,
                timeout: 10000,
                params: options.params || '',
                data : options.data|| ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    // console.log("response:" + response.data.result)
                    let res = response.data;
                    if (res.code == '0'){
                        // console.log("result:" + res.message)
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}