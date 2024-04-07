import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BillGenerate() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // Added useState for message

    const [cloth_details, setCloth_details] = useState({
        mobile: '',
        db_mobile: '',
        pay_method: '',
        bill: 0,
        PreviousBill: 0,
        payable_amount: '0',
        otp: ''
    });

    useEffect(() => {
        if (location.state?.deliveryDetails) {
            const { mobile, bill, pay_method, db_mobile, PreviousBill } = location.state.deliveryDetails;

            setCloth_details({
                ...cloth_details,
                mobile: mobile,
                db_mobile: db_mobile,
                pay_method: pay_method,
                bill: bill,
                PreviousBill: PreviousBill
            });
        }
    }, [location.state?.deliveryDetails]);


    function handleInput(e) {
        const { name, value } = e.target;
        setCloth_details(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function comfirmdelivery(e) {
        e.preventDefault();

        //if otp matched then call delivery_done api else display error
        let generated_otp = 2000;
        if (cloth_details.otp == generated_otp || cloth_details.pay_method != 'pending') {
            try {
                const response = await fetch(`${apiUrl}/delivery_done`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cloth_details: cloth_details })
                });
                if (response.ok) {
                    navigate(`/order_success`, { state: { message: "Delivery Successful" } });
                } else {
                    console.error('delivery error');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setMessage("Wrong Otp");
        }
    }

    return (
        <div>
            <h2>Previous bill : {cloth_details.PreviousBill}</h2>

            <h2>Current Bill : {cloth_details.bill}</h2>

            <h2>Total Bill : {cloth_details.bill + cloth_details.PreviousBill}</h2>
            <form onSubmit={comfirmdelivery}>

                {cloth_details.pay_method != 'pending' && (
                    <div>


                        <label>Payment Amount</label>
                        <input
                            type="text"
                            className='payable_amount'
                            name="payable_amount"
                            placeholder='how much u want to pay'
                            value={cloth_details.payable_amount}
                            onChange={handleInput}
                        />
                    </div>
                )}

                {cloth_details.pay_method === 'pending' && (
                    <div>
                        <label>OTP</label>
                        <input
                            type="password"
                            className=''
                            name="otp"
                            placeholder=''
                            value={cloth_details.otp}
                            onChange={handleInput}
                        />
                    </div>
                )}

                <button className="mt-4" type='submit'>Confirm Delivery</button>
            </form>

            <div> {/* Corrected 'dir' to 'div' */}
                <h2>{message}</h2>
            </div>
        </div>
    )
}

export default BillGenerate;
