import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './styles/Basket.css';
import Add from "../assets/icons/CircleAdd.svg";
import Minuse from "../assets/icons/CircleMinus.svg";

const Basket = () => {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const isFirstRender = useRef(true); // ✅ 첫 렌더링 여부 저장

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    if (!token || !userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://192.168.219.70:8085/Basket/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('장바구니 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchCartItems();
  }, [token, userId, navigate]);

  const handleQtyChange = async (index, delta) => {
    const item = cartItems[index];
    const newCount = Math.max(1, item.cnt + delta);

    try {
      await axios.patch(
        `http://192.168.219.70:8085/Basket/${item.basketIdx}`,
        { count: newCount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCartItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, cnt: newCount } : item))
      );
    } catch (error) {
      console.error('수량 수정 실패:', error);
      alert('수량 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (basketIdx) => {
    try {
      await axios.delete(`http://192.168.219.70:8085/Basket/${basketIdx}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prev) => prev.filter((item) => item.basketIdx !== basketIdx));
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('장바구니 항목 삭제에 실패했습니다.');
    }
  };

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.flowerPrice * item.cnt, 0);

  return (
    <div>
      <Header />
      <div className="cart-container">
        {cartItems.map((item, idx) => (
          <div className="cart-item" key={item.basketIdx}>
            <img
              src={`/assets/images/flowershop/${item.flowerImg}`}
              alt={item.flowerName}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.flowerName}</div>
              <div className="cart-item-details">
                <span>수량 : {item.cnt}개</span>
                <span>가격 : {item.flowerPrice.toLocaleString()}원</span>
              </div>
              <div className="qty-control">
                <button onClick={() => handleQtyChange(idx, -1)}>
                  <img src={Minuse} alt="minus" className="qty-icon" />
                </button>
                <span>{item.cnt}</span>
                <button onClick={() => handleQtyChange(idx, 1)}>
                  <img src={Add} alt="plus" className="qty-icon" />
                </button>
              </div>
            </div>
            <button className="cart-delete" onClick={() => handleDelete(item.basketIdx)}>삭제</button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-section">
          <span>총 상품금액</span>
          <span>{getTotalPrice().toLocaleString()} 원</span>
        </div>
        <button className="purchase-btn">구매하기</button>
      </div>
      <Navbar />
    </div>
  );
};

export default Basket;
