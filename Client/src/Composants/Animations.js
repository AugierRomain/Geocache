import React from 'react'
import Connexion from '../Pages/connexion'
import Inscription from '../Pages/inscription'
import Accueil from '../Pages/Accueil'
import Geocache from '../Pages/geocache'
import Deconnexion from '../Pages/deconnexion'
import AuthenticatedRoute from '../AuthenticatedRoute'
import Map from '../Pages/Map'
import Map1 from '../Pages/Map1'
import  Auth from '../Auth'
import MapComponent from '../Pages/Map'
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import Add_cache from '../Pages/add_cache'
import Modify_cache from '../Pages/modify_cache'
import Remove_cache from '../Pages/remove_cache'
import Cache_found from '../Pages/cache_found'

function Animations(){
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location = {location} key = {location.pathname}>
                <Route exact path="/" element={<Accueil/>}/> 
                <Route exact path="/connexion" element={<Connexion/>}/> 
                <Route exact path="/inscription" element={<Inscription/>}/> 
                {/*<Route exact path="/geocache" element={ <AuthenticatedRoute> <Geocache/> </AuthenticatedRoute>}/> */}
                <Route exact path="/geocache" element={  <Map1/>}/>
                <Route exact path="/deconnexion" element={<Deconnexion/>}/> 
                <Route exact path="/add_cache" element={<Add_cache/>}/> 
                <Route exact path="/modify_cache" element={<Modify_cache/>}/> 
                <Route exact path="/remove_cache" element={<Remove_cache/>}/> 
                <Route exact path="/cache_found" element={<Cache_found/>}/> 
            </Routes>
        </AnimatePresence>
    )
}
export default Animations