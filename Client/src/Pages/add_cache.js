import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import "./connexion.css";
import {motion} from 'framer-motion';
import '../Composants/button.css';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';



function Add_cache() {
  const location = useLocation();


    const { position_add_cache } = queryString.parse(location.search);
    //const latLngString = 'LatLng(44.788038, -0.621736)';
  const regex = /LatLng\(([-\d\.]+), ([-\d\.]+)\)/;
  const match = regex.exec(position_add_cache);
  let lng=null;
  let lat=null;

  if (match) {
     lat = match[1];
     lng = match[2];
    console.log('lat:', lat, 'lng:', lng);
  } else {
    console.log('Unable to extract lat/lng from string:');
  }
   // const position1 = JSON.parse(position_add_cache);
    console.log("position_add_cacheeee", position_add_cache);
    console.log("longitude", lng);

  const [longitude, setLongitude] = useState(lng);
  const [latitude, setLatitude] = useState(lat);
 // const cache = location.state;
  //console.log("cache :", cache);

/*  if(cache!==null){
    setLongitude(cache.position_add_cache.lng);
     setLatitude(cache.position_add_cache.lat);
  }*/
 
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
    
    
    
   

    const navigate= useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const url_connexion="http://localhost:3000/insert_geocaches";


      // faire ma requête fetch vers le sereveur
      fetch(url_connexion, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        credentials: 'include',
        body: JSON.stringify({
          longitude: longitude,
          latitude:latitude,
          difficulty:difficulty,
          description:description,
          id: localStorage.getItem('id')
        }),
      })
      .then((response) =>response.json())
     .then((data) =>{
        console.log(data.message);
        // la cache ajoutée retour sur la map
        if(data.message){
            setShowAlert(true);
            setAlert(data.message);
            setTimeout(() => {
                setShowAlert(false);
                navigate("/geocache"); // naviguez vers la page de dashboard
              }, 3000);
           // navigate("/geocache");
        }

     })
    }
      // Appel de la fonction de soumission passée en props et transmission des données de la cache
     // props.onSubmit({ longitude, latitude, difficulty, description });
      // Réinitialisation des champs du formulaire
     /* setLongitude('');
      setLatitude('');
      setDifficulty('');
      setDescription('');*/
        

  return (
    <>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
          <div className='stuck'>
            <h2 style={{textAlign:'center'}}>Ajouter la cache</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Longitude:
                <input type="text" value={longitude} onChange={(event) => setLongitude(event.target.value)}  readOnly/>
              </label>
              <br />
              <label>
                Latitude:
                <input type="text" value={latitude} onChange={(event) => setLatitude(event.target.value)} readOnly/>
              </label>
              <br />
              <label>
                Difficulté:
                <input type="text" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} required />
              </label>
              <br />
              <label>
                Description:
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} required/>
              </label>
              <br />
              <button type="submit">Ajouter la cache</button>
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
  );
         
}
export default Add_cache;