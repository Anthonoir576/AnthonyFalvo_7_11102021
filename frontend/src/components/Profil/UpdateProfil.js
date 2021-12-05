import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import NavBarSecondary from '../Navigation/NavBarSecondary';
import DeleteUser from './DeleteUser';
import UpdateImage from './UpdateImage';
import { updateBiographie } from '../../actions/user.actions';
import { dateShort } from '../Utils/Utils';
import { UserIdContext } from '../AppContext';

const UpdateProfil = () => {

    // déclaration 
    const [bio, setBio]             = useState('');
    const [updateBio, setUpdateBio] = useState(false);
    const userData                  = useSelector((state) => state.userReducer);
    const dispatch                  = useDispatch();
    const userId                    = useContext(UserIdContext);

    const updateDataBio = () => {

        dispatch(updateBiographie(userData.id, bio));
        setUpdateBio(false);

    }; 
 
    // return jsx
    return (
        <div className="profil-page">
            <NavBarSecondary />
            <h2>{userData.username}</h2>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.attachment} alt="profil utilisateur" />
                <UpdateImage />
                <i className='error errorUpload'></i>    
                </div>
                <div className="right-part">
                   <div className="bio-update">
                       <h3>Biographie :</h3>
                       {updateBio === false && (
                           <>
                                <p onClick={() => { setUpdateBio(!updateBio) }}>{userData.bio}</p>
                                <button onClick={() => { setUpdateBio(!updateBio) }}>Modifier</button>
                           </>
                       )}
                       {updateBio && (
                           <>
                                <textarea type='text' 
                                          defaultValue={userData.bio}
                                          onChange={(e) => {
                                              setBio(e.target.value)
                                }}>
                                </textarea>
                                <button onClick={updateDataBio}>Valider</button>
                           </>
                       )}
                    </div>
                    <p className='infoMembre'>Vous êtes parmis nous depuis le : <strong>{dateShort(userData.createdAt)}</strong></p> 
                </div>
                <div>
                    {userId === userData.id || userData.isAdmin === true ? (
                        <DeleteUser />
                    ) : (   
                        <div className="container-logo">
                            <img src="./image/favicon/logoGroup.png" className="logoAlternatif" alt="logo de la société groupomania" />
                        </div>                
                    )}
                </div>
                
            </div>
        </div>
    );
};

export default UpdateProfil;