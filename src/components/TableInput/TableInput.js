import React, { useState ,useEffect} from "react";
import css from "./TableInput.module.css";
//import useAutocomplete from "@material-ui/lab/useAutocomplete";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";









function TableInput(props) {
  
  
  
  // React Hooks //
 
  const filter = createFilterOptions();
  //const [classes, setClasses] = useState([css.Input, css.touched]);
  //console.log("line 5 classes", classes);
  // const classes = [css.Input];
  const [value, setValue] = useState(null);
  const [myValue, setMyValue] = useState(props.value);

/*   const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps, 
    groupedOptions,
  } = useAutocomplete({
    id: props.id,
    key: "frmcontrol",
    options: ["Line 34 tableinput"],
    getOptionLabel: (option) => option.title,
  });
 */

  return ( 
    <Autocomplete
    value={value} 
      fullWidth
      classes={{
        inputRoot: css.inputRoot,
        input: css.input,
        popper: css.popperA,
        paper: css.paper,
        listbox: css.listbox,
        clearIndicator: css.clearIndicator,
        endAdornment: css.endAdornment,
        root: css.root,
      }}
      id={props.id}
      freeSolo
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      onInputChange={(event, newValue) => {
        setMyValue(newValue);
          if (typeof newValue === "string") {
            setValue({
              title: newValue,
            }); 
          } else if (newValue && newValue.inputValue  ) {
            // Create a new value from the user input
             setValue({
              title: newValue.inputValue,
            }); 
          
          } else {
          setValue(newValue)
          }
  
          console.log("onInputChange myyyyvalue is ", myValue );
                
  


        
      }}
      getOptionSelected={(option,value)=>{
//console.log("op,val",value);
      }

      }
      onFocus={(e) => {
        setMyValue(e.target.value);
      }}
      onClose={(e) =>{
        setMyValue(e.target.value);
      
console.log("onclose e ",e.target.value);
// props.getValue(props.id , myValue)


      } 
    }
      onKeyPress={(e) => {
      
      }}
      onKeyUp={(e) => {
        setMyValue(e.target.value);
      
      }}
      options={props.options  ?props.options:[] }
      /*       getOptionLabel={(seggestions) => seggestions.title}
       *//*  getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }} */
      getOptionLabel={(option) => {
       // console.log('option',option)
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderInput={(params) => (
        <TextField
          InputProps={{
            className: css.inputColor,
          }}
          {...params}
          label={props.placeHolder + " "+"محصول"}
          variant="outlined"
        />
      )}
      autoHighlight
      selectOnFocus
      handleHomeEndKeys
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `" افزودن:"${params.inputValue}`,
          });
        }

        return filtered;
      }}
    />
  );
}

export default TableInput;
