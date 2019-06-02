import React from 'react';
import './style/common.less'

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
