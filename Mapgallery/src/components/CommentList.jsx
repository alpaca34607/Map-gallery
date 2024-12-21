import React from "react";
import StarRating from "./StarRating";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <div className="text-gray-500">暫無評論</div>;
  } else {
    return (
      <div className="commentlist">
        {comments.map((comment) => (
          <div key={comment.id} className="solocomment">
            {/* 過去用戶暱稱評分區 */}
            <div className="preuser-data">
              {/*用戶頭象暱稱*/}
              <div className="preuser-info">
                <div className="avatar">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                  />
                </div>
                <span className="user-name">{comment.userName}</span>
              </div>

              <div className="rating">
                {/* 過往用戶評分 */}
                <div className="preuser-rating">
                  <StarRating rating={comment.rating}/>
                </div>
              </div>
            </div>
            {/* 評論內容 */}
            <p className="mt-2 text-gray-700">{comment.text}</p>
            {/* 評論時間 */}
            <div className="mt-2 text-sm text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString()}
            </div>
           
            <hr/>

          </div>
        ))}
      </div>
    );
  }
}

export default CommentList;
