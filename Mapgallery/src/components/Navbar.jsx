// import "../../css/style.css";
import "../style.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="Topbar">
      <div className="Topbar-right">
        {/* LOGO 圖標 */}
        <Link to="/">
          <div className="logo">
            <img src="/images/LOGO.svg" alt="神秘座標LOGO" />
            <h3 className="logoText">Mystic Markers</h3>
          </div>
        </Link>
        {/* 登入/註冊 */}
        <div className="member">
          <a href="">登入</a> | <a href="">註冊</a>
        </div>
      </div>
      {/* 通知/會員管理/MENU */}
      <nav className="navigation">
        <a href="#news">
          <img id="news" src="/images/news.svg" alt="news" />
        </a>
        <a href="#Group">
          <img id="Group" src="/images/Group.svg" alt="Group" />
        </a>
        <a href="#menu">
          <img id="menu" src="/images/menu.svg" alt="menu" />
        </a>
        {/* menu待補 */}
        {/* <div id="menu">
                        
                        <ul>
                          <li><Link to='/Story'>怪談博物館</Link></li>
                          <li><Link to='/Map'>靈異導航</Link></li>
                          <li><Link to='/Forum'>靈異論壇</Link></li>
                          <li><Link to='/Contact'>聯絡我們</Link></li>
                        </ul>
                </div>  */}
      </nav>
    </header>
  );
}
export default Navbar;
