import { initializeApp } from 'firebase/app'; // firebase is a suite of tools, app is one of them

// We could use the following two imports to access firebase and firestore, however, Google keeps
// changing their implementation, so we use helper functions below, such as getCategoriesAndDocuments,
// instead of calling these Google API functions directly so we can separate our app with Google
// implementation.
import {  // a bunch of micro libraries. Can find detailed info in doc
  getAuth,
  signInWithRedirect,   // Also for Google sign in
  signInWithPopup,      // For Google sign in
  GoogleAuthProvider,
  // Could have a FacebookAuthProvider here
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged  // Invoked in the UI thread on changes in the authentication state: sign in/up use changes
} from 'firebase/auth';

// The above import is for firebase auth, the following one is for firestore DB
// See comments above about Google changes and why we use helper functions
import {
  getFirestore,  // instantiate firestore instance
  doc,           // Retrieve document inside our firestore DB, get a doc instance
  getDoc,        // actually get a document's data
  setDoc,        // actually set a document's data
  collection,    // allows as to get a reference to a collection, just like do -> DocRef
  writeBatch,    // Upload data to firestore as batch. Success of a single write does not mean a good transaction
  // query,      // A Query refers to a query which you can read or listen to. You can also construct refined Query objects by adding filters and ordering.
  getDocs,       // Executes the query and returns the results as a QuerySnapshot. getDocs gets multiple docs, getDoc gets one doc?
  // QueryDocumentSnapshot  Not used
} from 'firebase/firestore';

// firebaseConfig for my Firebase app 'hisensep'
const firebaseConfig = {
  apiKey: "AIzaSyCweamRZ9vIeDC765-Rdfp5cu2qd9h2sDI",
  authDomain: "hisensep-56847.firebaseapp.com",
  projectId: "hisensep-56847",
  storageBucket: "hisensep-56847.appspot.com",
  messagingSenderId: "186351785540",
  appId: "1:186351785540:web:4a2a6f0af97d25adc38e11"
};

// The following 5 lines are specific for using Firebase as required by Google
// const firebaseApp = initializeApp(firebaseConfig);  // Connect Google with our App
initializeApp(firebaseConfig);                     // Connect Google with our App, no need to assign to firebaseApp

const googleProvider = new GoogleAuthProvider(); // Provider instance. Firebase also supports auth with FB etc
googleProvider.setCustomParameters({             // Take config objects from us to tell Google how to behave
  prompt: 'select_account',                      // Anybody interact with the provider, we want him to select account
});

// While we may use different GoogleAuthProviders for different kinds of sign ups
// there is only a single auth for use to authorize with Google firebase for the life cycle
// of the whole duration of this app, this is why we have to pass auth to googleProvider,
// kind of strange
export const auth = getAuth();                   // Our app get authorized by this?
export const signInWithGooglePopup    = () => signInWithPopup(auth, googleProvider);

// Redirect means the Google SignIn window is in new page instead of a pop up window.
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();  // Use this to access our DB, the DB we are going to pass

// Upload the category data in shop-data.js to firestore. objectsToAdd are documents to add but
// documents are objects
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  // Store each obj inside the collection (transaction), there are numerous writes for a transaction.
  // all writes must be successful for a transaction to be successful, we need batch
  const batch = writeBatch(db);
  // attach a bunch of operations to a batch. We have 5 objects in shop-data.js
  // see shop-data.js for 'title' which is Hats, etc
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // firestore gives us a docRef even if that doc does not exist yet
    batch.set(docRef, object);
  });

  await batch.commit();  // await for firing off the batch
  console.log('Done')
}

