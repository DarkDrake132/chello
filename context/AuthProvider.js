import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import { Spinner } from "react-bootstrap";

import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        router.push("/");
      } else {
        setUser({});
        setIsLoading(false);
        router.push("/login");
      }
    })

    //clean function
    return () => {
      unsubscribed();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spinner animation="border" role="status" /> : children}
    </AuthContext.Provider>
  );
}
