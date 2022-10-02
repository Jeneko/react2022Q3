import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from 'components/Layout/DefaultLayout';
import { MainPage } from 'pages/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export { App };
