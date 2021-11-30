import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../actions/comment.actions';
import { getPosts } from '../../actions/post.actions';


const EditComment = ({ comment, postId }) => {

    const [edit, setEdit]       = useState(false);
    const [remove, setRemove]   = useState(false);
    const [content, setContent] = useState('');
    const dispatch              = useDispatch();


    const editComment = (e) => {
        e.preventDefault();

        if (content) {
            dispatch(updateComment( comment.id, content, postId ))
                .then(() => {
                    setEdit(false);
                    setContent('');
                    dispatch(getPosts());
                })
                .catch((error) => { console.log(error) });
        };


    };

    const removeComment = () => {

        dispatch(deleteComment(comment.id, postId))
            .then(() => {
                setRemove(false);
                dispatch(getPosts());
            })
            .catch((error) => { console.log(error) });

    }; 

    return (
        <>
            <div className="edit-comment">
            
                <div className='commentEdit'>
                    <div>
                        <img src="./image/image/edit.png" 
                                alt="edit post"
                                onClick={() => {
                                    setEdit(!edit);
                                }} 
                        />
                    </div>
                    <div>
                        <img src="./image/image/delete.png" 
                            alt="delete post"
                            onClick={() => {
                                setRemove(!remove);
                            }}
                        />
                    </div>
                </div>   
            </div>
            <div className="inputEdit">
                {edit && (
                    <form action=""
                        className="edit-comment-form"
                        onSubmit={editComment}
                    >

                    <input type="text" 
                        name='text'
                        defaultValue={comment.content} 
                        onChange={(e) => {
                            setContent(e.target.value);  
                        }} 
                    />

                    <div>
                        <label htmlFor='text'
                            onClick={() => {
                                setEdit(!edit)
                            }}
                        >
                            Annuler
                        </label>

                        <button type='submit'>MODIFIER</button>
                    </div>       
                    
                    </form>
                )}
                {remove && (
                    <div className="deleteCommentOrNot">
                        <span onClick={() => {
                                removeComment();
                              }}
                        >
                            Voulez-vous supprimé le commentaire ?
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditComment;