// src/components/StarRating.jsx
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

function StarRating({ rating, onRatingChange = null }) {
  const stars = Array(5).fill(0); // 生成5颗星

  const isReadOnly = !onRatingChange; // 判断是否为只读模式

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => {
        const starRating = index + 1; // 星星的索引从1开始
        // 判断当前星星应该是填充（黄）还是空心
        let star = null;
        if (starRating <= rating) {
          star = <Star fill="yellow" strokeWidth={0} className="w-6 h-6" />;
        } else if (starRating === Math.ceil(rating) && rating % 1 !== 0) {
          // 处理半颗星
          star = <StarHalf fill="yellow" strokeWidth={0} className="w-6 h-6" />;
        } else {
          star = <Star strokeWidth={1} className="w-6 h-6" />;
        }

        return (
          <div
            key={index}
            onClick={() => !isReadOnly && onRatingChange && onRatingChange(starRating)}
            className={`cursor-pointer`}
          >
            {star}
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;
