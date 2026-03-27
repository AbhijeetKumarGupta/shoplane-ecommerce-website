import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, setCurrentProduct } from "../../Redux/Action";
import { Link } from "react-router-dom";
import Card from "./Card";
import ico1 from "../../images/icon1.png";
import ico2 from "../../images/icon2.png";
import ico3 from "../../images/icon3.png";
import ico4 from "../../images/icon4.png";
import Slider from "./Slider";

class Home extends Component {
  componentDidMount() {
    fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
      .then((res) => res.json())
      .then((result) => {
        this.props.fetchProducts(result);
      });
  }

  handleScroll(urlParam) {
    if (urlParam === "#clothing-section") {
      this.scrollTo(600);
    } else if (urlParam === "#accessory-section") {
      this.scrollTo(1250);
    } else {
      this.scrollTo(0);
    }
  }

  scrollTo = (val) => {
    window.scrollTo({
      top: val,
      behavior: "smooth",
    });
  };

  render() {
    var urlParam = window.location.href.split("/")[4];
    this.handleScroll(urlParam);
    const { products } = this.props;
    return (
      <>
        {!products.length ? (
          <div id="loading">
            <h2>Loading...</h2>
          </div>
        ) : (
          <main>
            <Slider key="slide" />
            <section id="features">
              <div className="icon-container">
                <div className="img-wrapper">
                  <img src={ico1} alt="" />
                </div>
                <h4>Free Delivery</h4>
              </div>

              <div className="icon-container">
                <div className="img-wrapper">
                  <img src={ico2} alt="" />
                </div>
                <h4>Money Back Gurantee</h4>
              </div>

              <div className="icon-container">
                <div className="img-wrapper">
                  <img src={ico3} alt="" />
                </div>
                <h4>Always Support</h4>
              </div>

              <div className="icon-container">
                <div className="img-wrapper">
                  <img src={ico4} alt="" />
                </div>
                <h4>Secure Payment</h4>
              </div>
            </section>

            <div id="products">
              <section id="clothing-section">
                <h2 id="clothingHeading">Clothing for Men and Women</h2>
                <div id="clothingDiv">
                  {products.map(
                    (item) =>
                      !item.isAccessory && (
                        <Link
                          className="card"
                          id={item.id}
                          to="/shoplane-ecommerce-website/product"
                          key={item.id}
                          onClick={() => this.props.setSelected(item)}
                        >
                          <Card {...item} />
                        </Link>
                      ),
                  )}
                </div>
              </section>
              <section id="accessory-section">
                <h2 id="accessoriesHeading">Accessories for Men and Women</h2>
                <div id="accessoriesDiv">
                  {products.map(
                    (item) =>
                      item.isAccessory && (
                        <Link
                          className="card"
                          id={item.id}
                          to="/shoplane-ecommerce-website/product"
                          key={item.id}
                          onClick={() => this.props.setSelected(item)}
                        >
                          {" "}
                          <Card {...item} />
                        </Link>
                      ),
                  )}
                </div>
              </section>
            </div>
          </main>
        )}
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  products: state.products,
});

const mapDispatchToProp = (dispatch) => ({
  fetchProducts: (payload) => dispatch(getProducts(payload)),
  setSelected: (payload) => dispatch(setCurrentProduct(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Home);
