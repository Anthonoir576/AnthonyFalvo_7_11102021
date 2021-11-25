import React from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../components/AppContext';
import Log from '../components/Log';

const Accueil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
            {userId ? (
                <h1>.</h1>
            ) : (
                  
            <div>
                <div className="profil-page">
                    <div className="log-container">
                        <Log signIn={true} signUp={false} />
                    </div>
                </div>
            </div>
                   
            )}
        </div>
    );
};

export default Accueil;