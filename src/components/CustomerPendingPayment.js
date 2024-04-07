import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerPendingPayment() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const [custBill,setCustBill]  = useState()
  const [custData, setCustData] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchUnverifiedPayment();
  }, []);


  function findTotalBill(data) {
    const billMap = [];
  
    data.forEach(item => {
      const existingIndex = billMap.findIndex(bill => bill.cust_mobile === item.cust_mobile);
      if (existingIndex > -1) {
        // If cust_mobile already exists, only add to its total remaining_bill
        billMap[existingIndex].remaining_bill += item.remaining_bill;
      } else {
        // If cust_mobile does not exist, store the whole item
        billMap.push({ ...item });
      }
    });
  
    setCustBill(billMap); 
    setDisplayTable(true);
  }
  
  
  
  async function fetchUnverifiedPayment() {
    try {
      const response = await fetch(`${apiUrl}/customer_pending_payment`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          console.log(data)
          setCustData(data); 
          findTotalBill(data)
        } else {
          setDisplayTable(false);
        }
      } else {
        console.log("Error in fetching data");
        setDisplayTable(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function customerPaymentDetail(cust_mobile){
    navigate('/customer_payment_detail',{state: {cust_mobile:cust_mobile,custData:custData}});
  }

  //Table css
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '8px', // Rounded border
    overflow: 'hidden', // Ensures the border radius applies correctly
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' // 3D shadow effect
  };

  return (
    <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>
      <div className='col-sm-3'></div>

      {displayTable ? (
        <div className='col-sm-6 mt-4   mx-auto text-center'>
          <table className='table table-striped ms-2 me-2' style={tableStyle}>
            <thead id="table-head">

              <tr>
                <th>Customer Mobile</th>
                <th>Remaining Bill</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {custBill.map((item) => (
                <tr key={item.account_id}>
                  <td>{item.cust_mobile}</td>
                  <td>{item.remaining_bill}</td>
                  <td><button className='btn btn-primary' onClick={()=>customerPaymentDetail(item.cust_mobile)}>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Records Found</p>
      )}
      <div className='col-sm-3'></div>

    </div>
  );
}

export default CustomerPendingPayment;
