import React from 'react';
import { Button,Row,Col } from 'antd'
import './style/common.less'
import Admin from './admin'

class App extends React.Component {
  render() {
    return (
            <div>
                {this.props.children}
            </div>
    );
  }
}

export default App;
