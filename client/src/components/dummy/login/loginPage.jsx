import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../../redux/actions/authAction';

import classnames from 'classnames';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './loginPage.css';

const LoginPage2 = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
        if(props.auth.isAuthenticated){
            navigate('/dashboard');
        }
        console.log(props.errors);
        setErrors(props.errors);
    }, [props.errors, props.auth])


    useEffect(()=>{
        if(props.auth.isAuthenticated){
            navigate('/dashboard');
        }
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        // props.loginUser(userData);
        console.log(userData);
    }

    return (
        <div className='login-page'>
            <div className="inner-box">
                <div className="main-heading">
                    <span>FilePro&trade;</span>
                </div>
                <div className='form-section'>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange = {e => setEmail(e.target.value)} 
                                value = {email}
                                className = {classnames({
                                    'is-invalid': errors.email
                                })}
                            />
                        </Form.Group>
                        <div className="btn-classic">
                            <Button variant="primary" size='md' className='btn-normal'>
                                Log In
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='sign-up'>
                    <span>Don't have an account? </span>
                    <span> Sign Up</span>
                </div>
            </div>
        </div>
    );
}

LoginPage2.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {
    loginUser
})(LoginPage2);