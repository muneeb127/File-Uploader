import React, {useState} from 'react';

import FileList from './FileList';
import SearchModal from './SearchModal';

import './DummyDashboard.css';

import Alert from 'react-bootstrap/Alert';

const DummyDashboard = () => {

    const [modalShow, setModalShow] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');   

    const fileUploadStatus = (status) =>{
        console.log("Status: ", status);
        setUploadStatus(status);
    }

    return (
        <div className='dashboard-page'>
            <div className='sidebar'>
                <span>Collections</span>
                <a href="#home">Personal</a>
                <a href="#news">School</a>
                <a href="#contact">Design</a>
                <a href="#about">Notes</a>
                <a href="#about">Book Notes</a>
                <a href="#about">Work</a>
            </div>
            {/* <div className = "dashboard container" style={{width: "50%"}}> */}
            <div className = "dashboard">
                <div className='dashboard-content'>
                    <h1 className='display-4 heading'>Dashboard</h1>
                    {uploadStatus===200?
                    <Alert key='success' variant='success'>
                        Your files have been uploaded successfully!
                    </Alert>:
                    <></>
                    }
                    
                    {/* <h1 className='display-4 text-center heading'>Dashboard</h1> */}
                    <div>
                        {/* <div style={{marginLeft:"auto", marginRight:"auto", display:"block", width:"20%", marginBottom:"20px"}} className="circular ui vertical animated button"  onClick={() => setModalShow(true)}> */}
                        {/* <div id='upload-button' style={{display:"block", width:"20%", marginBottom:"20px"}} className="circular ui vertical animated button"  onClick={() => setModalShow(true)}> */}
                        <div id='upload-button' className="circular ui vertical animated button"  onClick={() => setModalShow(true)}>
                            <div className="visible content">Upload File</div>
                            <div className="hidden content">
                                <i className="large upload icon"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                    <FileList />
                    </div>
                    <SearchModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    fileUploadStatus={fileUploadStatus}
                    />
                </div>
          </div>
        </div>
        
    )
}

export default DummyDashboard; 
