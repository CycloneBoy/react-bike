import React from 'react'
import { Card, Button,  Form, Input, Select,Radio, message, Modal, DatePicker } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable'
import Moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export default class User extends React.Component{

    state = {
        list:[]
    };

    params = {
        page:1
    };

    // 默认请求我们的接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url:'/user',
            method:'GET',
            params:{
                page:this.params
            },
            data:{
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code === '0'){
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

    componentDidMount(){
        this.requestList();
    }

    // 操作员工
    handleOperator = (type)=>{
        let item = this.state.selectedItem;
        switch (type) {
            case 'create':{
                this.setState({
                    title:'创建员工',
                    isVisible:true,
                    type
                });
                break;
            }
            case "edit":
            case "detail":{
                if(!item){
                    Modal.info({
                        title: '信息',
                        content: '请选择一个用户'
                    });
                    return;
                }
                this.setState({
                    title:type==='edit'?'编辑用户':'查看详情',
                    isVisible:true,
                    userInfo:item,
                    type
                });
                break;
            }
            case "delete":{
                if(!item){
                    Modal.info({
                        title: '信息',
                        content: '请选择一个用户'
                    });
                    return;
                }
                Modal.confirm({
                    title:'删除',
                    content:'确定要删除此用户吗？',
                    onOk:()=>{
                        axios.ajax({
                            url:'/user/delete',
                            method:'DELETE',
                            data:{
                                id:item.id
                            }
                        }).then((res)=>{
                            if(res.code ===0){
                                message.success('删除操作成功' )
                                this.setState({
                                    isVisible:false
                                })
                                this.requestList();
                            }
                        })
                    }
                });
                break;
            }
            default:

        }
    };

    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        console.log("data:" + data)
        axios.ajax({
            url:type === 'create'?'/user/add':'/user/edit',
            method:type === 'create'?'POST':'PUT',
            data:{
                ...data
            }
        }).then((res)=>{
            if(res.code ===0){
                message.success(type === 'create'?'新增操作成功':'修改操作成功' )
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    };

    handleModify =(item) =>{
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
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex ===1 ?'男':'女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    return Utils.stateDic(state);
                }
            },{
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    return Utils.interestDic(interest);
                }
            },{
                title: '婚姻',
                dataIndex: 'isMarried',
                render(isMarried){
                    return isMarried?'已婚':'未婚'
                }
            },{
                title: '生日',
                dataIndex: 'birthday'
            },{
                title: '联系地址',
                dataIndex: 'address'
            },{
                title: '早起时间',
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
        return(
            <div>
                <Card>
                    <Form layout="inline">
                        <FormItem>
                            <Input  placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登 录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                            userInfo:''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>
            </div>
        )
    }
}


class UserForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.username:
                            getFieldDecorator('username',{
                                initialValue:userInfo.username
                            })(
                                <Input type="text" placeholder="请输入姓名"/>
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.sex===1?'男':'女':
                            getFieldDecorator('sex',{
                                initialValue:userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?Utils.stateDic(userInfo.state):
                            getFieldDecorator('state',{
                                initialValue:userInfo.state
                            })(
                                <Select>
                                    {Utils.getOptionList(Utils.getStateList())}
                                </Select>
                            )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.birthday:
                            getFieldDecorator('birthday',{
                                initialValue:Moment(userInfo.birthday)
                            })(
                                <DatePicker />
                            )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.address:
                            getFieldDecorator('address',{
                                initialValue:userInfo.address
                            })(
                                <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                            )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);