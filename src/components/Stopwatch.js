import { useDispatch, useSelector } from 'react-redux';
import { start, stop, reset, tick, addLap } from '../redux/stopwatchSlice';
import { useEffect, useRef } from 'react';

function format(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map(x => x.toString().padStart(2, '0')).join(':');
}

export default function Stopwatch() {
  const dispatch = useDispatch();
  const { running, elapsed, laps } = useSelector(state => state.stopwatch);
  const intervalRef = useRef();

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => dispatch(tick()), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, dispatch]);

  return (
    <div className="timer-container">
      <div style={{ fontSize: '80px', margin: '30px 0' }}>{format(elapsed)}</div>
      <div className="action-row">
        <button className={`action-btn ${running ? 'stop' : 'start'}`}
          onClick={() => dispatch(running ? stop() : start())}>
          {running ? 'Dayan' : 'Başla'}
        </button>
        <button className="action-btn" onClick={() => dispatch(reset())}>Sıfırla</button>
        <button className="action-btn" onClick={() => dispatch(addLap())} disabled={!running}>Dairə</button>
      </div>
      <div style={{ marginTop: '40px' }}>
        <h3>Dairələr</h3>
        {laps.length === 0 ? <div>Yoxdur</div> :
          <ul className="measurements-list">
            {laps.map((l, i) => <li key={i}>{format(l)}</li>)}
          </ul>
        }
      </div>
    </div>
  );
}