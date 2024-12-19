import "./style.scss";
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Gallerypage from "./pages/Gallerypage"
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import Cursor from "./components/Cursor";

export default function Map() {
  return (
    <>
      <Cursor />
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <main className="map">
               
              <div>我是地圖頁</div>
                <ul>
                <li><Link to="/page/1">地圖推薦1</Link></li>
                <li><Link to="/page/2">地圖推薦2</Link></li>
                </ul>              
            </main>
          }
        />
        <Route path="/page/:pageId" element={<Gallerypage/>} />
        <Route path="/Story" element={<Story />} />
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}
