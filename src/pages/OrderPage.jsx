import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./styles/OrderPage.css";

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // 장바구니에서 넘겨받은 cartItems
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    detail: "",
    phone: "",
    payMethod: "kakaopay", // 실제 결제 수단명
  });

  const userId = sessionStorage.getItem("userId");
  const nick = sessionStorage.getItem("userName");

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

  // 전화번호 하이픈 포맷 변환
  const formatPhone = (phone) => {
    if (phone.length === 11) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return phone;
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.detail || !form.phone) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp22475344"); // 본인 가맹점 식별코드

    const merchant_uid = `order_${new Date().getTime()}`;
    const totalPrice = getTotalPrice();

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "kakaopay",
        merchant_uid: merchant_uid,
        name: "플로라이 꽃 구매",
        amount: totalPrice,
        buyer_name: form.name,
        buyer_tel: formatPhone(form.phone),
        buyer_addr: `${form.address} ${form.detail}`,
      },
      function (rsp) {
        if (rsp.success) {
          // 1. 주문 정보 백엔드로 전송
          const flwNames = cartItems.map((item) => item.flowerName).join(", ");
          const orderData = {
            orderId: 0,
            id: userId,
            nick: nick,
            flwName: flwNames,
            payMethod: form.payMethod,
            merchantId: rsp.merchant_uid,
            totalPrice: totalPrice,
            addr: form.address,
            detailAddr: form.detail,
            phone: formatPhone(form.phone),
          };

          fetch("http://192.168.219.70:8085/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })
            .then((res) => res.text())
            .then((message) => {
              console.log("주문 생성 응답:", message);
              const orderIdMatch = message.match(/주문번호: (\d+)/);
              const orderId = orderIdMatch ? orderIdMatch[1] : null;

              if (orderId) {
                // 2. 결제 완료 처리 → 주문 상태 변경 및 장바구니 삭제
                return fetch(
                  `http://192.168.219.70:8085/api/orders/${orderId}/payment-success`,
                  { method: "POST" }
                );
              } else {
                throw new Error("orderId 파싱 실패");
              }
            })
            .then(() => {
              alert("주문이 완료되었습니다.");
              navigate("/order-success");
            })
            .catch((err) => {
              console.error("결제 후 처리 실패:", err);
              alert("주문 처리 중 오류 발생");
            });
        } else {
          alert("결제가 실패했습니다: " + rsp.error_msg);
        }
      }
    );
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
        <button className="purchase-btn" onClick={handleSubmit}>
          구매하기
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default OrderPage;
