// src/components/StarRating.jsx
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { FaRegStarHalfStroke } from "react-icons/fa6";

function StarRating({ rating, onRatingChange = null }) {
  const stars = Array(5).fill(0); // 生成5顆星

  const isReadOnly = !onRatingChange; 

  return (
    <div className="rating">
      {stars.map((_, index) => {
        const starRating = index + 1; // 星星從1開始算
        // 判斷當前星星是填充還是空心
        let star = null;
        if (starRating <= rating) {
          star = <Star fill="#B595FF" strokeWidth={0} className="star-size" />;
        } else if (starRating === Math.ceil(rating) && rating % 1 !== 0) {
          //處理半星
          star = <FaRegStarHalfStroke fill="#B595FF" strokeWidth={0} className="star-size" />;
        } else {
          star = <Star strokeWidth={1} className="star-size" />;
        }

        return (
          <div
            key={index}
            onClick={() => !isReadOnly && onRatingChange && onRatingChange(starRating)}
            className="star-inarrow"
          >
            {star}
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;
