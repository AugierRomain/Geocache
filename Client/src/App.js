import './App.css';

import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavbarCreated from './Composants/NavbarCreated';
import Animations from './Composants/Animations'


function App() {
  return (
    <div className="App">
        <NavbarCreated/>
        
        <BrowserRouter>
              <Animations />   
              
          </BrowserRouter>
          
        
      
    </div>
  );
}

export default App;

