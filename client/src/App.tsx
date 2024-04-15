import React from 'react';
import { RouterProvider, Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Login from './modules/Auth/Login/Login';
import Register from './modules/Auth/Register/Register';
import Layout from './shared/components/Layout/Layout';
import Tasks from './modules/Tasks/Tasks';
import PrivateRoute from './PrivateRoute';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/tasks" />} />
          <Route path="tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>
    )
  );

  return (
    <div className="App">
      <StyledEngineProvider>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </div>
  )
}

export default App
