import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/comment.actions';
import { dateComment, isItBlank } from '../Utils/Utils';

const CommentCard = ({ post }) => {

    const [isUpdated, setIsUpdated]  = useState(false);
    const [content, setContent]      = useState('');
    const dispatch                   = useDispatch();
    const userData                   = useSelector((state) => state.userReducer);
    const usersData                  = useSelector((state) => state.usersReducer);

    const myComment = (e) => {
        e.preventDefault();

        if (content) {
            dispatch(createComment(content, post.id));
        };

    };

    return (
        <div className="comments-container">
            {post.Comments.map((comment) => {
                return (
                    <div className='comment-container' key={comment.id}>
                        <div className="left-part">
                            <img src={!isItBlank(usersData[0]) && 
                                    usersData.map((user) => {
                                        if (user.id === comment.userId) {
                                            return user.attachment;
                                        } else {
                                            return null;
                                        };
                                    }).join('')
                            } alt="profil utilisateur" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.username}</h3>
                                    <div className="administrator-container">
                                    {
                                        usersData.map((user) => {
                                            if (user.id === comment.userId && user.isAdmin === true) {

                                                return <i className="fas fa-shield-alt administrator" key={post.id}></i>
                                                    
                                            }  else { return null }
                                        })
                                    }
                                    </div>
                                </div>
                                <div className="updatePost">
                                <span>{dateComment(comment.updatedAt)}</span>
                                {/* BTN EDITION */}
                                {(userData.id === comment.userId || userData.isAdmin === true) && (
                                    <>
                                        <div className='commentEdit'>
                                            <div>
                                                <img src="./image/image/edit.png" 
                                                        alt="edit post"
                                                        onClick={() => {
                                                            setIsUpdated(!isUpdated)
                                                        }} 
                                                />
                                            </div>
                                            <div>
                                                <img src="./image/image/delete.png" 
                                                    alt="delete post"
                                                    onClick={() => {
                                                        console.log('supprimer');
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                    
                                    
                                )}
                                </div>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                )
            })}
        {userData.id && (
            <form action=""
                  className='comment-form'
                  onSubmit={myComment}      
            >

                <input type="text"
                       name='commentaire'
                       onChange={(e) => setContent(e.target.value)} 
                       value={content}
                       placeholder='Votre commentaire'
                />    

                <button type='submit'>
                    Envoyer
                </button>

            </form>
        )}
        </div>
    );
};

export default CommentCard;