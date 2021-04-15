
import React ,{useState} from 'react'
import axios from '../axios.js';
import "../css/StockForm.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory } from "react-router-dom";


function StockForm({stockName}) {
    let history=useHistory();
    const[stock,setStock]=useState({
        name:"",
        numberOfStock:"",
        transactionType:"",
        pricePerUnit:"",
        transactionDate:"",
    })

    const handleChange=(e)=>{
        e.preventDefault();
        const  value=e.target.value;
        setStock({...stock,[e.target.name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            axios.post("/stocks",stock)
            setStock({
                name:"",
                numberOfStock:"",
                transactionType:"",
                pricePerUnit:"",
                transactionDate:"",
            });
             toast.success("Form submitted successfully!!!");
            history.push("/dashboard");
            
        } catch (error) {
            toast.error(("Form Submission failed"));
        }
    }

    const checkDisable=()=>{
        if(stock.name.length===""
            ||stock.numberOfStock===""
            || stock.transactionType===""
            || stock.pricePerUnit==="" 
            || stock.transactionDate===""){
           
          return true;
        }
        else{
            return false;
        }
    }
   
    return (
        <div className="stockForm">
            <form className="stockForm__form" onSubmit={handleSubmit}>
              <h2>Enter your choice!!</h2>
                <br/>
                <select name="name" id="name" value={stock.name} onChange={handleChange} required>
                    <option value="" disabled>Choose stock names</option>
                    {stockName.map((name)=> 
                    <option key={name._id}>{name.name}</option>
                     )}
                </select>
                <br/>
                <select name="transactionType" id="transactionType" defaultValue={'default'}  onChange={handleChange} placeholder="Choose Buy Or Sell" required>
                    <option value="default" disabled  >Choose buy or sell</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell" >Sell</option>
                </select>
                <br/>

                <input 
                    type="number"
                    name="numberOfStock"
                    id="numberOfStock" 
                    placeholder="Enter number of stock"
                    value={stock.numberOfStock}
                    onChange={handleChange} min="1" required
                />
                <br/>

                <input 
                    type="number" 
                    name="pricePerUnit" 
                    id="pricePerUnit" 
                    placeholder="Buying/Selling Price"  
                    value={stock.pricePerUnit}
                    onChange={handleChange}
                     min ="5"required
                />
                <br/>

                <input 
                    type="date" 
                    name="transactionDate" 
                    id="transactionDate"
                    value={stock.transactionDate}
                    onChange={handleChange}
                    min="2020-01-01"
                    max="2021-04-30"
                    required
                />
                <br/>
                 {!checkDisable()&&(<button type="submit" disabled={checkDisable()}>Submit your data</button>)}
            </form>
        </div>
    )
}

export default StockForm;

  
