import React, { useState, useEffect } from "react";
import css from "./AddProduct.module.css";
import Button from "../../components/CustomButtons/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
//import JustTesting from "../JustTesting/JustTesting";

export default function AddProduct(props) {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ];
  const continueAddingProccess = () => {
    const newUserProduct = document.getElementById("userProduct").value;
    if (newUserProduct.trim() === "") {
      alert("No value is Entered ");
    } else {
      alert("ur val of Choice Now is " + newUserProduct);
    }
  };
  const [seggestions, SetSeggesstions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      SetSeggesstions(props.seggests);
    }, 1000);
  });

  const [value, setValue] = useState(null);

  const filter = createFilterOptions();

  return (
    <div className={css.AddProduct}>
      <h5 className={css.title}>محصول مورد نظر خود را وارد کنید.</h5>
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
          /*  formcontrol: css.formcontrol, Does not Exist in this contex  */
          root: css.root,
          input: css.input,
          label: css.label,
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
        options={seggestions}
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
            label="محصول جدید را وارد کنید"
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
      <Button
        style={{ width: "50%", margin: "16px auto" }}
        onClick={() => continueAddingProccess()}
        color="info"
      >
        ادامه
      </Button>
    </div>
  );
}
