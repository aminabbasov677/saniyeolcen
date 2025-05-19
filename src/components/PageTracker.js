import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'; // useLocation burada import olunur
import { setActivePage } from '../redux/globalStatusSlice';

// Bu komponent render olunduqda cari səhifəni Redux state-də yeniləyir
export default function PageTracker() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage(location.pathname));
  }, [location.pathname, dispatch]);

  // Bu komponent UI-da heç nə göstərmir
  return null;
}