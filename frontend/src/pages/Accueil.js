import React from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../components/Routes/AppContext';
import Log from '../components/log';

const Accueil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
        {userId ? (
            <h1>Accueil</h1>
        ) : (
            <div className="profil-page">
                <div className="log-container">
                    <Log signIn={true} signUp={false} />
                </div>
            </div>
        )}
        </div>
    );
};

export default Accueil;