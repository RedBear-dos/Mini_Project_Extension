// popup.js - Script cho giao diện popup của extension

document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các biến và tham chiếu đến các phần tử DOM
    const protectionStatus = document.getElementById('protection-status');
    const scriptsScanned = document.getElementById('scripts-scanned');
    const threatsDetected = document.getElementById('threats-detected');
    const sitesProtected = document.getElementById('sites-protected');
    const currentUrl = document.getElementById('current-url');
    const siteStatus = document.getElementById('site-status');
    const siteStatusIcon = siteStatus.querySelector('.status-icon');
    const siteStatusText = siteStatus.querySelector('.status-text');
    const noThreatsMessage = document.getElementById('no-threats-message');
    const threatsList = document.getElementById('threats-list');
    const scanPageButton = document.getElementById('scan-page');
    const viewDetailsButton = document.getElementById('view-details');
    const openOptionsButton = document.getElementById('open-options');
    const aiStatusText = document.getElementById('ai-status-text');

    // Lấy thông tin từ background script
    chrome.runtime.sendMessage({ action: 'getStats' }, function(response) {
        if (response) {
            updateStats(response.stats);
        }
    });

    // Lấy thông tin về tab hiện tại
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            const tab = tabs[0];
            updateCurrentSite(tab);
            
            // Lấy thông tin về các mối đe dọa trên trang hiện tại
            chrome.runtime.sendMessage({ 
                action: 'getSiteThreats', 
                url: tab.url 
            }, function(response) {
                if (response) {
                    updateThreats(response.threats);
                }
            });
        }
    });

    // Lấy trạng thái AI
    chrome.runtime.sendMessage({ action: 'getAIStatus' }, function(response) {
        if (response) {
            updateAIStatus(response.enabled);
        }
    });

    // Xử lý sự kiện khi nhấn nút quét trang
    scanPageButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs.length > 0) {
                const tab = tabs[0];
                
                // Hiển thị thông báo đang quét
                showScanningStatus();
                
                // Gửi yêu cầu quét đến background script
                chrome.runtime.sendMessage({ 
                    action: 'scanPage', 
                    tabId: tab.id 
                }, function(response) {
                    if (response) {
                        // Cập nhật UI với kết quả quét
                        updateAfterScan(response);
                    }
                });
            }
        });
    });

    // Xử lý sự kiện khi nhấn nút xem chi tiết
    viewDetailsButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs.length > 0) {
                const tab = tabs[0];
                
                // Mở trang chi tiết trong tab mới
                chrome.tabs.create({
                    url: chrome.runtime.getURL('details.html') + '?tabId=' + tab.id
                });
            }
        });
    });

    // Xử lý sự kiện khi nhấn nút tùy chọn
    openOptionsButton.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });

    // Hàm cập nhật thống kê
    function updateStats(stats) {
        scriptsScanned.textContent = stats.scriptsScanned || 0;
        threatsDetected.textContent = stats.threatsDetected || 0;
        sitesProtected.textContent = stats.sitesProtected || 0;
    }

    // Hàm cập nhật thông tin trang hiện tại
    function updateCurrentSite(tab) {
        // Hiển thị URL
        const url = new URL(tab.url);
        currentUrl.textContent = url.hostname;
        
        // Kiểm tra trạng thái bảo vệ cho trang này
        chrome.runtime.sendMessage({ 
            action: 'getSiteStatus', 
            url: tab.url 
        }, function(response) {
            if (response) {
                updateSiteStatus(response.status);
            }
        });
    }

    // Hàm cập nhật trạng thái trang
    function updateSiteStatus(status) {
        // Xóa tất cả các lớp trạng thái
        siteStatusIcon.classList.remove('safe', 'warning', 'danger');
        
        // Cập nhật trạng thái dựa trên phản hồi
        if (status === 'safe') {
            siteStatusIcon.classList.add('safe');
            siteStatusText.textContent = 'An toàn';
        } else if (status === 'warning') {
            siteStatusIcon.classList.add('warning');
            siteStatusText.textContent = 'Cảnh báo';
        } else if (status === 'danger') {
            siteStatusIcon.classList.add('danger');
            siteStatusText.textContent = 'Nguy hiểm';
        }
    }

    // Hàm cập nhật danh sách mối đe dọa
    function updateThreats(threats) {
        // Xóa tất cả các mục hiện tại
        threatsList.innerHTML = '';
        
        if (threats && threats.length > 0) {
            // Ẩn thông báo không có mối đe dọa
            noThreatsMessage.style.display = 'none';
            
            // Thêm từng mối đe dọa vào danh sách
            threats.forEach(function(threat) {
                const threatItem = document.createElement('li');
                threatItem.className = 'threat-item';
                
                const threatHeader = document.createElement('div');
                threatHeader.className = 'threat-header';
                
                const threatType = document.createElement('div');
                threatType.className = 'threat-type';
                threatType.textContent = threat.type;
                
                const threatTime = document.createElement('div');
                threatTime.className = 'threat-time';
                threatTime.textContent = formatTime(threat.timestamp);
                
                const threatUrl = document.createElement('div');
                threatUrl.className = 'threat-url';
                threatUrl.textContent = threat.url;
                
                threatHeader.appendChild(threatType);
                threatHeader.appendChild(threatTime);
                threatItem.appendChild(threatHeader);
                threatItem.appendChild(threatUrl);
                
                threatsList.appendChild(threatItem);
            });
        } else {
            // Hiển thị thông báo không có mối đe dọa
            noThreatsMessage.style.display = 'block';
        }
    }

    // Hàm cập nhật trạng thái AI
    function updateAIStatus(enabled) {
        aiStatusText.textContent = enabled ? 'Đang hoạt động' : 'Đã tắt';
    }

    // Hàm hiển thị trạng thái đang quét
    function showScanningStatus() {
        scanPageButton.textContent = 'Đang quét...';
        scanPageButton.disabled = true;
    }

    // Hàm cập nhật UI sau khi quét
    function updateAfterScan(result) {
        // Khôi phục nút quét
        scanPageButton.textContent = 'Quét trang này';
        scanPageButton.disabled = false;
        
        // Cập nhật thống kê
        updateStats(result.stats);
        
        // Cập nhật trạng thái trang
        updateSiteStatus(result.siteStatus);
        
        // Cập nhật danh sách mối đe dọa
        updateThreats(result.threats);
        
        // Hiển thị thông báo kết quả quét
        if (result.threats && result.threats.length > 0) {
            showNotification('Phát hiện mối đe dọa', `Đã phát hiện ${result.threats.length} mối đe dọa trên trang này.`);
        } else {
            showNotification('Quét hoàn tất', 'Không phát hiện mối đe dọa nào trên trang này.');
        }
    }

    // Hàm hiển thị thông báo
    function showNotification(title, message) {
        // Sử dụng API thông báo của Chrome nếu có quyền
        if (chrome.notifications) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: '../icons/icon128.png',
                title: title,
                message: message
            });
        } else {
            // Fallback: hiển thị thông báo trong popup
            console.log(`${title}: ${message}`);
        }
    }

    // Hàm định dạng thời gian
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
