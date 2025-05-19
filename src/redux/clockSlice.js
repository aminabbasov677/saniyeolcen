import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  measurements: [],
};

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    setClockTime: (state, action) => {
      const { hours, minutes, seconds } = action.payload;
      state.hours = hours;
      state.minutes = minutes;
      state.seconds = seconds;
    },
    addClockMeasurement: (state) => {
      const time = [
        state.hours.toString().padStart(2, '0'),
        state.minutes.toString().padStart(2, '0'),
        state.seconds.toString().padStart(2, '0'),
      ].join(':');
      state.measurements.unshift(time);
      if (state.measurements.length > 10) state.measurements.pop(); // Son 10 ölçünü saxla
    },
  },
});

export const { setClockTime, addClockMeasurement } = clockSlice.actions;
export default clockSlice.reducer;