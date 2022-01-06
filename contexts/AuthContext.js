import React, { createContext, ReactNode, useCallback, useMemo } from "react";

import createPersistedState from "use-persisted-state";

const useIsLoggedInState = createPersistedState("isLoggedIn");
const useAccessTokenState = createPersistedState("accessToken");

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedInState(false);
  const [accessToken, setAccessToken] = useAccessTokenState("");

  const handleLogin = useCallback(
    (data) => {
      if (data.accessToken) {
        setIsLoggedIn(true);
        setAccessToken(data.accessToken);
      }
    },
    [setIsLoggedIn, setAccessToken]
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setAccessToken("");
  }, [setIsLoggedIn, setAccessToken]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      accessToken,
      handleLogin,
      handleLogout,
    }),
    [isLoggedIn, accessToken, handleLogout, handleLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};