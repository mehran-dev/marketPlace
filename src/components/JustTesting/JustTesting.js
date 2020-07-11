import React, { Component } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import css from "./JustTesting.module.css";
import { makeStyles } from "@material-ui/core/styles";

const JustTesting = (props) => {
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
    id: "use-autocomplete-demo",
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
    <div className={css.JustTesting}>
      <div {...getRootProps()}>
        <label className={classes.label} {...getInputLabelProps()}>
          useAutocomplete
        </label>
        <input className={css.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default JustTesting;
