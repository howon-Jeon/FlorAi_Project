import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./styles/OrderPage.css";

const OrderPage = () => {
  const { state } = useLocation(); // 장바구니에서 넘겨받은 cartItems
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    detail: "",
    phone: "",
    payMethod: "CARD",
  });

  useEffect(() => {
    if (state && state.cartItems) {
      setCartItems(state.cartItems);
    }
  }, [state]);

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.flowerPrice * item.cnt, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.detail || !form.phone) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    // TODO: 백엔드로 주문 정보 POST → 나중에 Portone API 연동 예정
    console.log("주문 요청:", { form, cartItems });
  };

  return (
    <div>
      <Header />
      <div className="order-container">
        {cartItems.map((item) => (
          <div key={item.basketIdx} className="order-item">
            <img
              src={`/assets/images/flowershop/${item.flowerImg}`}
              alt={item.flowerName}
              className="order-item-image"
            />
            <div>
              <div className="order-item-name">{item.flowerName}</div>
              <div>수량 : {item.cnt}개</div>
              <div>가격 : {item.flowerPrice.toLocaleString()}원</div>
            </div>
          </div>
        ))}

        <hr />

        <div className="shipping-section">
          <h3>배송 옵션</h3>
          <input
            name="name"
            placeholder="이름을 입력해주세요."
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="도로명, 건물명을 입력해주세요."
            value={form.address}
            onChange={handleChange}
          />
          <input
            name="detail"
            placeholder="상세주소를 입력해주세요"
            value={form.detail}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        
      </div>

      <div className="cart-footer">
          <div className="total-section">
            <span>총 상품금액</span>
            <span>{getTotalPrice().toLocaleString()} 원</span>
          </div>
          <button className="purchase-btn" onClick={handleSubmit}>구매하기</button>
        </div>
      <Navbar />
    </div>
  );
};

export default OrderPage;
