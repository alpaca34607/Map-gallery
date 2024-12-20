export const presetComments = {
  page1: [
    {
      id: "1",
      userId: "user123",
      userName: "小明",
      userAvatar: "/path/to/avatar1.jpg",
      rating: 5,
      text: "非常好！",
      timestamp: new Date().toISOString(), // 儲存為 ISO 格式字串
    },
    {
      id: "2",
      userId: "user124",
      userName: "小華",
      userAvatar: "/path/to/avatar2.jpg",
      rating: 4,
      text: "很不错，下一次还会再来。",
      timestamp: new Date().toISOString(),
    },
  ],
  page2: [
    {
      id: "3",
      userId: "user125",
      userName: "小王",
      userAvatar: "/path/to/avatar3.jpg",
      rating: 3,
      text: "一般般，还有改进空间。",
      timestamp: new Date().toISOString(),
    },
    {
      id: "4",
      userId: "user126",
      userName: "小李",
      userAvatar: "/path/to/avatar4.jpg",
      rating: 2,
      text: "不太满意，有很多地方需要改进。",
      timestamp: new Date().toISOString(),
    },
  ],
};
