import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from 'components/Layout/DefaultLayout';
import { MainPage } from 'pages/Main';
import { AboutPage } from 'pages/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </>
  );
}

export { App };
