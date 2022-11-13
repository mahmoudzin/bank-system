import React, { useContext } from 'react';
import { IOption } from './../Interfaces/IOption';
import { ColorModeContext } from './../../Theme/Theme';

type SearchProps = {
    placeholder: string;
    options: IOption[];
    changeFlag(value:string):void;
    flag:string;
    changeQuery(value:string):void;
    query:string;
}

const Search = ({placeholder, options, changeFlag, flag, changeQuery, query}: SearchProps) => {
    const {Styles} = useContext(ColorModeContext)
    return (
        <div className={`${Styles.mainBackground} p-3 row gy-3 rounded-2 align-items-center justify-content-between mb-5`}>
           <div className="col-sm-8 ">
                <input
                    style={Styles.inputStyle} 
                    className='form-control border-0'
                    placeholder={placeholder}
                    value={query}
                    onChange={(e)=> changeQuery(e.target.value)}
                />
           </div>
            <div className="col-sm-3">
                <select 
                    className={`${Styles.secBackground} ${Styles.secText} form-select form-select-lg`} 
                    name="" 
                    value={flag}
                    onChange={(e)=> changeFlag(e.target.value)}    
                >
                    {options.map((op => <option key={op.value} value={op.value}>{op.name}</option>))}
                </select>
            </div>
         </div>   
    );
};

export default React.memo(Search);