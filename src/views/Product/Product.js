import React, { Component } from "react";
import SelectProduct from "../../components/SelectProduct/SelectProduct"; //'../components/AddProduct/AddProduct';
import SubmitProduct from "../../components/SubmitProduct/SubmitProduct";
//import css from "./Product.module.css";
//import JustTesting from "../../components/JustTesting/JustTesting";



export default class Product extends Component {
  state = {
    isProductSelected:true, //for testing  initially should be null
    userNewProduct: "محصول  شماره ۱  ",
    sellerName: "فروشنده لاگین شده .",
    userProductAlreadyExisted: null,
    productsTitles: ["قیمت", "موجودی", "وزن"],
  };
  getUserProduct = (evt) => {
    alert(evt.target.value);
  };



    productSelectedHandler=(status)=>{
if(status=true)
{this.setState({
  isProductSelected:true
})
}else{
  this.setState({
    isProductSelected:false
  })
}
    }
    
  render() {
    console.log(this.context);
    return (
      <div>
        
        <SelectProduct
          seggests={this.state.existingProducts}
          clicked={this.getUserProduct}
          changeStatus={this.productSelectedHandler}
          
        />
        
        {

this.state.isProductSelected&&

          <SubmitProduct
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
