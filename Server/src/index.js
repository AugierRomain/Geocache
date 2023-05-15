const cookieParser = require('cookie-parser');  // Pour le cookies

const express = require("express");
const app = express();

const session = require('express-session');  // session côté serveur
require('dotenv').config();


const cache = require('memory-cache');  // Systeme de cache
/*  utilisation de la bibliothèque crypto pour générer un */      
const crypto = require('crypto');

const corsOptions = {
  origin: 'http://localhost:3000/',
  credentials: true,
};
const cors = require('cors');

// Utilisation du middleware cookie-parser
app.use(cookieParser());



/*  utilisation de la bibliothèque jsonwebtoken  pour générer un token */ 
const jwt = require('jsonwebtoken');

/**  Fonction pour générer un clé sécrète pour               * */
function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Fonction pour vérifier la validité du token
function verifyToken(token) {

    // Cache créé, vous pouvez maintenant y accéder via la variable 'cache'
        // Vérifier si le token est présent dans le cache
      if (process.env.KEY_TOKEN) {
        // Récupérer la clé secrète associée au token
        const secretKey = process.env.KEY_TOKEN;

        // Utiliser la clé secrète pour vérifier le token
        try {
          const decoded = jwt.verify(token, secretKey);
          // Si le token est valide, retourner les informations associées au token
          console.log('decoded:', decoded);
          console.log('bienvenue Mr:', decoded.token);
          return decoded;
        } catch (err) {
          // Si le token est invalide, retourner une erreur
          //throw new Error('Token invalide');
          console.log("Token invalide");
          return false;
        }
      } else {
        // Si le token n'est pas présent dans le cache, retourner une erreur
        throw new Error('Token non reconnu');
      }
  
}

function isTokenValid(decodedToken) {
 
  // Vérification de la date d'expiration
  const currentDate = new Date().getTime() / 1000;
  if (decodedToken.token.exp < currentDate) {
    // Le token a expiré
    return false;
  }

  // Le token est encore valide
  return true;
}


// Générer un token aléatoire
const randomToken = generateToken(16) ;

// Créer un token JWT
//const token = jwt.sign({ token: "ali"}, randomToken,{ expiresIn: '1h' });

//console.log(token); // Affiche le token généré

// vérification du token
/*jwt.verify(token, randomToken, (err, decoded) => {
  if (err) {
    // le token est invalide
    console.log('Token invalide');
  } else {
    // le token est valide
    console.log('Token valide');
    console.log("token",decoded.token); // { username: 'alice', iat: 1652274691, exp: 1652278291 }
  }
})*/

//////////

const bodyParser = require("body-parser");
// Content-type: application/json
app.use(bodyParser.json());
// Content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({credentials: true, origin: true})); // Active CORS pour toutes les routes


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const collection_inscription="inscription";
const collection_geocaches="collection_geocaches";
const database_pg209="db_pg209";

// création de la base d'inscription

