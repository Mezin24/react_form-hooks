import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoggedOut: () => {},
  onLoggedIn: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === '1') {
      setLoggedIn(true);
    }
  }, []);

  const loggedInHandler = () => {
    localStorage.setItem('loggedIn', '1');
    setLoggedIn(true);
  };

  const loggedOutHandler = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLoggedIn: loggedInHandler,
        onLogout: loggedOutHandler,
        onLogin: loggedInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
