import { useDispatch, useSelector } from 'react-redux';
import { toggleRunning, forceStop } from '../redux/globalStatusSlice';
import { useEffect, useRef } from 'react';
import { tickStopwatch } from '../redux/stopwatchSlice';
import { tickTimer, resetTimer } from '../redux/timerSlice';
import store from '../redux/store'; 

const PlayIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36">
    <path d="M11 8.83V27.17C11 28.38 12.25 29.16 13.3 28.55L28.8 19.38C29.7 18.85 29.7 17.15 28.8 16.62L13.3 7.45C12.25 6.84 11 7.62 11 8.83Z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36">
    <rect x="10" y="8" width="5" height="20" rx="1"/>
    <rect x="21" y="8" width="5" height="20" rx="1"/>
  </svg>
);

export default function GlobalPlayPauseButton() {
  const dispatch = useDispatch();
  const { activePage, isRunning } = useSelector(state => state.globalStatus);
  const timerState = useSelector(state => state.timer);
  const intervalRef = useRef();

  const isTimerZero = timerState.hours === 0 && timerState.minutes === 0 && timerState.seconds === 0;
  const isClockPage = activePage === '/clock';

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    if (activePage === '/' || activePage === '/timer') {
        intervalRef.current = setInterval(() => {
            const currentState = store.getState();
            const currentTimerState = currentState.timer;

            if (activePage === '/') { // Saniyəölçən
                 dispatch(tickStopwatch());
            } else if (activePage === '/timer') { // Taymer
                 if (currentTimerState.hours === 0 && currentTimerState.minutes === 0 && currentTimerState.seconds === 0) {
                     dispatch(forceStop());
                     clearInterval(intervalRef.current);
                     return;
                 }
                dispatch(tickTimer());
            }
        }, 1000);
    }


    return () => clearInterval(intervalRef.current);
  }, [isRunning, activePage, dispatch]);


  useEffect(() => {
      if (activePage === '/timer' && isTimerZero && isRunning) {
           dispatch(forceStop());
           dispatch(resetTimer());
      }
  }, [isTimerZero, activePage, isRunning, dispatch]);


  const handleToggleRunning = () => {
      if (activePage === '/timer' && isTimerZero && !isRunning) return;
      dispatch(toggleRunning());
  };

  const isDisabled = isClockPage || (activePage === '/timer' && isTimerZero && !isRunning);


  return (
    <button
      className="icon-btn"
      onClick={handleToggleRunning}
      disabled={isDisabled}
      aria-label={isRunning ? "Dayan" : "Başla"}
      style={{marginLeft: '20px'}} // Yalnız sol tərəfdən boşluq veririk, auto silindi
    >
      {isRunning ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}