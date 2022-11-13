import React from 'react';
import ICustomer from './../Interfaces/ICustomer';
import { IVTransfer } from './../Interfaces/ITransfer';

type TableRowProps = {
    row: ICustomer | IVTransfer
}

const TableRow = ({row}: TableRowProps) =>{
    const {_id} = row;
    return (
        <>{Object.values(row).filter(val => val !== _id).map(val => <td key={val}>{val}</td>)}</>
    )
} 



export default React.memo(TableRow);