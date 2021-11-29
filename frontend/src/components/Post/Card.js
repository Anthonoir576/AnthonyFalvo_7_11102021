import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateLong, isItBlank } from '../Utils/Utils';
import Dislike from './Dislike';
import Like from './Like';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';



const Card = ({ post }) => {

    const [isLoading, setIsLoading]         = useState(true);
    const usersData                         = useSelector((state) => state.usersReducer);
    const [isUpdated, setIsUpdated]         = useState(false);
    const [titleUpdate, setTitleUpdate]     = useState('');
    const [contentUpdate, setContentUpdate] = useState('');
    // const [pictureUpdate, setPictureUpdate] = useState(null);
    const userData                          = useSelector((state) => state.userReducer);
    const dispatch                          = useDispatch();
    
    
    const myUpdatePost = () => {

        if (titleUpdate && contentUpdate) {
            dispatch(updatePost(post.id, titleUpdate, contentUpdate))
        } else if (titleUpdate) {
            dispatch(updatePost(post.id, titleUpdate, post.content))
        } else if (contentUpdate) {
            dispatch(updatePost(post.id, post.title, contentUpdate))
        }; 

        setIsUpdated(false);

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
                        }
                        
                    }).join('')
                    } alt="profil utilisateur" />
                </div>
                <div className="card-right">
                   <div className="card-header">
                        <div className="pseudo">
                            <h3>
                                {!isItBlank(usersData[0]) && 
                                usersData.map((user) => {
                                    if (user.id === post.UserId) {
                                        return user.username
                                    }  else {
                                        return null;
                                    }
                                })
                                }
                            </h3>    
                            <div className="administrator-container">
                            {
                                usersData.map((user) => {
                                    if (user.id === post.UserId && user.isAdmin === true) {

                                        return <i className="fas fa-shield-alt administrator" key={post.id}></i>
                                            
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
                            <img src={post.attachment} className="card-pic" alt="contenu publié" />
                        )}

                        {(post.title && isUpdated === true) && (
                            <div className="update-post">
                                <textarea defaultValue={post.title}
                                          onChange={(e) => {
                                            setTitleUpdate(e.target.value)
                                          }}
                                />
                            </div>
                        )}
                        {(post.content && isUpdated === true) && (
                            <div className="update-post">
                                <textarea defaultValue={post.content}
                                          onChange={(e) => {
                                            setContentUpdate(e.target.value)
                                          }}
                                />
                                <div className="button-container">
                                    <button className="btn"
                                            onClick={myUpdatePost}>
                                        Valider
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* {(post.attachment && isUpdated === true) && (
                            <div className="update-post">
                                        <textarea defaultValue={post.attachment}
                                          onChange={(e) => {
                                            setPictureUpdate(e.target.value)
                                          }}
                            />
                            </div>
                        )} */}
                    </div>
                    <div className="card-footer">
                        <div className="comment-icon">
                            <img src="./image/image/comment.png" alt="commentaire de la publication" />
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

                </div>    
            </>
          )}  
        </li>
    );
};


export default Card;