import React, { useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';

 // METTRE EN ARGUMENT LE USER DU PROFIL !!!

const DeleteUser = () => {

    const [pop, setPop] = useState(false);
    const userConnect   = useSelector((state) => state.userReducer);


    // Suppression cookie en front en + du back
    const removeCookie = (key) => {
        if (window !== undefined) {
            cookie.remove(key, {expires: 1})
        };
    };

    const deleteUser = async (targetUser) => {

        removeCookie('jwt');
        await axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API_URL}api/auth/user/${targetUser}`,
            withCredentials: true
        }).then((result) => {
            removeCookie('jwt');
        }).catch((error) => console.log(error));

        setPop(false);
        window.location = '/authentification';
    };

    return (
        <div>
            <button className="deleteAccount"
            onClick={() => { setPop(true); }}>
                Supprimer le compte entreprise
            </button>
            <div>
            {pop && (
            <>
                <div className="deleteProfil-container">
                    <p>Voulez-vous supprimer le profil ?</p>
                    <div>
                        <span className="deleteNow"
                              // USER A DELETE ICI
                              onClick={() => {deleteUser(userConnect.id)}}>
                            Supprimer
                        </span>
                        <span className="noDeleteNow"
                              onClick={() => setPop(false)}>
                            Annuler
                        </span>
                    </div>
                </div>
            </>
            )}
            </div>
        </div>
    );
};

export default DeleteUser;