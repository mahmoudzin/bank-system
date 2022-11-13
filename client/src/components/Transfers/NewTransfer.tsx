import React, {useContext, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { newTransfer } from '../../Store/transfers';
import ICustomer from './../Interfaces/ICustomer';
import { useAppDispatch, useAppSelector } from './../../Hooks';
import { fetchTransfers } from './../../Store/transfers';
import { fetchCustomers } from './../../Store/customers';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ColorModeContext } from './../../Theme/Theme';

type NewTransferProps = {
    show: boolean,
    handleClose(): void,
    customers:ICustomer[],
    customerID: number| undefined
    balance: number | undefined
}
const MySwal = withReactContent(Swal)
const NewTransfer = ({show, handleClose, customers, customerID, balance}:NewTransferProps) => {
    const [receiver, setReceiver] = useState<number>(0);
    const [quantity, setQuantity] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>('');
    const {Styles} = useContext(ColorModeContext)
    const {ntLoading} = useAppSelector(state => state.transfers)
    const dispatch = useAppDispatch();
    const getReciverId = (value:string):void =>{
        setErrorMsg('')
        const id = Number(value);
        if(!isNaN(id) && id > 0){
            setReceiver(id)
        }
    }
    const getTheQuantity = (value:string):void =>{
        setErrorMsg('')
        const quan = Number(value);
        if(!isNaN(quan) && quan > 0){
            setQuantity(value);
        }
        else{
            setQuantity('');
            setErrorMsg('please enter vailed value!')
        }
    }
    const clear = () => {
        setQuantity('');
        setReceiver(0);
        setErrorMsg('');
        handleClose();
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(receiver > 0)
        {
            if(Number(quantity) <= Number(balance) && Number(quantity) > 0){
                const transfer = {
                    sender_id: customerID,
                    receiver_id: receiver,
                    quantity:Number(quantity)
                }
                console.log(transfer);
                dispatch(newTransfer(transfer))
                .then(()=> dispatch(fetchTransfers()))
                .then(()=> dispatch(fetchCustomers()))
                .then(()=> handleClose())
                .then(()=>{
                    MySwal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })
                setErrorMsg('')
            } else{
                setErrorMsg('may this transform larger than or equal 0, so, please check and try again')
            }
        }else{
            setErrorMsg('pleas choose the customer you want to transfer to!')
        }
    }
    return (
     <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        
      >
        <Modal.Header className={Styles.mainBackground} closeButton>
          <Modal.Title className="py-3">New Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body className={Styles.mainBackground}>
            <div className={` py-3`}>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <form onSubmit={(e) => handleSubmit(e)}>
                    
                    <input 
                        type="text" 
                        style={Styles.inputStyle}
                        className="form-control" 
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e)=> getTheQuantity(e.target.value)}
                    />
                    
                    <select 
                        className={`${Styles.secBackground} ${Styles.secText} form-select form-select-lg mt-3`} 
                        name="" id=""
                        value={receiver}
                        onChange={(e)=> getReciverId(e.target.value)}    
                    >
                        <option value="0">Select Customer</option>
                        {customers.map((customer) => <option key={customer._id} value={customer._id}>{customer?.name}</option>)}
                    </select>
                  
                    <div className="mt-5 text-end">
                        <button type="button" className="btn btn-outline-secondary px-5 me-3" onClick={clear}>Close</button>
                        <button className="btn btn-outline-primary px-5">{ntLoading ? <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i> : 'Submit'}</button>
                    </div>
                    
                </form>
            </div>
        </Modal.Body>
      </Modal>
    );
};

export default React.memo(NewTransfer);
