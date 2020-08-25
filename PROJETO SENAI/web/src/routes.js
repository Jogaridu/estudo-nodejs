import React from 'react';
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import { isSignedIn } from './services/security';

const PrivateRoute = ({children, ...rest}) => {
    return <Route {...rest}
        render={({location}) => isSignedIn() ? (children) : (<Redirect 
            to={{pathName: "/", state: {from: location}}} />
            )}    
    />
}
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