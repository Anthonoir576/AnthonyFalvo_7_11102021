import React from 'react';
import { useSelector } from 'react-redux';
import NavBarSecondary from '../NavBarSecondary';
import UpdateImage from './UpdateImage';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="profil-page">
            <NavBarSecondary />
            <h1>{userData.username}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.attachment} alt="profil utilisateur" />
                <UpdateImage />
                <i className='error errorUpload'></i>    
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;