import React, { useState } from "react";
import css from "./TableInput.module.css";
import useAutocomplete from "@material-ui/lab/useAutocomplete";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const filter = createFilterOptions();

function TableInput(props) {
  //const [classes, setClasses] = useState([css.Input, css.touched]);
  //console.log("line 5 classes", classes);
  // const classes = [css.Input];
  const [value, setValue] = useState("");
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
  ];
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: props.id,
    key: "frmcontrol",
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

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

  const classes = useStyles();
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
      id="userProduct"
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
      }}
      onFocus={(e) => {
        console.log("onFocuse e:", e.target.value);
      }}
      onClose={(e) => console.log("onClose e:", e.target.value)}
      onKeyPress={(e) => {
        console.log("onKeyPress e:", e.target.value);
      }}
      options={["ewf", "ytjytj", "ertgrju"]}
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
          label="مقدار جدید"
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
            title: ` " افزودن:"${params.inputValue}`,
          });
        }

        return filtered;
      }}
    />
  );
}

export default TableInput;
