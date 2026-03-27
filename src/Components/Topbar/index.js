import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import userImg from "../../images/user.jpg";

class Topbar extends Component {
  render() {
    return (
      <header>
        <div id="navMenu">
          <Link id="logo" to="/shoplane-ecommerce-website/">
            <span>SHOP</span>LANE
          </Link>
          <div id="productBrowsingMenu">
            <Link className="pbMenuOption" to="/shoplane-ecommerce-website/">
              Home
            </Link>
            <Link
              className="pbMenuOption"
              to="/shoplane-ecommerce-website/#clothing-section"
            >
              Clothings
            </Link>
            <Link
              className="pbMenuOption"
              to="/shoplane-ecommerce-website/#accessory-section"
            >
              Accessories
            </Link>
          </div>
          <div id="userDataMenu">
            <i className="fas fa-search" aria-hidden="true" />
            <div id="cart-wrapper">
              <p id="cart-count">{this.props.cart.length}</p>
              <Link to="/shoplane-ecommerce-website/checkout">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </div>
            <img src={userImg} alt="img" />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProp = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProp, null)(Topbar);
