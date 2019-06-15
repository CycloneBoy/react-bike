import React from 'react';
import {Card, Table, Modal} from "antd";
import axios from './../../axios/index'
import Utils from  './../../utils/utils'

export default class BasicTable  extends React.Component{

    state ={
        dataSource: [],
        dataSource2: [],
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
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex){
                    return sex === 1?'男': (sex===2?'女':'保密')
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state){
                    return Utils.stateDic(state);
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'state',
                render(interest){
                    return Utils.interestDic(interest);
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
                render: () => (
                    <span>
                         <a href="#">修改</a>
                        <a href="#">删除</a>
                     </span>
                ),
            },
        ];

        return (
            <div>
                <Card title="基础表格">
                    <Table
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}/>
                </Card>
                <Card title="动态数据渲染基础表格" style={{marginTop:'10px'}}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={false}/>
                </Card>
                <Card title="Mock单选" style={{marginTop:'10px'}}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                        pagination={false}/>
                </Card>
                <Card title="Mock单选2" style={{marginTop:'10px'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        pagination={false}/>
                </Card>
                <Card title="Mock表格分页" style={{marginTop:'10px'}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={this.state.pagination}/>
                </Card>
            </div>
        );
    }

};


