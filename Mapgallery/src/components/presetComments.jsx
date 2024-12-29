// 評論數據庫
const commentDB = {
  userIds: Array.from({ length: 100 }, (_, i) => `user${i + 1}`),

  userNames: [
    "模糊獵人", "藤森月子", "光", "迷路的貓", "黑夜探險者",
    "阿幽", "鬼瞳", "小紙人", "青燈", "月影",
    "陰陽師", "紙紮匠", "阿飄飄", "靈狐", "大黑貓",
    "陰月", "紅瞳", "焚香道長", "小鬼頭", "怨影",
    "血月", "符師阿泰", "白無常", "怨念兒", "影魅",
    "小屍屍", "青冥", "靈探", "符文", "天師子墨",
    "闇火", "渡魂者", "陰風", "黑白無常", "骨娃",
    "靈瞳", "南無阿強", "陰間使者", "冥蝶", "七月",
    "幻夜", "小燭台", "血玫瑰", "念咒姐", "幽幽子"

  ],

  avatars: Array.from({ length: 100 }, (_, i) => `/images/Avatars/avatar%20(${i + 1}).jpg`),

  ratings: [1, 1, 1, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5], 

  positiveTexts: [
    "氣氛超讚！真有身處靈異場景的感覺！",  
    "陰森的樹林配上遠處的風聲，真的毛骨悚然，超推薦！",  
    "老宅真的很有故事感，拍了好多靈異感滿滿的照片！",  
    "走近那一刻，全身起雞皮疙瘩，太真實了！",  
    "感受到有人輕輕拍我的肩，心跳破表！",  
    "一個人絕對不要來！超恐怖！",  
    "半夜聽到傳來腳步聲，真心嚇到魂飛天外！",  
    "這裡的故事超級多，推薦來親身感受！",  
    "風水奇特，竟然真的遇到奇怪的現象！",  
    "整體靈異氛圍很強，絕對值得探險！",
    "氣氛超讚！٩(๑❛ᴗ❛๑)۶ 下次還要再來！",  
    "超恐怖但很過癮！Σ(ﾟДﾟ；≡；ﾟдﾟ) 值得一試！",  
    "這裡真的超靈！拍到了不明光點 ( ;ﾟдﾟ) ",  
    "朋友全程尖叫哈哈哈 (≧▽≦) 下次帶更多人來探險！",  
    "感覺背後有人但回頭什麼都沒有！Σ(ಠ_ಠ)",  
    "超陰森，燈光閃爍很帶感！✧⁺⸜(●′▾‵●)⸝⁺✧",  
    "我真的在牆上看到了一張臉！o((⊙﹏⊙))o",  
    "靈異故事太精彩，現場感覺加分超多！ (*ﾟ∀ﾟ*)",  
    "陰風陣陣，嚇得朋友腳都軟了哈哈哈！( ´▽` )ﾉ",  
    "真的聽到有人叫我名字！(ﾟдﾟ；)",
    "這個地點的確有種與眾不同的感覺，特別是晚上風聲加上微弱的光線，整個氛圍非常詭異。建議一群人一起來，更能感受到那種壓迫感。",  
    "老宅的結構保存得很好，牆壁上殘留的手印和地上的奇怪符號都讓人不寒而慄，適合喜歡靈異氣氛的人探訪。",  
    "設計很特別，空間壓迫感讓人不自覺屏住呼吸，燈光昏暗的狀態下，很容易讓人聯想到靈異事件。",  
    "這裡的歷史故事非常吸引人，特別是牆上的塗鴉和照片，似乎在訴說著過去的一些秘密，令人毛骨悚然。",  

],

neutralTexts: [
    "感覺陰陰的，但沒什麼特別的。",  
    "只是個老舊的地方，沒啥靈異感。",  
    "氣氛不錯，但沒有遇到什麼奇怪的事情。",  
    "幾個同伴一起去拍照，結果只是拍拍破屋子。",  
    "故事聽起來很有趣，但現場其實挺普通的。",
    "有點恐怖，但也就那樣啦 ",  
    "拍照不錯，但沒啥靈異感哦 ･_･",  
    "有一點陰涼，但也許只是天氣冷 (-ω-)",  
    "感覺有故事，但現場沒什麼特別的 (o_O)",  
    "有點像是被廢棄的老房子，沒感覺到靈異現象喵(´ω｀*)",
    "地方不算很恐怖，但如果你了解這裡的故事，還是能稍微感受到一些氛圍。",  
    "可能是時間不對，我們到的時候光線太明亮，沒什麼特別的感覺。",  
    "氣氛還不錯，但個人覺得比較像廢墟，靈異感稍弱。",  
    "建築很有年代感，適合拍攝，但對靈異現象本身興趣不高的人可能會覺得普通。",  
    "歷史很有趣，當場感覺還好，但適合對靈異事件有興趣的人研究。"
],

negativeTexts: [
    "這根本是廢墟，還說靈異地點，騙人的吧！",  
    "地板黏到像鬼才剛走過，衛生真的比鬼還可怕。",  
    "好臭，味道像住了幾十隻幽靈的感覺！",  
    "去了兩次都沒感覺，故事比現場更精彩。",  
    "說是靈異地點，但我覺得只是老房子快倒了。",  
    "進去不到五分鐘就被蚊子叮到滿身包，還靈異呢！",  
    "位置很偏僻，什麼都沒看到，浪費時間。",  
    "除了冷風，什麼感覺都沒有，失望透頂。",  
    "完全沒有靈異感，說是靈異地點實在太誇張了。",  
    "還以為會很恐怖，結果破破爛爛，無聊透了！" ,
    "這裡真的超破爛，腳ㄐㄩㄝㄉ踩到鬼踩踏了ㄅ。",  
    "垃圾好多，比鬼還可怕o(〒﹏〒)o",  
    "完全沒有靈異感，氣氛真的超弱。ㄅ……我打錯字ㄅ！？",  
    "被嚇到拍了一張糊照，像是我手抖不過鬼？！",  
    "地板滑到像在陰間滑冰 (´Д｀υ)",  
    "方向感太差，走一走都要迷路，根本出不去……",  
    "朋友被嚇得直接叫我名字，害我以為真的遇到鬼∑(O_O；)",  
    "打著燈說是靈異地點，實際上啥都沒見到，sad。",  
    "衛生問題真的令人崩潰，比看到鬼還要崩潰 (；′⌒`)",  
    "完全找不到入口，結果在門外迷路30分鐘……QAQ" ,
    "這個地方完全沒有靈異感，只有一些殘破的牆壁，感覺像隨便找的廢棄建築。",  
    "衛生條件太差，垃圾遍地，環境讓人無法靜下心感受氛圍。",  
    "網站上的照片比實際更有故事感，現場真的有些失望。",  
    "雖然有故事背景，但現場的燈光和結構沒有帶來預期的恐怖效果。",  
    "氣氛過於平淡，感覺只是個被人遺忘的地方，沒有什麼讓人感到毛骨悚然的元素。"  
]

};

// 根據評分選擇對應的評論文字
function getCommentTextByRating(rating) {
  const { positiveTexts, neutralTexts, negativeTexts } = commentDB;

  if (rating >= 4) {
    return positiveTexts[Math.floor(Math.random() * positiveTexts.length)];
  } else if (rating === 3) {
    return neutralTexts[Math.floor(Math.random() * neutralTexts.length)];
  } else {
    return negativeTexts[Math.floor(Math.random() * negativeTexts.length)];
  }
}

// 生成隨機評論
function generateComment(id) {
  const { userIds, userNames, avatars, ratings } = commentDB;

  const rating = ratings[Math.floor(Math.random() * ratings.length)];

  return {
    id,
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    userAvatar: avatars[Math.floor(Math.random() * avatars.length)],
    rating,
    text: getCommentTextByRating(rating),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
  };
}

// 生成指定數量的評論
function generateComments(pageId, count) {
  return Array.from({ length: count }, (_, index) =>
    generateComment(`${pageId}-${index + 1}`)
  );
}

// 導出預設評論
export const presetComments = {
  page1: generateComments('page1',20),
  page2: generateComments('page2', 10),
  page3: generateComments('page3', 15),
  page4: generateComments('page3', 18),
};

// 導出生成函數
export { generateComments };