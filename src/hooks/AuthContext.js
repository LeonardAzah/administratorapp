import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useMemo } from "react";

const LOGIN_URL = "/adminSignin";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [controller, setController] = useState();

  const login = async (values) => {
    try {
      setIsLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      setUserInfo({});

      const response = await axios.post(LOGIN_URL, {
        ...values,
        signal: ctrl.signal,
      });
      console.log(response.data);
      setUserInfo(response.data);
      window.localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoggedIn(true);
      return true;
    } catch (err) {
      if (err.isAxiosError) {
        if (err.response) {
          setErrorMessage(err.response.data.message);
          // console.log(err.response.data.message);
        } else {
          console.log("Error");
        }
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  const logout = () => {
    try {
      setIsLoading(true);
      const userInfo = window.localStorage.getItem("user");
      window.localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (err) {
      setIsLoggedIn(true);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      userInfo,
      login,
      logout,
      errorMessage,
      isLoading,
      isLoggedIn,
    }),
    [userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
