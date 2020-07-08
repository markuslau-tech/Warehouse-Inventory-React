import React, { Component } from 'react';
import { Table, Button, Form, Input, Row, message } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

class LocationApp extends Component {
    state = {
        isLoading: true,
        locations: []
    };

    async componentDidMount() {
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
        axios.post(`/locations/add`, value)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                message.error(err.message)
              })
    }

    deleteOnClick = (col) => {
        axios.delete(`/locations/remove/${col.id}`)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                message.error(err.message)
              })
    }

    render() {
        const { locations, isLoading } = this.state;

        const columns = [
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
            },
            {
                title: 'Action',
                key: 'action',
                render: (col) => <Button onClick={() => this.deleteOnClick(col)}> Delete</Button>
            }
        ]

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="LocationApp">

                <Form onFinish={this.submitForm}>
                <Row>
                    <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input new location! (e.g. "TKO")' }]}>
                        <Input style={{ width: "95%" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Submit </Button>
                    </Form.Item>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={locations} />

            </div >
        );
    }
}

export default LocationApp;