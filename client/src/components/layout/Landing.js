import React from 'react'
import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <div className ="landing">
        <div className ="dark-overlay landing-inner text-light">
            <Container>
                <div className ="row">
                    <div className ="col-md-12 text-center">
                        <h1 className ="display-3 mb-4">FilePro</h1>
                        <p className ="lead">Store &amp; manage files according to your convenience</p>
                        <hr />
                        <Link to="/register">
                            <Button variant="primary" style = {{"marginRight": "10px"}}>Sign Up</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="light">Login</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Landing;