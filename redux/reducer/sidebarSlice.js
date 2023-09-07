import { createSlice } from '@reduxjs/toolkit';

const initialState = { open: false };

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
});

export const { open, close } = sidebarSlice.actions;
export default sidebarSlice.reducer;
