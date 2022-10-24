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
import LoginPage2 from './components/dummy/loginPage.jsx'

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

  // const DefaultContainer = () =>(
  //   <>
  //     <NavbarComponent/>
  //     <Route exact path ="/" element={Landing} />
  //     <Route exact path="/register" element={<Register/>}/>
  //     <Route exact path="/login" element={<Login/>}/>
  //     <Route exact path="/dashboard" element={<Dashboard/>}/>
  //     <FooterComponent/>
  //   </>
  // )

  // const LoginContainer = () => (
  //   <div>
  //     {/* <Route exact path="/loginpage" render={() => <Redirect to="/loginpage" />} /> */}
  //     <Route path="/loginpage" element={<LoginPage2/>} />
  //   </div>
  // )
  
  // return (
  //   <Provider store = {store}>
  //     <Router>
  //         <div className="App">
  //           <Routes>
  //             <Route exact path="/loginpage" element={<LoginPage2/>}/>
  //             <Route element={DefaultContainer}/>
  //           </Routes>
  //         </div>
  //     </Router>
  //   </Provider>
  // );

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
              </Routes>
              <FooterComponent />
          </div>
      </Router>
    </Provider>
  );
}

export default App;
