import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { imageConfig } from "../components/imageConfig";
import StarRating from "../components/StarRating";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { presetComments } from "../components/presetComments";

function GalleryPage() {
  const { pageId } = useParams();
  const location = imageConfig[pageId]?.location || "未登錄地點";

  const generateImagePaths = (pageId) => {
    const config = imageConfig[pageId];
    if (!config) return [];
    return Array.from(
      { length: config.count },
      (_, index) => `/images/${config.folder}/image${index + 1}.jpg`
    );
  };

  const images = generateImagePaths(pageId);

  // 狀態初始化為空，稍後透過 useEffect 設定
  const [comments, setComments] = useState([]);

  // 當 pageId 改變時，載入對應的預設評論
  useEffect(() => {
    if (pageId && presetComments[pageId]) {
      setComments(presetComments[pageId]);
    }
  }, [pageId]);

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
        <h1>{location}</h1>
        <div className="mt-12 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <StarRating rating={averageRating} />
            <span className="text-lg font-medium">{averageRating.toFixed(1)} / 5</span>
            <span className="text-gray-500">({comments.length} 則評論)</span>
          </div>

          <CommentForm onSubmit={handleCommentSubmit} />
          <CommentList comments={comments} />
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
