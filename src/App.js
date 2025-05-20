import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setActivePage } from './redux/globalStatusSlice';
import './App.css'; 
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import Navigation from './components/Navigation';
import GlobalPlayPauseButton from './components/GlobalPlayPauseButton';
import PageTracker from './components/PageTracker';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activePage } = useSelector(state => state.globalStatus);

  useEffect(() => {
    dispatch(setActivePage(location.pathname));
  }, [location.pathname, dispatch]);

  const showGlobalPlayPause = activePage !== '/clock';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <Navigation />
         {showGlobalPlayPause && <GlobalPlayPauseButton />}
      </div>
      <Routes> 
        <Route index element={<Stopwatch />} /> {/* Use index for default route */}
        <Route path="/clock" element={<Clock />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
      <PageTracker /> 
    </>
  );
}

export default App;