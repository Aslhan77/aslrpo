import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import ProductCatalog from './components/ProductCatalog';

// Глобальные стили для всего сайта
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #0a0a2a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

// Обертка только для страницы входа
const CenteredPage = styled.div`
  min-height: 100vh;
  background-color: #0a0a2a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <CenteredPage>
                <Login />
              </CenteredPage>
            }
          />
          <Route path="/catalog" element={<ProductCatalog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
