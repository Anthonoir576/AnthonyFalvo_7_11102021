import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateLong, isItBlank } from '../Utils/Utils';
import Dislike from './Dislike';
import Like from './Like';
//import { useDispatch } from 'react-redux';



const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const usersData                 = useSelector((state) => state.usersReducer);
    // const userData                  = useSelector((state) => state.userReducer);
    // const dispatch                  = useDispatch();
    
    

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
          ): (
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
                        </div>
                        <span>{dateLong(post.createdAt)}</span>
                    </div>
                    <div className="card-body">
                        {post.title && (
                            <p>{post.title}</p>
                        )}
                        {post.content && (
                            <p>{post.content}</p>
                        )}
                        {post.attachment && (
                            <img src={post.attachment} className="card-pic" alt="contenu publié" />
                        )}
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