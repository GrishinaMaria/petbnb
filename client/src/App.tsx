import './App.css';
import Root from './Root';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axiosInstance, { setAccessToken } from './axiosInstance';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import HomePage from './pages/HomePage/HomePage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRefresh } from './redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import InfoPetsitterPage from './pages/InfoPetsitterPage/InfoPetsitterPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
 
import 'bootstrap/dist/css/bootstrap.min.css';

import PeSittersList from './components/PetSittersList/PeSittersList';
import SittersMap from './components/SittersMap/SittersMap';
import NewAccountSitter from './pages/Account/NewAccountSitter';
import NewAccountOwner from './pages/Account/NewAccountOwner';
import AccountSitterPage from './pages/AccountSitterPage/AccountSitterPage';

import Room from './pages/Room/Room';

import ChatPage from './pages/ChatPage/ChatPage';


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
          path: '/chat',
          //element: <ProtectedRoute isAllowed={!!user} redirect="/login"><ChatPage user={user} /></ProtectedRoute>,
          element: <ChatPage />,
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
          path: '/account/owner',
          element: (
            <ProtectedRoute isAllowed={user?.role === 'owner'}>
              <NewAccountOwner user={user} />
            </ProtectedRoute>
          ),
        },
        { path: '*', element: <NotFoundPage /> },

         {
          path: '/search',
          element: <PeSittersList/>,
        },
         {
          path: '/account/sitter',
           element: 
             (
             <ProtectedRoute isAllowed={user?.role === 'sitter'}>
               <AccountSitterPage user={user} />
               </ProtectedRoute>
               ),
        },
        {
          path: '/aboutpetsitter/:sitterId',
          element: <InfoPetsitterPage/>,
        },
        {
          path: '/room/:id',
          element: <Room />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
