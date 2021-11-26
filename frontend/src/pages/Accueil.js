import React from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../components/AppContext';
import Log from '../components/Log';
import NavBarSecondary from '../components/Navigation/NavBarSecondary';


const Accueil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
            {userId ? (
                <NavBarSecondary />
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