import React from 'react';
import Log from '../components/log';

const Profil = () => {
    return (
        <div>
            <div className="profil-page">
                <div className="log-container">
                    <Log signIn={true} signUp={false} />
                </div>
            </div>
        </div>
    );
};

export default Profil;