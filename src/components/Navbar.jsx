import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"
import Ieee_icon from "../assets/ieee.png"

function Navbar() {
  return (
    <div className='navbar'>
      <div className='left_side'>
        <Link to="/"><img src={Ieee_icon} alt="IEEE SSIT" /></Link>
        {/* <p>IEEE SSIT</p> */}
      </div>
      <div className='right_side'>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/submission">Submissions</Link></p>
      </div>
    </div>
  )
}

export default Navbar
