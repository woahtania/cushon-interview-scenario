import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import './App.scss';
import { DatabaseProvider } from './hooks/useDB';

function App() {

  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
