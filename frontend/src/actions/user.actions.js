import axios from "axios";


export const GET_USER = 'GET_USER';

export const getUser = (userId) => {
    return (dispatch) => {
     return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/auth/user/${userId}`,
        withCredentials: true
     })
     .then((result) => {
        dispatch({ type: GET_USER, payload: result.data })
     })
     .catch((error) => console.log(error));    
    };
};