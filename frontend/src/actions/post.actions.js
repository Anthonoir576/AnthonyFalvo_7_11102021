import axios from "axios";



export const GET_POSTS    = "GET_POSTS";
export const CREATE_POST  = "CREATE_POST";
export const LIKE_POST    = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const UPDATE_POST  = "UPDATE_POST";
export const DELETE_POST  = "DELETE_POST";



export const getPosts = (value) => {

    return (dispatch) => {
        return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/posts/`,
            withCredentials: true
        }).then((result) => {

            let stockArray = result.data
            let triArray = stockArray.sort((b, a) => {

                let valeurA = new Date(a.createdAt),
                    valeurB = new Date(b.createdAt);

                if(valeurA < valeurB) {
                    return -1;
                };

                if(valeurA > valeurB) {
                    return 1;
                };

                return 0;
            });

            const newArray = triArray.slice(0, value);

            dispatch({ type: GET_POSTS, payload: newArray });
        })
        .catch((error) => console.log(error));
    };

};

export const createPost = (data) => {

    return (dispatch) => {

        return axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/new`,
            data: data,
            
            withCredentials: true

        }).then((result) => {
            dispatch({ type: CREATE_POST, payload: {} })
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

export const updatePost = (postId, data) => {

    return (dispatch) => {
        return axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/${postId}`,
            data: data,
            withCredentials: true

        }).then((result) => {
            dispatch({ type: UPDATE_POST, payload: {title : result.data.title, content: result.data.content, attachment: result.data.attachment, postId: postId } })
        })
        .catch((error) => console.log(error));
    };

};

export const deletePost = (postId) => {

    return (dispatch) => {

        return axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API_URL}api/posts/post/${postId}`,
            withCredentials: true
        })
        .then((result) => {
            dispatch({ type: DELETE_POST, payload: { postId: postId } })
        })
        .catch((error) => { console.log(error) });

    }

};
