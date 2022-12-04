import React from 'react'
// import './header.css'
import './header.scss'   // This is converted from above css using https://www.cssportal.com/css-to-scss/
import people from '../../assets/people.png'
// import ai from '../../assets/ai.png'
// import ai from '../../assets/building.png'
import ai from '../../assets/wafer.jpeg'

const Header = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">

        <h1 className="gradient__text">Hisense Photonics, an optoelectronics industry leader</h1>
        <p>Our proven modular technology platforms, supported by a library of patents, ensure that each of our products have been designed to provide the most advanced and competitive optical solutions for today’s major mainstream applications. </p>
        <div className="gpt3__header-content__input">
          <input type="email" placeholder='Your Email Address'></input>
          <button type="button">Get Started</button>
        </div>
    
        <div className="gpt3__header-content__people">
          <img src={people} alt="people"/>
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="gpt3__header-image">
        <img src={ai} alt="ai" />
      </div>
    </div>
  )
}

export default Header