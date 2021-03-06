import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import css from './TableDataEditable.module.css'; 
import Modal from '../../components/UI/Modal/Modal'; 


        /* 
      Dont know  How  Edit conditionally  follow::=>
        https://stackoverflow.com/questions/59000376/react-material-table-editable-enabled-without-being-able-to-set-iseditable
        */



export default function MaterialTableDemo() {


  const [selectedRow, setSelectedRow] = useState(null);
  const [loading,setLoading]=React.useState(true);
  const[error,setError]=useState(false);

  const [state, setState] = React.useState({
    columns: [
      { title: 'محصول',
       field: 'name' ,
       editable: "never",
       maxWidth: 20,
       align: 'right',
       format: (value) => value.toLocaleString('fa'),
       width:"20px",
       cellStyle:{
         backgroundColor:"red",
         textAlign:"center",
         border:"1px solid black"
       },
       headerStyle:{
       }
      // render:rowData=> <div style={{border:'2px solid yellow' ,width:'16px',height:"16px"}}> <img src={image} style={{backgroundColor:"red" , width:"100%",borderRadius:'3px'}}/></div>,
     /*   lookup:{12:"تهران",56:"شهرستان"} */
    },
      { title: 'مشخصات',
       field: 'properties' , 
       editable: "never",
       isEditable:false,
       width:"600px",
      cellStyle:{
        backgroundColor:"blue",
        textAlign:"center",
      
      }},
      { title: 'قیمت', field: 'price', 
      
      cellStyle:{
        backgroundColor:"yellow",
        textAlign:"center",
        width:"20px"
      } },
      { title: 'تعداد', field: 'amount', type: 'numeric',
      cellStyle:{
        backgroundColor:"green",
        textAlign:"center",
        width:"20px"
      }
    },
    /*   {
        title: 'محل تولد',
        field: 'amount',
 
return custom style and ....      
 render:rowData=>{
         // console.log('rowData',rowData);
      //   return <div style={{border:'2px solid yellow' ,width:'120px',height:"20px"}}> {rowData.birthCity}</div>
    } , 
       lookup: { 34: 'تهران', 63: 'گرمسار' },
      }, */
    ],
    data: [
      { id:"12ty14",
        name: 'لباس',
       properties: 'پیراهن بلند کتان سایز لارج',
        price: "125000t", 
        amount: 63 ,
     },
      { id:"wd12we",
        name: 'کفش',
        properties: 'کفش ملی بادوام و راحت',
        price: "12000t",
        amount: 30,
      },
      { id:"23er43",
        name: 'کلاه',
        properties: 'کلاه حصیری سبک سایز بجگانه',
        price: "25000t",
        amount: 34,
      },
    ],
  });

useEffect(() => {
  //http request

  setTimeout(() => {
    setLoading(false);
    let errChance = Math.floor(Math.random()*100);
    console.log(errChance);
    if (errChance>=5525)setError(true);
  }, 100);
}, )


  return (

    <React.Fragment>
      {error&&<Modal title="مشکلی پیش آمده" message="ممکن است اشکال از اتصال اینترنت و یا سرور باشد"/>}
      {error&&<button onClick={(e)=>{
             console.log(e);
        setTimeout(() => {
          setError(false);
        }, 1000);
      }}>تلاش مجدد </button>}
      {!error&&loading&& <div className={css.SpinnerContainer}>  <Spinner/> </div> }
   
   
   
   {!error&&!loading&& <MaterialTable
   classes={{
    paginationRoot:css.paginationRoot,
    paginationToolbar:css.paginationToolbar,
    paginationCaption:css.paginationCaption,
    paginationSelectRoot:css.paginationSelectRoot

  }
   }
    components = {{
        Pagination: props => (
          <TablePagination {...props} style={{ direction: "ltr" }} />
        ),
        hugyf:props=>(
          <h3 {...props}> erfv</h3>
        )
      }}
      title="لیست محصولات"
      columns={state.columns}
      data={state.data}
      onRowClick={((evt, selectedRow) =>{
        //alert(selectedRow.tableData.id)

        console.log(selectedRow);
return    setSelectedRow(selectedRow.tableData.id)
      } 
      )}

      options={{

        /*  
        puts the action to the left side 
        we dont want that in farsi mode RTL directions  
        actionsColumnIndex: -1,
         */

        searchFieldStyle:{
          backgroundColor:"pink"
        },
        headerStyle: {
          backgroundColor: 'blue',
          color: '#FFF',
          textAlign:"center"
        },

            /*       
            استایل دهی به همه ستون ها
            rowStyle: {
                        backgroundColor: '#EEE',
                    }, */
          

          rowStyle: rowData => ({
            color: (selectedRow === rowData.tableData.id) ? '#fff' : '#333',
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#aaa' : '#eee',
            textAlign:"center",
            border:"0px solid red"
           
          })
    
    
    }}

    actions={[
      /*   {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }, */
      /*   rowData => ({
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You want to delete " +rowData.name),
          disabled: rowData.birthYear < 2000
        }) */
      ]}




       editable={{
//   Icon Plus ke bala safhe hastesh ro mighouyad
/*        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),  */





        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
             // alert("hello");
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),





      /*   onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }), */
      }}//end of editable  

    />
    // end if loading condition 
    }

    </React.Fragment>
  );
}