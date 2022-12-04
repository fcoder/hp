import React from 'react'
// import './brand.css'
import './brand.scss'
// import { google, slack, atlassian, dropbox, shopify } from './imports'
import { hsusa, hselec, hsappl, hspage } from './imports.js'

const Brand = () => (
  <div className="gpt3__brand section__padding">
    <div>
      <img src={hsusa} alt="hs_usa" />
    </div>
    <div>
      <img src={hselec} alt="hs_elec" />
    </div>
    <div>
      <img src={hsappl} alt="hs_appl" />
    </div>
    <div>
      <img src={hspage} alt="hs_page" />
    </div>
  </div>
);

export default Brand;