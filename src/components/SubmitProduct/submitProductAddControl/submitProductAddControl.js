import React ,{useRef} from 'react'
import Button from '../../CustomButtons/Button'; 
import css from './submitProductAddControl.module.css'; 



export default function SubmitProductAddControl(props) {


const newColInputRef = useRef(document.getElementById("newColName"));





const classesA = [css.contA , css.customRoundStyle , css.flxContainer]
const classesB = [css.contB , css.customRoundStyle]
const classesC = [css.contC , css.customRoundStyle]

if (!props.newColumnAdding && !props.newColumnAddedConfirm){
classesA.push(css.display)
}else{
    classesA.push(css.hidden);
}
if(props.newColumnAddedConfirm){
classesC.push(css.display)
}else{
    classesC.push(css.hidden)
}
if(props.newColumnAdding){
    classesB.push(css.display)
}else{
    classesB.push(css.hidden)
}

return (
        <div className={css.animationContainer}>
          
        
          <div className={classesA.join(" ")}>
            <h5 className={css.title}>نیاز به افزودن وی‍رگی جدیدی دارم.</h5>
            <Button onClick={props.showAddNewColumnHandler} color="rose">
              افرودن ویزگی جدید
            </Button>
          </div>
        



        
        
     
          <div className={classesB.join(" ")}>
            <h5>
              <input
                className={css.newColName}
                id="newColName"
               // ref={newColInputRef}
                placeholder="ویژگی مورد نظر"
                onChange={()=>{
                // document.getElementById("newColName").style.borderColor="rgba(204, 204, 204, 0.582)"
                // document.getElementById("newColName").focus();
                /*  props.NewColInputRef.current.classList.remove(css.borderAlert); */
              
              
              //this class name is not set exactly becase of css modules 
                document.getElementById("newColName").classList.remove(css.borderAlert)
              //console.log(document.getElementById("newColName").classList.contains("borderAlert"))   
              


              //Its because class Name have been set from Other components so webpack altered its name 
              let existingAlertClassName;
              const elClasses=document.getElementById("newColName").classList;
              elClasses.forEach(element => {
                  if(element.includes("borderAlert"))
                  {
                      existingAlertClassName=element;
                    }
                    
                    
                });
                
                document.getElementById("newColName").classList.remove(existingAlertClassName)
            }}
              />
              را به ویژگی های موجود   
              <Button
                color="warning"
                onClick={() => {
                  props.addCol(document.getElementById("newColName").value);
/*                  props.refTransfer(newColInputRef);
 */                }}
              >
                اضافه کن.
              </Button>
            </h5>
          </div>
    


          <div 
          className={classesC.join(" ")}>
            <h5><span> &#9989; &nbsp;&nbsp; </span> ویژگی جدید افزوده شد</h5>
          </div>
    





        </div>
    )
}
