import React, { useState, useEffect } from "react";
import css from "./TableInput.module.css";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";









function TableInput(props) {



  // React Hooks //

  const filter = createFilterOptions();
  const [value, setValue] = useState("null");
  const [val2Store, setVal2Store] = useState(null);

  useState(() => {
    setVal2Store(props.value)
  });

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
        props.getValue(props.id, newValue)


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
        props.getValue(props.id, newValue)
      }}

      onInputChange={(event, newValue) => {
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




      onClose={(e) => {

        if (e.target.value !== 0) {

          props.getValue(props.id, val2Store)
        }
      }}


      options={props.options ? props.options : []}

      getOptionLabel={(option) => {

        if (typeof option === 'string') {

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
