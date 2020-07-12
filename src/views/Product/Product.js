import React, { Component } from "react";
import AddProduct from "../../components/AddProduct/AddProduct"; //'../components/AddProduct/AddProduct';
import ModifyProduct from "../../components/ModifyProduct/ModifyProduct";
//import css from "./Product.module.css";
//import JustTesting from "../../components/JustTesting/JustTesting";
export default class Product extends Component {
  state = {
    userNewProduct: "محصول  شماره ۱  ",
    sellerName: "فروشنده لاگین شده .",
    userProductAlreadyExisted: true,
    existingProducts: ["کفش", "عینک", "سبد", "میوه", "کلاه"],
    existingSubProducts: [],
  };

  getUserProduct = (evt) => {
    alert(evt.target.value);
  };

  render() {
    return (
      <div>
        <AddProduct
          seggests={this.state.existingProducts}
          clicked={this.getUserProduct}
        />
        <ModifyProduct
          subProducts={this.state.existingSubProducts}
          userProductAlreadyExisted={this.state.userProductAlreadyExisted}
          sellerName={this.state.sellerName}
          userEditingProduct={this.state.userNewProduct}
        />
      </div>
    );
  }
}
