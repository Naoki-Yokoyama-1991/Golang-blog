import React from 'react';
import jwtDecode from 'jwt-decode';

interface Decode {
  jti: string;
}

export const decode = async (token: string) => {
  const user = token.slice(7);
  localStorage.setItem('token', user);
  const decodedToken = jwtDecode<Decode>(localStorage.getItem('token'));
  return decodedToken.jti;
};
