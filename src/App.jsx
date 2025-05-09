import { Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/Main';
import Aipick from './pages/Aipick';
import Login from './pages/Logins';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Result from './pages/Result';
import Shop from './pages/Shop';
import Floword from './pages/Floword';

import ProductDetail from './pages/ProductDetail';
import Basket from './pages/Basket';
import OrderPage from './pages/OrderPage';
import OrderSucces from './pages/OrderSucces';
import OrderHistory from './pages/OrderHistory';
import AnniversaryPage from './pages/AnniversaryPage';


function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/aipick' element={<Aipick />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/Singup' element={<Signup />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/result' element={<Result />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/floword' element={<Floword />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/basket/:userId' element={<Basket />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/order-success' element={<OrderSucces />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='/anniversary' element={<AnniversaryPage />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
