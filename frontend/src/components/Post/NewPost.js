import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost } from '../../actions/post.actions';
import { isItBlank } from '../Utils/Utils';

const NewPost = () => {

    const [isLoading, setIsLoading]   = useState(true);
    const [title, setTitle]           = useState('');
    const [content, setContent]       = useState('');
    const [attachment, setAttachment] = useState(null);
    const [image, setImage]           = useState('');
    const userData                    = useSelector((state) => state.userReducer);
    const [post, setPost]             = useState(false);
    const dispatch                    = useDispatch();
  
    const addPost = () => {

        dispatch(createPost(title, content, image))
            .then(() => {
                setPost(false);
            })
        
    };
 
    const uploadPicture = () => {};

    useEffect(() => {

        if (!isItBlank(userData)) {
            setIsLoading(false);
        };

    }, [userData])

    return (
      <div className="post-container">
            {isLoading ? (
                <>
                <p>...</p>
                </>
            ): (
                <>
                    <div className="user-info">
                        <img src={userData.attachment} alt="profil utilisateur" />
                        <img src="./image/image/post.png" 
                             className="postNow" 
                             alt="ecrire une publication"
                             onClick={() => {setPost(!post)}}      
                        />
                    </div>
                    {post && (
                        <>
                        <div className="post-form">
                            <input type='text'
                                name="title"
                                value={title}
                                placeholder='Votre titre'
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                            <textarea name="content"
                                    id="content"
                                    placeholder="Votre publication"
                                    value={content}
                                    onChange={(e) => { setContent(e.target.value)}}          
                            >

                            </textarea>
                        </div>
                        <div className="footer-form">
                            <div className="icon">
                                <img src="./image/image/upload.png" alt="Mettre en ligne un document" />
                                <input type="file" 
                                    id="file-upload"
                                    name="image"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={(e) => { uploadPicture(e) }}       
                                />
                                
                            </div>
                            <div className="btn-send">
                                <button className='send'
                                        onClick={addPost}
                                >
                                    Publier
                                </button>
                            </div>
                        </div>
                        </>
                    )}
                   
                </>
            )}
      </div>
    );
};

export default NewPost;