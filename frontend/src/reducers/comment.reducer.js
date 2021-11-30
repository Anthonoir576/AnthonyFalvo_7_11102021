
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../actions/comment.actions";


const initialState = {};


export default function commentReducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_COMMENT: 
            return console.log('Commentaire créer');

        case UPDATE_COMMENT:
            return console.log('Commentaire update');
       
        case DELETE_COMMENT:
            return console.log('Commentaire supprimé');

        default:
            return state;

    };
};