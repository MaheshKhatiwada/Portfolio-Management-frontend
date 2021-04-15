import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from "../axios.js";
import "../css/StockTable.css";

function StockTable() {
    const [tableInfo,setTableInfo]=useState("");
    
    useEffect(()=>{
        async function getData(){
            try {
                const {data}= await axios.get("/stocks")
                setTableInfo(data);  
                
            } catch (error) {
                toast.error(error.message);
            }
        }
        getData();
    },[])

    return (
        <div className="stockTable">
            <h3>Stock Details</h3>
            <table className="stockTable__table">
                <thead>
                <tr>
                    <th>S.N</th>
                    <th>Stock Name</th>
                    <th>Transaction Type</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Transaction Date</th>
                 </tr>

                </thead>
                <tbody>

                    {tableInfo ?tableInfo.map((stock,idx)=>(
                    <tr key={stock._id}>
                    <td>{idx+1}</td>
                    <td>{stock.name}</td>
                    <td>{stock.transactionType}</td>
                    <td>{stock.numberOfStock}</td>
                    <td>{stock.pricePerUnit}</td>
                    <td>{stock.transactionDate.slice(0,10)}</td>
                    </tr>
                    )):null}
   
                </tbody>
            </table>
            
        </div>
    )
}

export default StockTable
