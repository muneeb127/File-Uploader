import {useState} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

//Actions
import {uploadFile} from '../../../redux/actions/fileAction';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


function SearchModal(props) {

    const [files, setFiles] = useState([]);

    const onFileChange = (e) => {
        setFiles(e.target.files);
    }

    const {uploadFile, fileUploadStatus, ...rest} = props;

    const onClickUpload = async (e) => {
        e.preventDefault();
        const fileUploadResponse = await uploadFile(files);
        if(fileUploadResponse.status){
            console.log(fileUploadResponse.status);
            props.fileUploadStatus(fileUploadResponse.status);
        }
        else{
            props.fileUploadStatus(401);
        }
        props.onHide();
    }


    return (
        <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id='modal'
        >
        <Modal.Header closeButton id='modal-header'>
            <Modal.Title id="contained-modal-title-vcenter">
            Choose Files To Upload
            </Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal-body'>
            <Form.Group controlId="formFileSm" className="mb-3">
                {/* <Form.Label>Small file input example</Form.Label> */}
                <Form.Control type="file" size="sm" multiple onChange = {onFileChange}/>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button className='btn-normal' variant="primary" size="lg" onClick = {onClickUpload}>
                    Upload
                </Button>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className='btn-normal' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}

SearchModal.propTypes = {
    uploadFile : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, {
    uploadFile
})(SearchModal);


