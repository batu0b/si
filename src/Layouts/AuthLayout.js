import { query } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../config/FirebaseConfig";
import { UserContext } from "../context/UserContext";
import { useIsLoggedIn } from "../hooks/hooks";
import Loading from "../pages/Loading";

export default function AuthLayout() {
const {setValue, filteredItems ,value}  = useContext(UserContext)
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    setValue(null);
    const timer = setTimeout(() => {
      if (filteredItems.length > 0) {
        setValue(true);
      } else if (filteredItems.length <= 0 || !isLoggedIn) {
        setValue(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoggedIn, filteredItems.length]);

  if (isLoggedIn && value) {
    return <Navigate replace to={"/"} />;
  } else if (isLoggedIn == null || value == null) {
    return <Loading />;
  } else {
    return <Outlet />;
  }
}
