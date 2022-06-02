import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

export const createUser = (email: string, password: string) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // eslint-disable-next-line
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // eslint-disable-next-line
      console.log(errorCode, errorMessage);
    });
};

export const signInUser = (email: string, password: string) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // eslint-disable-next-line
      console.log(user);
    });
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // eslint-disable-next-line
  //   console.log('error Code:', errorCode, 'message:', errorMessage);
  // });
};

export const logout = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // eslint-disable-next-line
      console.log('Sign-out successful');
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error, 'An error happened');
    });
};

export default app;
