import React from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserIdContext } from '../components/Routes/AppContext';


const Profil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
            {userId ? (
                <h1>Profil</h1>
            ) : (
                <Redirect to="/authentification" />
            )}
        </div>
    );
};

export default Profil;