import React, { Component } from 'react';
import OrderItem from '../OrderItem';


class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }


  // 组件完成挂载时获取数据
  componentDidMount() {
    fetch('/mock/orders.json').then(res => {
      if(res.ok) {
        res.json().then(data => {
          this.setState({
            data
          })
        })
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.data.map(item => {
            return (
              <OrderItem
                onSubmit={this.handleSubmit}
                key={item.id}
                data={item} />
            )
          })
        }
      </div>
    )
  }

  handleSubmit = (id, comment, stars) => {
    /* fetch('/saveComment').then(() => {}) */

    const newData = this.state.data.map(item => {
      return item.id === id ? {
        ...item, comment, stars, ifCommented : true
      } : item;
    })
    console.log(newData)
    this.setState({
      data: newData
    })
  }
}

export default OrderList;