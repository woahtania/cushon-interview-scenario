import React from 'react';
import './LoginPage.scss';
import { TextField } from '../../components/text-field/TextField';

const LoginPage = () => (
  <div className="login-page-component">
    <h2>Login</h2>
    <TextField label="Username" className="login-input" />
    <TextField label="Password" type="password" className="login-input login-password" />
    <button type="button" className="login-button">Login</button>
  </div>
);

export {
  LoginPage,
};
