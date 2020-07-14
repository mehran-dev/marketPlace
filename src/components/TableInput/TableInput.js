import React, { useState } from "react";
import css from "./TableInput.module.css";
//import useAutocomplete from "@material-ui/lab/useAutocomplete";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { checkPropTypes } from "prop-types";








function TableInput(props) {
  
  
  
  // React Hooks //
 
  const filter = createFilterOptions();
  //const [classes, setClasses] = useState([css.Input, css.touched]);
  //console.log("line 5 classes", classes);
  // const classes = [css.Input];
  const [value, setValue] = useState("");

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
      // onChange={(e) => console.log("onChange e:", e.target.value)}
      onChange={(event, newValue) => {
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
          setValue(newValue);
        }

        console.log("is this okey ??", value);
      }}
      onFocus={(e) => {
        console.log("onFocuse e:", e.target.value);
      }}
      onClose={(e) =>{

        console.log("onClose e:", e.target.value);
        props.getValue(props.id ,e.target.value)
      } 
    }
      onKeyPress={(e) => {
        console.log("onKeyPress e:", e.target.value);
      }}
      onKeyUp={(e) => {
        console.log("onKeyUp e:", e.target.value);
      }}
      options={props.options ?props.options:[]}
      /*       getOptionLabel={(seggestions) => seggestions.title}
       */ getOptionLabel={(option) => {
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
