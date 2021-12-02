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

    const [deletePic, setDeletePic]         = useState(false);
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
        } else if (!file && deletePic === false) {
            data.append('attachment', post.attachment)
        }

        if (deletePic === true) {
            setFile()
            data.append("attachment", '')
        }

        if (titleUpdate || contentUpdate || postPic || deletePic === true) {
            dispatch(updatePost(post.id, data))
                .then(() => {
                    dispatch(getPosts());
                    setPostPic(null);
                    setFile();
                    setIsUpdated(false);
                    setDeletePic(false);
                })
                .catch((error) => {console.log(error)});
        };

        setIsUpdated(false);
    };

    const removePicture = () => {

        return axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/${post.id}`,
            data: { attachment: '',
                    title: post.title,
                    content: post.content
            },
            withCredentials: true

        }).then((result) => {
            dispatch(getPosts());
            setPostPic(null);
            setFile();
            setIsUpdated(false);
            setDeletePic(false);
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
                                </div>
                            )} 

                            {(isUpdated ===true) && (
                                <div className="icon">
                                    <input type="file" 
                                        id="file-upload"
                                        name="image"
                                        accept=".jpg, .jpeg, .png, .gif"
                                        onChange={(e) => { majPicture(e) }}       
                                    />
                                    
                                </div> 
                            )}                        
                            {((post.content && isUpdated === true) || (post.title && isUpdated === true) || (post.attachment && isUpdated === true)) && (
                                <div className="button-container">
                                    <div className="deletePostPicture" 
                                         onClick={() => { removePicture()}}>
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