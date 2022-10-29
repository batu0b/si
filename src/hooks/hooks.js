import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  where,
  getDocs,
  query,
  doc,
  documentId,
  onSnapshot,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { auth, db, user } from "../config/FirebaseConfig";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return isLoggedIn;
};

export const useUserId = async () => {
  const [isUser, setIsUser] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setState(snapshot.docs);
    });
  }, []);

  const filterUsers = state.filter((x) => {
    const y = x.data().userId;

    return y.toString().indexOf(user?.uid) !== -1;
  });

  useEffect(() => {
    if (filterUsers) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, []);

  return isUser;
};



