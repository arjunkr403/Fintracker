import React from 'react'
import './styles.css'
const Header = () => {
  return (
    <header className="nav">
    <p style={{color:'var(--white)',fontWeight:500}}>FinTraker.</p>
    {/* <p onClick={logoutfnc}></p> */}
    </header>
  )
}
export default Header
