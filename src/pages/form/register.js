import React from 'react';
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment'
import Utils from "../../utils/utils";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
class  FormRegister extends React.Component{

    state={}

    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(JSON.stringify(userInfo));
                message.success(`${userInfo.username} 恭喜你，你输入的密码为：${userInfo.password} ,记住我：${userInfo.remember}`)
            }
        });
    };

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load',()=> callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) =>{
        if(info.file.status === 'uploading'){
            this.setState({
                loading:true
            });
            return;
        } else if (info.file.status === 'done'){
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading:false,
            }))
        }

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        };
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        };
        const rowObject = {
            minRows:4, maxRows:6
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
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
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
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
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue:'1',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                        <Radio value="3">保密</Radio>
                                    </RadioGroup>
                                )}
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue:18,
                                })(
                                    <InputNumber/>
                                )}
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue:"2",
                                })(
                                    <Select>
                                        {Utils.getOptionList(Utils.getStateList())}
                                    </Select>
                                )}
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue:['2','4'],
                                })(
                                    <Select mode="multiple">
                                        {Utils.getOptionList(Utils.getInterestList())}
                                    </Select>
                                )}
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName:'checked',
                                    initialValue: false
                                })(
                                    <Switch/>
                                )}
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment("2019-06-01")
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"/>
                                )}
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '湖北省武汉市洪山区'
                                })(
                                    <TextArea
                                        autosize={rowObject}/>
                                )}
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker/>
                                )}
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={true}
                                        action="//jsonplaceholder.typicode.com/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} alt=""/>: <Icon type="plus"/>}
                                    </Upload>
                                )}
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {getFieldDecorator('remember', {
                                initialValue:false,
                                valuePropName:'checked'
                            })(
                                <Checkbox>我已经阅读过
                                    <a href='/'>环球车队协议</a>
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit} >
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }

}

export default Form.create()(FormRegister);

