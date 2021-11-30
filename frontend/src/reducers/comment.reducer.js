
import { CREATE_COMMENT, UPDATE_COMMENT } from "../actions/comment.actions";


const initialState = {};


export default function commentReducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_COMMENT: 
            return console.log('Commentaire créer');

        case UPDATE_COMMENT:
            return console.log('commentaire mise à jour');    
       
        default:
            return state;

    };
};