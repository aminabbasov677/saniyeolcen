import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  measurements: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementHours: (state) => { state.hours = (state.hours + 1) % 24; },
    decrementHours: (state) => { state.hours = (state.hours - 1 + 24) % 24; },
    incrementMinutes: (state) => { state.minutes = (state.minutes + 1) % 60; },
    decrementMinutes: (state) => { state.minutes = (state.minutes - 1 + 60) % 60; },
    incrementSeconds: (state) => { state.seconds = (state.seconds + 1) % 60; },
    decrementSeconds: (state) => { state.seconds = (state.seconds - 1 + 60) % 60; },
    setTimerTime: (state, action) => {
      const { hours, minutes, seconds } = action.payload;
      state.hours = hours;
      state.minutes = minutes;
      state.seconds = seconds;
    },
    addTimerMeasurement: (state) => {
      const time = [
        state.hours.toString().padStart(2, '0'),
        state.minutes.toString().padStart(2, '0'),
        state.seconds.toString().padStart(2, '0'),
      ].join(':');
      state.measurements.unshift(time);
      if (state.measurements.length > 10) state.measurements.pop(); 
    },
    resetTimer: (state) => { 
      state.hours = 0;
      state.minutes = 0;
      state.seconds = 0;
    },
    tickTimer: (state) => { 
      if (state.seconds > 0) {
        state.seconds -= 1;
      } else if (state.minutes > 0) {
        state.minutes -= 1;
        state.seconds = 59;
      } else if (state.hours > 0) {
        state.hours -= 1;
        state.minutes = 59;
        state.seconds = 59;
      }
    },
  },
});

export const {
  incrementHours, decrementHours,
  incrementMinutes, decrementMinutes,
  incrementSeconds, decrementSeconds,
  setTimerTime, addTimerMeasurement, resetTimer, tickTimer
} = timerSlice.actions;

export default timerSlice.reducer;