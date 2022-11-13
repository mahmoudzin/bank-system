
import ICustomer from './ICustomer';

export default interface ITransfer {
    _id: number;
    quantity: number;
    sender_id:number;
    receiver_id:number;
}

export interface IVTransfer{
    _id: string;
    quantity: string;
    from: string;
    to: string;
}
export const getCustmorByID = (customers:ICustomer[],id: number):string=>{
    const customer = customers?.find(c => c._id === id)
    if(customer)
        return customer.name;
    else return ''
} 
  
