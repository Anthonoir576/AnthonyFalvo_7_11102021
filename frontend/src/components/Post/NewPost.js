import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, getPosts } from '../../actions/post.actions';
import { isItBlank } from '../Utils/Utils';

const NewPost = () => {

    const [isLoading, setIsLoading]   = useState(true);
    const [title, setTitle]           = useState('');
    const [content, setContent]       = useState('');
    const [postPic, setPostPic]       = useState(null);
    const [file, setFile]             = useState();
    const userData                    = useSelector((state) => state.userReducer);
    const [post, setPost]             = useState(false);
    const dispatch                    = useDispatch();
  


    const addPost = async () => {

        if (title || content || postPic) {

            const data = new FormData();

            data.append('title', title);
            data.append('content', content);
            data.append('image', file);
      
            await dispatch(createPost(data))
                    .then(() => {
                        dispatch(getPosts());
                        setPost(false);
                        setTitle('');
                        setContent('');
                        setPostPic(null);
                        setFile();
                    })
                    .catch((error) => { console.log(error) });
        };
        
    };
 

    const uploadPicture = (e) => {

        setPostPic(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);

    };


    useEffect(() => {

        if (!isItBlank(userData)) {
            setIsLoading(false);
        };

    }, [userData]);


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
                             aria-label="Publiez une publication" 
                             className="postNow" 
                             alt="ecrire une publication"
                             onClick={() => {setPost(!post)}}      
                        />
                    </div>
                    {post && (
                        <>
                        <div className="post-form">
                            <label className='new-post-ctrl' htmlFor="postTitle">Titre :</label>
                            <input type='text'
                                name="title"
                                id='postTitle'
                                value={title}
                                placeholder='Votre titre'
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                            <label className='new-post-ctrl' htmlFor="content">Contenu :</label>
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
                                <label htmlFor="file-upload">image :</label>
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