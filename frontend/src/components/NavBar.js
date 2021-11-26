import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { UserIdContext } from './AppContext';
import Logout from './Log/Logout';

const NavBar = () => {

    const userId   = useContext(UserIdContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/"> 
                        <div className="logo">
                            <img src='./image/favicon/logogroup.png' className="logoGroup" alt='Logo groupomania' />
                        </div>
                    </NavLink>
                </div>
                {userId ? (
                    <ul>
                        <li></li>
                        <li className="welcome userPicture">
                            <NavLink exact to='/profil'>
                                <img src={userData.attachment} alt="Profil utilisateur" className="userProfil" />
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to='/authentification'>
                                <img src="./image/image/connect.svg" className='loginlogout' alt=" Connection au réseaux sociaux " />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default NavBar;