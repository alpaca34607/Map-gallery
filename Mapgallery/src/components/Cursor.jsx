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

    // 綁定 hover 事件到所有的 <a> 元素
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

      // 清理事件監聽器
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
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