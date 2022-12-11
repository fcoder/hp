// Consider context as a component that exclusively stores things
import { createContext, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// This UserProvider is just an alias component defined as follows:
// by passing value to the children component, that component will have access
// to both currentUser and the setter of the currentUser.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // I only want to do this when our component mounts (like old componentDidMount)
    // Need unsubscribe to stop the listener to avoid memory leak
    useEffect(() => {
        // (user) => { console.log(user) } callback called when auth changes
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {            // user is a big object including displayName and email
              createUserDocumentFromAuth(user);
              if (user.emailVerified) {
                setCurrentUser(user); // run this whenever the user value comes back from above await
              }                       // Set to authenticated user or null, the only place we update user
            }                         // Set to null is also important, that determines if we see
        });                           // SIGN IN or SIGN OUT in the Navbar.
        return unsubscribe
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}