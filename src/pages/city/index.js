import React from 'react';
import {Card,Button, Table, Form, Select, Modal, message} from "antd";
import axios from './../../axios/index'
import Utils from  './../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state ={
        list:[],
        isShowOpenCity:false
    };

    params = {
        page:1
    };

    componentDidMount() {
        this.request()
    }

    // 默认请求我们的接口数据
    request = ()=>{
        let _this = this;
        axios.ajax({
            url:'/city',
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
                let list = res.data.result.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource:list,
                    pagination: Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    };



    handleChange = (pagination, filters, sorter)=>{
        console.log("::" + sorter)
        this.setState({
            sortOrder:sorter.order
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

    handleOpenCity =()=>{
        this.setState({
            isShowOpenCity:true
        })
    };

    // 城市开通提交
    handleSubmit =()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url:'/city/open',
            method:'POST',
            data:{
                body:cityInfo
            }
        }).then((res)=> {
            if (res.code == '0') {
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                })
                this.request();
            }
        })
    };


    render() {
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id',
                sorter:(a,b)=>{
                    return a.id - b.id;
                },
            },
            {
                title: '城市名称',
                dataIndex: 'name',
                sorter:(a,b)=>{
                    return a.name.localeCompare(b.name);
                },
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                },
                sorter:(a,b)=>{
                    return a.mode - b.mode;
                },
            }, {
                title: '营运模式',
                dataIndex: 'opMode',
                render(opMode) {
                    return opMode == 1 ? '自营' : (opMode == 2 ? '加盟' : '其他');
                },
                sorter:(a,b)=>{
                    return a.opMode - b.opMode;
                },
            }, {
                title: '授权加盟商',
                dataIndex: 'franchiseeName'
            }, {
                title: '城市管理员',
                dataIndex: 'cityAdmins',
                render(arr){
                    return arr.map((item)=>{
                        return item.userName;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'openTime'
            }, {
                title: '操作时间',
                dataIndex: 'updateTime',
                render: Utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sysUserName'
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
                <div>
                    <Card>
                        <FilterForm />
                    </Card>
                    <Card style={{marginTop:10}}>
                        <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                    </Card>
                    <Table className="content-wrap"
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        onChange={this.handleChange}
                        pagination={this.state.pagination}/>
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                    >
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends React.Component{

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('cityId')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 120 }}
                                placeholder="全部"
                            >

                                <Option value="0">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('opMode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('authStatus')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="全部"
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} >查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator }  =this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('cityId',{
                            initialValue:'1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('opMode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('useMode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);