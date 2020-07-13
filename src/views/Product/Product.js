import React, { Component } from "react";
import AddProduct from "../../components/SelectProduct/SelectProduct"; //'../components/AddProduct/AddProduct';
import SubmitProduct from "../../components/SubmitProduct/SubmitProduct";
//import css from "./Product.module.css";
//import JustTesting from "../../components/JustTesting/JustTesting";
export default class Product extends Component {
  state = {
    userNewProduct: "محصول  شماره ۱  ",
    sellerName: "فروشنده لاگین شده .",
    userProductAlreadyExisted: true,
   /*  existingProducts: ["کفش", "عینک", "سبد", "میوه", "کلاه"], */
    /* existingSubProducts: [], */
    productsTitles: ["قیمت ", "موجودی", "وزن"],
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
        <SubmitProduct
          subProducts={this.state.existingSubProducts}
          userProductAlreadyExisted={this.state.userProductAlreadyExisted}
          sellerName={this.state.sellerName}
          userEditingProduct={this.state.userNewProduct}
          columns={this.state.productsTitles}
        />
      </div>
    );
  }
}
