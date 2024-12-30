import React, { useEffect, useState } from 'react';
import "../style.scss";

const Cursor = ({ isAddingLocation }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      if (!isAddingLocation) {  // 只在非新增位置模式時改變游標
        setHovering(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isAddingLocation) {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const hoverdElements = document.querySelectorAll('a, button');
    hoverdElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverdElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isAddingLocation]); // 添加 isAddingLocation 作為依賴

  return (
    <div
      id="custom-cursor"
      className={`cursor ${hovering ? 'hovered' : ''} ${isAddingLocation ? 'adding-location' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    ></div>
  );
};

export default Cursor;