import React from 'react';
import './feature.css';

const Feature = ({ title, text }) => (
  <div className="hp__features-container__feature">

    <div className="hp__features-container__feature-title"><div />
      {/* Above div includes a background: var(--gradient-bar) to render a gradient bar
      It is not necessary to combine this bar with other css, we can define a class  abc
      with that line only, then just do a <div className="abc"></div> to render the bar:
      */}
      <h1>{title}</h1>
    </div>

    <div className="hp__features-container_feature-text">
      <p>{text}</p>
    </div>

  </div>
);

export default Feature;