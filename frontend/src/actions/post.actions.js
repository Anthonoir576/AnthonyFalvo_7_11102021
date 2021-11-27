import axios from "axios";



export const GET_POSTS = "GET_POSTS";



export const getPosts = () => {

    return (dispatch) => {

        return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/posts/`,
            withCredentials: true
        }).then()
          .catch()

    };

};