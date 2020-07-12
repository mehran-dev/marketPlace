import React, { Component } from "react";

import css from "./ModifyProduct.module.css";
import Button from "../../components/CustomButtons/Button";
//import CustomInput from "../../components/CustomInput/CustomInput";
import TableInput from "../../components/TableInput/TableInput";
import { object } from "prop-types";

export default class ModifyProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    rows: 1,
    columns: ["قیمت", "موجودی", "وزن"],

    data: [{}],
  };
  stringToHash = (string) => {
    let char;
    var hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  //props.subproducts ==> columnNames,,rows,,data
  extractColumnsAndRowsFromJsonData = () => {
    let extractedColumnsName = [];
    let extractedRowsNumber = 0;
    let lgth = this.props.subProducts.length;
    let jsonData = this.props.subProducts;
    console.log(this.props.subProducts);

    const dataKeys = Object.keys(jsonData);
    //every product in array
    dataKeys.forEach((key) => {
      //every key in a single product

      //console.log("Key in Key !!!!", Object.keys(jsonData[key]));
      Object.keys(jsonData[key]).forEach((e) => {
        if (extractedColumnsName.includes(e)) {
          //Ok colName  already Existed
        } else {
          extractedColumnsName.push(e);
        }
      });

      // console.log("extractedColumn :", extractedColumn);

      //Extracting default columns maybe is an stupid idea ;;...
      /* defautlColumns=this.state.columns
defautlColumns.forEach(c=>{
}) */
    });
    //Time to add columns or maybe rows to the state ::=>
    this.setState({
      columns: extractedColumnsName,
      rows: extractedRowsNumber,
    });
  };

  componentDidMount() {
    console.log("Does have any Hash??", this.stringToHash("gfg"));
    ///this.extractColumnsAndRowsFromJsonData();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("cdu");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("scu");
    return true;
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
    //splice doesnt return new array !!!
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
      if (
        document
          .getElementById(lastRow + "__" + this.stringToHash(c))
          .value.trim() !== ""
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

    for (let j = 1; j <= this.state.rows; j++) {
      rows[j] = this.state.columns.map((col, index) => {
        return (
          <td /* className={css.hoverPlus} */ key={j + Math.random(j)}>
            <TableInput
              className={css.bgGrey}
              placeHolder="مقدار جدیدی را وارد کنید "
              id={+j + 1 + "__" + this.stringToHash(col)}
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
            محصول انتخابی: :{this.props.userEditingProduct}
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
                    <button onClick={this.addNewRow}>سطر جدید</button>
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
