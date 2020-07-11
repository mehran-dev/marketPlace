import React, { useState } from "react";
import css from "./TableInput.module.css";
function TableInput(props) {
  //const [classes, setClasses] = useState([css.Input, css.touched]);
  //console.log("line 5 classes", classes);
  const classes = [css.Input];

  return (
    <input
      id={props.id}
      onChange={() => {
        console.log("line 11 classes", classes);
        if (classes.includes(css.touched)) {
          console.log("Entered in includes");
        } else {
          classes.push(css.touched);
        }
        console.log("line 17 classes", classes.join(" "));
      }}
      placeholder={props.placeHolder}
      className={classes.join(" ")}
      type="text"
    />
  );
}

export default TableInput;
