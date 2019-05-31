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
                <div>
                    <Admin/>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
