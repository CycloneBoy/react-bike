import React from 'react'
import { Row,Col } from 'antd';

import './style/common.less'
class Admin extends React.Component{

    render() {
        return (
            <Row className="container">
                <Col  span="4" className="nav-left">
                    <p>navleft</p>
                </Col>
                <Col span="20" className="main">
                    <p>header</p>
                    <Row className="content">
                        {/* <Home/> */}
                        <p>main</p>
                        {this.props.children}
                    </Row>
                    <p>footer</p>
                </Col>
            </Row>
        );
    }

}
export default Admin