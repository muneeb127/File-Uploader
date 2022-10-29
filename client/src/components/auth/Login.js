import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import {loginUser} from '../../redux/actions/authAction';
import {setErrorsEmpty} from '../../redux/actions/errorAction';

import classnames from 'classnames';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './login.css';

const Login = (props) => {

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
        props.setErrorsEmpty();
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        props.loginUser(userData);
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
                                id="email-field"
                            />
                            {errors.email && (
                                <Form.Control.Feedback type = "invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange = {e => setPassword(e.target.value)} 
                                value = {password}
                                className = {classnames({
                                    'is-invalid': errors.password
                                })}
                                id="password-field"
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
                        )}
                        <div className="btn-classic">
                            <Button variant="primary" type="submit" size='md' className='btn-normal'>
                                Log In
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='sign-up'>
                    <span>Don't have an account? </span>
                    <Link to='/register'>
                        <span> Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {
    loginUser, setErrorsEmpty
})(Login);