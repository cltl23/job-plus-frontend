import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const AUTH_KEY = "jobplus-token";

export const useCookie = () => {
  // saveAuthCookie
  const saveAuthCookie = (token, expires = 4 / 24) => {
    cookie.set(AUTH_KEY, token, { expires: expires });
  };
  // deleteAuthCookie
  const deleteAuthCookie = (key) => {
    cookie.remove(AUTH_KEY);
  };

  // getAuthCookie
  const getAuthCookie = (key) => {
    return cookie.get(AUTH_KEY);
  };

  // isAuthCookieExpired
  const isAuthCookieExpired = () => {
    const token = getAuthCookie();
    if (!token) return true; //if no cookie found return true cookie has expired
    const { exp } = jwt_decode(token);
    const currentTime = Date.now() / 1000; // changes to milliseconds
    return exp < currentTime; // will be true if expired
  };

  // hasValidAuthCookie
  const hasValidAuthCookie = () => {
    return !isAuthCookieExpired();
  };

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
  };
};
