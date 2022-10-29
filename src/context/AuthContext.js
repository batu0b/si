import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useMemo, useState } from "react";

import { auth } from "../config/FirebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoggedIn, setLoggenIn] = useState(null);
  const [err, setErr] = useState("");

  const [cp, setCp] = useState(0);


  // eslint-disable-next-line react-hooks/exhaustive-deps


  const signIn = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return setErr(error);
    }
  };

  const values = useMemo(
    () => ({ user, setUser, isLoggedIn, setLoggenIn, err, setErr,signIn,cp, setCp}),
    [user, isLoggedIn, setErr, err,cp, setCp]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
