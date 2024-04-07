import React from 'react';
import { useNavigate } from 'react-router-dom'; // Note: useNavigate seems unused in this snippet.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import About from './About';

function Home() {

  const navigate = useNavigate()


  return (
    <>
      <div className="container-fluid m-0 p-0 " >
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ position: "relative" }}>
              <img src={require(`./img/carousel-2.jpg`)} className="d-block w-100" alt="..." />
              <div className="text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>

                <p className="fw-bold d-none d-md-block" style={{ fontSize: "8vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>
                {/* for mobile size */}
                <p className="fw-bold d-block d-md-none" style={{ fontSize: "2vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>

                {/* button for desktop screen */}
                <div className='d-flex justify-content-center' >
                  <button className="btn bg-primary p-2 ps-4 pe-4   btn-lg" style={{ color: "white", fontWeight: "600" }} onClick={() => navigate('/order')}>Order</button>
                  <button className="btn p-2 btn-lg ms-2" style={{ backgroundColor: "rgb(149,87,198)", color: "white", fontWeight: "600" }} onClick={() => navigate(`/delivery`)}>Delivery</button>
                </div>
              </div>
            </div>

            <div className="carousel-item active" style={{ position: "relative" }}>
              <img src={require(`./img/bac3.jpg`)} className="d-block w-100" alt="..." />
              <div className="text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>

                <p className="fw-bold d-none d-md-block" style={{ fontSize: "8vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>
                {/* for mobile size */}
                <p className="fw-bold d-block d-md-none" style={{ fontSize: "2vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>

                {/* button for desktop screen */}
                <div className='d-flex justify-content-center' >
                  <button className="btn bg-primary p-2 ps-4 pe-4   btn-lg" style={{ color: "white", fontWeight: "600" }} onClick={() => navigate('/order')}>Order</button>
                  <button className="btn p-2 btn-lg ms-2" style={{ backgroundColor: "rgb(149,87,198)", color: "white", fontWeight: "600" }} onClick={() => navigate(`/delivery`)}>Delivery</button>
                </div>
              </div>
            </div>

            <div className="carousel-item" style={{ position: "relative" }}>
              <img src={require(`./img/bac.jpg`)} className="d-block w-100" alt="..." />
              <div className="text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>

                <p className="fw-bold d-none d-md-block" style={{ fontSize: "8vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>
                {/* for mobile size */}
                <p className="fw-bold d-block d-md-none" style={{ fontSize: "2vh", color: "white", fontFamily: "sans-serif" }}>We Make Your Clothes Fresh and Clean</p>

                {/* button for desktop screen */}
                <div className='d-flex justify-content-center' >
                  <button className="btn bg-primary p-2 ps-4 pe-4   btn-lg" style={{ color: "white", fontWeight: "600" }} onClick={() => navigate('/order')}>Order</button>
                  <button className="btn p-2 btn-lg ms-2" style={{ backgroundColor: "rgb(149,87,198)", color: "white", fontWeight: "600" }} onClick={() => navigate(`/delivery`)}>Delivery</button>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      
      <About />

    </>
  );
}

export default Home;
