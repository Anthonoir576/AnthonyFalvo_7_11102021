import axios from "axios";


export const CREATE_COMMENT = "CREATE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";


export const createComment = (postId, content) => {

    return (dispatch) => {
        return axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}api/post/comments/comment/${postId}`,
            data : {
                content: content
            },
            withCredentials: true

        }).then((result) => {
            dispatch({ type: CREATE_COMMENT, payload: {content: content, postId: postId} })
        })
        .catch((error) => { console.log(error) });
    };
};

export const updateComment = (commentId, content, postId) => {
    return (dispatch) => {
        return axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}api/post/comments/comment/${commentId}`,
            data : {
                content: content
            },
            withCredentials: true

        }).then((result) => {
            dispatch({ type: UPDATE_COMMENT, payload: {content: content, postId: postId, commentId: commentId} });
        })
        .catch((error) => { console.log(error) });
    };
};