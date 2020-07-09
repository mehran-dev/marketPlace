import React, { Component } from "react";
import AddProduct from "../../components/AddProduct/AddProduct"; //'../components/AddProduct/AddProduct';
import ModifyProduct from "../../components/ModifyProduct/ModifyProduct";
import css from "./Product.module.css";

export default class Product extends Component {
  state = {};
  render() {
    return (
      <div>
        Product page
        <AddProduct />
        <ModifyProduct />
      </div>
    );
  }
}
