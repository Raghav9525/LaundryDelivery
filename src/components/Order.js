
import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Order() {
    const apiUrl = process.env.REACT_APP_SERVER_URL;


    const [clothDetails, setClothDetails] = useState([]);
    const [selectedCloth, setSelectedCloth] = useState('')
    const [clothCount, setClothCount] = useState('');
    const [custMob, setCustMob] = useState('')

    const navigate = useNavigate()


    function handleInput(e) {
        console.log(selectedCloth + " " + clothCount)
        e.preventDefault();
        const newClothDetails = { clothName: selectedCloth, clothCount: clothCount }
        setClothDetails(prevState => [...prevState, newClothDetails])
        setSelectedCloth('')
        setClothCount('')

    }

    async function submitForm(e) {
        e.preventDefault();
        const clothDetail_mobile = {
            custMob: custMob,
            clothDetail: clothDetails
        };

        try {
            const response = await fetch(`${apiUrl}/placeorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clothDetail_mobile)
            });

            if (response.ok) {
                console.log("hii")
                const responseData = await response.json(); // Parse the JSON response body
                navigate(`/order_success`, { state: { message: "order successful" } })
            }
        } catch (err) {
            console.error("Error occurred while sending request:", err);
            navigate(`/error`, { state: { message: "Order Not Placed" } })

        }
    }




    const cardStyle = {
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    };
    return (
        <div style={{ backgroundColor: "#1d2b53", minHeight: "100vh" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 mt-4 mb-4">
                        <div className="card p-4 shadow-lg border-danger" style={cardStyle}>

                            <form onSubmit={submitForm}>
                                <div className=''>
                                    <label className='fw-bold'>Customer Mobile No. </label>
                                    <input className=" form-control mb-4" type='mobile' value={custMob} onChange={(e) => setCustMob(e.target.value)} placeholder='Mobile Number' />
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">

                                        <select
                                            className="form-select"
                                            value={selectedCloth}
                                            onChange={(e) => setSelectedCloth(e.target.value)}
                                            placeholder="Select Cloth"
                                        >
                                            <option value="">Select Cloth</option>
                                            <option value="shirt">Shirt</option>
                                            <option value="pant">Pant</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4 ">
                                        <input type="digit"
                                            className="form-control"
                                            name="cloth_count"
                                            placeholder="Cloth Count"
                                            value={clothCount}
                                            onChange={(e) => setClothCount(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <button className="btn btn-primary" onClick={handleInput}>Add</button>
                                    </div>
                                </div>

                                {/* display cloth details */}
                                <div className='mt-2'>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Cloth</th>
                                                <th>Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clothDetails.map((clothDetail, index) => (
                                                <tr key={index}>
                                                    <>
                                                        <td>{clothDetail.clothName}</td>
                                                        <td>{clothDetail.clothCount}</td>
                                                    </>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <button type="submit" className="btn btn-success mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </div>
    );



    // function Order() {

    //     const [orderdetails, setOrderdetails] = useState(
    //         {
    //             mobile: '',
    //             generated_otp: ''
    //         }
    //     );

    //     const [shouldNavigate, setShouldNavigate] = useState(false);


    //     const navigate = useNavigate();
    //         // nevigate when generated otp stored to orderdetails
    //     useEffect(() => {
    //         if (shouldNavigate) {
    //             navigate(`/billgenerate`, { state: { orderdetails: orderdetails } });
    //         }
    //     }, [orderdetails, shouldNavigate,navigate]);

    //     function handleInput(e) {
    //         const { name, value } = e.target
    //         setOrderdetails({ ...orderdetails, [name]: value });
    //     }

    //     async function getOtp(e) {
    //         e.preventDefault()
    //         try {
    //             const response = await fetch("http://localhost:5000/submitform", {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ mobile: orderdetails.mobile })
    //             });
    //             if (response.ok) {

    //                 const data = await response.json(); // Get the response data
    //                 console.log(data)
    //                 setOrderdetails(prevState => (
    //                     {
    //                         ...orderdetails,
    //                         generated_otp: data.generated_otp
    //                     }
    //                 ));
    //                 setShouldNavigate(true);
    //             }
    //             else {
    //                 console.log("error")
    //             }

    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }

    //     return (
    //         <div>
    //             <form onSubmit={getOtp}>
    //                 <input type="text"
    //                     className='mobile'
    //                     name="mobile"
    //                     onChange={handleInput}
    //                     value={orderdetails.mobile}

    //                 />
    //                 <button type='submit'>Submit</button>

    //             </form>
    //         </div>
    //     )
    // }

}

export default Order