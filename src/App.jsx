import { Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
      </Routes>
      
    </div>
  );
}

export default App;
