import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './styles/ProductDetail.css';
import Add from "../assets/icons/CircleAdd.svg";
import Minuse from "../assets/icons/CircleMinus.svg";

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 상품 id 추출
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.219.70:8085/ProductsDetail/products/${id}`);
        console.log('받은 상품 데이터:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('상품 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ product 또는 product.price가 정의되지 않았을 경우
  if (!product || typeof product.price !== 'number') {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <Header />

      <div className="product-detail">
        <img
          className="product-detail-image"
          src={`/assets/images/flowershop/${product.image}`}
          alt={product.name}
        />
        <div className="product-detail-name">{product.name}</div>
        <div className="product-detail-price">{product.price.toLocaleString()}원</div>

        <div className="product-detail-quantity">
          <span>수량 선택</span>
          <div className="quantity-controls">
            <button onClick={decreaseQty}><img src={Minuse} alt="minuse" className="minuse" /></button>
            <span>{quantity}개</span>
            <button onClick={increaseQty}><img src={Add} alt="add" className="add" /></button>
          </div>
        </div>

        <div className="product-detail-buttons">
          <button className="buy-btn">바로 구매</button>
          <button className="cart-btn">장바구니 담기</button>
        </div>

        <div className="product-detail-info">
          <strong>상세정보 (상품 정보 제공)</strong>
          <p>계절 : {getSeasons(product)}</p>
          <p>향기 : {product.flwSml}</p>
          <p>상황 : {product.situation}</p>
          <p>꽃말 : {product.flwLang}</p>
          <p>알러지 유무 : {product.allergy=== "1" ? "O" : "X"}</p>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

// 계절 필드 배열로 변환
const getSeasons = (product) => {
  const seasons = [];
  if (product.spring) seasons.push('봄');
  if (product.summer) seasons.push('여름');
  if (product.fall) seasons.push('가을');
  if (product.winter) seasons.push('겨울');
  return seasons.join(', ');
};

export default ProductDetail;
