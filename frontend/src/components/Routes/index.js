import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Accueil from '../../pages/Accueil';
import Profil from '../../pages/Profil';
import Auth from '../../pages/Auth';
import NavBar from '../NavBar';

const index = () => {
    return (
        <BrowserRouter>
        <NavBar />
            <Switch>
                <Route path="/" exact component={Accueil} />
                <Route path="/Authentification" exact component={Auth} />
                <Route path="/profil" exact component={Profil} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default index;