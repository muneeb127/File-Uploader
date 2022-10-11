import React from 'react'

const FooterComponent = () => {
  return (
    <footer className = "bg-dark text-white p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} FilePro
    </footer>
  )
}

export default FooterComponent;
