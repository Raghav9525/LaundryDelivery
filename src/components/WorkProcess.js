import React from 'react';

function WorkProcess() {

    const circle = {
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto', // Auto margins for horizontal centering
        backgroundColor: 'rgb(243, 246, 255)',
        boxShadow: '0px 5px 10px rgb(221, 221, 221, 0.5)',
    };

    const innerCircle = {
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto', // Auto margins for horizontal centering
    };

    return (
        <>
            <div className="container-fluid pt-2 mb-4 mt-4">
                <div className="container">
                    <h6 className=" text-uppercase text-center font-weight-medium mb-3" style={{ color: "rgb(70, 198, 206)" }}>
                        Working Process
                    </h6>
                    <h1 className="display-4 text-center mb-5" style={{ color: "rgb(25, 67, 118)",fontWeight:"700" }}>How We Work</h1>
                    <div className="row ">
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                            <div style={circle}>
                                <div style={innerCircle}>
                                    <div style={{ fontSize: "4rem", fontWeight: "800", color: "#17a2b8" }}>1</div>
                                </div>
                            </div>

                            <h3 class="font-weight-bold m-0 mt-2" style={{ textAlign: 'center' }}>Order Place</h3>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                            <div style={circle}>
                                <div style={innerCircle}>
                                    <div style={{ fontSize: "4rem", fontWeight: "800", color: "#17a2b8" }}>2</div>
                                </div>
                            </div>
                            <h3 class="font-weight-bold m-0 mt-2" style={{ textAlign: 'center' }}>Pick Up</h3>

                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                            <div style={circle}>
                                <div style={innerCircle}>
                                    <div style={{ fontSize: "4rem", fontWeight: "800", color: "#17a2b8" }}>3</div>
                                </div>
                            </div>
                            <h3 class="font-weight-bold m-0 mt-2" style={{ textAlign: 'center' }}>Clean & Wash</h3>

                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                            <div style={circle}>
                                <div style={innerCircle}>
                                    <div style={{ fontSize: "4rem", fontWeight: "800", color: "#17a2b8" }}>4</div>
                                </div>
                            </div>
                            
                            <h3 class="font-weight-bold m-0 mt-2" style={{ textAlign: 'center' }}>Delivery</h3>

                        </div>
                     
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorkProcess;
