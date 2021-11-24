import React from 'react';
import Log from '../components/log';

const Profil = () => {
    return (
        <div>
            <div className="profil-page">
                <div className="log-container">
                    <Log signIn={true} signUp={false} />
                    <div className="img-container">
                        <img src="./image/image/log.png" alt="présentation de l'authentification du site" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;