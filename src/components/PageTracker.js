import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { setActivePage } from '../redux/globalStatusSlice';

export default function PageTracker() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage(location.pathname));
  }, [location.pathname, dispatch]);

  return null;
}