import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAddUser } from './hooks/userHooks.js';

function App() {

  const {
    addUser,
  } = useAddUser();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button type="button" onClick={() => addUser({ username: 'hi', password: 'test' })}>hi</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
