import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./connexion.css" 
import L from 'leaflet';
// Importer le fichier CSS de Leaflet
import '../../node_modules/leaflet/dist/leaflet.css';
import {motion} from 'framer-motion';


function  Geocache() {

    function handlechange(event){
        //event.preventDefault();
        localStorage.removeItem('token');
    }


  return (
  <>
   <header>
    <Link to= "/"  className="back-button">Retour</Link>
    <Link to ="/deconnexion" className="deconnect-button " onClick={(e)=>handlechange(e)}>Deconnexion</Link>
  </header>

  

    <div id="mapid" style={{ height: '400px' }}>hello</div>
   
  </>
   

  );
}





export default Geocache;









