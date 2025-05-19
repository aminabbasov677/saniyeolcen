import { useDispatch, useSelector } from 'react-redux';
import {
  incrementHours, decrementHours,
  incrementMinutes, decrementMinutes,
  incrementSeconds, decrementSeconds,
  setTimerTime, addTimerMeasurement, resetTimer
} from '../redux/timerSlice';
import { useRef, useState, useEffect } from 'react'; // useState silindi
import MeasurementsDisplay from './Measurements';

export default function Timer() {
  const dispatch = useDispatch();
  const { hours, minutes, seconds } = useSelector(state => state.timer); // Timer state-dən oxu
  const timerMeasurements = useSelector(state => state.timer.measurements); // Timer ölçülərini oxu
  const { activePage, isRunning } = useSelector(state => state.globalStatus); // Global state-dən oxu

  const isZero = hours === 0 && minutes === 0 && seconds === 0;

  // Taymerin dəyərlərini artıran/azaldan düymələrin aktivliyi
  const disableTimeControls = isRunning; // Timer işləyirsə passiv olsun


  const handleSave = () => {
    dispatch(addTimerMeasurement());
  };

  return (
    <div className="timer-container">
      <div className="time-row" style={{ alignItems: 'center' }}>
        <div className="time-block">
          <span className="time-value">{hours.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementHours())} disabled={disableTimeControls}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementHours())} disabled={disableTimeControls}>-</button>
          </div>
        </div>
        <div className="time-block">
          <span className="time-value">{minutes.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementMinutes())} disabled={disableTimeControls}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementMinutes())} disabled={disableTimeControls}>-</button>
          </div>
        </div>
        <div className="time-block">
          <span className="time-value">{seconds.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementSeconds())} disabled={disableTimeControls}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementSeconds())} disabled={disableTimeControls}>-</button>
          </div>
        </div>
        {/* Play/Pause iconu burada yoxdur, GlobalPlayPauseButton komponentindədir */}
      </div>
      {/* Əlavə düymələr */}
      <div className="secondary-action-row">
         <button className="secondary-action-btn" onClick={handleSave} disabled={isZero}>
          Yadda saxla
        </button>
        {/* Timer üçün sıfırla düyməsi */}
        {/* Sıfırla düyməsi yalnız işləməyəndə və vaxt sıfırdan fərqli olanda aktiv olsun */}
         <button className="secondary-action-btn" onClick={() => dispatch(resetTimer())} disabled={isRunning || isZero}>Sıfırla</button>
      </div>
      <MeasurementsDisplay type="timer" /> {/* Timer ölçülərini göstər */}
    </div>
  );
}