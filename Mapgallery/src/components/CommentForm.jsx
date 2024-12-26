// CommentForm.jsx
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const CustomAlert = ({ message, onClose }) => (
  <div
    className="alert-message"
    style={{
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeeba',
      borderRadius: '4px',
      color: '#856404',
      position: 'relative'
    }}
  >
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      ✕
    </button>
    {message}
  </div>
);

function CommentForm({ onSubmit, existingComment, isEditing, onCancelEdit, comments }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 找到當前用戶的評論
  const userComment = comments?.find(comment => comment.userId === 'user123');

  useEffect(() => {
    if (isEditing && existingComment) {
      setRating(existingComment.rating);
      setComment(existingComment.text);
    }
  }, [isEditing, existingComment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setAlertMessage('請選擇星級評分');
      setShowAlert(true);
      return;
    }

    if (!comment.trim()) {
      setAlertMessage('請於評論欄位中輸入文字');
      setShowAlert(true);
      return;
    }

    // 檢查是否已有評論且不是編輯模式
    if (!isEditing && userComment) {
      setRating(userComment.rating);
      setComment(userComment.text);
      setAlertMessage('您已發表過評論，可以直接編輯現有評論');
      setShowAlert(true);
      return;
    }

    onSubmit({
      rating,
      text: comment,
      timestamp: new Date(),
      userId: 'user123',
      userName: '訪客',
      userAvatar: '/images/Avatars/avatar%20(1).jpg',
      isEdited: isEditing
    });

    if (!isEditing) {
      setRating(0);
      setComment('');
    }

    if (isEditing && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="commentform">
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="comment-title">
        <h2>{isEditing ? '編輯評論' : '評論'}</h2>
        <StarRating
          rating={userComment && !isEditing ? userComment.rating : rating}
          onRatingChange={setRating}
        />
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={300}
        className="type-area"
        rows={6}
        placeholder={userComment && !isEditing ? userComment.text : "分享你對這個地點的見聞..."}
      />

      <div className='comment-buttom'>
        <div className="comment-length">
          {comment.length}/300
        </div>
        <div className="button-group">
          {isEditing && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setRating(0);
                setComment('');
                onCancelEdit && onCancelEdit(); // 確保通知父層
              }}
            >
              取消
            </button>

          )}
          <button
            type={isEditing || !userComment ? 'submit' : 'button'}
            className="submit-btn"
            onClick={() => {
              if (userComment && !isEditing) {
                // 如果已有評論但未在編輯模式，切換到編輯模式
                setRating(userComment.rating);
                setComment(userComment.text);
                onCancelEdit(true); // 觸發父層的編輯狀態
              }
            }}
          >
            {userComment && !isEditing ? '編輯評論' : (isEditing ? '更新評論' : '發表評論')}
          </button>

        </div>
      </div>
    </form>
  );
}

export default CommentForm;