import React from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../components/AppContext';
import Log from '../components/Log';
import UpdateProfil from '../components/Profil/UpdateProfil';

const Profil = () => {

    const userId = useContext(UserIdContext);

    return (
        <div>
            {userId ? (
                <UpdateProfil />
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

export default Profil;