// This function is passed to reduce for reducing the massive Mu object from firestore
// to well structured product data objects to be rendered by our App. Because it is a
// function used by reduce, the data it works on, docSnapshot = querySnapshot.docs,
// is 5 Mu objects, one for each of the 5 categories, Mu has a function 'data' for us
// to reduce the data.  This function can be defined inside getCategoriesAndDocuments
// as the first argument for reduce.
function func_4_reduce(acc, docSnapshot) {
  const { title, items } = docSnapshot.data();
  acc[title.toLowerCase()] = items;
  return acc;
}
// Google keeps changing the way we access firebase/firestore, but at least the following
// helper function allows us to separate our App with the ever changing implementation
export const getCategoriesAndDocuments = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  // console.log(querySnapshot);     // This shows a Fu obj
  // console.log(querySnapshot.docs) // This shows 5 massive Mu object, one for each category
  // Syntax: array.reduce(function(total,       currentValue, currentIndex, arr), initialValue)
  // In our case it is    function(cur_acc_obj, data_added_to_curr_acc_obj)
  const categoryMap = querySnapshot.docs.reduce(func_4_reduce, {}); // {} empty acc to start with
  // console.log(categoryMap) show the last round of acc: {hats: Array(9), jackets: Array(5), ... womens: Array(7)}
  return categoryMap;
}

// Pass userAuth authenticated by firebase and create a document in firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>
{
  if (!userAuth) return;
  // additionalInformation is tricky: In order to store user info into firestore, displayName
  // is needed, Google sign in already has a displayName that the firebase automatically knows,
  // but when we use Sign Up form to create a new user, the displayName is only in our local
  // form but not known by firebase until our sign up is down, so we need to provide displayName
  // from our local sign up form, that is why we have a additionalInformation here, see $$$
  // below for more info.

  // 'users' is collection name, uid is the ID for the user, pass the info to doc to create
  // a user instance inside firestore DB.  userDocRef is a doc reference to the user
  // console.log(userAuth)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // if we do console.log(userRef), we will see our uid and an entry /uses/uid even if we
  // have not store the user info in firestore yet.  The reason is that Google thinks that it
  // does not hurt to "create" a user object with limited info (uid only), that will be
  // used to store our user data later anyway.

  // As we commented above getDoc gets the data of an document. Snapshot is like data.
  // await because Google will get is asynchronously
  const userSnapshot = await getDoc(userDocRef);   // We use snapshot to check if it is a new or
  // existing user then handle the two cases differently
  // We can call userSnapshot.exists() to  check if a user with the uid already exists or not

  // Following block creates a user in firestore with data from firebase auth if there is no one yet
  if (!userSnapshot.exists()) {   // if a user does not exist, create one
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try { // Try to set the data inside the document in the firestore
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
      // $$$ see above, if we use sign up form, we need to provide displayName from our local
      // sign up form, which is inside additionalInformation (If we have used Google sign,
      // then firebase may already know our displayName, in this case, additionalInformation just overwrite?)
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;  // if exist, does nothing, just return the current user
};

// Yihua added a layer between App and firebase func like createUserWithEmailAndPassword
// so it will be easy to adjust in case Google func changes
// YC async is always added in front of a function that returns a promise, here
// function (email, password) => {...} await for the return from
// createUserWithEmailAndPassword, which does return a promise as its library
// Typescript code shows:
//    createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
//
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)
    return;
  return await createUserWithEmailAndPassword(auth, email, password);    // Firebase API
  // await is equivalent to .then((user) => loginUserSuccess(dispatch, user)) for promise
  // this function returns the newly created user
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// another interface layer function
export const signOutUser = async () => await signOut(auth); // inform the firebase sign out method

// Another helper function, an observer, We define the a anonymous callback function 
// (user) => { console.log(user) in user.context.jsx, which is called and display the user obj
// when authentication state changes (user sign in, sign out...)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); //  errorCallback, completeCallback);

/* Auth.onAuthStateChanged()
  Adds an observer for changes to the user's sign-in state.

Signature:
  onAuthStateChanged(nextOrObserver: NextOrObserver<User | null>, error?: ErrorFn, completed?: CompleteFn): Unsubscribe;

Parameters
      Parameter	             Type	                         Description
  nextOrObserver	NextOrObserver<User | null>	    callback triggered on change.
  error	          ErrorFn	                        callback triggered on error.
  completed	      CompleteFn	                    callback triggered when observer is removed.

Returns:
   Unsubscribe

See https://firebase.google.com/docs/reference/js/auth.auth.md#authonauthstatechanged
*/