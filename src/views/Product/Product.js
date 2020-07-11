import React, { Component } from "react";
import AddProduct from "../../components/AddProduct/AddProduct"; //'../components/AddProduct/AddProduct';
import ModifyProduct from "../../components/ModifyProduct/ModifyProduct";
//import css from "./Product.module.css";
//import JustTesting from "../../components/JustTesting/JustTesting";
export default class Product extends Component {
  state = {
    userProduct: "",
    sellerName: "کاربر لاگین شده .",
    userProductAlreadyExisted: true,
    existingProducts: ["شیشه", "عینک", "سبد", "میوه", "کلاه"],
    existingSubProducts: ["دودی", "سبز", "بنفش", "فوتو"],
  };

  getUserProduct = (evt) => {
    alert(evt.target.value);
  };

  render() {
    return (
      <div>
        <AddProduct clicked={this.getUserProduct} />
        <ModifyProduct
          seggests={this.state.existingProducts}
          subProducts={this.state.subProducts}
          userProductAlreadyExisted={this.state.userProductAlreadyExisted}
        />
      </div>
    );
  }
}
