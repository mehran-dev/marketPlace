import React, { Component } from 'react'
import css  from './PriceAmountEdit.module.css';
import TableDataEditable from '../../components/TableDataEditable/TableDataEditable';
import TableInput from 'components/TableInput/TableInput';


/* https://material-ui.com/components/tables/#custom-pagination-options */

export default class PriceAmountEdit extends Component{
  
    render() {
        return (
            <div >
                PriceAmountEdit


                <TableDataEditable/>

              
            </div>
        )
    }
}
