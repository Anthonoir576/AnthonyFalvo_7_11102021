import axios from "axios";



export const GET_POSTS    = "GET_POSTS";
export const LIKE_POST    = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const UPDATE_POST  = "UPDATE_POST";


export const getPosts = (value) => {

    return (dispatch) => {
        return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/posts/`,
            withCredentials: true
        }).then((result) => {

            const newArray = result.data.slice(0, value);

            dispatch({ type: GET_POSTS, payload: newArray })
        })
          .catch((error) => console.log(error));
    };

};

export const likePost = (postId) => {
    return (dispatch) => {

        return axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}api/post/vote/like/${postId}`,
            withCredentials: true
        }).then((result) => {
            dispatch({ type: LIKE_POST, payload: {likes: result.data.postUpdate.likes, postId: result.data.postUpdate.id} });
        })
        .catch((error) => console.log(error));

    };
}; 

export const dislikePost = (postId) => {
    return (dispatch) => {

        return axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}api/post/vote/dislike/${postId}`,
            withCredentials: true
        }).then((result) => {
            dispatch({ type: DISLIKE_POST, payload: {dislikes: result.data.postUpdate.dislikes, postId: result.data.postUpdate.id} });
        })
        .catch((error) => console.log(error));

    };
}; 

export const updatePost = (postId, title, content) => {

    return (dispatch) => {
        return axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/${postId}`,
            data: {
                'title': title,
               'content': content
            },
            withCredentials: true

        }).then((result) => {
            dispatch({ type: UPDATE_POST, payload: {title : title, content: content, postId: postId } })
        })
        .catch((error) => console.log(error));
    };

};