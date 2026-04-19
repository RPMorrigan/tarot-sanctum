import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AllCards from './pages/AllCards';

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='AllCards'>The Cards</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element='{<Home />}' />
        <Route path='/' element='{<AllCards />' />
      </Routes>
    </div>
  );
}