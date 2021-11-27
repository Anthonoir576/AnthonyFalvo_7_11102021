import axios from "axios";


export const GET_USERS = "GET_USERS";



export const getUsers = () => {

  return (dispatch) => {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/auth/users/`,
        withCredentials: true
    })
      .then((result) => {
        dispatch({ type: GET_USERS, payload: result.data });
      })
      .catch((error) => console.log(error));
  };

};