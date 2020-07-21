import React, { useState, useEffect } from "react";
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
  const [value, setValue] = useState("null");
  //const [focuseVal, setFocuseVal] = useState(null);
  //const [closeVal, setCloseVal] = useState(null);
  const [val2Store, setVal2Store] = useState(null);

  useState(() => {
    //setValue(props.value)
    setVal2Store(props.value)
  });

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
      value={val2Store}
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
      data_columnname={props.data_columnname}
      id={props.id}
      freeSolo
      onChange={(event, newValue) => {
        setVal2Store(newValue)
        // console.log("newVal onchange",newValue);
        props.getValue(props.id, newValue)
        //  console.log("newVal is set Now");
        //console.log("val2store onchange ",val2Store);

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
        //  setVal2Store(newValue);
        props.getValue(props.id, newValue)
      }}
      onInputChange={(event, newValue) => {
        //  setMyValue(newValue);
        setVal2Store(newValue);
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });

        } else {
          setValue(newValue)
        }






      }}
      getOptionSelected={(option, value) => {
        //console.log("op,val",value);

      }

      }
      onFocus={(e) => {
        // setMyValue(e.target.value);
        // setFocuseVal(e.target.value);
      }}
      onClose={(e) => {

        // setMyValue(e.target.value);

        //console.log("onclose e ",e.target.value);
        // console.log("var2store onclose ",val2Store);
        // console.log("docgelID",document.getElementById(props.id));

        if (e.target.value !== 0) {

          props.getValue(props.id, val2Store)
        }



      }
      }
      getOptionSelected={(option, value) => {
        // console.log("OOOOP Fuckeer",option);
        //return option === value
      }}

      onKeyPress={(e) => {

      }}
      onKeyUp={(e) => {
        //  console.log('kkkkkkkkkkkUUUUUUUp',e.target.value);
        // props.getValue(props.id,e.target.value)
      }}
      options={props.options ? props.options : []}
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
          //   console.log("option === 'string' is true");
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option;//.title removed
      }}
      renderInput={(params) => (
        <TextField
          InputProps={{
            className: css.inputColor,
          }}
          {...params}
          label={props.placeHolder}

          //varient relates to label !!!
          variant="outlined"
        />
      )}
      autoHighlight
      selectOnFocus
      handleHomeEndKeys

      filterOptions={
        (options, params) => {
          //I changed the structure and params input val became null !! so I need to add existing val to it 
          params.inputValue = val2Store
          //console.log('options',options);
          //console.log('params',params);
          const filtered = filter(options, params);


          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `${params.inputValue}`,
            });
          }

          return filtered;
        }}
    />
  );
}

export default TableInput;
