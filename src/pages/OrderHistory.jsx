import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./styles/OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.219.70:8085/order/detail/${userId}`);
        
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        setOrders(sortedOrders);
      } catch (error) {
        console.error("주문 내역 조회 실패:", error);
        alert("주문 내역을 불러오는 데 실패했습니다.");
      }
    };
  
    fetchOrders();
  }, [userId]);

  const getDeliveryStatus = (status) => {
    switch (status) {
      case 0:
        return "결제완료";
      case 1:
        return "배송준비";
      case 2:
        return "배송중";
      case 3:
        return "배송완료";
      default:
        return "알 수 없음";
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toISOString().slice(0, 10);
  };

  const formatProductName = (flwName) => {
    const items = flwName.split(",");
    if (items.length === 1) return items[0];
    return `${items[0]} 외 ${items.length - 1}개`;
  };

  return (
    
    <div>
      <Header />
      <div className="order-history-container">
  
        {orders.map((order, idx) => (
          <div key={idx} className="order-box">
            <p><strong>주문번호</strong> {order.merchantId}</p>
            <p><strong>상품명</strong> {formatProductName(order.flwName)}</p>
            <p><strong>주문자</strong> {order.nick}</p>
            <p><strong>주문일</strong> {formatDate(order.createdAt)}</p>
            <p><strong>결제금액</strong> {order.totalPrice.toLocaleString()}원</p>
            <p><strong>배송상태</strong> {getDeliveryStatus(order.paymentStatus)}</p>
          </div>
        ))}
  
        
      </div>
      <Navbar />
    </div>
  );
};

export default OrderHistory;
