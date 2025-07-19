import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

//Auth Pages
import Login from './auth/pages/Login';
import Register from "./auth/pages/Register";
import ForgotPassword from "./auth/pages/ForgotPassword";


//Shop Pages

import Home from "./shop/pages/Home";
import Articles from "./shop/pages/Articles";
import Colecction from "./shop/pages/colecction";



//User Pages




//Admin Pages




//Shared Components






function App() {
  return (
    <Router>
      
        <Routes>

      
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
         <Route path="/Forgot-password" element={<ForgotPassword />} />


      

        {/* Auth Routes */}


       

        {/* Shop Routes */}


        <Route path="/" element={<Navigate to="/Home"/>} />  
        <Route path="/Home" element={<Home />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Colecction" element={<Colecction />} />

        
        
        

        {/* User Routes */}



        {/* Admin Routes */}

        
        
        {/*Links Routes */}


      </Routes>

    

    </Router>
  );
}

export default App
