import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './clockSlice';
import timerReducer from './timerSlice';
import stopwatchReducer from './stopwatchSlice';
import globalStatusReducer from './globalStatusSlice';

export const store = configureStore({
  reducer: {
    clock: clockReducer,
    timer: timerReducer,
    stopwatch: stopwatchReducer,
    globalStatus: globalStatusReducer,
  },
});

export default store; 