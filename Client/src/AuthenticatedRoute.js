import React from "react";
import Auth from "./Auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({children}) =>{
    const {isAuthenticated} = useContext(Auth);
    if(!isAuthenticated){
        return <Navigate to = '/connexion' replace/>
    }
    return children
}

export default AuthenticatedRoute;