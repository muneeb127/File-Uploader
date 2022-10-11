import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FileList from './FileList';
import SearchModal from './SearchModal';

//Actions
import {getAllFiles} from '../../redux/actions/fileAction';

const Dashboard = () => {

    const [modalShow, setModalShow] = useState(false);    
    // const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     props.getAllFiles();
    // }, []);


    return (
        <div className = "dashboard container" style={{width: "50%"}}>
            <h1 className='display-4 text-center heading'>Dashboard</h1>
            <div>
                <div style={{marginLeft:"auto", marginRight:"auto", display:"block", width:"20%", marginBottom:"20px"}} className="circular ui vertical animated button"  onClick={() => setModalShow(true)}>
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
            />
        </div>
    )
}


// Dashboard.propTypes = {
//     files : PropTypes.array.isRequired,
//     errors: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     files: state.files
// })

// export default connect(mapStateToProps, {
//     getAllFiles
// })(Dashboard);

export default Dashboard; 
