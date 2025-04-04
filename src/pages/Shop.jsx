import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import CategoryBanner from '../components/CategoryBanner';
import Navbar from '../components/Navbar';
import './styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.219.70:8085/products'); // 실제 백엔드 주소로 변경
        console.log("받은 상품 데이터:", response.data); // ✅ 콘솔 출력
        setProducts(response.data);
      } catch (error) {
        console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <CategoryBanner />

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price.toLocaleString()}원</div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default Shop;
