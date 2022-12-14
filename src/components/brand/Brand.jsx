import React from 'react'
// import './brand.css'
import './brand.scss'

const Brand = () => (
  <div className="hs__division section__padding">
    {/* <div className="hisense_info">Hisense<br />USA</div>
    <div className="hisense_info">Hisense<br />Electronics</div>
    <div className="hisense_info">Hisense<br />Appliances</div>
    <div className="hisense_info">Hisense<br />Home Page</div> */}
    <div className="hisense_info">
      <a href="https://www.hisense-usa.com/">Hisense<br/>USA</a>
    </div>
    <div className="hisense_info">
      <a href="https://www.hisense-usa.com/tv-and-audio">Hisense<br />Electronics</a>
    </div>
    <div className="hisense_info">
      <a href="https://www.hisense-usa.com/home-appliance">Hisense<br />Appliances</a>
    </div>
    <div className="hisense_info">
      <a href="https://www.hisense-usa.com/air-products">Hisense<br />Air Products</a>
    </div>
  </div>
);

export default Brand;