import React, { useState } from 'react'
// At https://react-icons.github.io/react-icons/icons?name=fi or https://feathericons.com/
// or https://iconscout.com/icons/ri we can see tons of different icons with varaible sizes.
// ri means React Icons?
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri' // close is a "X" to close the menu
import './navbar.scss'                                     // 3 lines is a menu icon
import logo from '../../assets/logo.svg'

// This will be used twice below for PC and mobile
const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>
    <p><a href="#wgpt3">What is GPT?</a></p>
    <p><a href="#possibility">Open AI</a></p>
    <p><a href="#features">Case Studies</a></p>
    <p><a href="#blog">Library</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="gpt3__navbar-sign">  {/* SignIn/SignOut will be moved to dropdown on mobile */}
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu       /* If menu is rendered, click it to close the menu */
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (  /* If toogleMeny=true, render the menu. scale-up-center in App.css */
        <div className  ="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <Menu />      {/* The menu in Navbar or as dropdown */}
          </div>
          <div className="gpt3__navbar-menu_container-links-sign"> {/* SignIn link, SignUp btn */}
            <p>Sign in</p>       {/* At the end of drop down menu only for mobile */} 
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;