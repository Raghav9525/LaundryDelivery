
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { FaCheck } from "react-icons/fa";
import WorkProcess from './WorkProcess';
import Service from './Service';


function About() {
    return (
        <>
            <div class="container-fluid mt-2 mb-2">
                <div class="container pt-0 pt-lg-4">
                    <div class="row align-items-center">
                        <div class="col-lg-5">
                            <img class="img-fluid" src={require(`./img/about.jpg`)} alt="" />
                        </div>
                        <div class="col-lg-7 mt-5 mt-lg-0 pl-lg-5">
                            <h6 className="text-secondary text-uppercase font-weight-medium mb-3" >
                                <span style={{ color: "rgb(70, 198, 206)" }}>Learn About Us</span>
                            </h6>
                            <h1 class="mb-4" style={{ color: "rgb(25, 67, 118)" }}>We Are Quality Laundry Provider In Your City</h1>
                            <h5 class=" mb-4">
                                <span style={{ color: "rgb(25, 67, 118)" }}>Welcome to Shine It Laundry, where we transform the way you experience laundry services.</span>
                            </h5>

                            <p class="mb-2" style={{color: "rgb(117, 117, 117)"}}>
                                Shine It Laundry is not just a laundry service; it's a haven for
                                your garments. Our team of skilled professionals understands the
                                unique needs of fabrics, ensuring each item is treated with the
                                utmost care and attention. From everyday wear to delicate fabrics,
                                we bring a shine to every piece.
                            </p>
                            <div class="row" >
                                <div class="col-sm-6 pt-3">
                                    <div class="d-flex align-items-center">
                                        <i class="mr-2" style={{ color: "rgb(25, 67, 118)" }}><FaCheck />
                                        </i>
                                        <p class="text-secondary font-weight-medium m-0 ps-2" >
                                            <span style={{ color: "rgb(70, 198, 206)" }}>Quality Laundry Service</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pt-3">
                                    <div class="d-flex align-items-center">
                                    <i class="mr-2" style={{ color: "rgb(25, 67, 118)" }}><FaCheck />
                                        </i>
                                        <p class="text-secondary font-weight-medium m-0 ps-2">
                                            <span style={{ color: "rgb(70, 198, 206)" }}>Express Fast Delivery</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pt-3">
                                    <div class="d-flex align-items-center">
                                    <i class="mr-2" style={{ color: "rgb(25, 67, 118)" }}><FaCheck />
                                        </i>
                                        <p class="text-secondary font-weight-medium m-0 ps-2">
                                            <span style={{ color: "rgb(70, 198, 206)" }}>Highly Professional Staff</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-6 pt-3">
                                    <div class="d-flex align-items-center">
                                    <i class="mr-2" style={{ color: "rgb(25, 67, 118)" }}><FaCheck />
                                        </i>
                                        <p class="text-secondary font-weight-medium m-0 ps-2">
                                            <span style={{ color: "rgb(70, 198, 206)" }}>100% Satisfaction Gguarantee</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Service />
            <WorkProcess />
        </>
    )
}

export default About