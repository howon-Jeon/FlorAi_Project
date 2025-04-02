import { Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Aipick from './pages/Aipick';
import Login from './pages/Logins';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/aipick' element={<Aipick />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Singup' element={<Signup />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      
    </div>
  );
}

export default App;
