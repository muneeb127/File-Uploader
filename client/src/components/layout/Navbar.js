import React from 'react';
import {connect} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {logoutUser} from '../../redux/actions/authAction';

import Nav from 'react-bootstrap/Nav'
import {Navbar, Container} from 'react-bootstrap';

const NavbarComponent = (props) => {

    const { isAuthenticated } = props.auth;
    const navigate = useNavigate();
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
        navigate('/');
    }

    const location = useLocation()

    if(location.pathname === "/loginpage" || location.pathname === "/" || location.pathname === "/register") {
        return null
    }
    
    const authLink = (
        <Nav>
            <Nav.Link href="/login" onClick = {onLogoutClick}>Logout</Nav.Link>
        </Nav>
    )

    const guestLink = (
        <Nav>
            <Nav.Link href="/register">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
    )

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">FilePro</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#about">About</Nav.Link>
                    {
                        isAuthenticated ? <Nav.Link href="/dashboard">Dashboard</Nav.Link> : <></>
                    }
                </Nav>
                {isAuthenticated ? authLink : guestLink}
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(NavbarComponent);