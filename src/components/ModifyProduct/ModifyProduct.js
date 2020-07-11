import React, { Component } from "react";

import css from "./ModifyProduct.module.css";
import Button from "../../components/CustomButtons/Button";
//import CustomInput from "../../components/CustomInput/CustomInput";
import TableInput from "../../components/TableInput/TableInput";
export default class ModifyProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    rows: this.props.subProducts.length - 1,
    columns: ["قیمت", "موجودی", "وزن"],

    data: [{}],
  };

  componentDidMount() {
    function stringToHash(string) {
      let char;
      var hash = 0;

      if (string.length == 0) return hash;

      for (let i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }

      return hash;
    }

    console.log("Dowe have any Hash??", stringToHash("gfg"));
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("CDU");
  }

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
    //splice doent return new array !!!
    oldColumns.splice(-3, 0, colName);

    this.setState({
      //splice doent return new array !!!
      columns: oldColumns, //newColumns
      newColumnAdding: false,
    });
    alert("ویژگی جدید اضافه شد " + " :" + colName);
  };

  addNewRow = () => {
    let NeedTobeAdded;
    const lastRow = this.state.rows + 1;
    this.state.columns.map((c, index) => {
      console.log(lastRow + "__" + (index + 1));
      if (
        document.getElementById(lastRow + "__" + (index + 1)).value.trim() !==
        ""
      ) {
        NeedTobeAdded = true;
      }
    });
    if (!NeedTobeAdded) {
      alert("آخرین ردیف شما هنوز خالیست !!");
    } else {
      this.setState((prevState) => {
        return {
          rows: prevState.rows + 1,
        };
      });
    }
  };

  showAddNewColumnHandler = () => {
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
            <TableInput
              className={css.bgGrey}
              placeHolder="مقدار جدیدی را وارد کنید "
              id={j + 1 + "__" + (index + 1)}
            />
          </td>
        );
      });
    }

    return (
      <React.Fragment>
        <button className={css.hoverPlus}>testing</button>

        <div className={css.container}>
          <span className={css.customRoundStyle2}>
            محصول در حال ویرایش :{this.props.userEditingProduct}
          </span>
          <span className={css.customRoundStyle2}>
            نام فروشنده :{this.props.sellerName}
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

        {!this.state.newColumnAdding && (
          <div className={[css.flxContainer, css.customRoundStyle].join(" ")}>
            <h5 className={css.title}>نیاز به افزودن وی‍رگی جدیدی دارم.</h5>
            <Button onClick={this.showAddNewColumnHandler} color="rose">
              افرودن ویزگی جدید
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
      </React.Fragment>
    );
  }
}
