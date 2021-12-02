
import { DELETE_POST, DISLIKE_POST, GET_POSTS, LIKE_POST, UPDATE_POST } from "../actions/post.actions";


const initialState = {};


export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POSTS:
            return action.payload;

        case LIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        likes: action.payload.likes
                    };
                };
                return post;
            });
            
        case DISLIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        dislikes: action.payload.dislikes
                    };
                };
                return post;
            });
            
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                       ...post,
                       title: action.payload.title,
                       content: action.payload.content,
                       attachment: action.payload.attachment 
                    };
                } else {
                    return post;
                };
            });
        
        case DELETE_POST:
            return  state.filter((post) =>  post.id !== action.payload.postId );   
            
        default:
            return state;

    };
};