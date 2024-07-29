import { AsyncThunk, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { Entries, Entry, User } from '../types/statesTypes';
import { Inputs, InputsAuth, RefreshRes } from '../types/types';

type AsyncThunkConfig = {
  dispatch?: Dispatch;
};

type AuthResponse = {
  user: User;
  accessToken: string;
};

//! Временный вариант типизации ошибки createAsyncThunk
export const fetchEntries: AsyncThunk<Entries, void, AsyncThunkConfig> =
  createAsyncThunk('entries/all', async () => {
    const response = await axiosInstance.get<Entries>(
      `${import.meta.env.VITE_API}/tasks`
    );
    return response.data;
  });

export const fetchAddEntry: AsyncThunk<Entry, Inputs, AsyncThunkConfig> =
  createAsyncThunk('entries/add', async (inputs: Inputs) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/tasks`,
      inputs
    );
    return response.data;
  });

export const fetchDelEntry: AsyncThunk<number, number, AsyncThunkConfig> =
  createAsyncThunk('entries/del', async (id: number) => {
    await axiosInstance.delete(`${import.meta.env.VITE_API}/tasks/${id}`);
    return id;
  });

export const fetchAuthUser: AsyncThunk<
  AuthResponse,
  { inputs: InputsAuth; type: string },
  AsyncThunkConfig
> = createAsyncThunk('users/add', async (data) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API}/auth/${data.type}`,
    data.inputs
  );
  return response.data;
});

export const fetchLogoutUser: AsyncThunk<boolean, void, AsyncThunkConfig> =
  createAsyncThunk('users/logout', async () => {
    await axiosInstance.get(`${import.meta.env.VITE_API}/auth/logout`);
    return true;
  });

  export const fetchRefresh: AsyncThunk<AuthResponse, void, AsyncThunkConfig> = 
  createAsyncThunk('users/id', async () => {
    const response = await axiosInstance.get<RefreshRes>(`api/v1/tokens/refresh`);
    return response.data;
  });