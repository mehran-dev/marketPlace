import React, { Component } from "react";
import SelectProduct from "../../components/SelectProduct/SelectProduct"; //'../components/AddProduct/AddProduct';
import SubmitProduct from "../../components/SubmitProduct/SubmitProduct";
//import css from "./Product.module.css";
//import JustTesting from "../../components/JustTesting/JustTesting";



export default class Product extends Component {
  state = {
    isProductSelected: false, //for testing  initially is true==> should be null Or false
    userNewProduct: "",
    sellerName: "برادران طاهری",
    ProductAlreadyExisted: null,
    productsTitles: ["قیمت", "موجودی", "وزن"],
  };
  getUserProduct = (evt) => {
    alert(evt.target.value);
  };



  productSelectedHandler = (status) => {
    if (status = true) {
      this.setState({
        isProductSelected: true
      })
    } else {
      this.setState({
        isProductSelected: false
      })
    }
  }


  productExistedHandler = (existed) => {
    this.setState({
      productExisted: existed
    })
  }





  submitCancelHandler = () => {
    this.setState({
      isProductSelected: false
    })
  }

  getSelectedProductAttributes = () => {

  }




  render() {
    console.log(this.context);
    return (
      <div>

        <SelectProduct
          seggests={this.state.existingProducts}
          clicked={this.getUserProduct}
          changeStatus={this.productSelectedHandler}
          productExisted={this.productExistedHandler}
          selectedProductAttributes={this.getSelectedProductAttributes}
        />

        {

          this.state.isProductSelected &&

          <SubmitProduct
            submitCanceled={this.submitCancelHandler}
            subProducts={this.state.existingSubProducts}
            userProductAlreadyExisted={this.state.userProductAlreadyExisted}
            sellerName={this.state.sellerName}
            userEditingProduct={this.state.userNewProduct}
            columns={this.state.productsTitles}
          />

        }

      </div>
    );
  }
}
