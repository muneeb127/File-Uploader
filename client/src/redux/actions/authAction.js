import axios from 'axios';
import decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import {GET_ERRORS, SET_CURRENT_USER} from './types';

//Register
export const registerUser = (userData, navigate) => async dispatch => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/users`, userData);
        navigate('/login')
    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }  
}

//Login
export const loginUser = (userData) => async dispatch => {
    try{
        const response = await axios.post(process.env.REACT_APP_BASEURL + '/users/login', userData);
        const {token} = response.data;
        
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = decode(token);
        console.log('Decoded Token: ', decoded);
        dispatch(setCurrentUser(decoded))

    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

// To set current user 
export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}