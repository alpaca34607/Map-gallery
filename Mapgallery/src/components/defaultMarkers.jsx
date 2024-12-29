import { generateComments } from './presetComments';

// 為每個預設標記生成隨機評論和平均評分
const generateMarkerData = (markerId, baseMarker) => {
  // 生成 5-15 個隨機評論
  const commentCount = Math.floor(Math.random() * 11) + 5;
  const comments = generateComments(markerId, commentCount);
  
  // 計算平均評分
  const averageRating = comments.length > 0
    ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
    : 0;

  return {
    ...baseMarker,
    comments,
    rating: averageRating
  };
};

// 預設標記點資料
const defaultMarkers = [
  generateMarkerData("taipei-101", {
    id: "taipei-101",
    position: [25.033964, 121.564468],
    title: "台北101",
    city: "台北市",
    district: "信義區",
    coverPhoto: "/images/taipei-101.jpg",
    description: "台北地標建築",
    userId: "system",
    userName: "系統管理員",
    userAvatar: "/images/Avatars/avatar (1).jpg",
  }),
  
  generateMarkerData("ximending", {
    id: "ximending",
    position: [25.0421755, 121.5077759],
    title: "西門町",
    city: "台北市",
    district: "萬華區",
    coverPhoto: "/images/ximending.jpg",
    description: "熱門商圈",
    userId: "system",
    userName: "系統管理員", 
    userAvatar: "/images/Avatars/avatar (1).jpg",
  }),

  generateMarkerData("longshan-temple", {
    id: "longshan-temple",
    position: [25.0374392, 121.4996508],
    title: "龍山寺",
    city: "台北市",
    district: "萬華區",
    coverPhoto: "/images/longshan-temple.jpg",
    description: "著名古剎",
    userId: "system",
    userName: "系統管理員",
    userAvatar: "/images/Avatars/avatar (1).jpg",
  }),

  generateMarkerData("shilin-night-market", {
    id: "shilin-night-market",
    position: [25.0878748, 121.524444],
    title: "士林夜市",
    city: "台北市",
    district: "士林區",
    coverPhoto: "/images/shilin-night-market.jpg",
    description: "最大夜市",
    userId: "system",
    userName: "系統管理員",
    userAvatar: "/images/Avatars/avatar (1).jpg",
  })
];

export default defaultMarkers;