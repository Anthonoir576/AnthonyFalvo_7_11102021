import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post.actions';
import { UserIdContext} from '../AppContext';


const Like = ({ post }) => {

    const [liked, setLiked] = useState(false);
    const userId            = useContext(UserIdContext);
    const dispatch          = useDispatch();

    const like = () => {

        dispatch(likePost(post.id));
        setLiked(true);

    };
 
    useEffect(() => {
        if (post.Likes.id === userId) {
            setLiked(true);
        }
    }, [userId, post.Likes, liked])



    return (
        <>
            <img src="./image/image/likeplein.png" 
                 aria-label="Aimez la publication" 
                 alt="Like la publication"
                 onClick = {like} />
        </>
    );
};



export default Like;