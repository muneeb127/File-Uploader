import React, {useState, useEffect}  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import fileDownload from 'js-file-download';
//Actions
import {getAllFiles, deleteFile} from '../../../redux/actions/fileAction';

const FileList = (props) => {

    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        props.getAllFiles();
        setFiles(props.files);
        // console.log("Files: ", files);
    }, []);

    useEffect(()=>{
        // console.log("Files: ", files);
        setFiles(props.files);
        setIsLoading(false);
    }, [props.files]);

    // Parsing file Data into the required format
    const fileData = files.map((file)=>{
        let fileInfo = {};

        //Processing the date 
        let uploadDate = file.name.substring(0, file.name.indexOf("-"));
        uploadDate = Number(uploadDate);
        const date = new Date(uploadDate);
        uploadDate = date.toLocaleDateString();
        let uploadTime = date.toLocaleTimeString();

        //File name
        const name = file.name.substring(file.name.indexOf('-') + 1);

        //Getting file extension
        let fileExtension = file.name.substring(file.name.indexOf('.') + 1);
        fileInfo = {
            id: file._id,
            owner: file.owner,
            file: file.file,
            name,
            uploadDate,
            uploadTime,
            fileExtension
        };

        return fileInfo;
    });

    //Function to download the file
    const onDownloadClick = (file) => {

        console.log("On Download: ", file);
        var blob = new Blob([new Uint8Array(file.file.data)], {type: file.fileExtension});
        fileDownload(blob, `${file.name}`);
    
    }

    const onDeleteClick = (file) =>{
        console.log(file.id);
        props.deleteFile(file.id);
    }

    //Mapping through files to render list items
    let renderFiles = fileData.map((file)=>{
        return(
            <div className="item" key = {file.id}>
                <div className="right floated content">
                    <div className="ui small basic icon buttons">
                        <button className="ui button" onClick={() => onDownloadClick(file)}><i id='custom-icons' className="large cloud download icon"></i></button>
                        <button className="ui button" onClick={() => onDeleteClick(file)}><i id='custom-icons' className="large archive icon"></i></button>
                    </div>
                </div>
                <i className="big file alternate middle aligned icon"></i>
                <div className="content">
                    <a id='file-name'>{file.name}</a>
                    <div id="description">{file.uploadDate} | {file.uploadTime}</div>
                </div>
            </div>
        )
    })


    return (
        <div>
            {
                isLoading ? 
                <>
                    <div className="ui massive active centered inline loader"></div>
                    <p style={{textAlign:'center'}}>Fetching your files</p>
                </>
                :
                <div id='file-container'>
                    <div className="ui middle aligned divided list" id="file-list">
                        {renderFiles}
                    </div>   
                </div>
            }
        </div>
    )
}

FileList.propTypes = {
    files : PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    files: state.files.files,
    errors: state.errors
})

export default connect(mapStateToProps, {
    getAllFiles, deleteFile
})(FileList);
