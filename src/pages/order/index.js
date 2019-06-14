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
        orderConfirmVisible:false
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
            list: Utils.getCityList()
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
            list: Utils.getOrderStatusList()
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

    // 返回选中的一行
    checkSelectItem =()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            });
            return;
        }
        return item;
    };

    // 打开订单详情页面
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            });
            return;
        };
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    };

    // 订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            });
            return;
        };
        axios.ajax({
            url:'/order/stop',
            method:'PUT',
            data:{
                orderId: item.id
            }
        }).then((res)=> {
            if (res.code == '0') {
                this.setState({
                    orderInfo:res.data,
                    orderConfirmVisble: true
                })
            }
        });
    };

    // 结束订单
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finishorder',
            method:'PUT',
            data:{
                orderId: item.id
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });
    };

    handleModify =(item) =>{
        let id = item.id;
        Modal.confirm({
            title:"修改",
            content:"你确认要修改此条数据吗？",
            onOk:()=>{
                message.success('修改成功！');
                this.requestList();
            }
        })
    };

    handleDelete =(item) =>{
        let id = item.id;
        Modal.confirm({
            title:"确认",
            content:"你确认要删除此条数据吗？",
            onOk:()=>{
                message.success('删除成功！');
                this.requestList();
            }
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
                dataIndex: 'status',
                render(value){
                    return Utils.orderStatusDic(value);
                }
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
            },
            {
                title: '操作',
                key: 'action',
                render: (text,item) => (
                    <span>
                        <Button size="small" type="primary" onClick={(item)=> {this.handleModify(item)}}>编辑</Button>
                        <Button size="small" type="danger" onClick={(item)=> {this.handleDelete(item)}}>删除</Button>
                     </span>
                ),
            },
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
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bikeSn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.startTime}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}