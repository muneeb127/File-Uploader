import {SET_ERRORS} from './types';

export const setErrorsEmpty = () => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: {}
    })
}