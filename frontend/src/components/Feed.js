import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isItBlank } from './Utils/Utils';



const Feed = () => {

    const dispatch                = useDispatch();
    const [loadPost, setLoadPost] = useState(true);
    const posts                   = useSelector((state) => state.postReducer);

    useEffect(() => {

        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        };

        

    }, [loadPost, dispatch]);




    return (

        <div className="thread-container">
            <ul>
              {!isItBlank(posts[0]) && 
                posts.map((post) => {
                    return <Card post={post} key={post.id} />;
                })
              }  
            </ul>
        </div>

    );
};



export default Feed;