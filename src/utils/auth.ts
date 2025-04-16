import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};