import "../style.scss";
import React from 'react';
import { useParams } from 'react-router-dom';

const imageData = {
  1: ['/images/image1-1.jpg', '/images/image1-2.jpg', '/images/image1-3.jpg'],
  2: ['/images/image2-1.jpg', '/images/image2-2.jpg', '/images/image2-3.jpg'],
};

function Gallerypage() {
  const { pageId } = useParams();
  console.log('當前頁ID:', pageId);
  const images = imageData[pageId] || [];

  return (
    <div className="gallery-page">
      <h1>圖片分頁 {pageId}</h1>
      <div className="image-grid">
        {images.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`地點圖片 ${index + 1}`}
            className="gallery-image" 
          />
        ))}
      </div>
      {/* 當前頁數與圖片數量 */}
      <div style={{margin: '20px', color: 'gray'}}>
        第{pageId}頁
         共{images.length}張相片
      </div>
    </div>
  );
}

export default Gallerypage;