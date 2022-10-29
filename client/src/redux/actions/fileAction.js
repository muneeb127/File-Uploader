import axios from 'axios';
import {GET_ALL_FILES, GET_ERRORS} from './types';


export const uploadFile = (files) => async dispatch => {
    try {
        const fileData = new FormData();

        console.log(files);

        for(let i = 0 ; i < files.length; i++){
            console.log(files[i]);
            fileData.append('files', files[i]);
        }

        // axios.post(`${process.env.REACT_APP_BASEURL}/upload`, fileData)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((e)=>{
        //         console.log(e);
        //     })

        const fileUploadResponse = await axios.post(`${process.env.REACT_APP_BASEURL}/upload`, fileData);

        // Fetching all files to update state if upload is successful
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/files`);
        dispatch({
            type: GET_ALL_FILES,
            payload: response.data
        })

        return fileUploadResponse;
    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
    

}

//Get all files for current user

// Syntax - 1
// export const getAllFiles = () => {
//     return async function(dispatch){

//     }
// }

//Syntax - 2
export const getAllFiles = () => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/files`);
        // console.log(response.data);
        dispatch({
            type: GET_ALL_FILES,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//Delete a file
export const deleteFile = (fileID) => async dispatch => {
    try{
        await axios.delete(`${process.env.REACT_APP_BASEURL}/deletefile`, {params: {id: fileID}});
        console.log("File deleted....")
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/files`);
        
        dispatch({
            type: GET_ALL_FILES,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}