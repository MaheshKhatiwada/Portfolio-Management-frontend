import React ,{useState,useEffect}from 'react'
import './App.css';
import StockForm from "./components/StockForm";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard'
import StockTable from "./components/StockTable";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from "./axios";


function App() {
  const[stockName,setStockName]=useState([]);
  useEffect(()=>{
    async function getResult(){
      try {
        const {data} =await axios.get("/stockname");
        setStockName(data);
      } catch (error) {
        toast.error(error.message);
        } 
      }
    getResult();
    },[])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar/>
  
         <Switch>
           <Route path="/stockTable">
               <StockTable/>
            </Route>
           <Route path="/stockForm">
             <StockForm
              stockName={stockName}
             />
           </Route>
           <Route path="/">
             <Dashboard 
             stockName={stockName}/>
          </Route>
         </Switch>
     </BrowserRouter>
     <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
