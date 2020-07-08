import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

import ProductApp from './ProductApp';
import LocationApp from './LocationApp';
import InventoryApp from './InventoryApp'

const { Header, Content, Sider } = Layout;

class RouterApp extends Component {

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>

                    <Sider>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <span>Products</span>
                                <Link to="/" />
                            </Menu.Item>
                            <Menu.Item key="2">
                                <span>Inventory Location</span>
                                <Link to="/location" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>

                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Route exact path="/" component={ProductApp} />
                            <Route path="/location" component={LocationApp} />
                            <Route path="/inventory/:id" component={InventoryApp} />
                        </Content>

                    </Layout>

                </Layout>
            </Router>
        );
    }
}


export default RouterApp;