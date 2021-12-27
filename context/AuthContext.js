//Inside the AuthContext file.
import { useState, useEffect, createContext, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { addDocument } from "../firebase/service";

import { useRouter } from "next/router";

const authContextDefaults = {
  user: null,
  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext(authContextDefaults);

export function useAuth() {
  return useContext(AuthContext);
}

// Inside AuthProvider

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((userCheck) => {
      if (userCheck) {
        if (user === null) {
          setUser({
            displayName: userCheck.displayName,
            photoURL: userCheck.photoURL,
            email: userCheck.email,
            uid: userCheck.uid,
          })
        }
        if (router.pathname === "/login") {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
    });
  }, [router.pathname]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;
        if (getAdditionalUserInfo(result).isNewUser) {
          addDocument("users", {
            displayName: displayName,
            photoURL: photoURL,
            email: email,
            uid: uid,
            providerId: credential.providerId,
          })
        }
        setUser({ displayName, email, photoURL, uid });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    console.log("logout");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
