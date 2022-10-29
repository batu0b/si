import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../config/FirebaseConfig";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [value, setValue] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setState(snapshot.docs);
    });
  }, []);
  const filteredItems = state.filter((x) => {
    return x.data().userId.indexOf(auth.currentUser?.uid) !== -1;
  });

 

  const values = useMemo(
    () => ({ state, setState, value, setValue, filteredItems,  }),
    [state, setState, value, setValue, filteredItems, ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
export { UserProvider, UserContext };
