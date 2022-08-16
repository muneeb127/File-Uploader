import React from 'react'

const FooterComponent = () => {
  return (
    <footer className = "bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} VideoPro
    </footer>
  )
}

export default FooterComponent;
