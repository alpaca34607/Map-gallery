import "./style.scss";
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Gallerypage from "./pages/Gallerypage"
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import Cursor from "./components/Cursor";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const position = [25.0330, 121.5654];  // 台北市中心座標

  return (
    <>
      <Cursor />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main className="map">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100vh", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    這裡是台北市
                  </Popup>
                </Marker>
              </MapContainer>

              <div>我是地圖頁</div>
              <ul>
                <li><Link to="/page/1">民雄鬼屋</Link></li>
                <li><Link to="/page/2">辛亥隧道</Link></li>
                <li><Link to="/page/3">林開郡洋樓</Link></li>
                <li><Link to="/page/4">西寧國宅</Link></li>
              </ul>
            </main>
          }
        />
        <Route path="/page/:pageId" element={<Gallerypage />} />
        <Route path="/Story" element={<Story />} />
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}
