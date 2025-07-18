import { useDispatch, useSelector } from 'react-redux';
import { setClockTime, addClockMeasurement } from '../redux/clockSlice';
import { useEffect } from 'react';
import MeasurementsDisplay from './Measurements';

export default function Clock() {
  const dispatch = useDispatch();
  const { hours, minutes, seconds } = useSelector(state => state.clock);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      dispatch(setClockTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      }));
    };
    updateTime(); 
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSave = () => {
    dispatch(addClockMeasurement());
  };

  return (
    <div className="timer-container">
      <div className="time-row">
        <div className="time-block">
          <span className="time-value">{hours.toString().padStart(2, '0')}</span>
        </div>
        <div className="time-block">
          <span className="time-value">{minutes.toString().padStart(2, '0')}</span>
        </div>
        <div className="time-block">
          <span className="time-value">{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
      <div className="secondary-action-row">
        <button className="secondary-action-btn" onClick={handleSave}>
          Yadda saxla
        </button>
      </div>
      <MeasurementsDisplay type="clock" /> 
    </div>
  );
}