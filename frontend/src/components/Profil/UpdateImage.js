import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';
import { getUsers } from '../../actions/users.action';

const UpdateImage = () => {

    const dispatch        = useDispatch();
    const userData        = useSelector((state) => state.userReducer);
    const [file, setFile] = useState();

    const updatePicture = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('name', userData.username);
        data.append('userId', userData.id);
        data.append('image', file);

        dispatch(uploadPicture(data, userData.id))
            .then(() => {
                dispatch(getUsers());
            })
            .catch((error) => console.log(error));
        
    };

    return (
        <form action='' onSubmit={updatePicture} className="upload-pic">
            <label htmlFor="file">Mettre à jour</label>
            <input type="file" 
                   id="file" 
                   name='image' 
                   accept='*.jpg .jpeg .png .gif'
                   onChange={(e) => 
                        { setFile(e.target.files[0])
                   }} 
            />
            <button type='submit' className="btnUpload">Envoyer</button>
        </form>
    );
};

export default UpdateImage;