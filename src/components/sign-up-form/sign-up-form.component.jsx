import { useState } from 'react';
import { sendEmailVerification } from "firebase/auth";
import FormInput from '../form-input/form-input.component'; // FormInput shard by sign in and sign up
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';

const defaultFormFields = {  // initialize with empty strings
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

// Parent element passes down function setSignUpDropdown to this element to set signUpDropfown flag
// Parent element also passes down toggleMenu, if it is ture, then this Sign Up form is for mobiles,
// we will render a cancel button for quitting because the Sign Up button for mobiles is behind this
// form so cannot be pressed to cancel as the Sign Up button in the Navbar for PC
const SignUpForm = ({ setSignUpDropdown, needCancelSignUp }) => {
  // useState for this component only. SignInForm has its own with same but diff default values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => setFormFields(defaultFormFields);

  // Sign up form collects not only email and password for calling createAuthUserWithEmailAndPassword,
  // but also a displayName, which will be needed to create a user in firestore base.
  // After the user clicks the submit button to sign up, it first tries to calls createAuthUserWithEmailAndPassword
  // with email and password only, if it is successful, then the user has been added in firebase, we can
  // call createUserDocumentFromAuth with the user and {displayName}, the reason for passing additional
  // arg {displayName} from the sign up form input is that the "displayName" inside "user" is null.
  // (firebase includes a null displayName to accommodate other user cases).  So we need to provide displayName
  // for creating a document inside firestore
  // After a new user signed up, an user entry is in both firebase and firestore
  const handleSubmit = async (event) => {
    event.preventDefault();  // We will handle everything ourselves

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      /* try takes care of promise resolve case, catch takes care promise reject case.
      await is like .then(...) function when we use promise instead of fancier async and await we
      use here. Because we cannot pass .then a callback resolve function with an arg for receiving
      data from the promise, we must define a const variable to take the data from the promise
      we define UserCredentialImpl because that is the name of the object returned by firebase
      API createUserWithEmailAndPassword (which is wrapped by the following createAuthUserWithEmailAndPassword).
      console.log(UserCredentialImpl) shows {user: UserImpl, providerId: null, _tokenResponse: {...}}
      */
      const UserCredentialImpl = await createAuthUserWithEmailAndPassword(email, password);
      const { user } = UserCredentialImpl;  // destructure user, one of key:value pairs of UserCredentialImpl
      // Could combine above two lines into one:
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // YC: sendEmeilVerification returns immediately after Firebase sends out a verification
      // email to the user's email, it does NOT wait until the user receives and and replies
      // to verify! See
      //    https://firebase.google.com/docs/reference/js/v8/firebase.User#sendemailverification
      // for more info about this function
      await sendEmailVerification(user);

      // Reach here if we have successfully created an authenticated user, but displayName is null
      // so we need to enter displayName from our sign up form for creating a document in firestore
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();  // Clean the data inside dialog box
      alert(`A verification email has been sent to ${user.email} for verification. Reply then sign in.`)

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    // target is the things inside the <input> that triggers the event
    // destructure name and its value from event.target, that is why we add attr 'name'
    // and 'value' in each <input> below (And somehow onChange is able to include them
    // in the event as event.target.name and event.target.value
    const { name, value } = event.target;

    // YC: setFormFields was returned by useState hook above, which accepts a FormField object
    // and copies the data into a state object associated with useState

    // Spread here: Spread syntax (...) allows an iterable such as an array expression or
    // string to be expanded in places where zero or more arguments (for function calls)
    // or elements (for array literals) are expected, or an object expression to be expanded
    // in places where zero or more key-value pairs (for object literals) are expected.
    // Here we are sending an object of 4 key-value pairs to useState, that is why we add
    // a pair [name] : value to replace the current value.  [name] picks up the name from
    // object formFields which has 4 fields and name is one of them, value is the value from
    // input (Search "Square brackets property accessor") for details.
    setFormFields({ ...formFields, [name]: value });
  };

  const signUpCancel = () => {
    setSignUpDropdown(false)
  };

  return ( // sign-up-container is for button style
    <div className='sign-up-container'>
      <h3>Sign up with a
        <span style={{color: '#FF7070'}}> verifiable </span>
        email and password
      </h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}   // because all params in defaultFormField are set
          name='displayName'        // with useState, their changes trigger event
          value={displayName}       // what we typed in is 'value' attr of <input>
        />

        <FormInput
          label='Email'
          type='email'              // type is used to check if the entry looks like an email addr
          required
          onChange={handleChange}
          name='email'
          value={email}             // Not sure why email value is represented by {email} etc
        />
        {/* Curly braces { } are special syntax in JSX. It is used to evaluate a JavaScript
          expression during compilation. A JavaScript expression can be a variable, function,
          an object, or any code that resolves into a value.
        */}

        <FormInput
          label='Password'
          type='password'           // may display **** as the user types password
          required
          onChange={handleChange}
          name='password'
          value={password}
          autoComplete='on'         // To shut up warning "Input elements should have autocomplete attributes"
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
          autoComplete='on'         // To shut up warning "Input elements should have autocomplete attributes"
        />

        {/* When Sign Up button is pressed, above handleSubmit func is called if all validation pass */}
        <button type='submit'>Sign Up</button>
        <span> </span>
        {/* Render cancel button only if this Sign Up form is for mobilels */}
        { needCancelSignUp &&  <button type='button' onClick={signUpCancel}>Cancel</button> }
      </form>
    </div>
  );
};

export default SignUpForm;