const url = 'mongodb://0.0.0.0:27017';
const password=" Go5dYAYQwsYz9fGx";
const uri="mongodb+srv://alikoffianselme2002:Go5dYAYQwsYz9fGx@cluster0.bytjm1m.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(url).
    then(function(client) {
  //if (err) throw err;
 // if (err) console.log(err);
  //return client.db("db_PG209").collection("inscription");
  return client.db(database_pg209).collection(collection_inscription);
  //return client.db("products_manager").collection("products");
  //console.log(client);
  
}).
then(  (products) =>{

            // Configuration de la session
        app.use(session({
          secret: 'votreSecret',
          resave: false,
          saveUninitialized: true
        }));
    //console.log(products);

   /* reception des information d'inscription*/
      app.post('/inscription', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        
        // Faites quelque chose avec les données récupérées
        products.find().sort({ id: -1 }).limit(1).toArray()
        .then(docs => {
          let lastId = 0;
          if (docs.length > 0) {
            lastId = docs[0].id;
          }

                  products.findOne({ email: email }).
                  then((result)=>{
                    console.log(result);
                    if (result) {
                      console.log('Le champ "email" existe déjà dans la collection "inscription".');
                      res.send({message:`Vous avez saisi: ${email}, mais ce mail existe déjà `,inscription:false});
                    } else {
                      //console.log('Le champ "email" n\'existe pas encore dans la collection "users".');
                      res.send({message:`Inscription reussie Mr: ${name}, veuillez-vous connecter. `,inscription: true});
                      products.insertOne({nom: name , email: email,password: password,id:lastId+1}).
                      then((result) => {
                        if(result) console.log(" values inserted in the db")
                      })
                    }
                  })
              })
              .catch(err => {
                console.error('Erreur lors de la récupération du dernier ID :', err);
              });
         
        });

        /* reception des information de connexion*/

        app.post('/connexion', (req, res) => {
          //const name = req.body.name;
          const email = req.body.email;
          const password = req.body.password;
          // Faites quelque chose avec les données récupérées
          const token_received= req.headers.authorization;
          console.log("token receiced: ", req.headers.authorization);
         //console.log("nem token:", token);

            products.findOne ({ email: email,password:password }).
            then((result)=> {
              const token = jwt.sign({ token: {email,password}}, process.env.KEY_TOKEN,{ expiresIn: '24 h' });
    
              console.log(token);
              console.log("token type",typeof token);
              console.log(result);
              if (result) {
                console.log("token2 receiced:", req.headers.authorization);
                const vari=token_received;
                vari1=null;
                console.log("vari :", typeof vari);
                console.log("vari1 :", typeof vari1);
                console.log("type token_received:", typeof token_received);

                if(token_received !== `null` && token_received !== `undefined` ){
                  console.log("je suis bloqué ici");
                  const verify=verifyToken(token_received);
                  console.log("verify :", verify);

                  if(verify !==false) {
                    const decoded_data=verifyToken(token_received).token;

                    if( decoded_data.email===email &&  decoded_data.password===password){
                      console.log({Message: `Vous êtes déjà connecté Mr ${verifyToken(token_received).token.email}`});
                      res.send({message: `Vous êtes déjà connecté Mr ${verifyToken(token_received).token.email}`, authenticated:true,id:result.id});

                    }
                    else{
                      console.log({Message: `Vous n'êtes pas authentifié Mr ${email}, reconnectez-vous`});
                      res.send({message: `Vous n'êtes pas authentifié Mr ${email},reconnectez-vous`, authenticated:false,token });
                      
                    }
                  } 
                    // token expiré (envoie de token pour la reconnexion)
                  else {
                    res.send({message:"votre token a expiré, reconnectez-vous",token});
                    console.log("votre token a expiré, reconnectez-vous");

                  }

                  // gérer le cas d'où le token n'est plus valide
                }
        
                else {
                      console.log(' Vous avez reussi à vous connecter');
                      //res.cookie('token', token, { maxAge: 3600, httpOnly: false });  // envoie du token sous forme de cookies
                      //res.cookie('key', randomToken, { maxAge: 3600, httpOnly: false});  // envoie du code secret  sous forme de cookies

                      res.send({message:`Vous avez reussi à vous connecter `,token,authenticated:true, id:result.id});
                }
              } else {
                //console.log('Le champ "email" n\'existe pas encore dans la collection "users".');
                res.send({message:`Un des champs saisis est incorrect `, non_connect: true });
                //products.insertOne({nom: name , email: email}).
              
              }
          })
            // le client à un token
         

         
      });

      /**  Autres requêtes        **/
      app.post('/ma-page-protegee',(req, res) => {
       const token= req.headers.authorization;
       console.log("token", token);
       console.log("req session protect", req.session.token);
       console.log('Identifiant unique de session2:', req.sessionID);
       const verify=verifyToken(token);
        if(verify) {
          res.send({message: `Vous avez reussi à accéder à la page protégée ${verify.token.email}`,access:true});
        }
        else {
          res.send({message: `Votre token est expiré, reconnectez-vous `,access:false});
        }
    

      //res.send({Message_conn: "Bienvneu ${req.token} ! "});
       
      });

    })
   


    /** requête geocache   **/
    MongoClient.connect(url).
    then(function(client) {
  //if (err) throw err;
 // if (err) console.log(err);
  //return client.db("db_PG209").collection("inscription");
  return client.db(database_pg209).collection(collection_geocaches);
  //return client.db("products_manager").collection("products");
  //console.log(client);
  
}).
then( (geocaches) =>{
    geocaches.findOne({"id_creator":0}).
    then((result) => {
      if(!result){
      geocaches.insertOne({"id":0,"longitude": -0.605324,"latitude":44.806174,"id_creator":0,"dificulty":1,"description":"Dans la salle des livres"})
      geocaches.insertOne({"id":1,"longitude": -0.597709,"latitude":44.829861,"id_creator":0,"dificulty":2,"description":"Sous un des siÃ¨ges de la tribune nord"})
      geocaches.insertOne({"id":2,"longitude":-0.593972,"latitude":44.791343,"id_creator":0,"dificulty":3,"description":"Ne pas oublier de regarder en l'air"})
      geocaches.insertOne({"id":3,"longitude":-0.597947,"latitude":44.792211,"id_creator":0,"dificulty":1,"description":"Mayer a Ã©tÃ© le meilleur"})
      geocaches.insertOne({"id":4,"longitude": -0.604182,"latitude":44.796791,"id_creator":0,"dificulty":1,"description":"Des routes Ã  360Â°"})
      geocaches.insertOne({"id":5,"longitude": -0.591751,"latitude":44.806289,"id_creator":0,"dificulty":1,"description":"Ma blague n'a pas supermarchÃ©"})
      geocaches.insertOne({"id":6,"longitude":-0.589742,"latitude":44.809449,"id_creator":0,"dificulty":3,"description":"SymÃ©trie parfaite"})
      geocaches.insertOne({"id":7,"longitude":-0.588340,"latitude":44.814990,"id_creator":0,"dificulty":2,"description":"Sous terre"})
    
    
    
    }
    })
    
    app.post('/geocaches', (req, res) => {
      const longitude_fixe_str = req.body.longitude;
      const latitude_fixe_str = req.body.latitude;
      const longitude_fixe = parseFloat(longitude_fixe_str);
      const latitude_fixe = parseFloat(latitude_fixe_str);
      const lat_min = latitude_fixe - 1 ;
      const lat_max = latitude_fixe + 1 ;
      const long_min = longitude_fixe - 1;
      const long_max = longitude_fixe +1 ;

    
      const JSONdata = [];
      const cursor = geocaches.find({
        $and: [
          { longitude: {$gte : long_min}},
          { longitude: {$lte : long_max }},
          { latitude: {$gte : lat_min}},
          { latitude: {$lte : lat_max}}
        ]
      });
     
      
      cursor.forEach(doc => {
        JSONdata.push(doc);
        if(cursor.bufferedCount()==0){
          //res.send(JSONdata);
         // console.log(JSONdata);
        // console.log(JSONdata)
          res.send(JSONdata);
        }
        
      });
      
     
      });

      // create géocache
      app.post('/insert_geocaches', (req, res) => {
        const longitude =  parseFloat(req.body.longitude);
        const latitude =  parseFloat(req.body.latitude);
        const id_creator= parseFloat(req.body.id);
        const description=req.body.description;
        console.log("description:", description);
        const difficulty=parseFloat(req.body.difficulty);

        
        // Faites quelque chose avec les données récupérées
        geocaches.find().sort({ id: -1 }).limit(1).toArray()
        .then(docs => {
          let lastId = 0;
          if (docs.length > 0) {
            lastId = docs[0].id;
          }
        
                    geocaches.insertOne({"longitude": longitude,"latitude":latitude,"id_creator":id_creator,id:lastId+1,"dificulty":difficulty,"description":description}).
                    then(result=>{
                      console.log("une géocache a été insérée avec succès");
                      res.send({message:"une géocache a été insérée avec succès"});
                    })        
        })
        .catch(err => {
          console.error('Erreur lors de la récupération du dernier ID :', err);
        });
    })


      // modifier géocache

      app.post('/modify_geocaches', (req, res) => {
        const longitude =  parseFloat(req.body.longitude);
        const latitude =  parseFloat(req.body.latitude);
       const id_cache=  parseFloat(req.body.id);
        const id_modifyer=  parseFloat(req.body.id_modifyer);
        const description=req.body.description;
        const difficulty=parseFloat(req.body.difficulty);
        
          geocaches.findOne({"id": id_cache}).
          then(result=>{
              if(result){
                // si l'identifiant du créateur à celle du modifieur
                  if(result.id_creator===id_modifyer){
                        geocaches.updateOne({id:id_cache},{$set:{"longitude": longitude,"latitude":latitude,"dificulty":difficulty,"description":description}}).
                        then(result1=>{
                          console.log("une géocache a été insérée avec succès");
                          res.send({message:"Votre modification a été un succès"});
                        })
                  }
                // sinon
                else {
                  res.send({message:"Impossible de modifier une cache dont on n'est pas propriétaire"});
                }
              }
           })  

      }) 

             // create géocache
      app.post('/remove_geocaches', (req, res) => {
        const longitude =  parseFloat(req.body.longitude);
        const latitude =  parseFloat(req.body.latitude);
        const id_creator= parseFloat(req.body.id);
        const description=req.body.description;
        console.log("description:", description);
        const difficulty=parseFloat(req.body.difficulty);
        const id_cache=  parseFloat(req.body.id);
        const id_modifyer=  parseFloat(req.body.id_modifyer);
        geocaches.findOne({"id": id_cache}).
        then(result=>{
          console.log("result:", result);
            // si l'identifiant du créateur à celle du modifieur
            if(result.id_creator===id_modifyer){
              console.log("je rentre dans la section où id_creator== id_modifyer");
              geocaches.deleteOne({id:id_cache}).
              then(result1=>{
                console.log("une géocache a été supprimée avec succès");
                res.send({message:`la cache de description ${description} a été supprimée`});
              })
            }
             // sinon
             else {
              console.log("je rentre là");
              res.send({message:"Impossible de supprimer cette cache car vous n'en êtes  pas propriétaire"});
            }

        })
        
      })

           // envoi d'un message pour signifier qu'une cache a été trouvée
           app.post('/found_geocaches', (req, res) => {
            const longitude =  parseFloat(req.body.longitude);
            const latitude =  parseFloat(req.body.latitude);
            const id_creator= parseFloat(req.body.id);
            const description=req.body.description;

            const token_received= req.headers.authorization;
            const verify=verifyToken(token_received);
           
          
              console.log("description:", description);
              if(verify){
              
               res.send({message:`${verify.token.email} a trouvé la cache de description ${description}`});
              }
              else{
                res.send({message:`reconnectez-vous votre session a expiré`});
              }
            

           })
          
         
  });

app.listen(3000, () => {
      console.log("En attente de requêtes...");
})