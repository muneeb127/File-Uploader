import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {useNavigate, Link} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { registerUser } from '../../redux/actions/authAction';
import {setErrorsEmpty} from '../../redux/actions/errorAction';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './register.css';

const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setErrors(props.errors);
        console.log("Errors: ", props.errors);
    }, [props.errors])

    useEffect(()=>{
        if(props.auth.isAuthenticated){
            navigate('/dashboard');
        }
        props.setErrorsEmpty();
    }, []);

    const navigate = useNavigate();

    const onFormSubmit = (e) => {    
        e.preventDefault();
        const newUser = {
            name,
            email,
            password
        }
        console.log("newUser");
        props.registerUser(newUser, navigate);      
    }

    return (
        <div className='login-page'>
            <div className="inner-box">
                <div className="main-heading">
                    <span>FilePro&trade;</span>
                </div>
                <div className='form-section'>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            onChange = {e => setName(e.target.value)} 
                            value = {name}
                            id="name-field" 
                                className = {classnames({
                                    'is-invalid': errors.name
                                })}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

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
                                <Form.Control.Feedback type="invalid">
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
                            id="password-field"
                                className = {classnames({
                                    'is-invalid': errors.password
                                })} 
                            />
                            {errors.password && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <div className="btn-classic">
                            <Button variant="primary" type="submit" size='md' className='btn-normal'>
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='sign-up'>
                    <span>Already have an account? </span>
                    <Link to='/'>
                        <span> Log in</span>
                    </Link>
                </div>
            </div>
        </div>


        // <Container className = 'register' style={{width: "50%"}}>
        //     <h1 className='display-4 text-center'>Sign Up</h1>
        //     <p className = 'lead text-center'>Create your Video Pro account</p>
        //     <Form onSubmit={onFormSubmit}>
        //         <Form.Group className="mb-3" controlId="formBasicName">
        //             <Form.Label>Name</Form.Label>
        //             <Form.Control type="text" placeholder="Enter name" onChange = {e => setName(e.target.value)} value = {name} 
        //                 className = {classnames({
        //                     'is-invalid': errors.name
        //                 })}
        //             />
        //             {errors.name && (
        //                 <Form.Control.Feedback type="invalid">
        //                     {errors.name}
        //                 </Form.Control.Feedback>
        //             )}
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control 
        //                 type="email" 
        //                 placeholder="Enter email" 
        //                 onChange = {e => setEmail(e.target.value)} 
        //                 value = {email} 
        //                 className = {classnames({
        //                     'is-invalid': errors.email
        //                 })}
        //             />
        //             <Form.Text className="text-muted">
        //             We'll never share your email with anyone else.
        //             </Form.Text>
        //             {errors.email && (
        //                 <Form.Control.Feedback type="invalid">
        //                     {errors.email}
        //                 </Form.Control.Feedback>
        //             )}
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password" onChange = {e => setPassword(e.target.value)} value = {password} 
        //                 className = {classnames({
        //                     'is-invalid': errors.password
        //                 })} 
        //             />
        //             {errors.password && (
        //                 <Form.Control.Feedback type="invalid">
        //                     {errors.password}
        //                 </Form.Control.Feedback>
        //             )}
        //         </Form.Group>
        //         <div className="d-grid gap-2">
        //             <Button variant="primary" type="submit" size="lg">
        //             Submit
        //             </Button>
        //         </div>
        //     </Form>
        // </Container>
    )
}

Register.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {registerUser, setErrorsEmpty})(Register);