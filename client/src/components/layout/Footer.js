import React from 'react';
import {useLocation} from 'react-router-dom';

const FooterComponent = () => {

  const location = useLocation()

  if(location.pathname === "/loginpage" || location.pathname === "/" || location.pathname === "/register" || location.pathname === "/dummydashboard") {
      return null
  }

  return (
    <footer className = "bg-dark text-white p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} FilePro
    </footer>
  )
}

export default FooterComponent;
