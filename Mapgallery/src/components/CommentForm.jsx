import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const CustomAlert = ({ message, onClose }) => (
  <div className="alert-message">
    <button onClick={onClose}>
      ✕
    </button>
    {message}
  </div>
);

function CommentForm({ onSubmit, existingComment, isEditing, onCancelEdit, comments, onEditComment,rows = 6,}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 找到當前用戶的評論
  const userComment = comments?.find(comment => comment.userId === 'user123');

  // 判斷是否應該禁用輸入
  const isDisabled = userComment && !isEditing;

  useEffect(() => {
    if (isEditing && existingComment) {
      setRating(existingComment.rating);
      setComment(existingComment.text);
      setShowAlert(false);
    }
  }, [isEditing, existingComment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setAlertMessage('請點擊星級評分及評論');
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

    if (isEditing) {
      setComment('');
      setShowAlert(false);
    } else {
      setRating(0);
      setComment('');
      setShowAlert(false);
    }

    if (isEditing && onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setShowAlert(false);
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
          onRatingChange={isDisabled ? null : (newRating) => {
            setRating(newRating);
            setShowAlert(false);
          }}
        />
      </div>

      <textarea
        value={userComment && !isEditing ? userComment.text : comment}
        onChange={handleCommentChange}
        maxLength={300}
        className="type-area"
        rows={rows}
        placeholder="分享你對這個地點的見聞..."
        disabled={isDisabled}
      />

      <div className='comment-buttom'>
        <div className="comment-length">
          {(userComment && !isEditing ? userComment.text : comment).length}/300
        </div>
        <div className="button-group">
          {isEditing && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setRating(0);
                setComment('');
                onCancelEdit && onCancelEdit();
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
                onEditComment(userComment);
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