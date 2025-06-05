import Cookies from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRouteProvider = ({children}) => {
    const token= Cookies.get("providerToken") == null ? false : true;

       //console.log(token)
    return token? children : <Navigate to="/provider/signin" />;
 
  
}
