import styled from 'styled-components';
import { SpinnerContainer } from '../spinner/spinner.styles';

// Button scss has a big shared css, then a few smaller modification, so we make a base button

export const BaseButton = styled.button`   // This is the button with black background and white text
  min-width: 165px;                        // used for Sign Up and Sign In with email and password
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  background-color: black;                 // Base Button's backgroud is black
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover { // select this when mouse hovers &, the base sign in button
    background-color: white;              // Change color to white when mouse hovers
    color: black;                         // and also changes text to black
    border: 1px solid black;              // Must have a border when the button bg-color is white
  }

  @media screen and (max-width: 800px) {
    padding: 0 20px;
    min-width: 110px;
    margin: 0 10px;      // Make sure this is a gap betwen SIGN IN and GOOGLE SIGN IN buttons
  }
`;
// Extend the BaseButton
export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;   // blue button for Google Sign in without mouse hovers
  color: white;                // text color

  &:hover { // select this when mouse hovers &, the Google Sign In button
    // YC background-color: white;   // button color changes to white when mouse hovers
    background-color: #357ae8; // this blue is a little more darker than above #4285f4
    border: none;              // The Google sign in button never has a border
  }                            // color: for text color will be black when mouse hovers
`;                             // This is changed by the BaseButton's hover

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;                // Inverted button used for "ADD TO CART" button
  border: 1px solid black;     // Must have a border when background color is white

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }

  @media screen and (max-width: 800px) {    // Make Add to Cart inverted button narrower for mobile
    display: block;
    opacity: 0.9;
    min-width: unset;
    padding: 0 10px 0 10px;                 // same as 0 10px
  }
`;

// We use this styled spinner to overwrite width and height.
export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;     // reduce spinner from 50px x 50px to 30px x 30px to sping inside a button
  height: 30px;
  @media screen and (max-width: 800px) {
    width: 20px;   // With 30px x 30px, the spinner is not in the middle of the smaller mobile button
    height: 20px;  // 20px is not in the middle either but OK
  }
`;