import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './styles/ProductDetail.css';
import Add from "../assets/icons/CircleAdd.svg";
import Minuse from "../assets/icons/CircleMinus.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.219.70:8085/ProductsDetail/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('상품 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId || !token) {
      alert("로그인이 필요합니다.");
      sessionStorage.setItem("redirectAfterLogin", `/product/${id}`);
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`http://192.168.219.70:8085/Basket/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isAlreadyInCart = res.data.some(item => item.flowerIdx === product.id);

      if (isAlreadyInCart) {
        alert("이미 장바구니에 담은 상품입니다.");
        return;
      }

      await axios.post(
        `http://192.168.219.70:8085/Basket/BasketAdd/${userId}`,
        {
          userId: userId,
          flowerId: product.id,
          count: quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가 중 오류가 발생했습니다.");
    }
  };

  const handleBuyNow = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      sessionStorage.setItem("redirectAfterLogin", `/product/${id}`);
      navigate("/login");
      return;
    }

    const orderItem = {
      basketIdx: null,
      flowerImg: product.image,
      flowerName: product.name,
      flowerPrice: product.price,
      cnt: quantity,
    };

    navigate("/order", {
      state: {
        cartItems: [orderItem],
      },
    });
  };

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
            <button onClick={decreaseQty}>
              <img src={Minuse} alt="minus" className="minuse" />
            </button>
            <span>{quantity}개</span>
            <button onClick={increaseQty}>
              <img src={Add} alt="add" className="add" />
            </button>
          </div>
        </div>

        <div className="product-detail-buttons">
          <button className="buy-btn" onClick={handleBuyNow}>바로 구매</button>
          <button className="cart-btn" onClick={handleAddToCart}>장바구니 담기</button>
        </div>

        <div className="product-detail-info">
          <strong>상세정보 (상품 정보 제공)</strong>
          <p>계절 : {getSeasons(product)}</p>
          <p>향기 : {product.flwSml}</p>
          <p>상황 : {product.situation}</p>
          <p>꽃말 : {product.flwLang}</p>
          <p>색깔 : {product.color}</p>
          <p>알러지 유무 : {product.allergy === "1" ? "O" : "X"}</p>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

const getSeasons = (product) => {
  const seasons = [];
  if (product.spring) seasons.push('봄');
  if (product.summer) seasons.push('여름');
  if (product.fall) seasons.push('가을');
  if (product.winter) seasons.push('겨울');
  return seasons.join(', ');
};

export default ProductDetail;
