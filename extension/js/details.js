// Chi tiết mối đe dọa JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Lấy danh sách các mối đe dọa từ storage
    chrome.storage.local.get(['currentThreats'], function(data) {
        const threats = data.currentThreats || [];
        const threatContainer = document.getElementById('threatContainer');
        
        if (threats.length > 0) {
            // Xóa thông báo không có mối đe dọa
            threatContainer.innerHTML = '';
            
            // Tạo danh sách mối đe dọa
            const threatList = document.createElement('ul');
            threatList.className = 'threat-list';
            
            threats.forEach(function(threat) {
                const threatItem = document.createElement('li');
                threatItem.className = `threat-item ${threat.severity}`;
                
                const threatHTML = `
                    <div class="threat-header">
                        <span class="threat-type">${threat.type}</span>
                        <span class="threat-severity ${threat.severity}">${threat.severity.toUpperCase()}</span>
                    </div>
                    <div class="threat-details">
                        <p><strong>Phát hiện bởi:</strong> ${threat.detector}</p>
                        <p><strong>URL:</strong> ${threat.url}</p>
                        <p><strong>Thời gian:</strong> ${new Date(threat.timestamp).toLocaleString()}</p>
                        <p><strong>Bằng chứng:</strong></p>
                        <div class="evidence">${escapeHTML(threat.evidence)}</div>
                    </div>
                `;
                
                threatItem.innerHTML = threatHTML;
                threatList.appendChild(threatItem);
            });
            
            threatContainer.appendChild(threatList);
        }
    });
    
    // Xử lý nút quay lại
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
    
    // Hàm escape HTML để tránh XSS
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
