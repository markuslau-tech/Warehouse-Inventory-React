import React, { Component } from 'react';
import { Table, Form, Input, Select, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

class InventoryApp extends Component {
    state = {
        isLoading: true,
        inventories: []
    };

    async componentDidMount() {
        const productId = this.props.match.params.id
        axios.get(`/inventory/${productId}`)
            .then(res => {
                const inventories = res.data;
                this.setState({ inventories });
            })
            .catch(err => {
                message.error(err.message)
              })
        axios.get(`/locations`)
            .then(res => {
                const locations = res.data;
                this.setState({ locations, isLoading: false });
            })
            .catch(err => {
                message.error(err.message)
              })
    }

    submitForm = (value) => {
        const { inventories } = this.state;
        if (value.from == value.location) {
            message.error("Location cannot be same!")
        } else if ( inventories.find(i => i.location.location == value.from).qty < value.qty ) {
            message.error("Inventory not enough!")
        } else {
            const productId = this.props.match.params.id 
            axios.put(`/inventory/transfer?id=${productId}`, value)
                .then(res => {
                    window.location.reload()
                })
                .catch(err => {
                    message.error(err.message)
                  })
        }
    }

    render() {
        const { inventories, locations, isLoading } = this.state;
        const { Option } = Select;

        const columns = [
            {
                title: 'Location',
                key: 'location',
                render: (col) => <span>{col.location.location}</span>
            },
            {
                title: 'Quantity',
                dataIndex: 'qty',
                key: 'qty',
            },
        ]

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="InventoryApp">
                <Table columns={columns} dataSource={inventories} />
                <Form onFinish={this.submitForm} >
                    <Row>
                        <Col span={6}>
                            <Form.Item name="from" label="From" rules={[{ required: true, message: "Please select!" }]}>
                                <Select style={{ width: "95%" }}>
                                    {inventories.map(i => (i.location.location)).map(i => <Option value={i} > {i} </Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="to" label="To" rules={[{ required: true, message: "Please select!" }]}>
                                <Select style={{ width: "95%" }}>
                                    {locations.map(i => <Option value={i.location} > {i.location} </Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="qty" label="Quantity" rules={[{ required: true, message: "Please fill!" }]}>
                                <Input style={{ width: "95%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit"> Submit </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default InventoryApp;