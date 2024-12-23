import React, { useState, useEffect, useRef } from "react";
import "../style.scss";

const AuthModal = ({ isOpen, onClose, initialView }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [forgotPasswordPhone, setForgotPasswordPhone] = useState("");
  const [retrievedPassword, setRetrievedPassword] = useState("");

  useEffect(() => {
    if (isOpen) setCurrentView(initialView);
  }, [isOpen, initialView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    localStorage.setItem("registeredData", JSON.stringify(formData));
    setCurrentView("success");
  };
  // 登入
  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("registeredData"));
    if (
      storedData &&
      formData.email === storedData.email &&
      formData.password === storedData.password
    ) {
      localStorage.setItem("isLoggedIn", true); // 登入狀態
      localStorage.setItem("userName", storedData.name); // 使用者姓名
      alert("登入成功！");
      onClose();
      window.dispatchEvent(new Event("storage")); // 通知 Navbar 更新狀態
    } else {
      alert("帳號或密碼錯誤！");
    }
  };
  // 登出
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("storage"));
  };

  const handleForgotPassword = () => {
    const storedData = JSON.parse(localStorage.getItem("registeredData"));
    if (storedData && forgotPasswordPhone === storedData.phone) {
      setRetrievedPassword(storedData.password);
    } else {
      alert("電話號碼錯誤，無法查詢密碼！");
    }
  };

  // 關閉視窗指令
  const modalRef = useRef(null);

  // 點擊視窗範圍外面，關閉彈跳視窗
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>
          &times; {/* 叉叉按鈕 */}
        </button>
        {currentView === "login" && (
          <>
            <div className="title-login">
              <img
                className="login-LOGO"
                src="../../images/LOGO.svg"
                alt="LOGO"
              ></img>
              <h1>Mystic Markers</h1>
            </div>
            <div className="form-container">
              <input
                type="email"
                placeholder="請輸入Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="請輸入密碼"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="login-btn" onClick={handleLogin}>
                登入
              </button>
              <p onClick={() => setCurrentView("register")}>前往註冊</p>
              <p onClick={() => setCurrentView("forgotPassword")}>忘記密碼</p>
            </div>
          </>
        )}
        {currentView === "register" && (
          <>
            <div className="title-login">
              <img
                className="login-LOGO"
                src="../../images/LOGO.svg"
                alt="LOGO"
              ></img>
              <h1>Mystic Markers</h1>
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="請輸入姓名"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="請輸入電話"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="請輸入帳號"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="請輸入密碼"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="register-btn" onClick={handleRegister}>
                註冊
              </button>
            </div>
          </>
        )}
        {currentView === "forgotPassword" && (
          <>
            <div className="title-login">
              <img
                className="login-LOGO"
                src="../../images/LOGO.svg"
                alt="LOGO"
              ></img>
              <h1>Mystic Markers</h1>
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="請輸入電話號碼"
                value={forgotPasswordPhone}
                onChange={(e) => setForgotPasswordPhone(e.target.value)}
              />
              <button className="success-btn" onClick={handleForgotPassword}>
                查詢密碼
              </button>
              {retrievedPassword && (
                <p>
                  您的密碼是：<strong>{retrievedPassword}</strong>
                </p>
              )}
              <button
                className="success-btn"
                onClick={() => setCurrentView("login")}
              >
                返回登入
              </button>
            </div>
          </>
        )}
        {currentView === "success" && (
          <>
            <h1>Mystic Markers</h1>
            <p>註冊成功！請重新登入</p>
            <button
              className="success-btn"
              onClick={() => setCurrentView("login")}
            >
              前往登入
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
