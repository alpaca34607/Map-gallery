import "./style.scss";
import Navbar from "./components/Navbar";
import { Link, Route, Routes } from "react-router-dom";
import Gallerypage from "./pages/Gallerypage";
import Story from "./pages/Story";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import Cursor from "./components/Cursor";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import StarRating from './components/StarRating';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import defaultMarkers from "./components/defaultMarkers";
import taiwanRegions from "./components/taiwanRegions";
import axios from 'axios';
const DEFAULT_COVER_PHOTO = '/images/default-location.jpg';
const DEFAULT_AVATAR = '/images/Avatars/avatar (1).jpg';

// 預設與被點擊的圖示
const normalIcon = L.icon({
  iconUrl: '/images/Map/mark_green.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const activeIcon = L.icon({
  iconUrl: '/images/Map/mark_purple.svg',
  iconSize: [38, 38],
  iconAnchor: [16, 32],
  popupAnchor: [0, -38],
});




// 未填入完整時的警告
const CustomAlert = ({ message, onClose }) => (
  <div className="alert-message" style={{
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}>
    {message}
    <button onClick={onClose} style={{
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '5px'
    }}>✕</button>
  </div>
);

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        'accept-language': 'zh',
        countrycodes: 'tw'
      },
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: '搜尋地點...',
      keepResult: true
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [editingMarker, setEditingMarker] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const location = useLocation();
  const mapboxAccessToken = 'pk.eyJ1IjoiYWxpc29uMzQ2MDciLCJhIjoiY201ODlqM2U5M2o2MDJscHpiMWF6NzczdSJ9.D76vzn6QIzDViT9R7nVPVA';
  const mapboxStyleURL = `https://api.mapbox.com/styles/v1/alison34607/cm589twvs00nz01sp790tayrs/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxAccessToken}`;
  useEffect(() => {
    // 當路由變更時，將頁面滾動到頂部
    window.scrollTo(0, 0);
  }, [location]);


  // 新增評論相關狀態
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const taiwanBounds = [
    [21.8, 119.3],
    [25.3, 122.0]
  ];


  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingComment(null);
  };

  const handleDeleteMarker = (markerId) => {
    if (window.confirm('確定要刪除這個標記嗎？')) {
      setMarkers(markers.filter(marker => marker.id !== markerId));
    }
  };

  const validateMarker = (markerData) => {
    if (!markerData.title || markerData.title.trim() === '') {
      setAlertMessage('請輸入地點名稱');
      setShowAlert(true);
      return false;
    }
    return true;
  };
  // 提交標記
  const handleMarkerSubmit = (markerId) => {
    if (!validateMarker(editingMarker)) {
      setMarkers(prev => prev.filter(marker => marker.id !== markerId));
      setEditingMarker(null);
      return;
    }
  
    if (editingMarker.title.length > 7) {
      setAlertMessage('地點名稱不得超過7個字');
      setShowAlert(true);
      return;
    }
  
    setMarkers(prev =>
      prev.map(marker =>
        marker.id === markerId
          ? {
            ...marker,
            title: editingMarker.title,
            coverPhoto: editingMarker.coverPhoto || DEFAULT_COVER_PHOTO,
            comments: editingMarker.comments || [],
            // 保留原有的 city 和 district
            city: editingMarker.city,
            district: editingMarker.district
          }
          : marker
      )
    );
    setEditingMarker(null);
    setShowAlert(false);
  };

  // 更新評論處理函數
  const handleSubmitComment = (markerId, commentData) => {
    setMarkers(prev => prev.map(marker => {
      if (marker.id === markerId) {
        const currentComments = marker.comments || [];

        if (isEditing) {
          // 更新現有評論
          const updatedComments = currentComments.map(comment =>
            comment.id === editingComment.id
              ? { ...comment, ...commentData, isEdited: true }
              : comment
          );
          return { ...marker, comments: updatedComments };
        } else {
          // 檢查是否已有評論
          const hasComment = currentComments.some(
            comment => comment.userId === 'user123'
          );

          if (hasComment) {
            setAlertMessage('每個用戶只能發表一則評論，請編輯現有評論');
            setShowAlert(true);
            return marker;
          }

          // 新增評論
          const newComment = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...commentData
          };
          return { ...marker, comments: [newComment, ...currentComments] };
        }
      }
      return marker;
    }));

    // 重置編輯狀態
    if (isEditing) {
      setIsEditing(false);
      setEditingComment(null);
    }
  };

  const handleEditComment = (markerId, comment) => {
    if (comment && comment.id) {
      setIsEditing(true);
      setEditingComment(comment);
    } else {
      console.error('編輯評論時發生錯誤', comment);
    }
  };

  // 修改取消編輯的處理函數
  const handleCancelMarkerEdit = (markerId) => {
    // 找到正在編輯的標記
    const marker = markers.find(m => m.id === markerId);
    // 如果標記沒有標題,則刪除該標記
    if (!marker.title || marker.title.trim() === '') {
      setMarkers(prev => prev.filter(m => m.id !== markerId));
    }
    setEditingMarker(null);
  };

  // 添加一個用於地理編碼的函數
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=zh-TW`
      );

      const address = response.data.address;

      // 根據 OpenStreetMap 的數據結構提取城市和區域信息
      let city = address.city ||
        address.county ||
        address.town ||
        '未分類';

      let district = address.suburb ||
        address.village ||
        address.neighbourhood ||
        '未分類';

      // 處理城市名稱中可能包含的 "縣" 或 "市" 字詞
      city = city.replace(/[縣市]$/, '');

      return { city, district };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { city: '未分類', district: '未分類' };
    }
  };

  const AddMarker = () => {
    const map = useMapEvents({
      dblclick: async (e) => {
        const { lat, lng } = e.latlng;
  
        if (lat < taiwanBounds[0][0] || lat > taiwanBounds[1][0] ||
            lng < taiwanBounds[0][1] || lng > taiwanBounds[1][1]) {
          setAlertMessage('請在台灣地區範圍內新增標記');
          setShowAlert(true);
          return;
        }
  
        // 獲取地理位置信息
        const { city, district } = await reverseGeocode(lat, lng);
  
        const generateId = () => `${Date.now()}-${crypto.randomUUID()}`;
  
        const newMarker = {
          id: generateId(),
          position: [lat, lng],
          title: '',
          coverPhoto: DEFAULT_COVER_PHOTO,
          userId: 'user123',
          userName: '訪客',
          userAvatar: DEFAULT_AVATAR,
          comments: [],
          city: city,
          district: district
        };
  
        setMarkers(prev => [...prev, newMarker]);
        setEditingMarker(newMarker);
      },
      click: () => {
        setActiveMarkerId(null);
        if (editingMarker && (!editingMarker.title || editingMarker.title.trim() === '')) {
          setMarkers(prev => prev.filter(marker => marker.id !== editingMarker.id));
          setEditingMarker(null);
        }
      }
    });
    return null;
  };

  /* 篩選已標註地圖 */
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [displayedMarkers, setDisplayedMarkers] = useState([]);
  const mapRef = useRef(null);

  // 初始化標記
  useEffect(() => {
    const allMarkers = [...defaultMarkers];
    setMarkers(allMarkers);
    setDisplayedMarkers(allMarkers);
  }, []);

  // 處理縣市選擇
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedDistrict("");

    if (city && taiwanRegions[city]) {
      setAvailableDistricts(taiwanRegions[city]);
    } else {
      setAvailableDistricts([]);
    }

    filterMarkers(city, "");
  };

  // 處理區域選擇
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    filterMarkers(selectedCity, district);
  };

  // 篩選標記
  const filterMarkers = (city, district) => {
    let filtered = [...markers];

    if (city) {
      filtered = filtered.filter(marker => marker.city === city);
    }

    if (district) {
      filtered = filtered.filter(marker => marker.district === district);
    }

    setDisplayedMarkers(filtered);
  };

  // 跳轉到指定標記
  const handleMarkerClick = (marker) => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(marker.position, 16,);
    }
  };

  // 點擊標記彈出卡片
  const handlePopupOpen = (markerId) => {
    setActiveMarkerId(markerId);
  };

  // 關閉標記卡片
  const handlePopupClose = () => {
    setActiveMarkerId(null);
  };
  return (
    <>
      <Cursor />
      <Navbar />
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <main className="map">
              <div className="map-content">
                <div className="map-wrapper">
                  <MapContainer
                    center={[23.5, 121]}
                    zoom={8}
                    style={{ height: "100%", width: "100%" }}
                    maxBounds={taiwanBounds}
                    minZoom={7}
                    maxBoundsViscosity={1.0}
                    markers={displayedMarkers}
                    onMarkerClick={handleMarkerClick}
                    ref={mapRef}

                  >
                    <TileLayer
                      url={mapboxStyleURL}
                      maxZoom={22}
                      attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                    />
                    <SearchControl />
                    <AddMarker />
                    {markers.map(marker => (
                      <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={marker.id === activeMarkerId ? activeIcon : normalIcon}
                        eventHandlers={{
                          popupopen: () => handlePopupOpen(marker.id),
                          popupclose: handlePopupClose,
                          click: () => handleMarkerClick(marker)
                        }}
                      >
                        <Popup
                          className="custom-popup"
                          onOpen={() => handlePopupOpen(marker.id)}
                          onClose={handlePopupClose}
                        >
                          {editingMarker?.id === marker.id ? (
                            <div className="marker-form">
                              <div className="user-info">
                                <img
                                  src={marker.userAvatar}
                                  alt={marker.userName}
                                  className="user-avatar"
                                />
                                <span className="user-name">{marker.userName}</span>
                              </div>
                              <input
                                type="text"
                                placeholder="輸入地點名稱 *"
                                value={editingMarker.title || ''}
                                onChange={(e) => {
                                  setEditingMarker({
                                    ...editingMarker,
                                    title: e.target.value
                                  });
                                }}
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    setEditingMarker({
                                      ...editingMarker,
                                      coverPhoto: URL.createObjectURL(e.target.files[0])
                                    });
                                  }
                                }}
                              />
                              <div className="button-group">
                                <button onClick={() => handleMarkerSubmit(marker.id)}>
                                  新增標記
                                </button>
                                <button
                                  onClick={() => handleCancelMarkerEdit(marker.id)}
                                  className="cancel-button"
                                >
                                  取消
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="marker-display">
                              <div className="location-info">
                                <div className="marker-header">
                                  <div className="user-info">
                                    <div className="user-avatar">
                                      <img
                                        src={marker.userAvatar}
                                        alt={marker.userName}
                                      />
                                    </div>
                                    <span className="user-name">{marker.userName}</span>
                                    <p>投稿</p>
                                  </div>
                                  {marker.userId === 'user123' && (
                                    <div className="button-group">
                                      <button onClick={() => setEditingMarker(marker)}>
                                        編輯
                                      </button>
                                      <p>|</p>
                                      <button
                                        onClick={() => handleDeleteMarker(marker.id)}
                                        className="delete-button"
                                      >
                                        刪除
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <img
                                  src={marker.coverPhoto || DEFAULT_COVER_PHOTO}
                                  alt={marker.title}
                                  className="marker-image"
                                />
                                <h3>{marker.title}</h3>

                                <div className="user-rating">
                                  <div className="average-rating">
                                    <StarRating
                                      rating={
                                        marker.comments?.length > 0
                                          ? marker.comments.reduce((acc, comment) => acc + comment.rating, 0) / marker.comments.length
                                          : 0
                                      }
                                    />
                                    <span className="comments-num">
                                      {marker.comments?.length || 0} 則評論
                                    </span>
                                  </div>
                                </div>

                                <hr />

                                <div className="comments-area">
                                  <CommentForm
                                    onSubmit={(commentData) => handleSubmitComment(marker.id, commentData)}
                                    existingComment={editingComment}
                                    isEditing={isEditing}
                                    onCancelEdit={handleCancelEdit}
                                    comments={marker.comments || []}
                                    onEditComment={(comment) => handleEditComment(marker.id, comment)}
                                    rows={3} 
                                  />
                                  <CommentList
                                    comments={marker.comments || []}
                                    onEditComment={(comment) => handleEditComment(marker.id, comment)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
                <div>
                  <label className="filter-panel">
                    <div className="filter-controls">
                      <div className="select-container">
                        <select
                          value={selectedCity}
                          onChange={handleCityChange}
                          className="city-select"
                        >
                          <option value="">選擇縣市</option>
                          {Object.keys(taiwanRegions).map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <div className="select-container">
                        <select
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          className="district-select"
                          disabled={!selectedCity}
                        >
                          <option value="">選擇區域</option>
                          {availableDistricts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="marker-list">
                      <h3>標記點列表</h3>
                      <ul>
                        {displayedMarkers.map(marker => (
                          <li
                            key={marker.id}
                            onClick={() => handleMarkerClick(marker)}
                            className="marker-list-item"
                          >
                            {marker.title} - {marker.city}{marker.district}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
              <div>推薦地圖</div>
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
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}