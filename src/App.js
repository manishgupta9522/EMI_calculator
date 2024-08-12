import { useEffect, useState } from "react";
import "./App.css";
import { tenuredata } from "./utills/constant";

function App() {
  // eslint-disable-next-line 
  const [cost, setCost] = useState(0);
  // eslint-disable-next-line 
  const [intrest, setIntrest] = useState(0);
  // eslint-disable-next-line 
  const [fee, setFee] = useState(1);
  // eslint-disable-next-line 
  const [dp, setDp] = useState(0);
  // eslint-disable-next-line 
  const [emi, setEmi] = useState(0);
  // eslint-disable-next-line 
  const [tenure, setTenure] = useState(12);


  const calculateDP= (emi)=>{
    if (!cost) return
    const downPaymentpercent=100-(emi/calEMI(0))*100;
    return Number((downPaymentpercent/100)*cost).toFixed(0);
  }
  const calEMI=(downpayment)=>{
    if (!cost) return
    const loanamount=cost-downpayment;
    const ROI= intrest/100;
    const numberofyears=tenure/12;

    const EMI= (loanamount*ROI*(1+ROI)**numberofyears)/((1+ROI)** numberofyears - 1);
    return Number(EMI/12).toFixed(0);
    
  }
  const updateEMI=(e)=>{
    if (!cost) return
    const downpayment= Number(e.target.value)
    setDp(downpayment.toFixed(0));
    const EMI = calEMI(downpayment);
    setEmi(EMI);
  }
  const updateDownpayent=(e)=>{
    if (!cost) return
    const emi= Number(e.target.value)
    setEmi(emi.toFixed(0))

    const dp=calculateDP(emi);
    setDp(dp);
  }

  useEffect(() => {
    if (!(cost>0)){
      setDp(0);
      setEmi(0);
    }
  
    const emi= calEMI(dp);
    setEmi(emi);
    // eslint-disable-next-line
  }, [tenure])
  
  
  return (
    <div className="App">
      <div className="container">
        <h1 className="title"> EMI Calculator</h1>
        <hr style={{border: "1px solid #000", width: "50%",margin: "20px auto"}}/>
        <div className="inputs">
          <div className="box">
            <label htmlFor="propertyCost">Total Cost of Asset</label>
            <input
              type="number"
              id="propertyCost"
              name="propertyCost"
              placeholder="Enter cost"
              onChange={(e)=>{setCost(e.target.value)}}
              step="1"
              min="0"
              required
            />
          </div>
          <div className="box">
            <label htmlFor="propertyCost">Intrest Rate in (%)</label>
            <input
              type="number"
              id="propertyCost"
              name="propertyCost"
              onChange={(e)=>{setIntrest(e.target.value)}}
              placeholder="Enter intrest rate"
              step="1"
              min="0"
              required
            />
          </div>
          <div className="box">
            <label htmlFor="propertyCost">Processing Fee in (%)</label>
            <input
              type="number"
              id="propertyCost"
              name="propertyCost"
              onChange={(e)=>{setFee(e.target.value)}}
              placeholder="Enter processing fee"
              step="1"
              min="0"
              required
            />
          </div>
        </div>
        <div className="sliders">
          <div className="box2">
            <span htmlFor="propertyCost">Down Payment</span>
            <hr style={{border: "1px solid #000", width: "10%",margin: "10px auto"}}/>
            <span htmlFor="propertyCost">Total Down Payment - {(Number(dp)+(cost-dp)*(fee/100)).toFixed(0)} </span>
            <input type="range" value={dp} onChange={updateEMI} min={0} max={cost}/>
            <div className="labels">
              <label htmlFor="">0</label>
              <label htmlFor="">{dp}</label>
              <label htmlFor="">100%</label>
            </div>
          </div>
          <div className="box2">
            <span htmlFor="propertyCost">Loan per month</span>
            <hr style={{border: "1px solid #000", width: "10%",margin: "10px auto"}}/>
            <span htmlFor="propertyCost">Total Loan Amount - {(emi*tenure).toFixed(0)}</span>
            <input type="range" value={emi} onChange={updateDownpayent} min={calEMI(cost)} max={calEMI(0)}/>
            <div className="labels">
              <label htmlFor="">{calEMI(cost)}</label>
              <label htmlFor="">{emi}</label>
              <label htmlFor="">{calEMI(0)}</label>
            </div>
          </div>
        </div>
        
        <div className="tenure">
          <div className="text">Tenure</div>
          <div className="tenurecontainer">
            {tenuredata.map((t)=>{
              return <button className={`tenure1 ${t===tenure ? "selected":""}`}
              onClick={()=>(setTenure(t))}>{t}</button>
            })}
          </div>
        </div>
        <hr style={{border: "1px solid #000", width: "50%",marginTop:"20px"}}/>
      </div>
    </div>
  );
}

export default App;
