import React from "react";
import StarRating from "./StarRating";

function CommentList({ comments }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
          {/* 用户头像 */}
          <img
            src={comment.userAvatar}
            alt={comment.userName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            {/* 用户名和评分 */}
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.userName}</span>
              <StarRating rating={comment.rating} />
            </div>
            {/* 评论内容 */}
            <p className="mt-2 text-gray-700">{comment.text}</p>
            {/* 评论时间 */}
            <div className="mt-2 text-sm text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
