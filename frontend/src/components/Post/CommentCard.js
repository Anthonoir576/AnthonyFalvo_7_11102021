import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/comment.actions';
import { getPosts } from '../../actions/post.actions';
import { isItBlank } from '../Utils/Utils';
import EditComment from './EditComment';
import { dateComment } from '../Utils/Utils';

const CommentCard = ({ post }) => {

    const [content, setContent]      = useState('');
    const dispatch                   = useDispatch();
    const userData                   = useSelector((state) => state.userReducer);
    const usersData                  = useSelector((state) => state.usersReducer);

    const myComment = (e) => {
        e.preventDefault();

        if (content) {
            dispatch(createComment(post.id, content))
                .then(() => { 
                    dispatch(getPosts()); 
                    setContent('');
                })
                .catch((error) => { console.log(error) });
        };

    };

    const postComments = post.Comments;
    const triArray     = postComments.sort((a, b) => {
    
        let valeurA = new Date(a.updatedAt),
            valeurB = new Date(b.updatedAt);

        if(valeurA < valeurB) {
            return -1;
        };

        if(valeurA > valeurB) {
            return 1;
        };

        return 0;
    }); 

    return (
        <div className="comments-container">
            {triArray.map((comment) => {
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
                                </div>
                            </div>
                            <p>{comment.content}</p>
                            {(userData.id === comment.userId || userData.isAdmin === true) && (
                                        
                                        <EditComment comment={comment} postId={post.id} />
                                        
                            )}
                        </div>
                    </div>
                )
            })}
        {userData.id && (
            <form action=""
                  className='comment-form'
                  onSubmit={myComment}      
            >
                <label htmlFor="commentId">Commentaire :</label>
                <input type="text"
                       id='commentId'
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