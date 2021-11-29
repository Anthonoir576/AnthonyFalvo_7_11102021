import axios from "axios";


export const GET_USER       = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO     = 'UPDATE_BIO';

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

export const uploadPicture = (data, id) => {
   return (dispatch) => {
      return axios({
         method: 'PUT',
         url: `${process.env.REACT_APP_API_URL}api/auth/user/${id}`,
         data: data,
         withCredentials: true
         
      }).then((result) => {
         return axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/auth/user/${id}`,
            withCredentials: true 
         }).then((result) => {
            dispatch({ type: UPLOAD_PICTURE, payload: result.data.attachment})
         }).catch((error) => console.log(error + 'Erreur dispatch'))
      })
        .catch((error) => console.log(error + 'Erreur upload image !'))
   }
};

export const updateBiographie = (userId, bio) => {

   return (dispatch) => {
      return axios({
         method: 'PUT',
         url: `${process.env.REACT_APP_API_URL}api/auth/user/${userId}`,
         data: { bio: bio },
         withCredentials: true
         
      }).then((result) => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
        .catch((error) => console.log(error + 'Erreur mise a jour biographie !'))
   };
};