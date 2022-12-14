import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Product Search',
    text: 'Use our friendly produc finder to learn more about the products we offer. Let us help you find the right products to complete your job.',
  },
  {
    title: 'Data Sheets',
    text: 'If you are in need of more in depth information, sign up to gain access to our data sheets for all of our products listed online.',
  },
  {
    title: 'Technology Overview',
    text: 'Hisense Photonics cutting-edge technology maintains our position at the forefront of the opto-electronics industry',
  },
  {
    title: 'Sales and Support',
    text: 'Around the global or around the corner we are here to help. Use our directory to find someone to satisfy your optronics needs',
  },
];

const Features = () => (
  // section__padding is defined in App.css as .section__padding { padding: 4rem 6rem; }
  <div className="hp__features section__padding" id="products">
    <div className="hp__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="hp__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;