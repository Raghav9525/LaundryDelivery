
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function BillGenerate2() {

    const location = useLocation();
    const [cloth_details,setCloth_details] = useState(
        {
            mobile:'',
            otp:'',
            generated_otp:''
        }
    )
    //recevie object from Order page
    useEffect(() => {
        if (location.state?.orderdetails) {
            console.log(location.state)
            const { mobile, generated_otp } = location.state.orderdetails;
            setCloth_details({
                ...cloth_details,
                mobile: mobile,
                generated_otp: generated_otp,
            });
        }
    }, [location.state]); // Only re-run the effect if location.state changes

    console.log(cloth_details.generated_otp)
    function handleInput(e) {
        const { name, value } = e.target;
        setCloth_details(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    async function verifyOtp(e) {
        e.preventDefault(); // Prevent form submit from reloading the page

        if (cloth_details.generated_otp == cloth_details.otp) {
            const response = await fetch("http://localhost:5000/placeorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cloth_details: cloth_details })
            });
            if (response.ok) {
                console.log('Order placed successfully');
                // Handle successful response
            } else {
                console.error('Failed to place order');
                // Handle error
            }
        } else {
            console.log('OTP does not match');
        }
    }
    return (
        <div>

            <form onSubmit={verifyOtp}>
                <label htmlFor="">OTP</label>
                <input type="text"
                    className='otp'
                    name="otp"
                    onChange={handleInput}
                    value={cloth_details.otp}

                />
                <button type='submit'>Submit</button>

            </form>
        </div>
    )
}

export default BillGenerate2