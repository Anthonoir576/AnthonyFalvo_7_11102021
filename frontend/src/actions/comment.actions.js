import axios from "axios";


export const CREATE_COMMENT = "CREATE_COMMENT";


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