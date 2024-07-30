import './App.css';
import Root from './Root';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setAccessToken } from './axiosInstance';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import HomePage from './pages/HomePage/HomePage';
import HooksPage from './pages/HooksPage/HooksPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchRefresh } from './redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import PeSittersList from './components/PetSittersList/PeSittersList';
import SittersMap from './components/SittersMap/SittersMap';

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
          path: '/hooks',
          element: <HooksPage />,
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
          path: '/search',
          element: <PeSittersList/>,
        },
     
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
