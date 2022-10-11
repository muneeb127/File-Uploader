import {GET_ALL_FILES} from '../actions/types';

const initialState = {
    files:[]
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ALL_FILES:
            return {
                ...state,
                files : action.payload
            }
        default:
            return state
    }
        
}