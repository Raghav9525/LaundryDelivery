import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


function CustomerPaymentDetail() {

    const location = useLocation();
    const { cust_mobile, custData } = location.state; // Access the state passed during navigation
    const [displayTable, setDisplayTable] = useState('')


    useEffect( ()=>{
        // Filter object from custData where cust_mobile === cust_mobile
        const filterData = custData.filter(data => data.cust_mobile === cust_mobile);
        setDisplayTable(filterData);
    })

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
                                <th>Delivery Boy Name</th>
                                <th>Remaining Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custData.map((item) => (
                                <tr key={item.account_id}>
                                    <td>{item.cust_mobile}</td>
                                    <td>{item.db_name}</td>
                                    <td>{item.remaining_bill}</td>
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
    )
}

export default CustomerPaymentDetail