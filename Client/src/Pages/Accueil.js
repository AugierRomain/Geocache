import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link,useLocation } from 'react-router-dom';
import "./Accueil.css"

import NavbarCreated from '../Composants/NavbarCreated';
import {motion} from 'framer-motion';
import CoolButton from '../Composants/BoutonsAccueil';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';
import '../Composants/button.css'



function  Accueil() {
  
  return (
  <>
   
    <motion.div class="container"
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
    
    
    >
       
      <div class="centered-div">
        <h1>Bienvenue</h1>
        {!localStorage.getItem("token") ?( <p style={{textAlign:'center'}}>Vous devez vous connecter ou vous inscrire pour acceder complètement à l'application</p>):
        (<p style={{textAlign:'center'}}>Bonjour, vous pouvez maintenant accéder à la map </p>) }
        
      </div>
      <div class="middle-div">
      </div>
      <div class="bottom-div">
        <p>Application faite par Ali Koffi et Augier Romain</p>
      </div>
    </motion.div>
    <div className='AccueilButton'>
                <AccueilButton></AccueilButton>
    </div>
    <div className='InscriptionButton'>
                <InscriptionButton></InscriptionButton>
    </div>
    <div className='ConnexionButton'>
               <ConnexionButton></ConnexionButton>
    </div>
    <div className='MapButton'>
                <MapButton></MapButton>
    </div>
    
  </>
   

  );
}

export default Accueil;
