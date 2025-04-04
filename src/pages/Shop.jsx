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
  const [searchQuery, setSearchQuery] = useState('');

  const handleScrollToTop = () => {
    const container = document.querySelector(".app-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  // ✅ 카테고리 + 검색 통합 필터
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      situationToCategoryMap[product.situation] === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.situation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Header />

      <CategoryBanner
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 검색창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="찾고 싶은 꽃을 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 상품 목록 */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              className="product-image"
              src={"/assets/images/flowershop/" + product.image}
              alt={product.name}
            />
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price.toLocaleString()}원</div>
          </div>
        ))}
      </div>

      {/* 항상 보이는 위로가기 버튼 */}
      <button className="scroll-to-top" onClick={handleScrollToTop}>
        ↑
      </button>

      <Navbar />
    </div>
  );
};

export default Shop;
