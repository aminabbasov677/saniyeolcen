import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: '/', // Default olaraq Saniyəölçən
  isRunning: false,
};

const globalStatusSlice = createSlice({
  name: 'globalStatus',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
      
    },
    toggleRunning: (state) => {
      if (state.activePage === '/' || state.activePage === '/timer') {
         state.isRunning = !state.isRunning;
      } else {
         state.isRunning = false; 
      }
    },
    forceStop: (state) => { 
      state.isRunning = false;
    }
  },
});

export const { setActivePage, toggleRunning, forceStop } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;