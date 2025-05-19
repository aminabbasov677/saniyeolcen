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
      // Səhifə dəyişəndə timer/stopwatch dayandırılsın (istəyə görə, şəkilə görə yox)
      // state.isRunning = false;
    },
    toggleRunning: (state) => {
      // Yalnız Saniyəölçən və ya Taymer aktivdirsə, işə sal/dayandır
      if (state.activePage === '/' || state.activePage === '/timer') {
         state.isRunning = !state.isRunning;
      } else {
         state.isRunning = false; // Saat səhifəsində həmişə false olsun
      }
    },
    forceStop: (state) => { // Sıfıra düşəndə dayandırmaq üçün
      state.isRunning = false;
    }
  },
});

export const { setActivePage, toggleRunning, forceStop } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;