import React,{useState,useEffect} from 'react';
import axios from "../axios.js";
import "../css/Dashboard.css";

function Dashboard({stockName}) {
    const[filteredData,setFilteredData]=useState("");

    useEffect(()=>{
        async function getOverallData(){
            const {data}=await axios.get("/filter");
            setFilteredData(data);
        }
        getOverallData();
    },[])
   ;

    const calculateTotalUnit=()=>{
        let totalUnit=0;
        for(let i=0;i<filteredData.length;i++){
            totalUnit+=(individualTotalUnit(filteredData[i]));
        }
        return totalUnit;

    }
            
    const calculateTotalInvestment=()=>{
        let totalInvestment=0;
        for(let i=0;i<filteredData.length;i++){
            totalInvestment+=(individualTotalInvestment(filteredData[i]));
        }
        return totalInvestment;
    }

    const calculateSoldAmount=()=>{
        let soldAmount=0;
        for(let i=0;i<filteredData.length;i++){
            soldAmount+=(individualSoldAmount(filteredData[i]));
        }
        return soldAmount;
    }
    
    const calculateCurrentAmount=()=>{
        let finalCurrentAmount=0;

        for(let i=0;i<filteredData.length;i++){
            finalCurrentAmount+=(individualCurrentValue(filteredData[i]));
        }
        return finalCurrentAmount;

    }

    const calculateTotalProfit=()=>{
        const investmentValue=calculateTotalInvestment();
        const soldValue=calculateSoldAmount();
        const currentValue=calculateCurrentAmount();
        const profit =(soldValue-investmentValue+currentValue);
        return profit;
    }

    const individualTotalUnit=(stock)=>{
        let totalUnit=0;
        for (let i=0;i<(stock.numberOfStock).length;i++){
            totalUnit+=stock.numberOfStock[i];
        }
        return totalUnit;

    }
               
    const individualTotalInvestment=(stock)=>{
        let buyAmt=0;
        for(let i=0;i<(stock.transactionType).length;i++){
            if(stock.transactionType[i]==="Buy"){
                buyAmt+=stock.numberOfStock[i]*stock.pricePerUnit[i];
                
            }
        }
     return buyAmt;  
     }
            
            
    const individualSoldAmount=(stock)=>{
        let sellAmt=0;
        for(let i=0;i<(stock.transactionType).length;i++){
            if(stock.transactionType[i]==="Sell"){
                sellAmt+=stock.numberOfStock[i]*stock.pricePerUnit[i];
            }
        }
        return sellAmt;  
    }

    const individualCurrentValue=(stock)=>{
        let buyUnit=0;
        let sellUnit=0;
        let currentUnit=0;
        let currentValue=0;
        
        for(let i=0; i<(stock.transactionType).length;i++){
            if(stock.transactionType[i]==="Buy"){
                buyUnit+=stock.numberOfStock[i];
            } else if(stock.transactionType[i]==="Sell"){
                sellUnit+=stock.numberOfStock[i];
            }else{
                return 0;
            }
        }
        currentUnit=buyUnit-sellUnit;
        for(let i=0;i<stockName.length;i++){
            if(stockName[i].name===stock._id){
            currentValue=  ((stockName[i].currentPerUnitPrice))*currentUnit;
            
            }
            }
        return currentValue;
    }

    const individualProfit=(stock)=>{
        const investmentValue=individualTotalInvestment(stock);
        const soldValue=individualSoldAmount(stock);
        const currentValue=individualCurrentValue(stock);
        const profit =(soldValue-investmentValue+currentValue);
        return profit;
    }
        
    return (
        <div className="dashboard">
            <h3>Overall Stock Information</h3>
            <table className="dashboard__table">
                <thead>
                    <tr>
                        <th>Total Units</th>
                        <th>Total Investment</th>
                        <th>Sold Amount</th>
                        <th>Current Amount</th>
                        <th>Overall Profit</th>
                    </tr>

                </thead>
                    <tbody>
                        <tr>
                            <td>{calculateTotalUnit()}</td>
                            <td>{calculateTotalInvestment()}</td>
                            <td>{calculateSoldAmount()}</td>
                            <td>{calculateCurrentAmount()}</td>
                            <td>{calculateTotalProfit()}</td>
                        </tr>

                    </tbody>
            </table>
            <br/>
            <h3>Individual Stock Information</h3>
         {filteredData? filteredData.map(stock=>(
            <div key ={stock._id}>
            <h3>Stock Name:{stock._id}</h3>
            <table className="dashboard__table">
            <thead>
                <tr>
                    <th>Total Units</th>
                    <th>Total Investment</th>
                    <th>Sold Amount</th>
                    <th>Current Amount</th>
                    <th>Overall Profit</th>
                </tr>

            </thead>
                <tbody>
                    <tr>
                        <td>{individualTotalUnit(stock)}</td>
                        <td>{individualTotalInvestment(stock)}</td>
                        <td>{individualSoldAmount(stock)}</td>
                        <td>{individualCurrentValue(stock)}</td>
                        <td>{individualProfit(stock)}</td>
                    </tr>

                </tbody>
            </table>
        </div>
        )):null}
        </div>
    )
        
 } 
export default Dashboard
