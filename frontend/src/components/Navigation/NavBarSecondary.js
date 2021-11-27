import React from 'react';
import { NavLink } from 'react-router-dom';



const NavBarSecondary = () => {

    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink exact to='/' activeClassName="active-left-nav">
                        <img src="./image/image/home.svg" alt="Page d'accueil" />
                    </NavLink>
                    <NavLink exact to='/profil' activeClassName="active-left-nav">
                        <img src="./image/image/profil.svg" alt="Votre profil" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


export default NavBarSecondary;