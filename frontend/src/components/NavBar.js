import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { UserIdContext } from './AppContext';
import Logout from './log/Logout';

const NavBar = () => {

    const userId = useContext(UserIdContext)

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/"> 
                        <div className="logo">
                            <img src='./image/favicon/icon.png' alt='Logo groupomania' />
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {userId ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to='/profil'>
                                <h5>user</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to='/authentification'>
                                <img src="./image/image/connect.svg" alt=" Connection au réseaux sociaux " />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default NavBar;