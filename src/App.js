// src/App.js
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector import edildi
import { setActivePage } from './redux/globalStatusSlice';
import './App.css'; // CSS faylını import et

import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import Navigation from './components/Navigation';
import GlobalPlayPauseButton from './components/GlobalPlayPauseButton';
import PageTracker from './components/PageTracker';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activePage } = useSelector(state => state.globalStatus); // activePage state-dən oxunur

  // Aktiv səhifəni Redux state-də yenilə
  useEffect(() => {
    dispatch(setActivePage(location.pathname));
  }, [location.pathname, dispatch]);

  // Global Play/Pause düyməsini yalnız Saat səhifəsində olmadıqda göstər
  const showGlobalPlayPause = activePage !== '/clock';

  return (
    // BrowserRouter index.js-dədir
    <> {/* Fragment */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <Navigation />
         {/* Şərtli render: Saat səhifəsində olmadıqda göstər */}
         {showGlobalPlayPause && <GlobalPlayPauseButton />}
      </div>
      <Routes> {/* Routes komponenti */}
        <Route path="/" element={<Stopwatch />} /> {/* Route-lar */}
        <Route path="/clock" element={<Clock />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
      <PageTracker /> {/* useLocation burada istifadə olunur */}
    </>
  );
}

export default App;