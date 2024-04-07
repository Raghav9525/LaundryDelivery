import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentVerify() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate()

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [displayTable, setDisplayTable] = useState(false); // Initialize to false
    const [selectedDbName, setSelectedDbName] = useState('');
    

    async function fetchUnverifiedPayment() {
        try {
            const response = await fetch(`${apiUrl}/unverified_delivery`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                const data = await response.json();
                setOriginalData(data);
                setFilteredData(data);
                setDisplayTable(data.length > 0);
            } else if (response.status === 404) {
                setDisplayTable(false); // No unverified deliveries found
            } else {
                throw new Error('Failed to fetch unverified deliveries');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        fetchUnverifiedPayment();
    }, []); // useEffect will run only once, on component mount

    async function paymentVerify(item) {
        try {
            const response = await fetch(`${apiUrl}/update_payment_status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentDetails: item })
            });
    
            console.log("Response status:", response.status); // Log the response status
    
            const responseData = await response.json(); // Attempt to parse response JSON
            console.log("Response data:", responseData); // Log the response data
    
            if (response.ok) {
                fetchUnverifiedPayment();
            } else {
                console.log("Error in updating payment status");
                // If there's an error message returned by the server, log it
                if (responseData && responseData.message) {
                    console.log("Error message from server:", responseData.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    

    function handleDbNameChange(event) {
        const selectedName = event.target.value;
        setSelectedDbName(selectedName);
        if (selectedName) {
            const filtered = originalData.filter(item => item.db_name === selectedName);
            setFilteredData(filtered);
        } else {
            setFilteredData(originalData);
        }
    }

    return (
        <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>
            <div className='col-sm-3'></div>

            {displayTable ? (
                <div>
                    <label className="fw-bold" htmlFor="">Delivery Boy Name</label>
                    <select className="ms-2" onChange={handleDbNameChange} value={selectedDbName}>
                        <option value="">All</option>
                        <option value="shubham">Shubham</option>
                        <option value="mayank">Mayank</option>
                    </select>

                    <div className='col-sm-6 mt-4 mx-auto text-center'>
                        <table className='table table-striped ms-2 me-2'>
                            <thead>
                                <tr>
                                    <th>Delivery Boy Name</th>
                                    <th>Bill</th>
                                    <th>Paid Amount</th>
                                    <th>Payment Mode</th>
                                    <th>Verify Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.cust_mobile}>
                                        <td>{item.db_name}</td>
                                        <td>{item.bill}</td>
                                        <td>{item.paid_amount}</td>
                                        <td>{item.payment_mode}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => paymentVerify(item)}>Verify Payment</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No Record Found</p> // Display a loading message until data is fetched
            )}
            <div className='col-sm-3'></div>
        </div>
    );
}

export default PaymentVerify;
