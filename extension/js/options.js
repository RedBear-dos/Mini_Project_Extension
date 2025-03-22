// options.js - Script cho trang tùy chọn của extension

document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các biến và tham chiếu đến các phần tử DOM
    const activeProtection = document.getElementById('active-protection');
    const aiProtection = document.getElementById('ai-protection');
    const protectionLevel = document.getElementById('protection-level');
    const threatNotifications = document.getElementById('threat-notifications');
    const weeklySummary = document.getElementById('weekly-summary');
    const shareAnonymousData = document.getElementById('share-anonymous-data');
    const whitelistUrl = document.getElementById('whitelist-url');
    const addToWhitelist = document.getElementById('add-to-whitelist');
    const whitelistItems = document.getElementById('whitelist-items');
    const noWhitelistMessage = document.getElementById('no-whitelist-message');
    const clearData = document.getElementById('clear-data');
    const saveOptions = document.getElementById('save-options');
    const resetOptions = document.getElementById('reset-options');
    const confirmationDialog = document.getElementById('confirmation-dialog');
    const dialogMessage = document.getElementById('dialog-message');
    const dialogCancel = document.getElementById('dialog-cancel');
    const dialogConfirm = document.getElementById('dialog-confirm');

    // Biến lưu trữ hành động xác nhận hiện tại
    let currentConfirmAction = null;

    // Tải tùy chọn đã lưu
    loadOptions();

    // Xử lý sự kiện khi nhấn nút thêm vào danh sách trắng
    addToWhitelist.addEventListener('click', function() {
        addWhitelistItem();
    });

    // Xử lý sự kiện khi nhấn Enter trong ô nhập URL danh sách trắng
    whitelistUrl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addWhitelistItem();
        }
    });

    // Xử lý sự kiện khi nhấn nút xóa dữ liệu
    clearData.addEventListener('click', function() {
        showConfirmDialog('Bạn có chắc chắn muốn xóa tất cả dữ liệu đã lưu trữ? Hành động này không thể hoàn tác.', function() {
            clearAllData();
        });
    });

    // Xử lý sự kiện khi nhấn nút lưu thay đổi
    saveOptions.addEventListener('click', function() {
        saveAllOptions();
    });

    // Xử lý sự kiện khi nhấn nút khôi phục mặc định
    resetOptions.addEventListener('click', function() {
        showConfirmDialog('Bạn có chắc chắn muốn khôi phục tất cả tùy chọn về mặc định?', function() {
            resetAllOptions();
        });
    });

    // Xử lý sự kiện khi nhấn nút hủy trong hộp thoại xác nhận
    dialogCancel.addEventListener('click', function() {
        hideConfirmDialog();
    });

    // Xử lý sự kiện khi nhấn nút xác nhận trong hộp thoại xác nhận
    dialogConfirm.addEventListener('click', function() {
        if (currentConfirmAction) {
            currentConfirmAction();
            currentConfirmAction = null;
        }
        hideConfirmDialog();
    });

    // Hàm tải tùy chọn đã lưu
    function loadOptions() {
        chrome.storage.sync.get({
            // Giá trị mặc định
            activeProtection: true,
            aiProtection: true,
            protectionLevel: 'medium',
            threatNotifications: true,
            weeklySummary: false,
            whitelist: [],
            shareAnonymousData: true
        }, function(items) {
            // Cập nhật UI với các giá trị đã lưu
            activeProtection.checked = items.activeProtection;
            aiProtection.checked = items.aiProtection;
            protectionLevel.value = items.protectionLevel;
            threatNotifications.checked = items.threatNotifications;
            weeklySummary.checked = items.weeklySummary;
            shareAnonymousData.checked = items.shareAnonymousData;
            
            // Cập nhật danh sách trắng
            updateWhitelistUI(items.whitelist);
        });
    }

    // Hàm lưu tất cả tùy chọn
    function saveAllOptions() {
        // Thu thập tất cả các giá trị từ UI
        const options = {
            activeProtection: activeProtection.checked,
            aiProtection: aiProtection.checked,
            protectionLevel: protectionLevel.value,
            threatNotifications: threatNotifications.checked,
            weeklySummary: weeklySummary.checked,
            shareAnonymousData: shareAnonymousData.checked,
            whitelist: getWhitelistFromUI()
        };
        
        // Lưu vào storage
        chrome.storage.sync.set(options, function() {
            // Thông báo cho background script về thay đổi
            chrome.runtime.sendMessage({ 
                action: 'optionsUpdated', 
                options: options 
            });
            
            // Hiển thị thông báo thành công
            showSaveSuccess();
        });
    }

    // Hàm khôi phục tất cả tùy chọn về mặc định
    function resetAllOptions() {
        const defaultOptions = {
            activeProtection: true,
            aiProtection: true,
            protectionLevel: 'medium',
            threatNotifications: true,
            weeklySummary: false,
            shareAnonymousData: true,
            whitelist: []
        };
        
        // Lưu các giá trị mặc định
        chrome.storage.sync.set(defaultOptions, function() {
            // Cập nhật UI
            activeProtection.checked = defaultOptions.activeProtection;
            aiProtection.checked = defaultOptions.aiProtection;
            protectionLevel.value = defaultOptions.protectionLevel;
            threatNotifications.checked = defaultOptions.threatNotifications;
            weeklySummary.checked = defaultOptions.weeklySummary;
            shareAnonymousData.checked = defaultOptions.shareAnonymousData;
            
            // Cập nhật danh sách trắng
            updateWhitelistUI(defaultOptions.whitelist);
            
            // Thông báo cho background script về thay đổi
            chrome.runtime.sendMessage({ 
                action: 'optionsUpdated', 
                options: defaultOptions 
            });
            
            // Hiển thị thông báo thành công
            showResetSuccess();
        });
    }

    // Hàm xóa tất cả dữ liệu
    function clearAllData() {
        // Xóa dữ liệu từ local storage
        chrome.storage.local.clear(function() {
            // Thông báo cho background script về việc xóa dữ liệu
            chrome.runtime.sendMessage({ action: 'clearData' });
            
            // Hiển thị thông báo thành công
            showClearSuccess();
        });
    }

    // Hàm thêm mục vào danh sách trắng
    function addWhitelistItem() {
        const url = whitelistUrl.value.trim();
        
        if (url) {
            // Kiểm tra định dạng URL
            if (isValidDomain(url)) {
                // Lấy danh sách trắng hiện tại
                chrome.storage.sync.get({ whitelist: [] }, function(items) {
                    const whitelist = items.whitelist;
                    
                    // Kiểm tra xem URL đã tồn tại trong danh sách chưa
                    if (!whitelist.includes(url)) {
                        // Thêm URL mới vào danh sách
                        whitelist.push(url);
                        
                        // Lưu danh sách đã cập nhật
                        chrome.storage.sync.set({ whitelist: whitelist }, function() {
                            // Cập nhật UI
                            updateWhitelistUI(whitelist);
                            
                            // Xóa nội dung ô nhập
                            whitelistUrl.value = '';
                            
                            // Thông báo cho background script về thay đổi
                            chrome.runtime.sendMessage({ 
                                action: 'whitelistUpdated', 
                                whitelist: whitelist 
                            });
                        });
                    } else {
                        // Hiển thị thông báo lỗi nếu URL đã tồn tại
                        alert('Tên miền này đã có trong danh sách trắng.');
                        whitelistUrl.focus();
                    }
                });
            } else {
                // Hiển thị thông báo lỗi nếu URL không hợp lệ
                alert('Vui lòng nhập tên miền hợp lệ (ví dụ: example.com).');
                whitelistUrl.focus();
            }
        }
    }

    // Hàm xóa mục khỏi danh sách trắng
    function removeWhitelistItem(url) {
        // Lấy danh sách trắng hiện tại
        chrome.storage.sync.get({ whitelist: [] }, function(items) {
            let whitelist = items.whitelist;
            
            // Xóa URL khỏi danh sách
            whitelist = whitelist.filter(item => item !== url);
            
            // Lưu danh sách đã cập nhật
            chrome.storage.sync.set({ whitelist: whitelist }, function() {
                // Cập nhật UI
                updateWhitelistUI(whitelist);
                
                // Thông báo cho background script về thay đổi
                chrome.runtime.sendMessage({ 
                    action: 'whitelistUpdated', 
                    whitelist: whitelist 
                });
            });
        });
    }

    // Hàm cập nhật UI danh sách trắng
    function updateWhitelistUI(whitelist) {
        // Xóa tất cả các mục hiện tại
        whitelistItems.innerHTML = '';
        
        if (whitelist && whitelist.length > 0) {
            // Ẩn thông báo không có mục
            noWhitelistMessage.style.display = 'none';
            
            // Thêm từng mục vào danh sách
            whitelist.forEach(function(url) {
                const item = document.createElement('li');
                item.className = 'whitelist-item';
                
                const domain = document.createElement('div');
                domain.className = 'whitelist-domain';
                domain.textContent = url;
                
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-whitelist';
                removeButton.innerHTML = '&times;';
                removeButton.title = 'Xóa khỏi danh sách trắng';
                removeButton.addEventListener('click', function() {
                    removeWhitelistItem(url);
                });
                
                item.appendChild(domain);
                item.appendChild(removeButton);
                whitelistItems.appendChild(item);
            });
        } else {
            // Hiển thị thông báo không có mục
            noWhitelistMessage.style.display = 'block';
        }
    }

    // Hàm lấy danh sách trắng từ UI
    function getWhitelistFromUI() {
        const whitelist = [];
        const items = whitelistItems.querySelectorAll('.whitelist-domain');
        
        items.forEach(function(item) {
            whitelist.push(item.textContent);
        });
        
        return whitelist;
    }

    // Hàm kiểm tra tên miền hợp lệ
    function isValidDomain(domain) {
        // Biểu thức chính quy kiểm tra tên miền
        const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
        return domainRegex.test(domain);
    }

    // Hàm hiển thị hộp thoại xác nhận
    function showConfirmDialog(message, confirmAction) {
        dialogMessage.textContent = message;
        currentConfirmAction = confirmAction;
        confirmationDialog.classList.add('show');
    }

    // Hàm ẩn hộp thoại xác nhận
    function hideConfirmDialog() {
        confirmationDialog.classList.remove('show');
    }

    // Hàm hiển thị thông báo lưu thành công
    function showSaveSuccess() {
        const status = document.createElement('div');
        status.className = 'save-status';
        status.textContent = 'Đã lưu thay đổi!';
        status.style.position = 'fixed';
        status.style.bottom = '20px';
        status.style.right = '20px';
        status.style.padding = '10px 15px';
        status.style.backgroundColor = '#28a745';
        status.style.color = '#fff';
        status.style.borderRadius = '4px';
        status.style.zIndex = '1000';
        
        document.body.appendChild(status);
        
        setTimeout(function() {
            status.style.opacity = '0';
            status.style.transition = 'opacity 0.5s';
            
            setTimeout(function() {
                document.body.removeChild(status);
            }, 500);
        }, 2000);
    }

    // Hàm hiển thị thông báo khôi phục thành công
    function showResetSuccess() {
        const status = document.createElement('div');
        status.className = 'save-status';
        status.textContent = 'Đã khôi phục về mặc định!';
        status.style.position = 'fixed';
        status.style.bottom = '20px';
        status.style.right = '20px';
        status.style.padding = '10px 15px';
        status.style.backgroundColor = '#17a2b8';
        status.style.color = '#fff';
        status.style.borderRadius = '4px';
        status.style.zIndex = '1000';
        
        document.body.appendChild(status);
        
        setTimeout(function() {
            status.style.opacity = '0';
            status.style.transition = 'opacity 0.5s';
            
            setTimeout(function() {
                document.body.removeChild(status);
            }, 500);
        }, 2000);
    }

    // Hàm hiển thị thông báo xóa dữ liệu thành công
    function showClearSuccess() {
        const status = document.createElement('div');
        status.className = 'save-status';
        status.textContent = 'Đã xóa tất cả dữ liệu!';
        status.style.position = 'fixed';
        status.style.bottom = '20px';
        status.style.right = '20px';
        status.style.padding = '10px 15px';
        status.style.backgroundColor = '#dc3545';
        status.style.color = '#fff';
        status.style.borderRadius = '4px';
        status.style.zIndex = '1000';
        
        document.body.appendChild(status);
        
        setTimeout(function() {
            status.style.opacity = '0';
            status.style.transition = 'opacity 0.5s';
            
            setTimeout(function() {
                document.body.removeChild(status);
            }, 500);
        }, 2000);
    }
});
