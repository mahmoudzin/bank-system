import React,{useContext, useEffect,useState} from 'react';
import ICustomer  from '../Interfaces/ICustomer';
import { ColorModeContext } from '../../Theme/Theme';
import TableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {useAppSelector } from '../../Hooks';



type CustomerProps = {
    numOfrows?: number,
    query? : string, 
    flag?:'name' | 'email'
}
const head:string[] = ['Name', 'Email', 'Balance'];

const CustomersTable = ({ numOfrows, query = '', flag='name'}: CustomerProps) => {
    const [body, setBody] = useState<ICustomer[]>([]);
    const [notFoundMessage, setNotFoundMessage] = useState<string>('');
    const {customers, cLoading} = useAppSelector(state => state.customers);
    useEffect(() => { 
           let search = setTimeout(() => {

            if(query && !cLoading){
                const result = customers.filter(c => c[flag].includes(query))
                if(result.length === 0){
                    setNotFoundMessage(`Not result for ${query} ):`);
                    setBody([]);
                }
                else{
                    setNotFoundMessage(``);
                    setBody(result);
                }
                
            }else{
                setBody(customers)
            }
            }, 100)
        return ()=> clearTimeout(search)
    }, [query, flag, cLoading, customers])

    const {mode} = useContext(ColorModeContext)
    const navigation = useNavigate()
    const navigateToCustomrePage = (id:number):void =>{
        navigation(`/customer/${id}`)
    }
    
   
    return (
        <>
            <div className="overflow-hidden pb-5" >
                <div className="w-100" style={{overflowX: 'auto'}}>
                    <table className={`table ${ mode === 'light' ? 'table-light' : 'table-dark'}  table-striped`}>
                        <thead >
                            <tr>
                                {head.map(h => <th key={h} scope="col">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody >
                            {!cLoading && body.length>0 ? numOfrows ? body.filter((c, i) => i < numOfrows ).map(c => 
                                <tr key={c._id} className="makePointer" onClick={()=> navigateToCustomrePage(c._id)}>
                                    <TableRow row={c}/>
                                </tr>
                            ): 
                            body.map(c =><tr key={c._id} className="makePointer" onClick={()=> navigateToCustomrePage(c._id)}><TableRow row={c}/></tr>)
                            : <tr>
                                <td colSpan={3}>{!notFoundMessage ? 'loading....' : notFoundMessage}</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default React.memo(CustomersTable);