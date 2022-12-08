import React from 'react';
// import gpt3Logo from '../../assets/logo.svg';
import hpLogo from '../../assets/hisense-seeklogo.com.svg'
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding" id="contactus">>

    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="gpt3__footer-links">

      <div className="gpt3__footer-links_logo">
        {/* <img src={gpt3Logo} alt="gpt3_logo" /> */}
        <img src={hpLogo} alt="hp_logo" />
        <p>Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved</p>
      </div>

      {/* <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div> */}

      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>

      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>5000 Hadley Road. South Plainfield, NJ 07080, USA</p>
        <p>(908) 757-8817</p>
        <p>svyas@hisensebroadband.com</p>
      </div>

    </div>

    <div className="gpt3__footer-copyright">
      <p>@2021 Hisense Photonics. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;