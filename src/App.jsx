import { Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Aipick from './pages/Aipick';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/aipick' element={<Aipick />} />
      </Routes>
      
    </div>
  );
}

export default App;
