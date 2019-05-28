import React from 'react';
import { Button,Row,Col } from 'antd'
import './style/common.less'
import Admin from './admin'

class App extends React.Component {
  render() {
    return (
        <div className="App">
          {/*<Button type="primary">Button</Button>*/}
            <div>
                <div className="header">
                    <Row className="header-top">
                        {
                                <Col span="6" className="logo">
                                    <img src="/assets/logo-ant.svg" alt=""/>
                                    <span>CycloneBoy 通用管理系统</span>
                                </Col>
                        }
                        <Col span={18}>
                            <span>欢迎，环球</span>
                            <a href="#">退出</a>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Admin/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
