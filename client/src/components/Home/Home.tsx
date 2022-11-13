import React from 'react';
import TransfersTable from '../Tabels/TransfersTable';
import { Link } from 'react-router-dom';


const Home = () => {    
    return (
        <>
           <div className="p-3 rounded-1">
             <h3 className="">The Last transfers:</h3>
             <TransfersTable {...{numOfrows: 5}}/>
             <div className="text-end">
                 <Link to='/transfers' >Show More....</Link>
             </div>
           </div>
        </>
    );
};

export default React.memo(Home);