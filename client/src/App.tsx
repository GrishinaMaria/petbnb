import './App.css';
import Root from './Root';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setAccessToken } from './axiosInstance';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import HomePage from './pages/HomePage/HomePage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRefresh } from './redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';

import InfoPetsitterPage from './pages/InfoPetsitterPage/InfoPetsitterPage';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import AccountOwner from './pages/Account/AccountOwner';
import AccountSitter from './pages/Account/AccountSitter';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
const user = useAppSelector((store) => store.userSlice.user);
const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRefresh())
      .then(unwrapResult)
      .then((result) => {
        setAccessToken(result.accessToken);
      });
  }, []);
  console.log("********user", user);
  
  const userr ={...user, role: 'sitter'}
 
  console.log("********userr", userr);
 
 
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: user.username ? (
            <HomePage />
          ) : (
            <p>Зарегистрируйтесь или войдите</p>
          ),
        },
        {
          path: '/signin',
          element: <SigninPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },

        {
          path: '/petsitterinfo',
          element: <InfoPetsitterPage />,
        },

        // {
        //   element: <ProtectedRoute isAllowed={user?.role === 'owner'} />,
        //   children: [
        //     {
        //       path: '/account',
        //       element: <AccountOwner user={user}  />,
        //     },
        //   ],
        // },
        // {
        //   element: <ProtectedRoute isAllowed={user?.role === 'sitter'} />,
        //   children: [
        //     {
        //       path: '/account',
        //       element: <AccountSitter user={user}  />,
        //     },
        //   ],
        // },
        {
          path: '/account/owner',
          element: (
            <ProtectedRoute isAllowed={userr?.role === 'owner'}>
              <AccountOwner user={user} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/account/sitter',
          element: (
            <ProtectedRoute isAllowed={userr?.role === 'sitter'}>
              <AccountSitter user={user} />
            </ProtectedRoute>
          ),
        },
        { path: '*', element: <NotFoundPage /> },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
