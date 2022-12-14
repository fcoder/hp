import React from 'react'
// import './brand.css'
import './brand.scss'
// import { google, slack, atlassian, dropbox, shopify } from './imports'
import { hsusa, hselec, hsappl, hspage } from './imports.js'

// const Brand = () => (
//   <div className="hs__division section__padding">
//     <div>
//       <img src={hsusa} alt="hs_usa" />
//     </div>
//     <div>
//       <img src={hselec} alt="hs_elec" />
//     </div>
//     <div>
//       <img src={hsappl} alt="hs_appl" />
//     </div>
//     <div>
//       <img src={hspage} alt="hs_page" />
//     </div>
//   </div>
// );

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