import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
class  FormLogin extends React.Component{

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.success(`${userInfo.username} 恭喜你，你输入的密码为：${userInfo.password} ,记住我：${userInfo.remember}`)
            }
        });
    };
    usernameError="";
    passwordError="";

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item validateStatus={this.usernameError ? 'error' : ''} help={this.usernameError || ''}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={this.passwordError ? 'error' : ''} help={this.passwordError || ''}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                    <Form style={{width:500}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                initialValue:'',
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空!'
                                    },{
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },{
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue:'',
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空!'
                                    },{
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },{
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'密码必须为字母或者数字'
                                    }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock"  />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                initialValue:true,
                                valuePropName:'checkd'
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a href="#" style={{float:'right'}}>忘记密码？</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit} >
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
};

export default Form.create()(FormLogin);

