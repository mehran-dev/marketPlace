import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import image from '../../assets/img/faces/marc.jpg';
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
       editable: "never"
      // render:rowData=> <div style={{border:'2px solid yellow' ,width:'16px',height:"16px"}}> <img src={image} style={{backgroundColor:"red" , width:"100%",borderRadius:'3px'}}/></div>,
     /*   lookup:{12:"تهران",56:"شهرستان"} */
    },
      { title: 'مشخصات', field: 'surname' ,isEditable:false},
      { title: 'قیمت', field: 'surname' },
      { title: 'تعداد', field: 'birthYear', type: 'numeric' },
      {
        title: 'محل تولد',
        field: 'birthCity',
      render:rowData=>{
         // console.log('rowData',rowData);
         return <div style={{border:'2px solid yellow' ,width:'120px',height:"20px"}}> {rowData.birthCity}</div>
    } ,
          

        lookup: { 34: 'تهران', 63: 'ازگیل' },
      },
    ],
    data: [
      { name: 'محمد', surname: 'حسینی', birthYear: 1373, birthCity: 63 },
      {
        name: 'زری',
        surname: 'جوادی',
        birthYear: 1395,
        birthCity: 34,
      },
      {
        name: 'حسن',
        surname: 'یوسفی',
        birthYear: 2015,
        birthCity: 34,
      },
    ],
  });

useEffect(() => {
  //http request

  setTimeout(() => {
    setLoading(false);
    let errChance = Math.floor(Math.random()*100);
    console.log(errChance);
    if (errChance>=1)setError(true);
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
    components = {{
        Pagination: props => (
          <TablePagination {...props} style={{ direction: "ltr" }} />
        )
      }}
      title="لیست محصولات"
      columns={state.columns}
      data={state.data}
      onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

      options={{

        /*  
        puts the action to the left side 
        we dont want that in farsi mode RTL directions  
        actionsColumnIndex: -1,
         */

        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        },

            /*       
            استایل دهی به همه ستون ها
            rowStyle: {
                        backgroundColor: '#EEE',
                    }, */
          

          rowStyle: rowData => ({
            color: (selectedRow === rowData.tableData.id) ? '#ff2500' : '#de1000',
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#00f000' : '#00c000',
          })
    
    
    }}

    actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        rowData => ({
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You want to delete " +rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}




       editable={{
//   Icon Plus ke bala safhe hastesh ro mighouyad
       onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }), 





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





        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}//end of editable  

    />
    // end if loading condition 
    }

    </React.Fragment>
  );
}