import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Checkout from "./Components/Checkout";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Product from "./Components/ProductDetails";
import Topbar from "./Components/Topbar";
import OrderPlaced from "./Components/OrderPlaced";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Topbar />
        <div className="page-content">
          <Switch>
            <Route path="/shoplane-ecommerce-website/" exact component={Home} />
            <Route
              path="/shoplane-ecommerce-website/product"
              component={Product}
            />
            <Route
              path="/shoplane-ecommerce-website/checkout"
              component={Checkout}
            />
            <Route
              path="/shoplane-ecommerce-website/orderPlaced"
              component={OrderPlaced}
            />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
