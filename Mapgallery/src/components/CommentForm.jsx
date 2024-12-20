// src/components/CommentForm.jsx
import React, { useState } from 'react';
import StarRating from './StarRating';

function CommentForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('請選擇星級評分');
      return;
    }
    onSubmit({
      rating,
      text: comment,
      timestamp: new Date(),
      userId: 'user123', // 从用户认证系统中获取的用户 ID
      userName: '訪客',  // 当前用户的用户名
      userAvatar: '/default-avatar.png' // 当前用户的头像
    });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block mb-2 font-medium">評分</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div>
        <label className="block mb-2 font-medium">評論</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={300}
          className="w-full p-2 border rounded-md"
          rows={4}
          placeholder="分享你對這個地點的見聞..."
        />
        <div className="text-sm text-gray-500 text-right">
          {comment.length}/300
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        發表評論
      </button>
    </form>
  );
}

export default CommentForm;
