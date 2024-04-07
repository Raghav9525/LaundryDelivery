import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    const navigate = useNavigate();
    const [deleteMessage, setDeleteMessage] = useState('');

    async function deleteDatabase() {
        try {
            const response = await fetch(`${apiUrl}/delete_database`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDeleteMessage(data.message); // Assuming the server responds with a JSON object containing the message
                console.log("Database Deleted");
            } else {
                console.error("Failed to delete database");
            }
        } catch (err) {
            console.error("Error occurred while sending request:", err);
        }
    }

    return (
        <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)" }}>
            <div className='d-flex justify-content-center pt-2'>
                <button className="fw-bold btn btn-primary" onClick={() => navigate('/payment_varify')}>Varify Payment</button>
                <button className="fw-bold btn btn-success ms-2" onClick={() => navigate('/cust_pending_payment')}>Customer Pending Payment</button>
                {/* <button className="fw-bold btn btn-danger ms-2" onClick={deleteDatabase}>Delete Database</button> */}
                <button className="fw-bold btn btn-danger ms-2" onClick={deleteDatabase}>Add New Delivery Boy</button>

            </div>
            {deleteMessage && (
                <div className="text-center mt-3">
                    <p className="text-success">{deleteMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Admin;
