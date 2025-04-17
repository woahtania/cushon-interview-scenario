import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
  <div className="navbar-component">
    <Link to={{ pathname: '/login' }}>Login</Link>
  </div>
);

export {
  Navbar,
};
