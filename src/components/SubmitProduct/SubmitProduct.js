import React, { Component } from "react";

import css from "./SubmitProduct.module.css";
import Button from "../CustomButtons/Button";
import TableInput from "../TableInput/TableInput";
//import { object } from "prop-types";
import Modal from '../../components/UI/Modal/Modal';
import DialogeModal from '../../components/UI/DialogeModal/DialogeModal';
import SubmitProductAddControl from './submitProductAddControl/submitProductAddControl';
import { string } from "prop-types";



export default class SubmitProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    newColumnAddedConfirm: false,
    rows: 1,
    columnNameAlreadyExisted: false,
    columns: this.props.columns,
    allOptions: {
      "قیمت": [
        "23000",
        "55000",
        "85000",
        "69000"],
      "موجودی": [
        "موجود",
        "ناموجود",
        "درحال تولید",

      ],
      "وزن": [
        "150g",
        "360g",
        "635g",
        "965g",

      ],
      "رنگ": [
        "قرمز",
        "آبی",
        "سبز",
        "صورتی",
      ]
    },
    options: {},
    allValues: {
      /*   "id1":"kakhall docxtor",
         "id2":"4w5t",
         "id3":"45",
         "id4":"45y45y45", */
    }
    ,
    showNewRowModal: false


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
    //I changed my mind so not to hash 
    //return string;
    return hash;
  };


  getValueHandler = (inputId, inputVal) => {

    console.log("inputId.split('__')[1]", inputId.split("__")[1]);
    //console.log("id,val",inputId,inputVal);
    //console.log("stateOld:",this.state.allValues);

    let oldData = { ...this.state.allValues }

    //console.log("oldData",oldData);
    const pair = { inputId: inputVal }
    let updatedData = { ...oldData };
    updatedData[inputId] = inputVal

    //console.log("updatedData222222",updatedData);


    this.setState({
      allValues: updatedData
    })




  }


  modalClosedHandler = () => {
    this.setState({
      showNewRowModal: false
    });
  }

  deleteUserAddedColumnHandler = (columnToDelete) => {
    //now columnToDelete is an object holding all information 
    console.log("delete", columnToDelete);
    const filteredColumns = this.state.columns.filter(colObject => {
      return colObject !== columnToDelete
    })


    this.setState({
      columns: filteredColumns
    })

  }

  addCol = (colName) => {
    let isDuplicate = false;
    let duplication = this.state.columns.map((col) => {
      return col.name.trim() === colName.trim();
    });
    duplication.forEach((element) => {
      if (element === true) {
        isDuplicate = true;
        return;
      }
    });
    if (isDuplicate) {
      // document.getElementById("newColName").style.borderColor="red"
      // alert("قبلا موجود است");
      this.setState({
        columnNameAlreadyExisted: true
      })
      return;
    }
    if (colName.trim() === "") {
      //  alert("نام ستون جدید را وارد کنید ");
      /*  const inputElement=document.getElementById("newColName")
       inputElement.style.borderColor="red"; */
      //inputElement.style.boxShadow="inset 0px 0px 10px red";
      /*      this.NewColInputRef.current.classList.add(css.borderAlert);
       */    /*inputRef = this.NewColInputRef.current; */
      document.getElementById("newColName").classList.add(css.borderAlert)
      // this.NewColInputRef.current.classList.add(css.borderAlert);
      return;
    }
    const oldColumns = [...this.state.columns];
    //splice doesnt return new array !!!
    // oldColumns.splice(-3, 0, colName);
    //oldColumns.push({ name: colName.trim(), isDefault: false, isNew: true })
    oldColumns.splice(-3, 0, { name: colName.trim(), isDefault: false, isNew: true })

    //console.log("old", oldColumns);
    //console.log("new", newColumns);


    //because push doesnt return new object 
    const newColumns = [...oldColumns]

    this.setState({
      //splice doesnt return new array !!!
      columns: newColumns, //newColumns
      newColumnAdding: false,
      newColumnAddedConfirm: true,
    });
    //change it to a new style not alert
    //alert("ویژگی جدید اضافه شد " + " :" + colName);
    setTimeout(() => {
      this.setState({
        newColumnAddedConfirm: false
      })
    }, 2000);
  };










  addNewRow = () => {

    let NeedTobeAdded;
    const lastRow = this.state.rows;
    this.state.columns.map((c, index) => {
      if (
        document
          .getElementById(lastRow + "__" + this.stringToHash(c.name))
          .value.trim() !== ""
      ) {
        NeedTobeAdded = true;
      }
    });
    if (!NeedTobeAdded) {
      this.setState({ showNewRowModal: true })
      //alert("آخرین ردیف شما هنوز خالیست !!");

    } else {

      this.setState((prevState) => {
        return {
          rows: prevState.rows + 1,
        };
      });
    }

  };


  showAddNewColumnHandler = () => {
    //alert("Inrered In showAddNewColumnHandler")
    this.setState({
      newColumnAdding: true,
    });
  };

  render() {
    let newRowModal = null;

    if (this.state.showNewRowModal) {
      newRowModal = <Modal
        sendOpenSignal={this.state.showNewRowModal}
        modalClosed={this.modalClosedHandler}
        title="آخرین ردیف خالیست"
        message="نمی توان همزمان چند ردیف خالی در آخرین سطر ها داشت "
      />

    } else {
      //I think Now Else is unnessaserry
      newRowModal = null
    }



    let newColumnNameRepetitiveModal = null;
    if (this.state.columnNameAlreadyExisted) {
      newColumnNameRepetitiveModal =
        <Modal
          sendOpenSignal={this.state.columnNameAlreadyExisted}
          modalClosed={() => {
            this.setState({
              columnNameAlreadyExisted: false
            })
          }}
          title="ویژگی موجود است"
          message="ویژگی وارد شده از قبل وجود دارد "
        />
    }





    let rows = [];
    const theads = this.state.columns.map((h) => {

      let deleteColumnFunc = null;//() => { }
      if (h.isNew) {
        deleteColumnFunc = () => this.deleteUserAddedColumnHandler(h)
      }
      return <th

        className={h.isNew ? css.hoverDelete : css.noDelete}

        onClick={deleteColumnFunc}

        key={h.name}
      >

        {h.name}

      </th>;
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
              placeHolder={col.name}
              id={j + "__" + this.stringToHash(col.name)}
              options={this.state.allOptions[col.name]}
              value={this.state.allValues[j + "__" + this.stringToHash(col.name)] ? this.state.allValues[j + "__" + this.stringToHash(col.name)] : ""}
              /* onChange={() => { return 0; }} */
              getValue={(id, val) => this.getValueHandler(id, val)}
              data_columnname={col.name}
              data_product_row={j}
              data_column_isnew={col.isNew}
            />
          </td>
        );
      });
    }



    return (
      <React.Fragment>
        {newRowModal}
        {newColumnNameRepetitiveModal}

        <div className={css.containerNoScroll}>


          <span className={css.labelStyle}>
            محصول انتخابی:
            <span>
              {this.props.userEditingProduct}
            </span>
          </span>



          <span className={css.labelStyle}>
            فروشنده :
          <span>
              {this.props.sellerName}
            </span>

          </span>
          <div className={css.container}>
            <table>
              <thead>
                <tr>{theads}</tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  return <tr key={Math.random() + r + Math.floor(Math.random(r))}>{r}</tr>;
                })}
                <tr>
                  <td>
                    <button className={css.addRowBtn} onClick={this.addNewRow}>سطر جدید</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>



          <Button className={css.buttonStyle}
            onClick={() => {
              //send data to backend for new products 



            }}
            color="success"> ذخیره </Button>




          <Button className={css.buttonStyle}
            onClick={() => {
              // All Relative states should be deleted 
              //  alert("انصراف پروسه اش طی شود ... آیا کانفیرم می خواهد و یا خیر ");
              this.props.submitCanceled();
            }
            }
            color="warning"> انصراف </Button>
        </div>



        <SubmitProductAddControl
          newColumnAdding={this.state.newColumnAdding}
          newColumnAddedConfirm={this.state.newColumnAddedConfirm}
          /* showAddNewColumn={this.showAddNewColumnHandler} */
          showAddNewColumnHandler={this.showAddNewColumnHandler}
          addCol={this.addCol}
          newColInput={this.ref}
        />
      </React.Fragment >
    );
  }
}






