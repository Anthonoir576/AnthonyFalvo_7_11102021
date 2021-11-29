import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isItBlank } from './Utils/Utils';



const Feed = () => {

    const dispatch                  = useDispatch();
    const [loadPost, setLoadPost]   = useState(true);
    const posts                     = useSelector((state) => state.postReducer);
    const [countPost, setCountPost] = useState(5);

    const infinityLoad = () => {

        if (window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight) {
                setLoadPost(true);
        }

    }; 

    useEffect(() => {

        if (loadPost) {
            dispatch(getPosts(countPost));
            setLoadPost(false);
            setCountPost(countPost + 5);
        };

        window.addEventListener('scroll', infinityLoad);
        return () => { window.removeEventListener('scroll', infinityLoad) };

    }, [loadPost, countPost, dispatch]);




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