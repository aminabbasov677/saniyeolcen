import { useDispatch, useSelector } from 'react-redux';
import {
  incrementHours, decrementHours,
  incrementMinutes, decrementMinutes,
  incrementSeconds, decrementSeconds,
  setTimerTime, addTimerMeasurement, resetTimer
} from '../redux/timerSlice';
import { useRef, useState, useEffect } from 'react';

export default function Timer() {
  const dispatch = useDispatch();
  const { hours, minutes, seconds, measurements } = useSelector(state => state.timer);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef();

  const isZero = hours === 0 && minutes === 0 && seconds === 0;

  useEffect(() => {
    if (!running) return;
    if (isZero) {
      setRunning(false);
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        dispatch(decrementSeconds());
      } else if (minutes > 0) {
        dispatch(setTimerTime({ hours, minutes: minutes - 1, seconds: 59 }));
      } else if (hours > 0) {
        dispatch(setTimerTime({ hours: hours - 1, minutes: 59, seconds: 59 }));
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, hours, minutes, seconds, dispatch, isZero]);

  const handleStart = () => {
    if (running || isZero) return;
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleSave = () => {
    dispatch(addTimerMeasurement());
  };

  return (
    <div className="timer-container">
      <div className="time-row">
        <div className="time-block">
          <span className="time-value">{hours.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementHours())} disabled={running}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementHours())} disabled={running}>-</button>
          </div>
        </div>
        <div className="time-block">
          <span className="time-value">{minutes.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementMinutes())} disabled={running}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementMinutes())} disabled={running}>-</button>
          </div>
        </div>
        <div className="time-block">
          <span className="time-value">{seconds.toString().padStart(2, '0')}</span>
          <div className="time-controls">
            <button className="time-btn" onClick={() => dispatch(incrementSeconds())} disabled={running}>+</button>
            <button className="time-btn" onClick={() => dispatch(decrementSeconds())} disabled={running}>-</button>
          </div>
        </div>
      </div>
      <div className="action-row">
        <button
          className={`action-btn ${running ? 'stop' : 'start'}`}
          onClick={running ? handleStop : handleStart}
          disabled={isZero}
        >
          {running ? 'Dayan' : 'Başla'}
        </button>
        <button className="action-btn" onClick={handleSave} disabled={isZero}>
          Yadda saxla
        </button>
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3>Keçmiş ölçmələr</h3>
        {measurements.length === 0 ? <div>Yoxdur</div> :
          <ul className="measurements-list">
            {measurements.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        }
      </div>
    </div>
  );
}