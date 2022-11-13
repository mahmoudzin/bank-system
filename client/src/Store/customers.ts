import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import ICustomer from '../components/Interfaces/ICustomer';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async ()=>{ 
    const {data} = await axios.get('http://localhost:8080/getAllUsers');
    return data
});

interface CustomerState {
    customers: ICustomer[] 
    cLoading: boolean
  }
const initialState : CustomerState =  {customers: [], cLoading: true} 

const customersSlice = createSlice({ 
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers:(builder) => { 
        builder
        .addCase(fetchCustomers.pending, (state, action)=>{
            state.cLoading = true;
        })
        .addCase(fetchCustomers.fulfilled, (state, action)=>{
            state.cLoading = false;
            state.customers = action.payload
        })
        .addCase(fetchCustomers.rejected, (state, action)=>{
            state.cLoading = true;
        })
    }
})

export default customersSlice.reducer