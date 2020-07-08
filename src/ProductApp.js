import React, { Component } from 'react';
import { Table, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as Papa from 'papaparse';
import 'antd/dist/antd.css';


class ProductApp extends Component {
  state = {
    isLoading: true,
    products: []
  };

  async componentDidMount() {
    axios.get(`/products`)
      .then(res => {
        const products = res.data.sort((a,b) => (a.code > b.code) ? 1 : -1);
        this.setState({ products, isLoading: false });
      })
      .catch(err => {
        message.error(err.message)
      })
  }

  deleteOnClick = (col) => {
    axios.delete(`/products/remove/${col.id}`)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        message.error(err.message)
      })
  }

  render() {
    const { products, isLoading } = this.state;

    const columns = [
      {
        title: 'Name',
        key: 'name',
        render: (col) => <a href={`/inventory/${col.id}`}> {col.name} </a>
      },
      {
        title: 'Product Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
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
      <div className="ProductApp">
        <Upload
          accept=".csv"
          showUploadList={false}
          beforeUpload={file => {
            Papa.parse(file, {
              header: true,
              complete: function (results) {
                var data = results.data
                var json = data.filter(d => "name" in d && "code" in d && "weight" in d)
                axios.post(`/products/add`, json)
                  .then(res => {
                    message.success(res.statusText)
                    window.location.reload()
                  })
                  .catch(err => {
                    message.error(err.message)
                    message.error("Make sure csv file include fields name, code and weight")
                  })
              }
            });
          }}
        >
          <Button style={{ marginRight: "15px" }}>
            <UploadOutlined /> Click to Upload Product csv
          </Button>
        </Upload>

        <Upload
          accept=".csv"
          showUploadList={false}
          beforeUpload={file => {
            Papa.parse(file, {
              header: true,
              complete: function (results) {
                var data = results.data
                var json = data.filter(d => "code" in d && "location" in d && "qty" in d)
                axios.post(`/inventory/add`, json)
                  .then(res => {
                    message.success(res.statusText)
                    console.log(res)
                  })
                  .catch(err => {
                    message.error(err.message)
                    message.error("Make sure location and product exist")
                  })
              }
            });
          }}
        >
          <Button>
            <UploadOutlined /> Click to Upload Inventory csv
                    </Button>
        </Upload>
        <Table columns={columns} dataSource={products} />

      </div >
    );
  }
}

export default ProductApp;