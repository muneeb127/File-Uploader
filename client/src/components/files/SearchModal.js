import {useState} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

//Actions
import {uploadFile} from '../../redux/actions/fileAction';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


function SearchModal(props) {

    const [files, setFiles] = useState([]);

    const onFileChange = (e) => {
        setFiles(e.target.files);
    }

    const {uploadFile, ...rest} = props;

    const onClickUpload = (e) => {
        e.preventDefault();
        uploadFile(files);
        props.onHide();
    }


    return (
        <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Choose Files To Upload
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Small file input example</Form.Label>
                <Form.Control type="file" size="sm" multiple onChange = {onFileChange}/>
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick = {onClickUpload}>
                    Upload
                </Button>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
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


