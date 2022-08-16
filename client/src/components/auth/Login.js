import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../redux/actions/authAction';

import { Container } from 'react-bootstrap';
import classnames from 'classnames';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        props.loginUser(userData);

        // try{
        //     const response = await axios.post('/users/login', newUser);
        //     console.log(response);
        // }
        // catch(error){
        //     console.log(error.response.data);
        //     setErrors(error.response.data);
        // }
    }


    return (
        <Container style={{width: "50%"}}>
            <h1 className='display-4 text-center'>Login</h1>
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
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                    Submit
                    </Button>
                </div>
            </Form>
        </Container>
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
    loginUser
})(Login);