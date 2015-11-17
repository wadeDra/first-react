import React from 'react';
import ReactDOM from 'react-dom';


import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

const MenuHeader = React.createClass({
    getInitialState() {
        return {
            current: 'mail'
        }
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },
    render() {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  theme={this.state.theme}
                  mode="horizontal">
                <Menu.Item key="mail">
                    <Icon type="mail" />导航一
                </Menu.Item>
                <Menu.Item key="app">
                    <Icon type="appstore" />导航二
                </Menu.Item>
                <SubMenu title={<span><Icon type="setting" />导航 - 子菜单</span>}>
                    <Menu.Item key="setting:1">选项1</Menu.Item>
                    <Menu.Item key="setting:2">选项2</Menu.Item>
                    <Menu.Item key="setting:3">选项3</Menu.Item>
                    <Menu.Item key="setting:4">选项4</Menu.Item>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
                </Menu.Item>
            </Menu>
        );
    }
});

ReactDOM.render(
    <MenuHeader/>,
    document.getElementById('header')
);