import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 通用的过滤表格
 */
class FilterForm extends React.Component{

    // 搜索过滤表格提交
    handleFilterSubmit =()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    };

    // 搜索过滤表格重置
    reset = ()=>{
        this.props.form.resetFields();
    };

    // 搜索过滤表格初始化
    initFormList = ()=>{
        const  { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length > 0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                switch (item.type) {
                    case '时间查询':{
                        const begin_time = <FormItem label={label} key={field+"1"}>
                            {
                                getFieldDecorator('beginTime')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>;
                        formItemList.push(begin_time)
                        const end_time = <FormItem label="~" colon={false} key={field+"2"}>
                            {
                                getFieldDecorator('endTime')(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>;
                        formItemList.push(end_time)
                    }
                        break;
                    case 'INPUT':{
                        const INPUT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field],{
                                    initialValue: initialValue
                                })(
                                    <Input type="text" placeholder={placeholder} />
                                )
                            }
                        </FormItem>;
                        formItemList.push(INPUT);

                    }
                        break;
                    case 'SELECT':{
                        const SELECT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field], {
                                    initialValue: initialValue
                                })(
                                    <Select
                                        style={{ width: width }}
                                        placeholder={placeholder}
                                    >
                                        {Utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>;
                        formItemList.push(SELECT);
                    }
                    break;
                    case 'CHECKBOX':{
                        const CHECKBOX = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field], {
                                    valuePropName: 'checked',
                                    initialValue: initialValue //true | false
                                })(
                                    <Checkbox>
                                        {label}
                                    </Checkbox>
                                )
                            }
                        </FormItem>;
                        formItemList.push(CHECKBOX);
                    }
                        break;
                    default:{

                    }
                }
            })
        }
        return formItemList
    };

    render() {
        return (
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(FilterForm);