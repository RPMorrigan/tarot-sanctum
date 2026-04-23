import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AllCards from './pages/AllCards';
import './index.css';
import './App.css';

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/' className="nav-link">
              <img className="home-icon" src="/fool-icon.svg" alt="Home" />
            </Link>
          </li>
          <li>
            <Link to='/all-cards' className="nav-link">
              <h2>The Cards</h2>
            </Link>
          </li>
          <li className='dBullet'>◊</li>
          <li>
            <Link to='/layouts' className='nav-link'>
              <h2>Layouts</h2>
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-cards' element={<AllCards />} />
      </Routes>
    </div>
  );
}