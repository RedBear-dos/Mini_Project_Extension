// JS Shield - Content Script - Simplified Version
// Quét và phát hiện mã độc JavaScript trên trang web

console.log('JS Shield: Content script đã được tải và đang chạy');

// Các mẫu mã độc JavaScript cơ bản để phát hiện
const maliciousPatterns = [
  { regex: /eval\s*\(\s*(?:atob|base64|decode|unescape|fromCharCode|String\.fromCharCode)\s*\(/, type: 'Obfuscated Code Execution', severity: 'high' },
  { regex: /document\.write\s*\(\s*(?:atob|base64|decode|unescape|fromCharCode|String\.fromCharCode)\s*\(/, type: 'Obfuscated Document Write', severity: 'high' },
  { regex: /(?:document|window)\.location(?:\.href)?\s*=\s*['"`][^'"`]*['"`]\s*\+\s*['"`][^'"`]*['"`]/, type: 'URL Redirection', severity: 'medium' },
  { regex: /new\s+Function\s*\(\s*['"`]/, type: 'Dynamic Function Creation', severity: 'high' },
  { regex: /document\.cookie\s*=/, type: 'Cookie Manipulation', severity: 'medium' }
];

// Hàm quét mã JavaScript
function scanJavaScript(script) {
  const threats = [];
  
  // Kiểm tra từng mẫu
  for (const pattern of maliciousPatterns) {
    if (pattern.regex.test(script)) {
      // Tìm thấy mẫu mã độc
      const matches = script.match(pattern.regex);
      threats.push({
        type: pattern.type,
        severity: pattern.severity,
        evidence: matches[0],
        detector: 'static'
      });
    }
  }
  
  return threats;
}

// Hàm thu thập tất cả mã JavaScript trên trang
function collectScripts() {
  const scripts = [];
  
  // Thu thập từ thẻ script
  document.querySelectorAll('script').forEach(scriptTag => {
    if (scriptTag.textContent && scriptTag.textContent.trim().length > 0) {
      scripts.push(scriptTag.textContent);
    }
  });
  
  // Thu thập từ thuộc tính sự kiện inline
  const eventAttributes = [
    'onclick', 'onload', 'onunload', 'onchange', 'onmouseover', 
    'onmouseout', 'onkeydown', 'onkeypress', 'onkeyup'
  ];
  
  eventAttributes.forEach(attr => {
    document.querySelectorAll(`[${attr}]`).forEach(element => {
      const code = element.getAttribute(attr);
      if (code && code.trim().length > 0) {
        scripts.push(code);
      }
    });
  });
  
  return scripts;
}

// Hàm chính để quét trang
function scanPage() {
  console.log('JS Shield: Đang quét trang web...');
  
  // Thu thập tất cả mã JavaScript
  const scripts = collectScripts();
  console.log(`JS Shield: Đã thu thập ${scripts.length} đoạn mã JavaScript`);
  
  // Quét từng đoạn mã
  let allThreats = [];
  scripts.forEach(script => {
    const threats = scanJavaScript(script);
    if (threats.length > 0) {
      allThreats = allThreats.concat(threats);
    }
  });
  
  // Loại bỏ các mối đe dọa trùng lặp
  const uniqueThreats = [];
  const seenTypes = new Set();
  
  allThreats.forEach(threat => {
    const key = `${threat.type}-${threat.evidence}`;
    if (!seenTypes.has(key)) {
      seenTypes.add(key);
      uniqueThreats.push(threat);
    }
  });
  
  // Thêm thông tin URL và timestamp
  uniqueThreats.forEach(threat => {
    threat.url = window.location.href;
    threat.timestamp = Date.now();
  });
  
  console.log(`JS Shield: Đã phát hiện ${uniqueThreats.length} mối đe dọa`);
  
  // Cập nhật thống kê trực tiếp
  chrome.storage.local.get('threatStats', (data) => {
    const stats = data.threatStats || { scanned: 0, detected: 0, protected: 0 };
    stats.scanned += scripts.length;
    stats.detected += uniqueThreats.length;
    stats.protected += uniqueThreats.length > 0 ? 1 : 0;
    
    chrome.storage.local.set({ 
      threatStats: stats,
      currentThreats: uniqueThreats
    }, () => {
      console.log('JS Shield: Đã cập nhật thống kê', stats);
    });
  });
  
  // Gửi kết quả về background script
  chrome.runtime.sendMessage({
    action: 'scanComplete',
    threats: uniqueThreats,
    stats: {
      scanned: scripts.length,
      detected: uniqueThreats.length
    }
  }, response => {
    console.log('JS Shield: Đã gửi kết quả quét', response);
  });
  
  return uniqueThreats;
}

// Quét trang ngay lập tức
console.log('JS Shield: Bắt đầu quét trang...');
setTimeout(scanPage, 500);

// Lắng nghe tin nhắn từ popup hoặc background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scanNow') {
    console.log('JS Shield: Nhận yêu cầu quét từ popup');
    const threats = scanPage();
    sendResponse({ 
      success: true, 
      threatsCount: threats.length 
    });
  }
  return true;
});
