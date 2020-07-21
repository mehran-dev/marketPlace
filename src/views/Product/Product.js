import React, { Component } from "react";
import SelectProduct from "../../components/SelectProduct/SelectProduct"; // '../components/AddProduct/AddProduct';
import SubmitProduct from "../../components/SubmitProduct/SubmitProduct";
// import css from "./Product.module.css";
// import JustTesting from "../../components/JustTesting/JustTesting";


export default class Product extends Component {
  state = {
    isProductSelected: true, // for testing  initially is true==> should be null Or false
    userNewProduct: "محصول/کالا ۱",
    sellerName: "برادران طاهری",
    ProductAlreadyExisted: null,
    // productsTitles: ["قیمت", "موجودی", "وزن"],
    productColumns: [
      {
        name: "مدل", isDefautl: false, isNew: true
      },
      {
        name: "گارانتی", isDefautl: false, isNew: false
      },
      {
        name: "نوع بسته بندی", isDefautl: false, isNew: true
      },
      {
        name: "کیفیت ساخت", isDefautl: false, isNew: false
      },

      {
        name: "قیمت", isDefautl: true, isNew: false
      }
      ,
      {
        name: "وزن", isDefautl: true, isNew: false
      }
      ,
      {
        name: "رنگ", isDefautl: true, isNew: false
      }
    ]
  };
  getUserProduct = (evt) => {
    alert(evt.target.value);
  };


  productSelectedHandler = (status) => {
    if (status = true) {
      this.setState({ isProductSelected: true })
    } else {
      this.setState({ isProductSelected: false })
    }
  }


  productExistedHandler = (existed) => {
    this.setState({ productExisted: existed })
  }


  submitCancelHandler = () => {
    this.setState({ isProductSelected: false })
  }

  getSelectedProductAttributes = () => { }


  render() {
    ///console.log(this.context);
    return (
      <div>

        <SelectProduct seggests={
          this.state.existingProducts
        }
          clicked={
            this.getUserProduct
          }
          changeStatus={
            this.productSelectedHandler
          }
          productExisted={
            this.productExistedHandler
          }
          selectedProductAttributes={
            this.getSelectedProductAttributes
          } /> {

          this.state.isProductSelected && <SubmitProduct submitCanceled={
            this.submitCancelHandler
          }
            subProducts={
              this.state.existingSubProducts
            }
            userProductAlreadyExisted={
              this.state.userProductAlreadyExisted
            }
            sellerName={
              this.state.sellerName
            }
            userEditingProduct={
              this.state.userNewProduct
            }
            columns={
              this.state.productColumns
            } />
        }
      </div>
    );
  }
}
