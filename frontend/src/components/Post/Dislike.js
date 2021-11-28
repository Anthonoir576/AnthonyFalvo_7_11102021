import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dislikePost } from '../../actions/post.actions';
import { UserIdContext} from '../AppContext';



const Dislike = ({ post }) => {

    const [disliked, setDisliked] = useState(false);
    const userId            = useContext(UserIdContext);
    const dispatch          = useDispatch();


    const dislike = () => {

        dispatch(dislikePost(post.id));
        setDisliked(true);

    };

    useEffect(() => {
        if (post.Likes.id === userId) {
            setDisliked(true);
        }
    }, [userId, post.Likes, disliked]);


    return (
        <>
            <img src="./image/image/dislikeplein.png" 
                 alt="Dislike la publication"
                 onClick = {dislike} />
        </>
    );

};



export default Dislike;