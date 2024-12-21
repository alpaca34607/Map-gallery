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

  // 狀態初始化
  const [comments, setComments] = useState([]);

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

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [
      ...prevComments,
      { ...newComment, id: `${prevComments.length + 1}` },
    ]);
  };

  return (
    <div className="gallery-page">
      <div className="location-info">
        {images.length > 0 && (
          <div className="cover-image">
            <img
              src={images[0]}
              alt="封面圖片" />
          </div>
        )}
        <div className="info-area">
          <h1>{location}</h1>
          <div className="user-rating">
            <div className="average-rating">
              <StarRating rating={averageRating} />
              <span className="text-lg font-medium">{averageRating.toFixed(1)} / 5</span>
              <span className="text-gray-500">({comments.length} 則評論)</span>
            </div>

            <CommentForm onSubmit={handleCommentSubmit} />
            <CommentList comments={comments} />

          </div>
        </div>
      </div>

      <div className="gallery-area">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
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