import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0591838063",
  appId: "1:374330509519:web:96cc6dd887a6e957a00fba",
  apiKey: "AIzaSyDQryncO_F_Qevr3UQT07yHgJzmqgN8MHw",
  authDomain: "gen-lang-client-0591838063.firebaseapp.com",
  storageBucket: "gen-lang-client-0591838063.firebasestorage.app",
  messagingSenderId: "374330509519",
  measurementId: "",
  oAuthClientId: "374330509519-0kjggi84g3n1prt4kn908bp2bkig6qn8.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'select_account'
});

export async function signInWithGoogleOAuth() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      uid: user.uid,
      displayName: user.displayName || 'Пользователь Google',
      email: user.email || '',
      photoURL: user.photoURL || ''
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    if (error && error.code === 'auth/unauthorized-domain') {
      const currentDomain = window.location.hostname || window.location.host;
      error.friendlyMessage = `Домен "${currentDomain}" не разрешён в Firebase. Добавьте "${currentDomain}" в Firebase Console -> Authentication -> Settings -> Authorized domains.`;
    }
    throw error;
  }
}

export async function signOutFromFirebase() {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Sign out error:', e);
  }
}

// Sync Firebase Auth state with Vibe Working session
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    if (typeof (window as any).syncFirebaseUser === 'function') {
      (window as any).syncFirebaseUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Пользователь Google',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || ''
      });
    }
  }
});

// Bind to window for index.html integration
(window as any).signInWithGoogleOAuth = signInWithGoogleOAuth;
(window as any).signOutFromFirebase = signOutFromFirebase;
