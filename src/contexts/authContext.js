import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: {}, token: "" });

function AuthContextComponent(props) {
  const [loggedUser, setLoggedUser] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    const storedUserParse = JSON.parse(storedUser || '""');

    if (storedUserParse.token) {
      setLoggedUser(storedUserParse);
    } else {
      setLoggedUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };