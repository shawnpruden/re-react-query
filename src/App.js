import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import RQSuperhero from './pages/RQSuperhero';
import RQSuperheroes from './pages/RQSuperheroes';
import Superheroes from './pages/Superheroes';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/rq-super-heroes/:id" element={<RQSuperhero />} />
          <Route path="/super-heroes" element={<Superheroes />} />
          <Route path="/rq-super-heroes" element={<RQSuperheroes />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
