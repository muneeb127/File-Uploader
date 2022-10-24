import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../redux/actions/authAction';

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
                            {/* {errors.email && (
                                <Form.Control.Feedback type = "invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            )} */}
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange = {e => setPassword(e.target.value)} 
                                value = {password}
                                className = {classnames({
                                    'is-invalid': errors.password
                                })}
                            />
                            {errors.password && (
                                <Form.Control.Feedback type = "invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                            
                        </Form.Group>
                        {errors.value && (
                            <p style={{color: 'red'}}>
                                {errors.value}
                            </p>
                        )} */}
                        <div className="btn-classic">
                            <Button variant="primary" size='md' className='btn-normal'>
                                Log In
                            </Button>
                        </div>
                    </Form>
                    {/* <Box
                        component="form"
                        lg={{
                            width: '100%',
                        }} 
                        noValidate
                        autoComplete="off"
                        
                    >
                        <div id='text-fields'>
                            <TextField fullWidth
                                name="email"
                                id="filled-required"
                                label="EMAIL"
                                variant="filled"
                                error
                                helperText="Your email is incorrect"
                            />
                            <TextField fullWidth
                                id="filled-password-input"
                                name="password"
                                label="PASSWORD"
                                type="password"
                                variant="filled"
                                error
                                helperText="Your password is incorrect"
                            />
                        </div>
                    </Box> */}
                    {/* <div className='btn-classic'>
                        <Button variant="primary" size='md' className='btn-normal'>
                            Log In
                        </Button>
                    </div> */}
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