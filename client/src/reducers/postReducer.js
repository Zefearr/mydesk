import {ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST, GET_POST, ADD_COMMENT} from '../actions/types';  

const initialState = {
    posts: [],
    post: {},
    loading: false,
    comments: []
}
export default function(state = initialState, action) {
   switch(action.type) { 
       case DELETE_POST:
       return {
           ...state,
           posts: state.posts.filter(post => post._id !== action.payload)
       }
       case POST_LOADING: 
       return {
           ...state,
           loading: true
       }
       case GET_POSTS:
       return {
           ...state,
           posts: action.payload,
           loading: false
       }
       case GET_POST:
        return {
            ...state,
            post: action.payload,
            loading: false
        }
        case ADD_POST:
        return {
        ...state,
        posts: [action.payload, ...state.posts] 
    }   
        case ADD_COMMENT:
        return {
            ...state,
            post: action.payload,
            posts: [...state.posts],
            loading: false
        }
    default: 
    return state;
   }
}