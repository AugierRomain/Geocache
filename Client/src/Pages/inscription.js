import React from 'react';
import "./inscription.css";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarCreated from '../Composants/NavbarCreated';
import {motion} from 'framer-motion';
import BoutonRetour from '../Composants/BoutonRetour';
import MapButton from '../Composants/MapBouton';
import AccueilButton from '../Composants/AccueilBouton';
import '../Composants/button.css'
import InscriptionButton from '../Composants/InscriptionBouton';
import ConnexionButton from '../Composants/ConnexionBouton';

function Inscription() {

  const [InscriptionReussie, setInscriptionReussie] = useState(false);
  const [messageClient, setmessageClient] = useState(null);
  const [data,setData]=useState({
    "name":"",
    "email":"",
    "password":""
  });
// En cas de message d'erreur 
  const location = useLocation();
  const errorMessage = location.state?.errorMessage;



  function handlechange(event) {
    event.preventDefault();

    const newdata={...data};
    newdata[event.target.id]=event.target.value;
    setData(newdata);
    console.log(newdata)

  }

  
  function handlesubmit(event) {
    event.preventDefault();
      // Envoi des données au serveur avec fetch
      const url = "http://localhost:3000/inscription";

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( 
          {name: data.name,
          email: data.email,
          password: data.password
            }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setmessageClient(data.message);
        if(data.inscription){
          setInscriptionReussie(true);
        }
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
        <h2 style={{textAlign:'center'}}>Inscriptions</h2>
    <div class="formulaire">
      
    { InscriptionReussie ?
     (
       <>
        <div className='middle_print'>
           {messageClient}
        </div>
      </> 
     ) :

    (<form onSubmit={(e)=>{handlesubmit(e)}} id="inscription-form">
      <div className="form-group">
        <label for="name">Name:</label>
        <input type="text" onChange={(e)=>{handlechange(e)}} value={data.name} className="form-control" id="name" name="user_name" placeholder="Entrez votre nom"/>
      </div>
    
      <br/>
      
      <div className="form-group">
        <label for="email">Email:</label>
        <input onChange={(e)=>{handlechange(e)}} value={data.email} type="email" className="form-control" id="email" name="user_email" placeholder="Entrez votre email"/>
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input onChange={(e)=>{handlechange(e)}} value={data.password} type="password" className="form-control" id="password" name="user_password" placeholder="password" required/>
      </div>

      <br/>
      <input type="submit" value="Submit"/>

     
    </form>)
  } 
    
    </div>
    </div>
  </motion.div>
  {errorMessage && <p>{errorMessage}</p>}
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

export default Inscription;




