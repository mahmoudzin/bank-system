import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Costumers from './components/Customers/Customers';
import Transfers from './components/Transfers/Transfers';
import Customer from './components/Customers/Customer';
import { useAppDispatch } from './Hooks';
import { fetchCustomers } from './Store/customers';
import { fetchTransfers } from './Store/transfers';


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getInitialState = setTimeout(() =>{
      dispatch(fetchCustomers())
      dispatch(fetchTransfers());
    }, 500)
    return ()=> clearTimeout(getInitialState);
  }, [dispatch])

  return (
    <>
      <Navbar /> 
      <div className="container mt-5">
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="customers" element={<Costumers/>}></Route>
          <Route path="customer/:id" element={<Customer />}/>
          <Route path="transfers" element={<Transfers/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
