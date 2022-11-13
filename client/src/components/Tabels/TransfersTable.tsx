import React,{useContext, useEffect, useState} from 'react';
import { getCustmorByID, IVTransfer }  from '../Interfaces/ITransfer';
import { ColorModeContext } from './../../Theme/Theme';
import TableRow from './TableRow';
import { useAppSelector } from '../../Hooks';
import ITransfer from './../Interfaces/ITransfer';


type TransfersProps = {
    numOfrows?: number,
    query? : string, 
    flag?:'from' | 'to' | 'quantity'
    customerID?: number
}
const head:string[] = ["quantity", "from", "to"];

const TransfersTable = ({numOfrows, query= '', flag='from', customerID}: TransfersProps) => {
    const {mode} = useContext(ColorModeContext)
    const [body, setBody] = useState<IVTransfer[]>([]);
    const [notFoundMessage, setNotFoundMessage] = useState<string>('');
    const {customers, cLoading} = useAppSelector(state => state.customers);
    const {transfers, tLoading} = useAppSelector(state => state.transfers);
    let transfersFilter:ITransfer[];
    if(customerID){
        transfersFilter = transfers.filter(t => t.sender_id === customerID || t.receiver_id === customerID)
    }else
    {
        transfersFilter= [...transfers]
    }
    useEffect(()=>{
        if(!cLoading && !tLoading){
            const transferFormat = transfersFilter.map(transf => ({
                _id: transf._id.toString().slice(-4),
                quantity: transf.quantity.toString(),
                from: getCustmorByID(customers, transf.sender_id),
                to: getCustmorByID(customers, transf.receiver_id)
            }));
            
            let search = setTimeout(() => {

                if(query){
                    let result = transferFormat.filter(t => t[flag].includes(query))
                    if(result.length > 0){
                        setBody(result);
                        setNotFoundMessage('');
                    }else{
                        setBody([]);
                        setNotFoundMessage(`Not result for ${query} ):`);
                    }
                     
                }else{
                    setBody(transferFormat) 
                }
                }, 100)
            return ()=> clearTimeout(search)
            
        }
    }, [cLoading, customers, flag, query, tLoading, transfers, transfersFilter])

    

    
    return (
        <>
            <div className="overflow-hidden pb-5" >
                <div className="w-100" style={{overflowX: 'auto'}}>
                    <table className={`table ${ mode === 'light' ? 'table-light' : 'table-dark'}  table-striped`}>
                        <thead className={`${ mode === 'light' ? 'table-light' : 'table-dark'}`}>
                            <tr>
                                {head.map(h => <th key={h} scope="col">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {(!tLoading && !cLoading) && body.length > 0 ? numOfrows ? body
                        .filter((t, i) => i < numOfrows ).map(t => 
                                <tr key={t._id}> 
                                    <TableRow  row={t}/>
                                </tr>
                            ): 
                           body.map(t => <tr key={t._id}><TableRow row={t}/></tr>)
                           : <tr>
                           <td colSpan={3}>{!notFoundMessage ? 'loading....' : notFoundMessage}</td>
                       </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TransfersTable;