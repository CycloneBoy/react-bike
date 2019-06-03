import React from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message} from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{

    state  = {
        orderInfo:{},
        orderConfirmVisble:false
    };

    params = {
        page: 1
    };
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询',
            label:"开始时间"
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'orderStatus',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ];

    componentDidMount(){
        this.requestList()
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    };

    // 默认请求我们的接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url:'/order',
            method:'GET',
            params:{
                page:this.params
            },
            data:{
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code == '0'){
                let list = res.data.result.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                this.setState({
                    list,
                    pagination: Utils.pagination(res,(current,pageSize)=>{
                        _this.params.page = current;
                        _this.params.pageSize = pageSize;
                        this.requestList();
                    })
                })
            }
        })
    };


    openOrderDetail = ()=>{

    }

    handleConfirm = ()=>{

    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    };

    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'orderSn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bikeSn'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'totalTime'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'startTime'
            },
            {
                title: '结束时间',
                dataIndex: 'endTime'
            },
            {
                title: '订单金额',
                dataIndex: 'totalFee'
            },
            {
                title: '实付金额',
                dataIndex: 'userPay'
            }
        ];

        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        };
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        };
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        )
    }
}