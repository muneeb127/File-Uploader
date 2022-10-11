import React, {useState, useEffect}  from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

//Actions
import {getAllFiles} from '../../redux/actions/fileAction';

const FileList = (props) => {

    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});


    // const getAllFiles = () => {
    //     axios.get(`${process.env.REACT_APP_BASEURL}/files`)
    //         .then((response)=>{
    //             // console.log(response.data);
    //             setFiles(response.data);
    //             setTimeout(()=>{
    //                 setIsLoading(false);
    //             }, 2000)
    //         })
    //         .catch((error)=>{
    //             console.log(error);
    //         })
    // }

    useEffect(() => {
        props.getAllFiles();
    }, []);

    // useEffect(()=>{
    //     setFiles(props.files);
    //     setErrors(props.errors);
    //     props.getAllFiles();
    // }, [props.files, props.errors])

    console.log("Files: ", files);


    //Parsing file Data into the required format
    // const fileData = files.map((file)=>{
    //     let fileInfo = {};

    //     //Processing the date 
    //     let uploadDate = file.name.substring(0, file.name.indexOf("-"));
    //     uploadDate = Number(uploadDate);
    //     const date = new Date(uploadDate);
    //     uploadDate = date.toLocaleDateString();
    //     let uploadTime = date.toLocaleTimeString();

    //     //File name
    //     const name = file.name.substring(file.name.indexOf('-') + 1);

    //     //Getting file extension
    //     let fileExtension = file.name.substring(file.name.indexOf('.') + 1);
    //     fileInfo = {
    //         id: file._id,
    //         owner: file.owner,
    //         file: file.file,
    //         name,
    //         uploadDate,
    //         uploadTime,
    //         fileExtension
    //     };

    //     return fileInfo;
    // });

    //Mapping through files to render list items
    // let renderFiles = fileData.map((file)=>{
    //     return(
    //         <div className="item" key = {file.id}>
    //             <div className="right floated content">
    //                 <div className="ui small basic icon buttons">
    //                     <button className="ui button"><i className="large cloud download icon"></i></button>
    //                     <button className="ui button"><i className="large archive icon"></i></button>
    //                 </div>
    //             </div>
    //             <i className="big file alternate middle aligned icon"></i>
    //             <div className="content">
    //                 <a className="header">{file.name}</a>
    //                 <div className="description">{file.uploadDate} | {file.uploadTime}</div>
    //             </div>
    //         </div>
    //     )
    // })


    return (
        <div>
            {/* {
                isLoading ? 
                <>
                    <div className="ui massive active centered inline loader"></div>
                    <p style={{textAlign:'center'}}>Fetching your files</p>
                </>
                :
                <div>
                    <div className="ui middle aligned divided list">
                        {renderFiles}
                    </div>   
                </div>
            } */}
            <p>Muneeb</p>
        </div>
    )
}

FileList.propTypes = {
    files : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    files: state.files,
    errors: state.errors
})

export default connect(mapStateToProps, {
    getAllFiles
})(FileList);
