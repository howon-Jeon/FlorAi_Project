import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import CategoryBanner from '../components/CategoryBanner';
import Navbar from '../components/Navbar';
import './styles/Shop.css';

// situation 값 → 카테고리 매핑
const situationToCategoryMap = {
  '사랑': '사랑',
  '이별 & 슬픔': '이별',
  '신비 & 고귀함': '신비',
  '우정 & 행복': '우정행복',
  '감사 & 존경': '감사존경',
  '순수 & 희망': '순수',
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.219.70:8085/products');
        console.log("받은 상품 데이터:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter(product =>
        situationToCategoryMap[product.situation] === selectedCategory
      );

  return (
    <div>
      <Header />
      <CategoryBanner
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
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
