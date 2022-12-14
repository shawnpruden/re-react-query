import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DependentQueries from './pages/DependentQueries';
import DynamicParallel from './pages/DynamicParallel';

import Home from './pages/Home';
import InfiniteQueries from './pages/InfiniteQueries';
import PaginatedQueriesPage from './pages/PaginatedQueries';
import ParallelQueries from './pages/ParallelQueries';
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
          <Route path="/rq-infinite" element={<InfiniteQueries />} />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
          <Route
            path="/rq-dependent"
            element={<DependentQueries email="dev.shawn@yahoo.com" />}
          />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallel ids={[1, 3]} />}
          />
          <Route path="/rq-parallel" element={<ParallelQueries />} />
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
