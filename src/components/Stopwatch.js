import { useDispatch, useSelector } from 'react-redux';
import { reset, addLap } from '../redux/stopwatchSlice';
import { useEffect } from 'react';
import MeasurementsDisplay from './Measurements';
import { forceStop } from '../redux/globalStatusSlice'; // Global forceStop action-ı

// Vaxtı formatlayan köməkçi funksiya - bu funksiya olduğu kimi qalır
function format(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map(x => x.toString().padStart(2, '0')).join(':');
}

export default function Stopwatch() {
  const dispatch = useDispatch();
  const { elapsed } = useSelector(state => state.stopwatch); // Elapsed vaxtı Redux state-dən oxu
  const laps = useSelector(state => state.stopwatch.laps); // Lap-ları Redux state-dən oxu
  const { isRunning, activePage } = useSelector(state => state.globalStatus); // Global state-dən oxu

  const handleReset = () => {
    dispatch(reset());
    // Sıfırlayandan sonra əgər Saniyəölçən işləyirdisə, global statusu da dayandırırıq
    if (isRunning && activePage === '/') { // activePage === '/' saniyəölçən səhifəsidir
         dispatch(forceStop());
    }
  };

  const handleAddLap = () => {
    dispatch(addLap());
  };

  // Elapsed vaxtı sıfırdırsa Sıfırla və Dairə düymələri passiv olsun
  const isElapsedZero = elapsed === 0;

  // Sıfırla düyməsi: yalnız vaxt sıfırdan fərqli olanda aktiv olsun
  const disableReset = isElapsedZero;
  // Dairə düyməsi: yalnız Saniyəölçən işləyəndə (isRunning true və activePage saniyəölçəndirsə) və vaxt sıfırdan fərqli olanda aktiv olsun.
  const disableLap = !isRunning || isElapsedZero;


  return (
    <div className="timer-container">
      {/* Zaman göstəricisi */}
      <div className="time-row" style={{ alignItems: 'center' }}>
        <div style={{ fontSize: '80px', margin: '0 10px' }}>{format(elapsed)}</div>
        {/* Play/Pause iconu burada YOXDUR */}
      </div>

      {/* Əlavə düymələr */}
      <div className="secondary-action-row">
        <button className="secondary-action-btn" onClick={handleReset} disabled={disableReset}>Sıfırla</button>
        <button className="secondary-action-btn" onClick={handleAddLap} disabled={disableLap}>Dairə</button>
      </div>

       {/* Lap-ları göstərən hissə */}
       <MeasurementsDisplay type="stopwatch" />
    </div>
  );
}