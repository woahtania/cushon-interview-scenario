import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { DatabaseProvider } from './hooks/useDB';
import { InvestPage } from './pages/invest-page/InvestPage';
import { Navbar } from './components/navbar/Navbar';
import './App.scss';

function App() {

  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/invest" element={<InvestPage />} />
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
