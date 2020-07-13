import React, { Component } from "react";

import css from "./SubmitProduct.module.css";
import Button from "../CustomButtons/Button";
import TableInput from "../TableInput/TableInput";
//import { object } from "prop-types";

export default class SubmitProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    newColumnAddedConfirm: false,
    rows: 1,
    columns: this.props.columns,
   /*  options: [["q","dw","wqd"],
  ["uiltyrhrg","wegfgewgf","ewgfews"],["wefwe","wef","wegfwe"]], */
    //data: [{}],
   options:{}



  };
  stringToHash = (string) => {
    let char;
    var hash = 0;

    if (string.length === 0) return hash;

    for (let i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  componentDidMount() {
    console.log("Does have any Hashes??", this.stringToHash("gfg"));
    ///this.extractColumnsAndRowsFromJsonData();
/* const  ops= this.props.columns.map(col=>{
    return
  }) */
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
      document.getElementById("newColName").style({borderColor:"red"})
      alert("قبلا موجود است");
      return ;
    }
    if (colName.trim() === "") {
    //  alert("نام ستون جدید را وارد کنید ");
    const inputElement=document.getElementById("newColName")
    inputElement.style.borderColor="red";
    //inputElement.style.boxShadow="inset 0px 0px 10px red";

      return ;
    }


    

    const oldColumns = [...this.state.columns];
    //splice doesnt return new array !!!
    oldColumns.splice(-3, 0, colName);
    this.setState({
      //splice doesnt return new array !!!
      columns: oldColumns, //newColumns
      newColumnAdding: false,
      newColumnAddedConfirm: true,
    });
    //change it to a new style not alert
    //alert("ویژگی جدید اضافه شد " + " :" + colName);
    setTimeout(() => {
     this.setState({
      newColumnAddedConfirm: false
     })
    }, 1000);
  };

  addNewRow = () => {
    let NeedTobeAdded;
    const lastRow = this.state.rows ;
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
          <td
            /* className={css.hoverPlus} */ key={
              j + this.stringToHash(col + j) + Math.random(j)
            }
          >
            <TableInput
              className={css.bgGrey}
              placeHolder="مقدار جدیدی را وارد کنید "
              id={j + "__" + this.stringToHash(col)}
              options={this.state.options[index]}
            />
          </td>
        );
      });
    }

    return (
      <React.Fragment>
        <div className={css.container}>
          <span className={css.customRoundStyle2}>
            محصول انتخابی: :{this.props.userEditingProduct}
          </span>
          <span className={css.customRoundStyle2}>
            فروشنده :{this.props.sellerName}
          </span>

          <div className="container">
            <table>
              <thead>
                <tr>{theads}</tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  return <tr key={Math.random()+r +Math.floor(Math.random(r))}>{r}</tr>;
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

        {!this.state.newColumnAdding && !this.state.newColumnAddedConfirm && (
          <div className={[css.flxContainer, css.customRoundStyle].join(" ")}>
            <h5 className={css.title}>نیاز به افزودن وی‍رگی جدیدی دارم.</h5>
            <Button onClick={this.showAddNewColumnHandler} color="rose">
              افرودن ویزگی جدید
            </Button>
          </div>
        )}
        {this.state.newColumnAddedConfirm && (
          <div className={css.customRoundStyle}>
            
            <h5><span> &#9989;</span> ویژگی جدید افزوده شد</h5>
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
              را به ویژگی های موجود   
              <Button
                color="warning"
                onClick={() => {
                  this.addCol(document.getElementById("newColName").value);
                 
                }}
              >
                اضافه کن.
              </Button>
            </h5>
          </div>
        )}
      </React.Fragment>
    );
  }
}
