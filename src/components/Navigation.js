import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/clock" className={({ isActive }) => isActive ? "active" : undefined}>Saat</NavLink>
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Saniyəölçən</NavLink>
      <NavLink to="/timer" className={({ isActive }) => isActive ? "active" : undefined}>Taymer</NavLink>
    </nav>
  );
}