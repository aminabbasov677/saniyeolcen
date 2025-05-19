import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elapsed: 0, // seconds
  laps: [],
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    reset: (state) => {
      state.elapsed = 0;
      state.laps = [];
    },
    tickStopwatch: (state) => { // Hər saniyə çağırmaq üçün tick reducer
      state.elapsed += 1;
    },
    addLap: (state) => {
      const h = Math.floor(state.elapsed / 3600);
      const m = Math.floor((state.elapsed % 3600) / 60);
      const s = state.elapsed % 60;
      const lapTime = [h, m, s].map(x => x.toString().padStart(2, '0')).join(':');
      state.laps.unshift(lapTime);
      if (state.laps.length > 10) state.laps.pop(); // Son 10 lap-ı saxla
    },
  },
});

export const { reset, tickStopwatch, addLap } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;