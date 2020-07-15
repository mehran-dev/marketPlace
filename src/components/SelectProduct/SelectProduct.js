import React, { useState, useEffect,useContext,useRef } from "react";
import css from "./SelectProduct.module.css";
import Button from "../CustomButtons/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
//import JustTesting from "../JustTesting/JustTesting";
import axios from "axios";
import Spinner from '../UI/Spinner/Spinner'; 


export default function SelectProduct(props) {
    // React Hooks //
    const [seggestions, SetSeggesstions] = useState([]);
    const [loading ,setLoading]=useState(false);
    const [value, setValue] = useState(null);
    const filter = createFilterOptions();
    


    useEffect(() => {
        /*  setTimeout(() => {
          SetSeggesstions(props.seggests);
        }, 1000); */
       // console.log("-------------value in use effect ",value);
    });

const inputRef = useRef(document.getElementById("userProduct"));
const titleRef = useRef(document.getElementById("newProductLabel"));



// functions And So On .... //
     const continueAddingProccess = () => {
        const newUserProduct = document.getElementById("userProduct").value;
        let AlreadyExisted = false;
        
        if (newUserProduct.trim() === "") {
           // alert("No value is Entered");
         /*   document.getElementById("userProduct").style.backgroundColor="rgb(250,170,170)";
           document.getElementById("newProductLabel").style.color="red";
           document.getElementById("newProductLabel").style.fontSize="18pt";
          */
         
           inputRef.current.classList.add(css.bgRedAlert)
           titleRef.current.classList.add(css.titleAlert)
         /*   document.getElementById("newProductLabel").style.color="red";
           document.getElementById("newProductLabel").style.fontSize="18pt"; */

        } else {
          //  alert("ur val of Choice Now is " + newUserProduct);
            setLoading(true);
            // send http request to see if product already existed or not !!!
            setTimeout(() => {
                AlreadyExisted = (Math.random() >= 0.5) ? true : false
               setLoading(false);
props.changeStatus(true)
                alert("alreadyExisted on server ??" + AlreadyExisted);



            }, 2000);
        }
    }; 

   

    return ( <div className = { css.AddProduct } >
        <h5 id="newProductLabel" ref={titleRef} className = { css.title } > محصول مورد نظر خود را وارد کنید. </h5> 
        <Autocomplete ref={inputRef}
         fullWidth 
         classes = {
            {
                inputRoot: css.inputRoot,
                input: css.input,
                popper: css.popperA,
                paper: css.paper,
                listbox: css.listbox,
                clearIndicator: css.clearIndicator,
                endAdornment: css.endAdornment,
                root: css.root,
                input: css.input,
            }
        }
        id = "userProduct"
        freeSolo 
        onChange = {
            (event, newValue) => {
                console.log("onChange: newValue :", newValue);
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
            }
        }
        onFocus = {(e) => {
                console.log("onFocuse e:", e.target.value);
                inputRef.current.classList.remove(css.bgRedAlert)
                titleRef.current.classList.remove(css.titleAlert)
            }
        }
        onClose = {
            (e) => {
                console.log("onClose e:", e.target.value);
            console.log("onClose value is",value);
            }
        }
        onKeyUp = {
            (e) => {
                //console.log("onKeyUp e:", e.target.value);
                //Sent the http request

                axios
                    .get(
                        "https://zoi.ir/api/shop/product/catalog/?sort=relevance&q=" +
                        e.target.value
                    )
                    .then((response) => {
                        //SetSeggesstions(res)
                        //console.log(response.data["items"]);
                        const fetchedSeggestions = Object.keys(
                            response.data["items"]
                        ).map((k) => {
                            //console.log(response.data["items"][k].title);

                            if (response.data["items"][k].title)
                                return response.data["items"][k].title;
                        });
                        console.log(fetchedSeggestions);
                        SetSeggesstions(fetchedSeggestions);
                    })
                    .catch((error) => console.log(error));
            }
        }
        options = { seggestions }
        /*       getOptionLabel={(seggestions) => seggestions.title}
         */
        getOptionLabel = {
            (option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  //  console.log(option);
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }
        }
        renderInput = {
            (params) => ( <
                TextField InputProps = {
                    {
                        className: css.inputColor,
                    }
                } {...params }
                label = "محصول جدید را وارد کنید"
                variant = "outlined" />
            )
        }
        autoHighlight 
        selectOnFocus
         handleHomeEndKeys 
         filterOptions = {
            (options, params) => {
                console.log("params",params);
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `" افزودن:"${params.inputValue}`,
                    });
                }

                return filtered;
            }
        }
        /> <Button style = {
            { width: "50%", margin: "16px auto" ,position:"relative"}
        }
        onClick = {
            () =>continueAddingProccess()
        }
        color = "info" >
        ادامه
        {loading&&<div className={css.spinnerHolder}> <Spinner/> </div>}
         </Button> 
         
         
         
    
             </div>

    );
}