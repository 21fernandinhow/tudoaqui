// src/utils/auth.js
import { auth, googleAuthProvider } from '../firebase';

export const loginWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleAuthProvider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};