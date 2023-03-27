import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: true,
  reducers: {
    showSidebar() {
      return true;
    },
    hideSidebar() {
      return false;
    },
  },
});

export const { showSidebar, hideSidebar } = slice.actions;

export default slice.reducer;
