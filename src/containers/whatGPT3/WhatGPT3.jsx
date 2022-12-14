import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="hp__whatgpt3 section__margin" id="aboutus"> {/* hp__whatgpt3 is for gradient */}

    {/* <div className="hp__whatgpt3-feature">
      <Feature title="What is GPT-3" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by." />
    </div> */}

    <div className="hp__whatgpt3-heading">
      <h1 className="gradient__text">About Us</h1>
      <p>Explore the Library</p>
    </div>

    <div className="hp__whatgpt3-container">  {/* display:flax, row, wrap */}
      <Feature title="Who We Are" text="Our mission is to be the leading vertically integrated provider of high performance optical subsystems for the communication market from chip fabrication to subsystems" />
      <Feature title="What We Do" text="Provode 2.5Gb/s and 10Gb/s high performance solution in the long haul. metro and access markets. Quick product cycle. Trusted Pedigree." />
      <Feature title="Where We Are" text="R&D and Manufacturing in east and west coasts of the US and overseas. " />
    </div>

  </div>
);

export default WhatGPT3;
