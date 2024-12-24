import React, { useEffect, useState } from 'react';
import "../style.scss";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setHovering(true);
    };

    const handleMouseLeave = () => {
      setHovering(false);
    };

    // 綁定滑鼠移動事件
    document.addEventListener('mousemove', handleMouseMove);

    // 選取所有的 <a> 和 <button> 元素
    const hoverdElements = document.querySelectorAll('a, button');
    hoverdElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

      // 清理事件監聽器
      hoverdElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className={`cursor ${hovering ? 'hovered' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  );
};

export default Cursor;
