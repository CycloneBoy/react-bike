import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
export default class  FormLogin extends React.Component{

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card>
                    <p>login</p>
                </Card>
            </div>
        );
    }
};


