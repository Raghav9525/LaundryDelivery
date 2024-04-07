
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const navigate= useNavigate()

  function submitForm(){

  }

  function handleInput(){

  }
  return (
    <>
        <div id="booking-container" class="container-fluid  align-items-center vh-60 " style={{backgroundColor: "#1d2b53"}}>
            <div class="row ">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="card p-4 mt-4 mb-4" >
                        <form onSubmit={submitForm}>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Mobile No.</label>
                                <input
                                    type="mobile"
                                    name="mobile"
                                    onChange={handleInput}
                                    class="form-control"
                                    id="exampleInputMobile"
                                />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    onChange={handleInput}
                                />
                            </div>

                            <button type="submit" onClick={submitForm} class="btn btn-primary me-2">DeliveryBoy Login</button>
                            <button  onClick={()=>navigate("/adminlogin")} class="btn btn-success ">Admin Login</button><br />


                            <NavLink to={`/signup`}>New user? Create Account</NavLink>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-3"></div>
        </div>
    </>
)
}

export default Login