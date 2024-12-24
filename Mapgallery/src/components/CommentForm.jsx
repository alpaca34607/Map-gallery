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
      userId: 'user123', //以下需從用戶登入資料取得
      userName: '訪客',  
      userAvatar: '/default-avatar.png' 
    });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="commentform">
   
      <div>
        <div className="comment-title">
        <h2>評論</h2>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={300}
          className="type-area"
          rows={6}
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
