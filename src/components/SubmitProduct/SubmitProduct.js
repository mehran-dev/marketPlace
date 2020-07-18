import React, { Component } from "react";

import css from "./SubmitProduct.module.css";
import Button from "../CustomButtons/Button";
import TableInput from "../TableInput/TableInput";
//import { object } from "prop-types";
import Modal from '../../components/UI/Modal/Modal'; 

import SubmitProductAddControl from './submitProductAddControl/submitProductAddControl';



export default class SubmitProduct extends Component {
  state = {
    sellerName: "Loged in User !",
    productName: "",
    newColumnAdding: false,
    newColumnAddedConfirm: false,
    rows: 1,
    columnNameAlreadyExisted:false,
    columns: this.props.columns,
 allOptions:{
   "قیمت":[
     "23000",
     "55000",
     "85000",
     "69000"],
   "موجودی":[
"موجود",
"ناموجود",
"درحال تولید",

   ],
   "وزن":[
"150g",
"360g",
"635g",
"965g",

   ]
 },
   options:{},
   allValues:{
     /* "id1":"kakhall docxtor",
     "id2":"4w5t",
     "id3":"45",
     "id4":"45y45y45", */
   }
,
showNewRowModal:false


  };
   NewColInputRef = React.createRef(); 
  
  
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


getValueHandler=(inputId,inputVal)=>{
//console.log("id,val",inputId,inputVal);
  //console.log("stateOld:",this.state.allValues);

  let oldData={...this.state.allValues}

//console.log("oldData",oldData);
const pair={inputId:inputVal}
let updatedData={...oldData};
updatedData[inputId]=inputVal

//console.log("updatedData222222",updatedData);


  this.setState({
    allValues:updatedData
  })
/*   setTimeout(() => {
    
    console.log("newState now is :",this.state.allValues);
  }, 1000); */
}


  componentDidMount() {
    //console.log("Does have any Hashes??", this.stringToHash("gfg"));
    ///this.extractColumnsAndRowsFromJsonData();
/* const  ops= this.props.columns.map(col=>{
    return
  }) */
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("cdu");
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("scu");
    return true;
  }

refTransfer=(el)=>{
 this.NewColInputRef.ref=el;
}
modalClosedHandler=()=>{
this.setState({
  showNewRowModal:false
});
}
  


addCol = (colName) => {
    let isDuplicate = false;
    let duplication = this.state.columns.map((col) => {
      return col.trim() === colName.trim();
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
        columnNameAlreadyExisted:true
      })
     return ;
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
    }, 2000);
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
      this.setState({showNewRowModal:true})
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
  let newRowModal =null;

  if(this.state.showNewRowModal){
    newRowModal=  <Modal 
    sendOpenSignal={this.state.showNewRowModal}
     modalClosed={this.modalClosedHandler}
     title="آخرین ردیف خالیست" 
     message="نمی توان همزمان چند ردیف خالی در آخرین سطر ها داشت "
     />

  }else{
   //I think Now Else is unnessaserry
    newRowModal=null
  }



  let newColumnNameRepetitiveModal=null;
  if(this.state.columnNameAlreadyExisted){
    newColumnNameRepetitiveModal=
    <Modal
    sendOpenSignal={this.state.columnNameAlreadyExisted}
    modalClosed={()=>{
this.setState({
  columnNameAlreadyExisted:false
})
    }}
    title="ویژگی موجود است"
    message="ویژگی وارد شده از قبل وجود دارد "
    />
  }
  
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
              placeHolder={col}
              id={j + "__" + this.stringToHash(col)}
              options={this.state.allOptions[col]}
              value={this.state.allValues[j + "__" + this.stringToHash(col)]?this.state.allValues[j + "__" + this.stringToHash(col)]:""}
              onChange={()=>{return 0;}}
              getValue={(id,val)=>this.getValueHandler(id,val)}
            />
          </td>
        );
      });
    }

    return (
      <React.Fragment>
{ newRowModal}
{newColumnNameRepetitiveModal}
<div className={css.container2}>
          <span className={css.customRoundStyle2}>
            محصول انتخابی: :{this.props.userEditingProduct}
          </span>
          <span className={css.customRoundStyle2}>
            فروشنده :{this.props.sellerName}
          </span>
        <div className={css.container}>

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
                    <button className={css.addRowBtn} onClick={this.addNewRow}>سطر جدید</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Button 
        onClick={()=>{
          console.log(this.state.allValues);
        }}
        color="success"> ذخیره </Button>
        </div>



<SubmitProductAddControl
newColumnAdding={this.state.newColumnAdding}
newColumnAddedConfirm={this.state.newColumnAddedConfirm}
/* showAddNewColumn={this.showAddNewColumnHandler} */
showAddNewColumnHandler={this.showAddNewColumnHandler}
addCol={this.addCol}
nwColInput={this.ref}
/>
      </React.Fragment>
    );
  }
}








/*  <div className={css.animationContainer}>
    
  {!this.state.newColumnAdding && !this.state.newColumnAddedConfirm && (
    <div className={[css.flxContainer, css.customRoundStyle].join(" ")}>
      <h5 className={css.title}>نیاز به افزودن وی‍رگی جدیدی دارم.</h5>
      <Button onClick={this.showAddNewColumnHandler} color="rose">
        افرودن ویزگی جدید
      </Button>
    </div>
  )}
  {this.state.newColumnAddedConfirm&&(
    <div 
    className={css.customRoundStyle}>
      <h5><span> &#9989;</span> ویژگی جدید افزوده شد</h5>
    </div>
  )}
  {this.state.newColumnAdding && (
    <div className={css.customRoundStyle}>
      <h5>
        <input
          className={css.newColName}
          id="newColName"
          ref={this.NewColInputRef}
          placeholder="ویژگی مورد نظر"
          onChange={()=>{
          // document.getElementById("newColName").style.borderColor="rgba(204, 204, 204, 0.582)"
          // document.getElementById("newColName").focus();
           this.NewColInputRef.current.classList.remove(css.borderAlert);
          }}
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
  </div> */