import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { imageConfig } from "../components/imageConfig";
import StarRating from "../components/StarRating";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { presetComments, generateComments } from "../components/presetComments";
import "../style.scss";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 處理窗口大小變化
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 添加事件監聽器
    window.addEventListener('resize', handleResize);

    // 清理函數
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function GalleryPage() {
  const { pageId } = useParams();
  const location = imageConfig[pageId]?.location || "未登錄地點";
  const windowSize = useWindowSize(); // 使用自定義 Hook

  // 添加回圖片路徑生成函數
  const generateImagePaths = (pageId) => {
    const config = imageConfig[pageId];
    if (!config) return [];
    return Array.from(
      { length: config.count },
      (_, index) => `/images/${config.folder}/image${index + 1}.jpg`
    );
  };

  // 生成圖片路徑
  const images = generateImagePaths(pageId);

  // 評論相關狀態
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  // 載入預設評論
  useEffect(() => {
    const commentKey = pageId.startsWith('page') ? pageId : `page${pageId}`;

    if (presetComments[commentKey]) {
      setComments(presetComments[commentKey]);
    } else {
      const newComments = generateComments(commentKey, 5);
      setComments(newComments);
    }
  }, [pageId]);

  console.log('Current pageId:', pageId);
  console.log('Available preset pages:', Object.keys(presetComments));

  // 計算平均評分
  const averageRating =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
      : 0;

  // 處理評論提交
  const handleSubmitComment = (commentData) => {
    if (isEditing) {
      // 更新現有評論
      const updatedComments = comments.map((comment) =>
        comment.id === editingComment.id
          ? { ...comment, ...commentData, isEdited: true } // 更新內容
          : comment
      );
      setComments(updatedComments);
  
      // 清除編輯狀態
      setIsEditing(false);
      setEditingComment(null);
    } else {
      // 新增評論
      const hasComment = comments.some((comment) => comment.userId === 'user123');
      if (hasComment) {
        alert('每個用戶只能發表一則評論，請編輯現有評論');
        return;
      }
  
      const newComment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 唯一 ID
        ...commentData,
      };
      setComments([newComment, ...comments]);
      console.log(commentData)
    }
  };
  
  
  
  // 處理評論編輯
  const handleEditComment = (comment) => {
    if (comment && comment.id) {
      setIsEditing(true);
      setEditingComment(comment);
    } else {
      console.error('編輯評論時發生錯誤', comment);
    }
  };

  // 取消編輯
  const handleCancelEdit = (editing = false) => {
    setIsEditing(editing);
    setEditingComment(editing ? editingComment : null);
  };
  
  

  return (
    <div className="gallery-page">
      <div className="location-info">
        {images.length > 0 && (
          <div className="cover-image">
            <img src={images[0]} alt="封面圖片" />
          </div>
        )}
        <div className="info-area">
          <div className="info-text">
            <h1>{location}</h1>
            <div className="user-rating">
              <div className="average-rating">
                <StarRating rating={averageRating} />
                <span className="average-starnum">{averageRating.toFixed(1)}</span>
              </div>
              <span className="comments-num">
                {comments.length} 則<br />評論
              </span>
            </div>
          </div>
          <hr />
          <div className="comments-area">
            <CommentForm 
              onSubmit={handleSubmitComment}
              existingComment={editingComment}
              isEditing={isEditing}
              onCancelEdit={handleCancelEdit}
              comments={comments}
              onEditComment={handleEditComment}
              rows={6}
            />
            <CommentList 
              comments={comments} 
              onEditComment={handleEditComment}
            />
          </div>
        </div>
      </div>

      <div className="gallery-area">
        <ResponsiveMasonry columnsCountBreakPoints={{ 600: 1, 900: 2, 1440: 3 }}>
          <Masonry gutter="1rem">
            {images.map((src, index) => (
              <div key={index} className="image-wrapper">
                <img src={src} alt={`地點圖片 ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default GalleryPage;