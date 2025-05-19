import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  running: false,
  elapsed: 0, // seconds
  laps: [],
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    start: (state) => { state.running = true; },
    stop: (state) => { state.running = false; },
    reset: (state) => {
      state.running = false;
      state.elapsed = 0;
      state.laps = [];
    },
    tick: (state) => {
      if (state.running) state.elapsed += 1;
    },
    addLap: (state) => {
      state.laps.unshift(state.elapsed);
      if (state.laps.length > 10) state.laps.pop();
    },
  },
});

export const { start, stop, reset, tick, addLap } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;