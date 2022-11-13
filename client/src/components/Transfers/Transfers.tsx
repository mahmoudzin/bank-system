import React, {useState} from 'react';
import TransfersTable from './../Tabels/TransfersTable';
import Search from './../Search/Search';
import { IOption } from './../Interfaces/IOption';

const options:IOption[] = [
    {value: "from", name: "Sender"},
    {value: "to", name: "Recivier"},
    {value: "quantity", name: "Quantity"},
] 
const Transfers = () => {
    const [query, setQuery] = useState<string>('');
    const [flag, setFlag] = useState< 'from' | 'to' | 'quantity'>('from');
    
    const handleChangeFlag = (value:'from' | 'to' | 'quantity') => setFlag(value)
    
    const handleChangeQuery = (value:string) => setQuery(value)
    return (
        <>
        <Search 
            options={options} 
            placeholder="Search about Transfers"
            changeFlag={handleChangeFlag}
            flag={flag}
            query={query}
            changeQuery={handleChangeQuery}
        />

        {/* Table */}
        <div className="">
            <TransfersTable {...{query, flag}}/>
          </div>
       </>
    );
};

export default React.memo(Transfers);