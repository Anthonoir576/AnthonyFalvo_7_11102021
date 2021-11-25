import React, { useState } from 'react';

const UpdateImage = () => {

    const [file, setFile] = useState();
 

    const updatePicture = (e) => {
        e.preventDefault();


    }

    return (
        <form action='' onSubmit={updatePicture} className="upload-pic">
            <label htmlFor="file">Mettre à jour</label>
            <input type="file" 
                   id="file" 
                   name='image' 
                   accept='.jpg .jpeg .png .gif'
                   onChange={(e) => 
                        { setFile(e.target.files[0])
                   }} 
            />
            <button type='submit' className="btnUpload">Envoyer</button>
        </form>
    );
};

export default UpdateImage;