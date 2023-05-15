import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


import "./connexion.css";
import {motion} from 'framer-motion';
import '../Composants/button.css';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';


function Cache_found(){

    const location = useLocation();
    const cache = location.state.position;

    
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate=useNavigate();
      // Récupérer le JSON des positions depuis le serveur
  useEffect(() => {
    fetch('http://localhost:3000/found_geocaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        credentials: 'include',
        body: JSON.stringify({id:cache.id,longitude:cache.longitude,latitude:cache.latitude,difficulty:cache.difficulty,description:cache.description,id_modifyer:localStorage.getItem("id") })
      }) // endpoint à adapter en fonction de votre serveur
        .then(response => response.json())
        .then(data => {
              console.log(data);
              setAlert(data.message);
              setShowAlert(true);
              setTimeout(() => {
                  setShowAlert(false);
                  navigate("/geocache"); // naviguez vers la page de dashboard
                }, 3000);
          })
        .catch(error => console.error(error));
  }, []);



return (
  <>
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className='stuck'>
        <h2 style={{textAlign:'center'}}>Cache trouvée</h2>
          <>
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="my-3">
                        {alert}
              </Alert>
            )}

          </>
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
)}

export  default Cache_found;