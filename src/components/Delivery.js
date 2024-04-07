import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function Delivery() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    const [deliveryDetails, setDeliveryDetails] = useState({
        mobile: '',
        db_mobile: '', // delivery boy number 
        bill: '',
        pay_method: ''
    });

    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldNavigate) {
            navigate(`/billgenerate`, { state: { deliveryDetails } });
        }
    }, [deliveryDetails, shouldNavigate, navigate]);

    function handleInput(e) {
        const { name, value } = e.target;
        setDeliveryDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    }

    async function getBill(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/fetch_delivery_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delivery_details: deliveryDetails })
            });
            if (response.ok) {
                const data = await response.json();
                setDeliveryDetails(prevDetails => ({ ...prevDetails, bill: data.bill,PreviousBill:data.PreviousBill }));
                setShouldNavigate(true);
            } else {
                console.log("Error fetching delivery details");
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    }

    // Inline styles
    const cardStyle = {
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
        // marginTop: '40%' 
    };

    return (
        <div style={{ backgroundColor: "#1d2b53", minHeight: "100vh" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 mt-4">
                        <div className="card p-4 shadow-lg border-danger" style={cardStyle}>
                            <div className="row">


                                <form onSubmit={getBill}>
                                    <label for="" class="fw-bold">Customer Mobile No:</label>
                                    <input type="text"
                                        className='form-control mobile'
                                        name="mobile"
                                        onChange={handleInput}
                                        value={deliveryDetails.mobile}

                                    />

                                    <label for="" class="fw-bold mt-2">Delivery Boy Mobile No:</label>
                                    <input type="text"
                                        className='form-control db_mobile '
                                        name="db_mobile"
                                        onChange={handleInput}
                                        value={deliveryDetails.db_mobile}

                                    />

                                    <div>
                                        <label class="fw-bold mt-2">Payment method</label><br />

                                        <div class="form-check">
                                            <input
                                                class="  form-check-input"
                                                type="radio"
                                                name="pay_method"
                                                value="cash"
                                                onChange={handleInput}
                                                style={{border: "2px solid black"}} // Adding border width to make it bold

                                            />
                                            <label class="form-check-label" for="exampleRadios1">
                                                Cash
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio" name="pay_method"
                                                value="online"
                                                onChange={handleInput}
                                                style={{border: "2px solid black"}} // Adding border width to make it bold

                                            />
                                            <label class="form-check-label" for="exampleRadios2">
                                                Online
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input
                                                class="fw-bold form-check-input"
                                                type="radio" name="pay_method"
                                                value="pending"
                                                onChange={handleInput}
                                                style={{border: "2px solid black"}} // Adding border width to make it bold

                                            />
                                            <label class="form-check-label" for="exampleRadios2">
                                                Pay Later
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-success mt-3">Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    );
}

export default Delivery;
