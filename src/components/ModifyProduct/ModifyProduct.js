import React, { Component } from "react";

import css from "./ModifyProduct.module.css";
import Button from "../../components/CustomButtons/Button";
//import CustomInput from "../../components/CustomInput/CustomInput";

export default class ModifyProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    rows: 3,
    columns: ["قیمت", "موجودی", "وزن"],

    data: [{}],
  };

  componentDidMount() {}

  addCol = (colName) => {
    let isDuplicate = false;
    let duplication = this.state.columns.map((col) => {
      return col === colName;
    });
    duplication.forEach((element) => {
      if (element === true) {
        isDuplicate = true;
        return;
      }
    });
    if (isDuplicate) {
      alert("قبلا موجود است");
      return;
    }
    if (colName.trim() === "") {
      alert("نام ستون جدید را وارد کنید ");
      return;
    }

    const oldColumns = [...this.state.columns];
    /*    console.log(oldColumns);
   
           console.log(oldColumns.length - 3); */
    //splice doent return new array !!!
    oldColumns.splice(-3, 0, colName);
    /* console.log(newColumns);
     */
    this.setState({
      //splice doent return new array !!!
      columns: oldColumns, //newColumns
    });
    /*        setTimeout(() => {
                   console.log(this.state.columns);
       
               }, 2000) */
  };

  addNewRow = () => {
    this.setState((prevState) => {
      return {
        rows: prevState.rows + 1,
      };
    });
  };

  showSddNewColumnHandler = () => {
    this.setState({
      newColumnAdding: true,
    });
  };

  render() {
    let rows = [];
    const theads = this.state.columns.map((h) => {
      return <th key={h}>{h}</th>;
    });

    for (let j = 0; j <= this.state.rows; j++) {
      rows[j] = this.state.columns.map((col, index) => {
        return (
          <td /* className={css.hoverPlus} */ key={j + Math.random(j)}>
            {" "}
            <input className={css.bgGrey} id={j + 1 + "__" + (index + 1)} />
          </td>
        );
      });
    }

    return (
      <React.Fragment>
        <button className={css.hoverPlus}>testing</button>
        {!this.state.newColumnAdding && (
          <div className={[css.flxContainer, css.customRoundStyle].join(" ")}>
            <h5 className={css.title}>
              آیا نیاز به افزودن ویزگی جدیدی دارید ؟
            </h5>
            <Button onClick={this.showSddNewColumnHandler} color="rose">
              افرودن ویرگی جدید
            </Button>
          </div>
        )}

        {this.state.newColumnAdding && (
          <div className={css.customRoundStyle}>
            <h5>
              <input
                className={css.newColName}
                id="newColName"
                placeholder="ویژگی مورد نظر"
              />
              را به ویژکی های موجود اضافه کن .
              <Button
                color="warning"
                onClick={() =>
                  this.addCol(document.getElementById("newColName").value)
                }
              >
                اضافه کردن
              </Button>
            </h5>
          </div>
        )}

        <div className={css.container}>
          <span className={css.customRoundStyle2}>
            محصول در حال ویزایش :{this.props.productName}
          </span>
          <span className={css.customRoundStyle2}>
            نام فروشنده :{this.state.sellerName}
          </span>

          <div className="container">
            <table>
              <thead>
                <tr>{theads}</tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  return <tr key={Math.random()}>{r}</tr>;
                })}
                <tr>
                  <td>
                    <button onClick={this.addNewRow}>افزودن</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Button color="success"> ذخیره </Button>
      </React.Fragment>
    );
  }
}
