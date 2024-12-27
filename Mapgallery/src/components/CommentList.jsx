import React, { useState } from "react";
import StarRating from "./StarRating";

function CommentList({ comments, onEditComment }) {
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  if (!comments || comments.length === 0) {
    return <div className="no-comments">暫無評論</div>;
  }

  return (
    <div className="commentlist">
      {sortedComments.map((comment) => (
        <div key={comment.id} className="solocomment">
          <div className="preuser-data">
            <div className="preuser-info">
              <div className="avatar">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                />
              </div>
              <span className="user-name">{comment.userName}</span>
              {comment.userId === 'user123' && ( // 確認是否為當前用戶的評論
              <button
                onClick={() => onEditComment(comment)}
                className="edit-btn"
              >▪︎編輯</button>
            )}
            </div>

            <div className="rating">
              <div className="preuser-rating">
                <StarRating rating={comment.rating}/>
              </div>
            </div>
          </div>
          
          <p className="comment-text">{comment.text}</p>
          
          <div className="comment-footer">
          
            <div className="comment-date">
              {new Date(comment.timestamp).toLocaleDateString()}
              {comment.isEdited && <span className="edited-tag"> (已編輯)</span>}
            </div>
           
          </div>
          
          <hr/>
        </div>
      ))}
    </div>
  );
}

export default CommentList;