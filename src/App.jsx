import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import './App.scss';
import { DatabaseProvider } from './hooks/useDB';
import { InvestPage } from './pages/invest-page/InvestPage';

function App() {

  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/invest" element={<InvestPage />} />
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
