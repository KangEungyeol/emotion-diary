import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Analysis from './pages/Analysis';
import Record from './pages/Record';
import RecordDetail from './pages/RecordDetail';
import RecordEdit from './pages/RecordEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/record" element={<Record />} />
        <Route path="/record/:id" element={<RecordDetail />} />
        <Route path="/edit-record/:id" element={<RecordEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;