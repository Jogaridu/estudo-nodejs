import React from 'react';
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import { isSignedIn } from './services/security';

const PrivateRoute = ({ children, location, ...rest }) => {  
    return isSignedIn() ? (    
        <Route {...rest}>{children}</Route>  
    ) : (    
        <Redirect      
            to={{        
                pathname: "/",        
                state: { from: location },      
            }}    
            />  
        );
};
// import { Container } from './styles';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>

            <PrivateRoute exact path="/home">
                <Home />
            </PrivateRoute>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;