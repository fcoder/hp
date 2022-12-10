import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner
} from './button.styles';

// Our App uses the same button style for the following different pages:
// (1) Regular button (2) Blue google sign in button (3) Inverted button for shopping
export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  { // This { } defines an object
    // Use "Computed Property Names", see https://ui.dev/computed-property-names
    // Let's say BUTTON_TYPE_CLASSES.base is 'base',
    // then [BUTTON_TYPE_CLASSES.base]: BaseButton, is { 'base' : BaseButton }
    // So according to the definition of BUTTON_TYPE_CLASSES above,
    [BUTTON_TYPE_CLASSES.base]:     BaseButton,          // Values are buttons
    [BUTTON_TYPE_CLASSES.google]:   GoogleSignInButton,  // defined in above row
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);
  // if caller does NOT provide an arg for getButton arrow function, then by
  // default buttonType = BUTTON_TYPE_CLASSES.base, so
  //    {...}[buttonType] = BaseButton
  // otherwise, there are 3 possible argument as buttonType, which will result in:
  // If buttonType = BUTTON_TYPE_CLASSES.base     = 'base'           --> getButton = BaseButtn
  // If buttonType = BUTTON_TYPE_CLASSES.google   = 'google-sign-in' --> getButton = GoogleSignInButton
  // If buttonType = BUTTON_TYPE_CLASSES.inverted = 'inverted'       --> getButton = InvertedButtn

// Make this a generic button that can be used for the three different variations
const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>  {/* otherProps may disable this disabled value */}
      {isLoading ? <ButtonSpinner /> : children}         {/* Show spinner when loading, or the children components */}
    </CustomButton>
  );
};

export default Button;
