import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Order from './components/Order';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import WorkProcess from './components/WorkProcess';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import VoiceOrder from './components/VoiceOrder';

function App() {
  return (
    <div className='m-0 p-0'>
      {/* <VoiceOrder /> */}
      {/* <Welcome /> */}
      {/* <Table /> */}
      {/* <About /> */}
      {/* <WorkProcess /> */}
      {/* <Service /> */}

      {/* <About /> */}
      {/* <Home /> */}
      {/* <VoiceToText /> */}
      {/* <Order /> */}
      
      <BrowserRouter>
        <Navbar />
        <Dashboard />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
