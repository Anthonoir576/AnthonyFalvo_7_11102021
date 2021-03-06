import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateLong, isItBlank } from '../Utils/Utils';
import Dislike from './Dislike';
import Like from './Like';
import { useDispatch } from 'react-redux';
import { getPosts, updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CommentCard from './CommentCard';
import axios from 'axios';


const Card = ({ post }) => {

    const [isLoading, setIsLoading]         = useState(true);
    const [isUpdated, setIsUpdated]         = useState(false);
    const [titleUpdate, setTitleUpdate]     = useState('');
    const [showComments, setShowComments]   = useState(false);
    const [contentUpdate, setContentUpdate] = useState('');
    const [postPic, setPostPic]             = useState(null);
    const [file, setFile]                   = useState();
    const dispatch                          = useDispatch();
    const userData                          = useSelector((state) => state.userReducer);
    const usersData                         = useSelector((state) => state.usersReducer);

    const myUpdatePost = () => {
        
        const data = new FormData();
        data.append('title', titleUpdate);
        data.append('content', contentUpdate);
        
        if (file) {
            data.append('image', file);
        }

        if (titleUpdate || contentUpdate || postPic) {
            dispatch(updatePost(post.id, data))
                .then(() => {
                    dispatch(getPosts());
                    setPostPic(null);
                    setFile();
                    setIsUpdated(false);
                })
                .catch((error) => {console.log(error)});
        };

        setIsUpdated(false);
    };

    const removePicture = (postId) => {

        return axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/${postId}`,
            data: { 
                title: post.title,
                content: post.content,
                attachment: ''
            },
            withCredentials: true

        }).then((result) => {
            dispatch(getPosts());
            setPostPic(null);
            setFile('');
            setIsUpdated(false);
        })
        .catch((error) => console.log(error));

    };

    const majPicture = (e) => {

        setPostPic(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);

    };


    useEffect(() => {

        if (!isItBlank(usersData[0])) {
            setIsLoading(false);
        } 

    }, [usersData]);


    return (
        <li className="card-container" key={post.id}>
          {isLoading ? (
            <>  
            </>
            ) : (
                <>
                    <div className="card-left">
                        <img src={!isItBlank(usersData[0]) && 
                        usersData.map((user) => {
                            if (user.id === post.UserId) {
                                return user.attachment;
                            } else {
                                return null;
                            };
                            
                        }).join('')
                        } alt="profil utilisateur" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h2>
                                    {!isItBlank(usersData[0]) && 
                                    usersData.map((user) => {
                                        if (user.id === post.UserId) {
                                            return user.username
                                        }  else {
                                            return null;
                                        }
                                    })
                                    }
                                </h2>    
                                <div className="administrator-container">
                                {
                                    usersData.map((user) => {
                                        if (user.id === post.UserId && user.isAdmin === true) {

                                            return <i className="fas fa-shield-alt administrator" aria-label="Badge administrateur" key={post.id}></i>
                                                
                                        }  else { return null }
                                    })
                                }
                                </div>
                            </div>
                            
                            <div className="updatePost">
                                <span>{dateLong(post.createdAt)}</span>
                                {(userData.id === post.UserId || userData.isAdmin === true) && (
                                    <>
                                        <div>
                                            <img src="./image/image/edit.png"
                                                    aria-label="Editez la publication" 
                                                    alt="edit post"
                                                    onClick={() => {
                                                        setIsUpdated(!isUpdated)
                                                    }} 
                                            />
                                        </div>
                                        <DeleteCard id={post.id}/>
                                    </>
                                    
                                    
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            
                            {(post.title && isUpdated === false) && (
                                <p>{post.title}</p>
                            )}
                            {(post.content && isUpdated === false) && (
                                <p>{post.content}</p>
                            )}
                            {(post.attachment && isUpdated === false) && (
                                <img src={post.attachment} className="card-pic" alt="contenu publi??" />
                            )}

                            {(post.title && isUpdated === true) && (
                                <div className="update-post">
                                    <form action="">
                                        <label htmlFor="titlePost">Modifiez titre :</label>
                                        <textarea defaultValue={post.title}
                                                id="titlePost"
                                                name='titlePost'
                                                onChange={(e) => {
                                                    setTitleUpdate(e.target.value)
                                                }}
                                         />
                                    </form>
                                    
                                </div>
                            )}
                            {(post.content && isUpdated === true) && (
                                <div className="update-post">
                                    <form action="">
                                        <label htmlFor="contentPost">Modifiez contenu :</label>
                                        <textarea defaultValue={post.content}
                                              id='contentPost'
                                              name='contentPost'
                                              onChange={(e) => {
                                                setContentUpdate(e.target.value)
                                              }}
                                        />
                                    </form>
                                    
                                </div>
                            )} 

                            {(isUpdated ===true) && (
                                <div className="icon">
                                    <form action="" className='modifPictureForm'>
                                        <label htmlFor="file-upload">Changez d'image :</label>
                                        <input type="file" 
                                            id="file-upload"
                                            name="image"
                                            accept=".jpg, .jpeg, .png, .gif"
                                            onChange={(e) => { majPicture(e) }}       
                                        />
                                    </form>
                                   
                                    
                                </div> 
                            )}                        
                            {((post.content && isUpdated === true) || (post.title && isUpdated === true) || (post.attachment && isUpdated === true)) && (
                                <div className="button-container">
                                    <div className="deletePostPicture" 
                                         onClick={() => { removePicture(post.id)}}>
                                             <p>Supprimer image</p>
                                    </div>
                                    <button className="btn"
                                            onClick={myUpdatePost}>
                                        Valider
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./image/image/comment.png"
                                     aria-label="Commentez la publication"  
                                     alt="commentaire de la publication"
                                     onClick={() => {setShowComments(!showComments)}} />
                                <span>{post.Comments.length}</span>
                            </div>
                            <div className="likeornot">
                                <div className="like-container">
                                    <Like post={post} />
                                    {post.likes > 0 && (
                                    <span>{post.likes}</span>
                                    )}
                                </div>
                                <div className="like-container">
                                    <Dislike post={post} />
                                    {post.dislikes > 0 && (
                                    <span>{post.dislikes}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    {showComments && <CommentCard post={post} />}                    
                    </div>    
                </>
            )}  
        </li>
    );
};


export default Card;