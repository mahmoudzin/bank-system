import React, {useState} from 'react';
import CustomersTable from './../Tabels/CustomersTable';
import { IOption } from './../Interfaces/IOption';
import Search from '../Search/Search';


const options:IOption[] = [
    {value: "name", name: "Name"},
    {value: "email", name: "Email"}
]

const Costumers = () => {
    const [query, setQuery] = useState<string>('');
    const [flag, setFlag] = useState< 'name' | 'email'>('name');
    
    const handleChangeFlag = (value:'name' | 'email') => setFlag(value)
    
    const handleChangeQuery = (value:string) => setQuery(value)
    return (
        <>
         <Search 
            options={options} 
            placeholder="Search about Customers"
            changeFlag={handleChangeFlag}
            flag={flag}
            query={query}
            changeQuery={handleChangeQuery}
          />
         {/* Table */}
           <div className="">
             <CustomersTable {...{query, flag}}/>
           </div>
        </>
    );
};

export default React.memo(Costumers);