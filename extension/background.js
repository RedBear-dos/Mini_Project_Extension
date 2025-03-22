// Khởi tạo extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('JS Shield đã được cài đặt');
  
  // Khởi tạo cài đặt mặc định
  chrome.storage.local.set({
    enableProtection: true,
    enableAI: true,
    protectionLevel: 'medium',
    enableNotifications: true,
    enableWeeklySummary: false,
    whitelist: [],
    threatStats: {
      scanned: 0,
      detected: 0,
      protected: 0
    }
  });
});

// Lắng nghe tin nhắn từ content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scanComplete') {
    // Cập nhật thống kê
    chrome.storage.local.get('threatStats', (data) => {
      const stats = data.threatStats || { scanned: 0, detected: 0, protected: 0 };
      stats.scanned += message.stats.scanned || 0;
      stats.detected += message.stats.detected || 0;
      stats.protected += message.stats.detected > 0 ? 1 : 0;
      
      chrome.storage.local.set({ threatStats: stats });
    });
    
    // Hiển thị thông báo nếu phát hiện mối đe dọa
    if (message.threats && message.threats.length > 0) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'JS Shield - Phát hiện mã độc',
        message: `Đã phát hiện ${message.threats.length} mối đe dọa trên ${sender.tab.url}`,
        priority: 2
      });
    }
    
    sendResponse({ status: 'success' });
  }
  return true;
});
