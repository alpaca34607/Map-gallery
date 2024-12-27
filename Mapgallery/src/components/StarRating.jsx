// src/components/StarRating.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { FaRegStarHalfStroke } from "react-icons/fa6";

function StarRating({ rating, onRatingChange = null }) {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = Array(5).fill(0);
  const isReadOnly = !onRatingChange;

  const handleMouseEnter = (starRating) => {
    if (!isReadOnly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starRating) => {
    if (!isReadOnly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  

  return (
    <div 
      className="rating"
      onMouseLeave={handleMouseLeave}
    >
      {stars.map((_, index) => {
        const starRating = index + 1;
        let star = null;
        
        
        const currentRating = hoverRating || rating;

        if (starRating <= currentRating) {
          // 實心星星
          star = <Star fill="#B595FF" strokeWidth={0} className="star-size" />;
        } else if (starRating === Math.ceil(currentRating) && currentRating % 1 !== 0) {
          // 半星
          star = <FaRegStarHalfStroke fill="#B595FF" strokeWidth={0} className="star-size" />;
        } else {
          // 空心星星
          star = <Star strokeWidth={1} className="star-size emty-star" />;
        }

        return (
          <div
            key={index}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            className="star-inarrow"
            style={{ cursor: isReadOnly ? 'default' : 'pointer' }}
          >
            {star}
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;