import { useDispatch, useSelector } from 'react-redux';
import { reset, addLap } from '../redux/stopwatchSlice';
import { useEffect } from 'react';
import MeasurementsDisplay from './Measurements';
import { forceStop } from '../redux/globalStatusSlice'; 

function format(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map(x => x.toString().padStart(2, '0')).join(':');
}

export default function Stopwatch() {
  const dispatch = useDispatch();
  const { elapsed } = useSelector(state => state.stopwatch); 
  const laps = useSelector(state => state.stopwatch.laps); 
  const { isRunning, activePage } = useSelector(state => state.globalStatus); 

  const handleReset = () => {
    dispatch(reset());
    if (isRunning && activePage === '/') { 
         dispatch(forceStop());
    }
  };

  const handleAddLap = () => {
    dispatch(addLap());
  };

  const isElapsedZero = elapsed === 0;

  const disableReset = isElapsedZero;
  const disableLap = !isRunning || isElapsedZero;


  return (
    <div className="timer-container">
      <div className="time-row" style={{ alignItems: 'center' }}>
        <div style={{ fontSize: '80px', margin: '0 10px' }}>{format(elapsed)}</div>
      </div>

      <div className="secondary-action-row">
        <button className="secondary-action-btn" onClick={handleReset} disabled={disableReset}>Sıfırla</button>
        <button className="secondary-action-btn" onClick={handleAddLap} disabled={disableLap}>Dairə</button>
      </div>

       <MeasurementsDisplay type="stopwatch" />
    </div>
  );
}