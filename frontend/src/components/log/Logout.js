import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { NavLink } from 'react-router-dom';

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
            removeCookie('jwt')
        }).catch((error) => console.log(error));

    };


    return (
        <li onClick={logout} className="welcome">
            <NavLink exact to='/authentification'>
               <i class="fas fa-power-off"></i>                 
            </NavLink>
        </li>
    );
};




export default Logout;