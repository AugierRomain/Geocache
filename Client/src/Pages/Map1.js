import React from 'react';
import ReactDOM from 'react-dom';
import { MapContainer,TileLayer,useMap,Popup,Marker  } from 'react-leaflet'
import Map from './Map'
import Connexion from './connexion'
import Geocache from './geocache'
import '../../node_modules/leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom';
import NavbarCreated from '../Composants/NavbarCreated';
import {motion} from 'framer-motion';
import AddGeocacheButton from '../Composants/AddGeocacheButton';

import "./connexion.css" 

import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import '../Composants/button.css'
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


  
   function Map1() {
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isAddCacheClicked, setIsAddCacheClicked] = useState(false);
    const navigate=useNavigate();
    
    // pour la déconnexion
    function handlechange(event){
        //event.preventDefault();
        localStorage.removeItem('token');
    }

    // requête pour accéder à la page d'ajout de cache
        function add_cache(event){
            event.preventDefault();          
            const url_access="http://localhost:3000/ma-page-protegee";
            fetch(url_access, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
              },
              credentials: 'include',
            })
            .then((response) =>response.json())
            .then((data) =>{
              if(data.access){
                navigate("/add_cache", );
              }
              else {
                console.log(data.message);
                setAlert(data.message);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
        
                  }, 3000);
              }
            })
            
    
        }

        // fonction handleAddcacheclick
        function handleAddCacheClick(event) {
          event.preventDefault();
          setIsAddCacheClicked(true);
        }
    
    return (
        <div>
        <NavbarCreated/>   
        <motion.div 
        initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
        >
         
            <Map isAddCacheClicked={isAddCacheClicked} setIsAddCacheClicked={setIsAddCacheClicked}/>
        <div className='AddButton'>
                <AddGeocacheButton handleAddCacheClick={handleAddCacheClick}></AddGeocacheButton>
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
        </div>
    )
   }


   export default Map1;

