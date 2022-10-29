import React from 'react';
import {connect} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {logoutUser} from '../../redux/actions/authAction';

import Nav from 'react-bootstrap/Nav'
import {Navbar, Container} from 'react-bootstrap';

import './Navbar.css';

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
            <Nav.Link href="#"><i id='custom-icon-cogs' className="cogs icon"></i></Nav.Link>
            <Nav.Link href="#"><i id='custom-icon' className="search icon"></i></Nav.Link>
            <Nav.Link href="#"><i id='custom-icon' className="bell outline icon"></i></Nav.Link>
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
        <Navbar variant="dark" id='navbar-custom'>
                <Navbar.Brand href="/">FilePro</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#about">
                        <i id='custom-icon' className="book icon"></i> About
                    </Nav.Link>
                    {
                        isAuthenticated ? 
                        <Nav.Link href="/dashboard">
                            <i id='custom-icon' className="boxes icon"></i>Dashboard
                        </Nav.Link> : <></>
                    }
                </Nav>
                {isAuthenticated ? authLink : guestLink}
        </Navbar>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(NavbarComponent);