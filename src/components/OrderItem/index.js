import React, { Component } from 'react';
import './style.css'

class OrderItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false, // 订单是否处于被评价的状态
      stars: props.data.stars || 0, // 评分
      comment: props.data.commet || "" // 提交的内容
    }
  }

  render() {
    const {shop, product, price, picture, ifCommented} = this.props.data;

    return (
      <div className='orderItem'>
        <div className='orderItem__picContainer'>
          <img
            className='orderItem__pic'
            src={picture}
            alt={picture}/>
        </div>
        <div className='orderItem__content'>
          <div className='orderItem__product'>{product}</div>
          <div className='orderItem__shop'>{shop}</div>
          <div className='orderItem__detail'>
            <div className='orderItem__price'>{price}</div>
            <div>
              {
                ifCommented ? (
                    <button className='orderItem__btn orderItem__btn--grey'>
                      已评价
                    </button>
                  ): (
                    <button
                      className='orderItem__btn orderItem__btn--red'
                      onClick={this.handleOpenEditArea}>
                      评价
                    </button>
                  )
              }
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    )
  }

  /*订单评价的UI*/
  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          onChange={this.handleCommentChange}
          value={this.state.comment}
          className="orderItem__comment" />
        {this.renderStars()}
        <button
        onClick={this.handleSubmitComment}
          className="orderItem__btn orderItem__btn--red">
          提交
        </button>
        <button
          onClick={this.handleCancelComment}
          className="orderItem__btn orderItem__btn--grey">
          取消
        </button>
      </div>
    )
  }



  /* 五角星 打分UI */
  renderStars() {
    const { stars } = this.state;
    return (
      <div>
      {
        [1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              onClick={this.handleClickStars.bind(this, item)}
              key={index}>
                ★
            </span>
          )
        })
      }
      </div>
    )
  }
    /* 点击评价按钮的事件处理 */
    handleOpenEditArea = () => {
      this.setState({
        editing: true
      })
    }

    handleCommentChange = (e) => {
      this.setState({
        comment: e.target.value
      })
    }
    /* 评分 */
    handleClickStars = (stars) => {
      console.log(stars);
      this.setState({
        stars: stars
      })
    }
    /* 提交 */
    handleSubmitComment = () => {
      const { id } = this.props.data;
      const { comment, stars} = this.state;
      this.setState({
        editing: false
      })
      this.props.onSubmit(id, comment, stars)
    }
    /* 取消 */
    handleCancelComment = () => {
      this.setState({
        editing: false,
        stars: this.props.data.stars || 0,
        comment: this.props.data.commet || ""
      })
    }
}

export default OrderItem;