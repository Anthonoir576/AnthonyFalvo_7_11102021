
import { CREATE_COMMENT } from "../actions/comment.actions";


const initialState = {};


export default function commentReducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_COMMENT: 
            return;

       
        default:
            return state;

    };
};