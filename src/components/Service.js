import React from 'react';

function Service() {
    return (
        <>
            <div className="container-fluid mt-4">
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <div>
                            <h6 className=" text-uppercase text-center font-weight-medium mb-3" style={{ color: "rgb(70, 198, 206)" }}>
                                OUR SERVICES
                            </h6>
                            <h1 className="mt-2 mb-4" style={{ color: "rgb(25, 67, 118)", fontWeight: "700" }}>What We Offer</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/laundry.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(82, 121, 247)" }}>Laundry</h4>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/dryclean.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(29, 33, 42)" }}>Dry Cleaning</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/shoue.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(82, 121, 247)" }}>Shoes Cleaning</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/sofaclean.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(25, 67, 118)" }}>Sofa Cleaning</h4>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-2">
                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/carpetclean.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "white" }}>Carpet Cleaning</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/mattress.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(82, 121, 247)" }}>Mattress Cleaning</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/homeclean.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(82, 121, 247)" }}>Home Cleaning</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-1" >
                            <div className="position-relative " style={{ height: "300px", backgroundColor: "white" }}>
                                <img className="w-100 h-100 rounded" src={require("./img/laundry.jpg")} alt="" style={{ objectFit: "cover" }} />
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h4 className="font-weight-bold " style={{ color: "rgb(82, 121, 247)" }}>Laundry</h4>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;
