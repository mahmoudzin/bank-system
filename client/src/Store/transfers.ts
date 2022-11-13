import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import ITransfer from '../components/Interfaces/ITransfer';


export const fetchTransfers = createAsyncThunk('transfers/fetchTransfers', async ()=>{ 
    const {data} = await axios.get('/getAllTransfers');
    return data
});
interface transfer {
    sender_id: number | undefined,
    receiver_id: number,
    quantity:number
}
export const newTransfer = createAsyncThunk('transfers/newTransfer', async (transfer:transfer)=>{ 
    const {data} = await axios.post('/newTransfer', transfer);
    return data
});

interface TransfersState {
    transfers: ITransfer[],
    tLoading: boolean
    ntLoading: boolean
    msg: string
  }
const initialState:TransfersState =  {transfers: [], tLoading: true, ntLoading: false, msg: ''} 

const transfersSlice = createSlice({ 
    name: 'transfers',
    initialState,
    reducers: {},
    extraReducers:(builder) => { 
        builder
        .addCase(fetchTransfers.pending, (state, action)=>{
            state.tLoading = true
        })
        .addCase(fetchTransfers.fulfilled, (state, action)=>{
            state.tLoading = false
            state.transfers = action.payload.sort((a:ITransfer, b:ITransfer)=> b._id - a._id);;
        })
        .addCase(fetchTransfers.rejected, (state, action)=>{
            state.tLoading = false
            console.log(action.payload);
        })
        .addCase(newTransfer.pending, (state, action)=>{
            state.ntLoading = true
        })
        .addCase(newTransfer.fulfilled, (state, action)=>{
            state.ntLoading = false
            state.msg = action.payload.message
        })
        .addCase(newTransfer.rejected, (state, action)=>{
            state.ntLoading = false
            console.log(action.payload);
        })
    }
})

export default transfersSlice.reducer;