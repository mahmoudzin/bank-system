import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../Hooks';

import TransfersTable from './../Tabels/TransfersTable';
import NewTransfer from './../Transfers/NewTransfer';

const Customer = () => {
    const {id} = useParams()
    const {customers, cLoading} = useAppSelector(state => state.customers);
    const {tLoading} = useAppSelector(state => state.transfers);
    const customer = customers.find(customer => customer._id === Number(id));
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>{!cLoading ?
           <ul className="list-unstyled">
            
            <li className="d-flex align-items-center">
                <span className="h5 my-0">Name:</span>
                <p className="my-0 ms-2">{customer?.name}</p>
            </li>
            <li className="d-flex align-items-center pt-3">
                <span className="h5 my-0">Email:</span>
                <p className="my-0 ms-2">{customer?.email}</p>
            </li>
            <li className="d-flex align-items-center pt-3">
                <span className="h5 my-0">Current Balance:</span>
                <p className="my-0 ms-2">{customer?.balance}$</p>
            </li>
           </ul>
           : 'Loading....'}   
           <hr />
           {!tLoading ?
           <>
            <div className="py-3">
                <h3 className="mb-3">All {customer?.name} Transfers:</h3>
                
                <TransfersTable customerID={customer?._id}/>
            
                <div className="text-end">
                    <button className="btn btn-outline-primary" onClick={handleShow}>New Transfer</button>
                </div>
            </div>
            <NewTransfer {...{show, handleClose, customers:customers.filter(c => customer?._id !== c._id), customerID:customer?._id, balance: customer?.balance}}/>
        </>
        : 'loading...'}

        </>
    );
};

export default React.memo(Customer);