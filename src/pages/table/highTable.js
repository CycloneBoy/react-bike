import React from 'react';
import {Card, Table,Button, Modal,message} from "antd";
import axios from './../../axios/index'
import Utils from  './../../utils/utils'

export default class HighTable  extends React.Component{

    state ={
    };

    params = {
        page:1
    };

    componentDidMount() {
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ];
        data.map((item,index)=>{
            item.key = index;
        });
        this.setState({
            dataSource :data
        });
        this.request();
    }

    request = ()=>{
        let _this = this;
        axios.ajax({
            url:'/table/list',
            method:'GET',
            params:{
                page:this.params.page
            },
            data:{
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code == '0'){
                console.info("getdata: " + res.data);
                res.data.result.map((item,index)=>{
                    item.key = index;
                });
                this.setState({
                    dataSource2:res.data.result,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    };

    onRowClick = (record,index)=>{
        let selectKey = [index];
        Modal.info({
            title:"信息",
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        });
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem: record
        })
    };

    handleModify =(item) =>{
        let id = item.id;
        Modal.confirm({
            title:"修改",
            content:"你确认要修改此条数据吗？",
            onOk:()=>{
                message.success('修改成功！')
                this.request();
            }
        })
    };

    handleDelete =(item) =>{
        let id = item.id;
        Modal.confirm({
            title:"确认",
            content:"你确认要删除此条数据吗？",
            onOk:()=>{
                message.success('删除成功！')
                this.request();
            }
        })
    };

    handleChange = (pagination, filters, sorter)=>{
        console.log("::" + sorter)
        this.setState({
            sortOrder:sorter.order
        })
    }

    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const  rowSelection = {
            type: 'radio',
            selectedRowKeys
        };

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
        };

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                sorter:(a,b)=>{
                    return a.id - b.id;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
                sorter:(a,b)=>{
                    return a.userName - b.userName;
                },
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex){
                    return sex === 1?'男': (sex===2?'女':'保密')
                },
                sorter:(a,b)=>{
                    return a.sex - b.sex;
                },
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state){
                    return Utils.stateConfig(state);
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'state',
                render(interest){
                    return Utils.interestConfig(interest);
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
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

        return (
            <div>
                <Card title="表格排序和操作按钮" style={{marginTop:'10px'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        onChange={this.handleChange}
                        pagination={this.state.pagination}/>
                </Card>
            </div>
        );
    }

};


