import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';


const Logout = () => {

    // Suppression cookie en front en + du back
    const removeCookie = (key) => {
        if (window !== undefined) {
            cookie.remove(key, {expires: 1})
        };
    };

    const logout =  async () => {

        await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true
        }).then(() => {
            removeCookie('jwt');
        }).catch((error) => console.log(error));

        window.location = '/authentification';

    };


    return (
        <li onClick={logout} className="welcome" aria-label="Deconnection du site groupomania">
            <img src="./image/image/disconnect.svg" className='pointer loginlogout' alt=" Déconnection au réseaux sociaux " />                        
        </li>
    );
};




export default Logout;