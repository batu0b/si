import { createContext,  useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtherUsersContext = createContext();

const OtherUsersProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigateSearch = () => {
    navigation(`/arama/${searchText}`, { searchText });
    setSearchText("");
  };

  const values = useMemo(
    () => ({ searchText, setSearchText, navigateSearch }),
    [searchText, setSearchText, navigateSearch]
  );

  return (
    <OtherUsersContext.Provider value={values}>
      {children}
    </OtherUsersContext.Provider>
  );
};

export { OtherUsersProvider, OtherUsersContext };
