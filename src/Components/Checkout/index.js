import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";
import { clearCartAfterOrder } from "../../Redux/Action";

class Checkout extends Component {
  componentDidMount() {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  placeOrder(clearCart) {
    const dataObj = {
      amount: this.getTotal()[1],
      productCount: this.props.count,
      products: this.props.cart,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    };
    fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/order", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id, data);
        clearCart([]);
      });
  }

  getTotal = () => {
    var totalProdsCount = 0;
    var totalAmount = 0;

    for (var i = 0; i < this.props.count.length; i++) {
      totalProdsCount += this.props.count[i];
      totalAmount += this.props.cart[i].price * this.props.count[i];
    }
    return [totalProdsCount, totalAmount];
  };

  render() {
    this.scrollToTop();
    const totalCounts = this.getTotal();
    return (
      <main>
        <h1 id="main-heading">Checkout</h1>
        <div id="mainDivCheckout">
          <div id="leftDiv">
            <h3 className="otherHead">
              Total Items: <span id="item-count">{totalCounts[0]}</span>
            </h3>
            {this.props.cart.map((item, index) => (
              <Card quantity={this.props.count[index]} {...item} key={index} />
            ))}
          </div>
          <div id="rightDiv">
            <div id="totalDetails">
              <h2>Total Amount</h2>
              <p>
                Total Amount: Rs<span id="total-amount">{totalCounts[1]}</span>
              </p>
              <Link
                id="button"
                onClick={() => {
                  this.placeOrder(this.props.clearCart);
                }}
                to="/shoplane-ecommerce-website/orderPlaced"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProp = (state) => ({
  cart: state.cart,
  count: state.prodCount,
});

const mapDispatchToProp = (dispatch) => ({
  clearCart: (payload) => dispatch(clearCartAfterOrder(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Checkout);
