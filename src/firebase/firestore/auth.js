import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { firebaseApp } from "./config";

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  const result = await signInWithPopup(
    auth,
    provider
  );

  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export { auth };