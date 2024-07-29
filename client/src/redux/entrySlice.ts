import { createSlice } from '@reduxjs/toolkit';
import { Entries } from '../types/statesTypes';
import { fetchAddEntry, fetchDelEntry, fetchEntries } from './thunkActions';

type InitialState = {
  entries: Entries;
  isLoading: boolean;
};

const initialState: InitialState = {
  entries: [],
  isLoading: false,
};

const rtkSlice = createSlice({
  name: 'entrySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Получить все
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entries = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchEntries.pending, (state) => {
      state.isLoading = true;
    });

    //! Добавить одну
    builder.addCase(fetchAddEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
    });

    //! Удалить одну
    builder.addCase(fetchDelEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter((el) => el.id !== action.payload);
    });
  },
});

export default rtkSlice.reducer;
// export const {} = rtkSlice.actions;
