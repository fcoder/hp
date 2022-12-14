import React from 'react';
import possibilityImage from '../../assets/possibility.png';
// import './possibility.css';
import './possibility.scss';

const Possibility = () => (
  <div className="hp__possibility section__padding" id="possibility"> {/* No route to this now */}
    {/*  image on the left */}
    <div className="hp__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>

    {/* List of possibilities on the right */}
    <div className="hp__possibility-content">
      <h4>Request Early Access to Get Started</h4>
      <h1 className="gradient__text">The possibilities are <br /> beyond your imagination</h1>
      <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>
      <h4>Request Early Access to Get Started</h4>
    </div>

  </div>
);

export default Possibility;