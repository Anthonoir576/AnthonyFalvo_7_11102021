import React from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../components/Routes/AppContext';
import { Redirect } from 'react-router-dom';


const Accueil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
        {userId ? (
            <h1>Accueil</h1>
        ) : (
            <Redirect to="/authentification" />
        )}
        </div>
    );
};

export default Accueil;