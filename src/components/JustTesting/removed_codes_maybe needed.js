//props.subproducts ==> columnNames,,rows,,data
/*  extractColumnsAndRowsFromJsonData = () => {
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
      // defautlColumns=this.state.columns
//defautlColumns.forEach(c=>{
//}) 
    });
    //Time to add columns or maybe rows to the state ::=>
    this.setState({
      columns: extractedColumnsName,
      rows: extractedRowsNumber,
    });
  }; */


















  import { makeStyles } from "@material-ui/core/styles";


  const useStyles = makeStyles((theme) => ({
    label: {
      display: "block",
    },
    input: {
      width: 200,
    },
    listbox: {
      width: 200,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: "absolute",
      listStyle: "none",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 200,
      border: "1px solid rgba(0,0,0,.25)",
      '& li[data-focus="true"]': {
        backgroundColor: "#4a8df6",
        color: "white",
        cursor: "pointer",
      },
      "& li:active": {
        backgroundColor: "#2977f5",
        color: "white",
      },
    },
  }));
  //const classes = useStyles();