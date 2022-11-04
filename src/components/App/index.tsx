import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from 'components/Layout/DefaultLayout';
import { MainPage } from 'pages/Main';
import { AboutPage } from 'pages/About';
import { FormPage } from 'pages/Form';
import { NotFound } from 'pages/NotFound';
import { AppProvider } from 'state';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export { App };
