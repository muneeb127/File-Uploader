import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import decode from 'jwt-decode';
import { setCurrentUser } from './redux/actions/authAction';

import NavbarComponent from './components/layout/Navbar';
import FooterComponent from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/files/Dashboard';
import LoginPage2 from './components/dummy/login/loginPage.jsx'
import DummyDashboard from './components/dummy/dashboard/DummyDashboard'

import './App.css';
import setAuthToken from './utils/setAuthToken';
import React from 'react';


//Check for token
if(localStorage.jwtToken){
	//const token = localStorage.getItem('jwtToken');
	setAuthToken(localStorage.jwtToken);
	const decoded = decode(localStorage.jwtToken);
	
	store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store = {store}>
      <Router>
          <div className="App">
              <NavbarComponent />
              <Routes>
                  {/* <Route exact path="/loginpage" element={<LoginPage2/>}/> */}
                  {/* <Route exact path ="/" element={<Landing />} /> */}
                  <Route exact path="/" element={<Login/>}/>
                  <Route exact path="/register" element={<Register/>}/>
                  <Route exact path="/dashboard" element={<Dashboard/>}/>
                  <Route exact path="/dummydashboard" element={<DummyDashboard/>}/>
              </Routes>
              {/* <FooterComponent /> */}
          </div>
      </Router>
    </Provider>
  );
}

export default App;
