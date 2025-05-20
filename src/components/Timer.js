import { useDispatch, useSelector } from 'react-redux';
import {
  incrementHours, decrementHours,
  incrementMinutes, decrementMinutes,
  incrementSeconds, decrementSeconds,
  setTimerTime, addTimerMeasurement, resetTimer
} from '../redux/timerSlice';
import { useRef, useState, useEffect } from 'react'; 
import MeasurementsDisplay from './Measurements';

export default function Timer() {
  const dispatch = useDispatch();
  const { hours, minutes, seconds } = useSelector(state => state.timer); 
  const timerMeasurements = useSelector(state => state.timer.measurements); 
  const { activePage, isRunning } = useSelector(state => state.globalStatus); 

  const isZero = hours === 0 && minutes === 0 && seconds === 0;

  const disableTimeControls = isRunning; 

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
      </div>
      <div className="secondary-action-row">
         <button className="secondary-action-btn" onClick={handleSave} disabled={isZero}>
          Yadda saxla
         </button>
         <button className="secondary-action-btn" onClick={() => dispatch(resetTimer())} disabled={isZero}>Sıfırla</button>
      </div>
      <MeasurementsDisplay type="timer" /> 
    </div>
  );
}