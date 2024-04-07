import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <>
            <div className="container-fluid  text-white  pt-5 px-sm-3 px-md-5" style={{ backgroundColor: "rgb(25, 67, 118)" }}>
                <div className="row pt-5">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <img src={require("./img/logo.png")} style={{ height: '80px' }} alt="Shine It Laundry Logo" />
                        <div>Shine It Laundry</div>
                        <br />
                        <p>Welcome to Shine It Laundry, where we transform the way you experience laundry services.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="text-white mb-4">Get In Touch</h4>
                        <p>Feel free to drop by our physical location for a face-to-face chat or to drop off and pick up your laundry:</p>
                        <p><FaMapMarkerAlt className="mr-2" />Shop No: 002 F3 HDIL Residency Park 2 Global City, Virar West - 401303.</p>
                        <p><FaPhoneAlt className="mr-2" />+91 9470492048</p>
                        <p><FaEnvelope className="mr-2" />info@example.com</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="text-white mb-4">Quick Links</h4>
                        <div className="d-flex flex-column justify-content-start">
                            {/* Update these Links based on your routing */}
                            <Link className="text-white mb-2" to="/"><FaMapMarkerAlt className="ms-2" />Home</Link>
                            <Link className="text-white mb-2" to="/about"><FaMapMarkerAlt className="ms-2" />About Us</Link>
                            <Link className="text-white mb-2" to="/"><FaMapMarkerAlt className="ms-2" />Services</Link>
                            <Link className="text-white mb-2" to="/"><FaMapMarkerAlt className="ms-2" />Pricing</Link>
                            <Link className="text-white" to="/"><FaMapMarkerAlt className="ms-2" />Contact Us</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="text-white mb-4">Social Media</h4>
                        <a className="btn btn-outline-light rounded-circle text-center ms-2 px-0" style={{ width: '38px', height: '38px' }} href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a className="btn btn-outline-light rounded-circle text-center ms-2 px-0" style={{ width: '38px', height: '38px' }} href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a className="btn btn-outline-light rounded-circle text-center ms-2 px-0" style={{ width: '38px', height: '38px' }} href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                    </div>
                </div>
            </div>


            <div class="container-fluid bg-dark text-white py-4 px-sm-3 px-md-5">
                <p class="m-0 text-center text-white">
                    &copy; <a class="text-white font-weight-medium" href="#"></a>

                    Designed & Developed by 7632966717, 7542061065
                    {/* <a class="text-white font-weight-medium" href="https://web4trends.com"
                    > 7632966717, 7542061065</a
                    > */}
                </p>
            </div>
        </>
    );
}

export default Footer;
