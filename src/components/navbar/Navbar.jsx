import React, { useState } from 'react'
// At https://react-icons.github.io/react-icons/icons?name=fi or https://feathericons.com/
// or https://iconscout.com/icons/ri we can see tons of different icons with varaible sizes.
// ri means React Icons?
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'  // close is a "X" to close the menu
import './navbar.scss'                                     // 3 lines is a menu icon
import logo from '../../assets/hisense-seeklogo.com.svg'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>                      {/* Header.jsx   */}
    <p><a href="#products">Products</a></p>              {/* Features.jsx */}
    {/* <p><a href="#technology">Technology</a></p> */}
    <p><a href="#technology">Technology</a></p>          {/* Blog.jsx     */}
    <p><a href="#aboutus">About Us</a></p>               {/* WhatGPT3.jsx */}
    <p><a href="#contactus">Contact Us</a></p>           {/* Footer.jsx   */}
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [signUpDropdown, setSignUpDropdown] = useState(false)
  const [signInDropdown, setSignInDropdown] = useState(false)

  const toggleSignUpDropdown = (e) => {
    e.preventDefault();
    if (toggleMenu) {  // On small mobile dropdown menu, close dropdown menu before render sign up menu
      setToggleMenu(false)
    }
    signUpDropdown ? setSignUpDropdown(false) : setSignUpDropdown(true);
  }

  const toggleSignInDropdown = (e) => {
    e.preventDefault();
    if (toggleMenu) {  // On small mobile dropdown menu, close dropdown menu before render sign up menu
      setToggleMenu(false)
    }
    signInDropdown ? setSignInDropdown(false) : setSignInDropdown(true);
  }

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
        <p onClick={toggleSignInDropdown}>Sign in</p>
        <button type="button" onClick={toggleSignUpDropdown}>Sign up</button>
      </div>

      <div className="gpt3__navbar-menu">  {/* FOR SMALL MOBILE SCREEN ONLY */}
        { toggleMenu       /* If menu is rendered, click it to close the menu */
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {
          toggleMenu && (   /* If toogleMeny=true, render the menu. scale-up-center in App.css */
            <div className  ="gpt3__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <Menu />            {/* The menu in Navbar or as dropdown */}
              </div>
              <div className="gpt3__navbar-menu_container-links-sign"> {/* SignIn link, SignUp btn */}
                <p onClick={toggleSignInDropdown}>Sign in</p>    {/* At end of dropdown for mobile */}
                <button type="button" onClick={toggleSignUpDropdown}>Sign up</button>
              </div>
            </div>
          )
        }
      </div>

      {                       /* Render dropdown for SIGN IN for both PC and mobile*/
        signInDropdown && (   /* If toogleMeny=true, render the menu. scale-up-center in App.css */
          <div className="gpt3__navbar-menu_container scale-up-center" style={{color:'white'}}>
            {/* Pass setSignInDropdown to SignInForm in case it needs to cancel signing in */}
            <SignInForm setSignInDropdown={setSignInDropdown} />
          </div>
        )
      }

      {                       /* Render dropdown for SIGN UP for both PC and mobile*/
        signUpDropdown && (   /* If toogleMeny=true, render the menu. scale-up-center in App.css */
          <div className="gpt3__navbar-menu_container scale-up-center" style={{color:'white'}}>
            {/* Pass setSignUpDropdown to SignInForm in case it needs to cancel signing up */}
            <SignUpForm setSignUpDropdown={setSignUpDropdown} />
          </div>
        )
      }

    </div>
  );
};

export default Navbar;