import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

//Auth Pages



//Shop Pages

import Home from "./shop/pages/Home";


//User Pages




//Admin Pages




//Shared Components






function App() {
  return (
    <Router>
      
      <Routes>

      

        {/* Auth Routes */}


       

        {/* Shop Routes */}


        <Route path="/" element={<Navigate to="/Home"/>} />  
        <Route path="/Home" element={<Home />} />
        
        
        

        {/* User Routes */}



        {/* Admin Routes */}

        
        
        {/*Links Routes */}


      </Routes>

    

    </Router>
  );
}

export default App
