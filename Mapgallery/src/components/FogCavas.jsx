import React, { useRef, useEffect } from "react";

const FogCanvas = ({ particleCount = 50 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];

    // 初始化畫布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 生成粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width, // 初始 x 位置
        y: Math.random() * canvas.height, // 初始 y 位置
        size: Math.random() * 100 + 150, // 粒子大小
        opacity: Math.random() * 0.3 + 0.2, // 不透明度
        speedX: Math.random() * 0.5 - 0.25, // X 軸漂移速度
        speedY: Math.random() * 0.2 - 0.1, // Y 軸漂移速度
      });
    }

    // 動畫渲染
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

      particles.forEach((particle) => {
        // 更新粒子位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // 循環粒子位置
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // 繪製粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`; // 白色霧
        ctx.fill();
      });

      requestAnimationFrame(render); // 下一幀
    };

    render();

    // 確保當窗口調整大小時，畫布大小同步更新
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />;
};

export default FogCanvas;
