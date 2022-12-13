import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import { UserContext } from '../../context/user.context';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

// Parent element passes down function setSignInDropdown to this element to set signInDropfown flag
// Parent element also passes down toggleMenu, if it is ture, then this Sign Ip form is for mobiles,
// we must render a cancel button for quitting because the Sign In button for mobiles are behind this
// form and cannot be pressed to cancel as the Sign Ip button in the Navbar for PC
const SignInForm = ( { setSignInDropdown, needCancelSignIn }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => { // YC don't worry about email verification for Google sign in
    await signInWithGooglePopup();
    // If sign in is successful, Firebase creates a document if this user is not there yet
  };

  const signInCancel = () => { 
    setSignInDropdown(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);

      if (user.emailVerified) {
        setCurrentUser(user);  // run this whenever the user value comes back from above await
        resetFormFields();
      } else {
        alert(`You email address ${user.email} has not been verified or is a fake one.`)
        setCurrentUser(null);  // Clear currentUser if not verified, so SIGN IN will not change to SIGN OUT
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      {/* <h2>Already have an account?</h2> */}
      <h3>Sign in with email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput             // Enter email address
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput             // Enter password
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          autoComplete='on'    // To shut up warning "Input elements should have autocomplete attributes"
        />
        <div className='buttons-container'>      {/* SIGN IN and GOOGLE SIGN IN buttons */}
          <button type='submit'>Sign In</button>
          <span> </span>
          {/* It is import to specify type="button" because by default, type is "submit", which will
          also submit the data in above Sign In box and thus cause confusing error.  type="button"
          only brings up the Google sign in page instead of submitting data */}
          <button type='button' onClick={signInWithGoogle}>Google sign in</button>
          <span> </span>
          {/* See comment above this Element for the reason of checking toggleMenu */}
          { needCancelSignIn && <button type='button' onClick={signInCancel}>Cancel</button> }
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
