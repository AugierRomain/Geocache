import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

import "./connexion.css";
import {motion} from 'framer-motion';
import '../Composants/button.css';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';


function Modify_cache(){

    const location = useLocation();
    const cache = location.state.position;
    

    const [longitude, setLongitude] = useState(cache.longitude);
    const [latitude, setLatitude] = useState(cache.latitude);
    const [difficulty, setDifficulty] = useState(cache.difficulty);
    const [description, setDescription] = useState(cache.description);
    const [id, setId] = useState(cache.id);

    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
   
    const navigate= useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();

    fetch('http://localhost:3000/modify_geocaches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      credentials: 'include',
      body: JSON.stringify({id:id,longitude:longitude,latitude:latitude,difficulty:difficulty,description:description,id_modifyer:localStorage.getItem("id") })
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

    }

return (
  <>
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className='stuck'>
        <h2 style={{textAlign:'center'}}>Modifier la cache</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Longitude:
            <input type="text" value={longitude} defaultValue={longitude} onChange={(event) => setLongitude(event.target.value)} required />
          </label>
          <br />
          <label>
            Latitude:
            <input type="text" value={latitude} defaultValue={latitude} onChange={(event) => setLatitude(event.target.value)} required/>
          </label>
          <br />
          <label>
            Difficulté:
            <input type="text" value={difficulty} defaultValue={difficulty} onChange={(event) => setDifficulty(event.target.value)} required />
          </label>
          <br />
          <label>
            Description:
              <textarea value={description} defaultValue={description} onChange={(event) => setDescription(event.target.value)} required/>
          </label>
          <br />
            <button type="submit">Modifier la cache</button>
        </form>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="my-3">
              {alert}
        </Alert>
        )}
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
        
);}

export default Modify_cache;