import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import "../style.scss";
import { Link } from "react-router-dom";

// Menu
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 登入/註冊
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  const openModal = (type) => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const closeModal = () => setIsAuthOpen(false);
  // 存登入狀態、使用者姓名
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      const name = localStorage.getItem("userName");
      setIsLoggedIn(!!loggedIn);
      setUserName(name || "");
    };
    // 初始化登入狀態
    updateAuthState();

    // 監聽 localStorage 更新
    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <header className="Topbar">
      <nav className="Topbar-right">
        {/* LOGO 圖標 */}
        <Link to="/">
          <div className="logo">
            <img src="/images/LOGO.svg" alt="神秘座標LOGO" />
            <h3 className="logoText">Mystic Markers</h3>
          </div>
        </Link>
        {/* 登入/註冊 或 登出 */}
        <div className="member">
          {isLoggedIn ? (
            <div className="welcome-container">
              <span>歡迎您, {userName}</span>
              <button onClick={handleLogout} className="auth-btn">
                登出
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <a
                href="#"
                onClick={() => setIsAuthOpen(true)}
                className="auth-btn"
              >
                登入
              </a>
              |
              <a
                href="#"
                onClick={() => setIsAuthOpen(true)}
                className="auth-btn"
              >
                註冊
              </a>
            </div>
          )}
          {isAuthOpen && (
            <AuthModal
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              initialView={authType}
            />
          )}
        </div>
      </nav>
      {/* 通知/會員管理/MENU */}
      <nav className="nav-wrapper">
        <a href="#news">
          <img id="news" src="/images/news.svg" alt="news" />
        </a>
        <a href="#Group">
          <img
            id="Group"
            src="/images/Group.svg"
            alt="Group"
            onClick={() => setIsAuthOpen(true)}
          />
          {isLoggedIn && (
            <div className="group-info">
              <button onClick={() => setIsAuthOpen(true)} className="auth-btn">
                會員頁面
              </button>
            </div>
          )}
        </a>
        {/* Menu */}
        <div className="navbar">
          {/* 漢堡按鈕 */}
          <button
            className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          {/* 導覽列 */}
          <nav
            className={`navigation ${isMenuOpen ? "show" : ""}`}
            onClick={() => setIsMenuOpen(false)} // 點擊關閉選單
          >
            <ul className="menu">
              <li>
                <Link to="/Story">怪談博物館</Link>
              </li>
              <li>
                <Link to="/Map">靈異導航</Link>
              </li>
              <li>
                <Link to="/Forum">靈異論壇</Link>
              </li>
              <li>
                <Link to="/Contact">聯絡我們</Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
