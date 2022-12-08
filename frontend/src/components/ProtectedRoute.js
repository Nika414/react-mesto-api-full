import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";




const ProtectedRoute = ({ children, path, loggedIn }) => {
    
    return (
        <Route path={path}>
            {() => loggedIn ? children : <Redirect to="/sign-up" />}
        </Route>

    )
};

export default ProtectedRoute;