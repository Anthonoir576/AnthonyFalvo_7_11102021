import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Accueil from '../../pages/Accueil';
import Profil from '../../pages/Profil';

const index = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Accueil} />
                <Route path="/profil" exact component={Profil} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default index;