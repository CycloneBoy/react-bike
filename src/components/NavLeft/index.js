import React from 'react'
import { Menu, Icon  } from 'antd';
import { NavLink } from 'react-router-dom'

import MenuConfig from '../../config/menuConfig'
import './index.less'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
    state = {
        currentKey: '',
        collapsed: false,
    };

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState( {
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data) =>{
        return data.map((item) =>{
            if(item.children){
                return (
                    <SubMenu key={item.key} title={
                        <span>
                          <Icon type={item.icon} />
                          <span>{item.title}</span>
                        </span>
                    }>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>

                <NavLink to={item.key}>
                    <Icon type={item.icon}/>{item.title}
                </NavLink>
                {/*{item.title}*/}
            </Menu.Item>

        })
    };

    homeHandleClick = () =>{
        // const {dispatch} = this.props;
        // dispatch()
    };
    render() {
        return (
            <div>
                <NavLink to="/home" onClick={this.homeHandleClick}>
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>环球车队</h1>
                        {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
                            {/*<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
                        {/*</Button>*/}
                    </div>
                </NavLink>
                <Menu
                    onClick={this.handleClick}
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}

export  default  NavLeft;