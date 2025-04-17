import React, { useCallback, useRef, useState } from 'react';
import './LoginPage.scss';
import { Navigate } from 'react-router-dom';
import { TextField } from '../../components/text-field/TextField';
import { SignupLink } from './SignupLink/SignupLink';
import { useUserByUsername } from '../../hooks/userHooks';

const LoginPage = () => {

  const usernameField = useRef();
  const passwordField = useRef();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    user,
    isLoading,
  } = useUserByUsername({ enabled: !!username, username });


  const login = useCallback(() => {
    setUsername(usernameField.current.value);
    setPassword(passwordField.current.value);
  }, []);

  if (user && user.password === password) {
    return (
      <Navigate to="/invest" />
    );
  }

  return (
    <div className="login-page-component">
      <h2>Login</h2>
      <TextField ref={usernameField} label="Username" className="login-input" />
      <TextField ref={passwordField} label="Password" type="password" className="login-input login-password" />
      <button disabled={isLoading} type="button" className="login-button" onClick={login}>Login</button>
      <SignupLink />
    </div>
  );
};

export {
  LoginPage,
};
