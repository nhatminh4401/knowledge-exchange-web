import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './app/store.js';

import Home from './pages/Home';

import './reset.css';
import './index.css';
import About from './pages/About/index.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile.jsx';
import QuestionDetail from './pages/QuestionDetail';
import Admin from './pages/Admin/index.jsx';
import CreateQuestion from './pages/CreateQuestion/index.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/about',
    element: <About />,
  },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <Admin /> },
  { path: '/register', element: <Register /> },
  { path: '/profile/:id', element: <Profile /> },
  { path: '/question/create', element: <CreateQuestion /> },
  { path: '/question/:id', element: <QuestionDetail /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
