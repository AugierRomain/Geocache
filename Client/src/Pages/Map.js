import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer,TileLayer,useMap,Popup,Marker ,Circle,CircleMarker } from 'react-leaflet'
import '../../node_modules/leaflet/dist/leaflet.css'
import icon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import iconShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Composants/button.css";
import './Map.css';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import queryString from 'query-string';

function GetIcon(){
  return L.icon({
    iconUrl: require("../Icons/placeholder.png"),
    iconSize: [15,20]
});
}
function GetIcon2(){
  return L.icon({
    iconUrl: require("../Icons/Second.png"),
    iconSize: [35,45]
});
}
function Map(isAddCacheClicked,setIsAddCacheClicked){
  const position = [51.505, -0.09];
  const position1=[44.806174,-0.605324];
  const center = [51.505, -0.09];
  const center1=[44.806174,-0.605324];
  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }
  const [positions, setPositions] = useState([]);
  const longitude = "-0.605324";
  const latitude = "44.806174";
  const [position_add_cache, setPosition_cache] = useState(null)

  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate= useNavigate();
  // Fix pour que les marqueurs s'affichent correctement
delete L.Icon.Default.prototype._getIconUrl;

// Créer une icône personnalisée pour les marqueurs des caches du joueur connecté
  const myIcon = L.icon({
    iconUrl: 'myIcon.png',
    iconSize: [38, 95],
  });

  // Créer une icône personnalisée pour les marqueurs des autres caches
const otherIcon = L.icon({
  iconUrl: 'otherIcon.png',
  iconSize: [38, 95],
});


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;


// fonction event qui permet d'aller sur a localisation lorsque tu clique s sur l'écran cliqué
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  

  return position === null ? null : (
    <Marker position={position} icon={GetIcon()} >
      
    </Marker>
  )
}
const handleMapClick = useCallback(
  (e) => {
    const newPosition = e.latlng;
    console.log("new position", newPosition);
    console.log("isAddclicked", isAddCacheClicked);
    if(isAddCacheClicked){
      setPosition_cache(newPosition);
      console.log("new position inside", newPosition);
      //setIsAddCacheClicked(false);
      console.log("hello");
      //navigate("/add_cache", { state: { position_add_cache: newPosition } });
      const params = queryString.stringify({ position_add_cache: newPosition });
     // const params = JSON.stringify({ position_add_cache: newPosition });
      navigate(`/add_cache?${params}`);
    }
  },
  [isAddCacheClicked]
);
  // function MapEventsWrapper
  function MapEventsWrapper({ handleMapClick }) {
    const map = useMapEvents({
      click: handleMapClick
    });
    console.log("hello World");
    console.log("isAddclicked dasn le Map event", isAddCacheClicked);
  
    return null;
  }
// pour centrer la map

function CenterMap() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position]);

  useEffect(() => {
    map.locate();
  }, []);

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  /*const centerMapOnPosition = (position) => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  };*/
  

  return (
    <>
      {position && (
        <>
           
            <Marker position={position} icon={GetIcon()} >
              <Popup >
                You are here! <br />
              </Popup>
            </Marker>
        </>
      )}
    </>
  );

}




// Récupérer le JSON des positions depuis le serveur
useEffect(() => {
  fetch('http://localhost:3000/geocaches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    credentials: 'include',
    body: JSON.stringify({longitude,latitude}),
  }) // endpoint à adapter en fonction de votre serveur
    .then(response => response.json())
    .then(data => setPositions(data))
    .catch(error => console.error(error));
}, []);

// fonction pour modifier la géocache
function onModify(position,event){
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
              navigate("/modify_cache", { state: { position } });
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

  console.log("je modifie la géocache:",position);

}

// fonction pour modifier la géocache
function onRemove(position,event){
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
      navigate("/remove_cache", { state: { position } });
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
  console.log("je remove la géocache");
}

// fonction pour modifier la géocache
function onSend(position,event){  
  event.preventDefault();
  navigate("/cache_found", { state: { position } });
  /*fetch('http://localhost:3000/found_geocaches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    credentials: 'include',
    body: JSON.stringify({id:position.id,longitude:position.longitude,latitude:position.latitude,difficulty:position.difficulty,description:position.description,id_modifyer:localStorage.getItem("id") })
  }) // endpoint à adapter en fonction de votre serveur
    .then(response => response.json())
    .then(data => {
          console.log(data);
          setAlert(data.message);
          setShowAlert(true);
          setTimeout(() => {
              setShowAlert(false);
              //navigate("/geocache"); // naviguez vers la page de dashboard
            }, 3000);
      })
    .catch(error => console.error(error)); */
  
  console.log("je send la géocache");

}


  return (
      
  <MapContainer center={position1} zoom={13} style={ {height: '100vh', width: '100%' } }scrollWheelZoom={false}>

          <CenterMap/>
            <MapEventsWrapper handleMapClick={handleMapClick} />
                  <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />


                  {positions.map(position => (

                <>
                  ◘ { (position.id_creator==parseFloat(localStorage.getItem("id"))) ?
                   ( <>
                      <Marker key={position.id} position={[position.latitude, position.longitude]}>
                        <Popup>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <p> {position.description}</p>
                        </div> <br/>
                          <Button onClick={(e) =>{onModify(position,e)}}>
                              Modifier
                              
                          </Button>

                          <Button onClick={(e) =>{onRemove(position,e)}}>
                              Supprimer
                          </Button>

                          <Button onClick={(e) =>{onSend(position,e)}}>
                                Trouvé
                          </Button>


                        </Popup>
                      </Marker>
                      </>) :
                      (
                        <>
                          <Marker key={position.id} position={[position.latitude, position.longitude]} icon={GetIcon2()} >
                            <Popup >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <p> {position.description}</p>
                            </div>
                              <br/>
                              <div className='InnerPop'>
                                <Button onClick={(e) =>{onModify(position,e)}}>
                                    Modifier
                                </Button>
                                <Button onClick={(e) =>{onRemove(position,e)}}>
                                    Supprimer
                                </Button>
    
                                <Button onClick={(e) =>{onSend(position,e)}}>
                                      Trouvé
                                </Button>
                              </div>
  
                            </Popup>
                          </Marker>
                          </>

                      ) }
                    </>
                  

                    ))}


</MapContainer>

  )
      

}



export default Map;


