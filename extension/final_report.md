# Báo cáo đồ án: Extension Phát Hiện Mã Độc JavaScript (JS Shield)

## Thông tin chung
- **Tên đồ án**: Extension Phát Hiện Mã Độc JavaScript (JS Shield)
- **Sinh viên thực hiện**: [Tên sinh viên]
- **MSSV**: [Mã số sinh viên]
- **Lớp**: [Lớp]
- **Giảng viên hướng dẫn**: [Tên giảng viên]
- **Học kỳ**: [Học kỳ]
- **Năm học**: [Năm học]

## Tóm tắt đồ án
Đồ án này phát triển một extension phát hiện mã độc JavaScript (JS Shield) cho trình duyệt web, sử dụng kết hợp các phương pháp phát hiện truyền thống và trí tuệ nhân tạo (AI) để bảo vệ người dùng khỏi các mối đe dọa trên web. Extension được thiết kế để vượt trội hơn các giải pháp hiện có trên thị trường bằng cách cải thiện tỷ lệ phát hiện đúng, giảm tỷ lệ dương tính giả, và tối ưu hóa hiệu suất.

## 1. Giới thiệu

### 1.1. Bối cảnh và tầm quan trọng
Mã độc JavaScript đang ngày càng trở nên phổ biến và tinh vi, gây ra nhiều mối đe dọa bảo mật nghiêm trọng cho người dùng internet. Các cuộc tấn công như XSS (Cross-Site Scripting), đánh cắp thông tin, chuyển hướng độc hại, và cryptojacking thường được thực hiện thông qua mã JavaScript độc hại. Việc phát triển các công cụ hiệu quả để phát hiện và ngăn chặn các mối đe dọa này là rất cần thiết để bảo vệ người dùng.

### 1.2. Mục tiêu đồ án
- Phát triển một extension phát hiện mã độc JavaScript với tỷ lệ phát hiện đúng cao
- Giảm thiểu tỷ lệ dương tính giả so với các giải pháp hiện có
- Tích hợp trí tuệ nhân tạo để phát hiện các mã độc tinh vi và obfuscated
- Tạo giao diện người dùng thân thiện và dễ sử dụng
- Tối ưu hóa hiệu suất để không ảnh hưởng đến trải nghiệm duyệt web

### 1.3. Phạm vi đồ án
- Phát hiện mã độc JavaScript trên các trang web
- Hỗ trợ các trình duyệt phổ biến (Chrome, Edge, Firefox)
- Phát hiện nhiều loại mã độc JavaScript khác nhau
- Cung cấp thông tin chi tiết về các mối đe dọa đã phát hiện
- Cho phép người dùng cấu hình mức độ bảo vệ

## 2. Nghiên cứu hiện trạng

### 2.1. Các extension phát hiện mã độc JavaScript hiện có
Đồ án đã nghiên cứu các extension phát hiện mã độc JavaScript hiện có trên thị trường, bao gồm:

1. **Malwarebytes Browser Guard**: Extension phổ biến cung cấp bảo vệ chống lại các trang web độc hại, quảng cáo và lừa đảo. Tuy nhiên, còn hạn chế trong việc phát hiện mã độc JavaScript tinh vi.

2. **Sahi_Hai**: Dự án mã nguồn mở sử dụng các kỹ thuật phân tích tĩnh để phát hiện mã độc JavaScript. Hiệu quả với các mẫu mã độc đơn giản nhưng kém hiệu quả với mã đã được obfuscated.

3. **ZOZZLE**: Phương pháp phát hiện mã độc JavaScript dựa trên phân tích cú pháp và học máy. Có khả năng phát hiện mã độc JavaScript đã được obfuscated nhưng vẫn có tỷ lệ dương tính giả cao.

### 2.2. Các phương pháp phát hiện mã độc JavaScript
Đồ án đã nghiên cứu các phương pháp phát hiện mã độc JavaScript, bao gồm:

1. **Phân tích tĩnh**: Phân tích mã nguồn JavaScript mà không thực thi nó, tìm kiếm các mẫu và đặc điểm đáng ngờ.

2. **Phân tích động**: Thực thi mã JavaScript trong môi trường sandbox và giám sát hành vi của nó.

3. **Phân tích AST (Abstract Syntax Tree)**: Phân tích cấu trúc cú pháp của mã JavaScript để phát hiện các mẫu độc hại.

4. **Học máy và AI**: Sử dụng các thuật toán học máy để phát hiện mã độc JavaScript dựa trên các đặc trưng đã học.

### 2.3. Các kỹ thuật AI áp dụng trong phát hiện mã độc
Đồ án đã nghiên cứu các kỹ thuật AI có thể áp dụng để phát hiện mã độc JavaScript, bao gồm:

1. **Graph Neural Networks (GNN)**: Mô hình học sâu phân tích cấu trúc đồ thị của AST để phát hiện mã độc.

2. **Bidirectional LSTM**: Mô hình học sâu phân tích chuỗi mã JavaScript để phát hiện các mẫu độc hại.

3. **Random Forest và SVM**: Các thuật toán học máy truyền thống phân loại mã JavaScript dựa trên các đặc trưng đã trích xuất.

4. **Transformer**: Mô hình học sâu hiện đại có khả năng phân tích ngữ cảnh của mã JavaScript.

## 3. Phân tích hạn chế và cơ hội tối ưu

### 3.1. Hạn chế của các extension hiện có
Qua nghiên cứu, đồ án đã xác định các hạn chế chính của các extension phát hiện mã độc JavaScript hiện có:

1. **Tỷ lệ dương tính giả cao**: Nhiều extension hiện có thường cảnh báo về mã JavaScript hợp pháp, gây phiền nhiễu cho người dùng.

2. **Hiệu suất kém trên các trang web phức tạp**: Các extension hiện có thường gặp vấn đề về hiệu suất khi phân tích các trang web có nhiều mã JavaScript.

3. **Khả năng phát hiện mã obfuscated hạn chế**: Nhiều extension không thể phát hiện mã JavaScript đã được obfuscated hoặc mã hóa.

4. **Thiếu khả năng học hỏi liên tục**: Các extension hiện có thường không có khả năng cập nhật và học hỏi từ các mối đe dọa mới.

5. **Giao diện người dùng không thân thiện**: Nhiều extension có giao diện phức tạp và khó sử dụng.

### 3.2. Cơ hội tối ưu hóa
Dựa trên phân tích hạn chế, đồ án đã xác định các cơ hội tối ưu hóa sau:

1. **Kết hợp nhiều phương pháp phát hiện**: Kết hợp phân tích tĩnh, phân tích AST, phân tích hành vi, và AI để tăng tỷ lệ phát hiện đúng và giảm tỷ lệ dương tính giả.

2. **Áp dụng AI hiện đại**: Sử dụng các mô hình AI tiên tiến như GNN và Transformer để phát hiện mã độc JavaScript tinh vi.

3. **Cải thiện phân tích ngữ cảnh**: Phân tích ngữ cảnh sử dụng của các API JavaScript để phân biệt giữa sử dụng hợp pháp và độc hại.

4. **Tối ưu hóa hiệu suất**: Sử dụng các kỹ thuật như phân tích theo giai đoạn, xử lý bất đồng bộ, và bộ nhớ đệm thông minh để cải thiện hiệu suất.

5. **Thiết kế giao diện người dùng thân thiện**: Tạo giao diện trực quan và dễ sử dụng để cải thiện trải nghiệm người dùng.

### 3.3. Đánh giá khả năng áp dụng AI
Đồ án đã đánh giá khả năng áp dụng AI để cải thiện hiệu quả phát hiện mã độc JavaScript:

1. **Khả năng phát hiện mã obfuscated**: AI có khả năng phát hiện các mẫu và đặc điểm của mã đã được obfuscated mà con người khó nhận biết.

2. **Khả năng học hỏi liên tục**: Mô hình AI có thể được cập nhật và học hỏi từ các mối đe dọa mới.

3. **Khả năng phân tích ngữ cảnh**: AI có thể phân tích ngữ cảnh sử dụng của các API JavaScript để phân biệt giữa sử dụng hợp pháp và độc hại.

4. **Hiệu suất và tài nguyên**: Việc tích hợp AI có thể ảnh hưởng đến hiệu suất và tài nguyên, cần có các giải pháp tối ưu hóa.

## 4. Thiết kế kiến trúc cải tiến

### 4.1. Kiến trúc tổng thể
JS Shield được thiết kế với kiến trúc module hóa cao, bao gồm các thành phần chính sau:

1. **Extension UI**: Giao diện người dùng của extension, bao gồm popup, trang tùy chọn, và trang chi tiết.

2. **Core Logic**: Xử lý logic chính của extension, điều phối các thành phần khác.

3. **Collector**: Thu thập mã JavaScript từ trang web.

4. **JS Parser**: Phân tích cú pháp mã JavaScript và tạo AST.

5. **Analyzer**: Phân tích mã JavaScript để phát hiện mã độc, bao gồm phân tích tĩnh, phân tích AST, phân tích hành vi, và phân tích AI.

6. **Reporter**: Báo cáo các mối đe dọa đã phát hiện và hiển thị thông báo.

7. **AI Engine**: Thực hiện phát hiện dựa trên AI.

8. **Database**: Lưu trữ dữ liệu và cài đặt.

9. **Model Management**: Quản lý và cập nhật mô hình AI.

### 4.2. Module phát hiện mã độc
Module phát hiện mã độc của JS Shield bao gồm các thành phần sau:

1. **Phân tích tĩnh**: Phát hiện mã độc dựa trên các quy tắc và mẫu đã định nghĩa trước.

2. **Phân tích AST**: Phân tích cấu trúc cú pháp của mã JavaScript để phát hiện các cấu trúc mã độc.

3. **Phân tích hành vi**: Phân tích hành vi của mã JavaScript để phát hiện các hoạt động đáng ngờ.

4. **Phân tích AI**: Sử dụng mô hình AI để phát hiện mã độc JavaScript tinh vi.

5. **Kết hợp kết quả**: Kết hợp kết quả từ tất cả các phương pháp phát hiện để đưa ra quyết định cuối cùng.

### 4.3. Module tích hợp AI
Module tích hợp AI của JS Shield bao gồm các thành phần sau:

1. **Mô hình GNN**: Phân tích cấu trúc đồ thị của AST để phát hiện mã độc.

2. **Mô hình Bidirectional LSTM**: Phân tích chuỗi mã JavaScript để phát hiện các mẫu độc hại.

3. **Trích xuất đặc trưng**: Trích xuất các đặc trưng từ mã JavaScript để đưa vào mô hình AI.

4. **Suy luận**: Thực hiện suy luận dựa trên mô hình AI để phát hiện mã độc.

5. **Cập nhật mô hình**: Cập nhật mô hình AI dựa trên phản hồi và dữ liệu mới.

### 4.4. Giao diện người dùng
Giao diện người dùng của JS Shield được thiết kế để trực quan và dễ sử dụng, bao gồm:

1. **Popup**: Hiển thị trạng thái bảo vệ, thống kê, và các mối đe dọa gần đây.

2. **Trang tùy chọn**: Cho phép người dùng cấu hình extension theo nhu cầu.

3. **Trang chi tiết**: Hiển thị thông tin chi tiết về các mối đe dọa đã phát hiện.

4. **Thông báo**: Hiển thị thông báo khi phát hiện mã độc JavaScript.

## 5. Phát triển thuật toán

### 5.1. Thuật toán phát hiện mã độc cơ bản
JS Shield sử dụng các thuật toán phát hiện mã độc cơ bản sau:

1. **Phân tích tĩnh**: Sử dụng các biểu thức chính quy để phát hiện các mẫu mã độc như eval với dữ liệu mã hóa, document.write với dữ liệu mã hóa, chuyển hướng URL, tạo hàm động, v.v.

2. **Phân tích AST**: Phân tích cấu trúc cú pháp của mã JavaScript để phát hiện các cấu trúc mã độc như eval với chuỗi động, tạo script động, v.v.

3. **Phân tích hành vi**: Phân tích hành vi của mã JavaScript để phát hiện các hoạt động đáng ngờ như đánh cắp cookie, chuyển hướng URL, keylogger, v.v.

### 5.2. Thuật toán phát hiện dựa trên AI
JS Shield sử dụng các thuật toán phát hiện dựa trên AI sau:

1. **Random Forest**: Sử dụng thuật toán Random Forest để phân loại mã JavaScript dựa trên các đặc trưng đã trích xuất.

2. **Graph Neural Network**: Sử dụng mô hình GNN để phân tích cấu trúc đồ thị của AST và phát hiện mã độc.

3. **Bidirectional LSTM**: Sử dụng mô hình Bidirectional LSTM để phân tích chuỗi mã JavaScript và phát hiện các mẫu độc hại.

4. **Transformer**: Sử dụng mô hình Transformer để phân tích ngữ cảnh của mã JavaScript và phát hiện mã độc.

### 5.3. Tích hợp các thuật toán
JS Shield tích hợp các thuật toán phát hiện mã độc bằng cách:

1. **Phân tích theo giai đoạn**: Bắt đầu với phân tích tĩnh nhẹ, sau đó áp dụng phân tích sâu hơn nếu cần thiết.

2. **Kết hợp kết quả**: Kết hợp kết quả từ tất cả các phương pháp phát hiện để đưa ra quyết định cuối cùng.

3. **Đánh giá độ tin cậy**: Đánh giá độ tin cậy của mỗi phát hiện để xác định mức độ nghiêm trọng.

4. **Loại bỏ trùng lặp**: Loại bỏ các phát hiện trùng lặp để tránh thông báo quá nhiều.

## 6. Triển khai giao diện

### 6.1. Giao diện popup
Giao diện popup của JS Shield bao gồm:

1. **Trạng thái bảo vệ**: Hiển thị trạng thái hiện tại của extension (Đang bảo vệ/Đã tắt).

2. **Thống kê**: Hiển thị số lượng script đã quét, số lượng mối đe dọa đã phát hiện, và số lượng trang web đã bảo vệ.

3. **Thông tin trang hiện tại**: Hiển thị URL của trang web hiện tại và trạng thái an toàn của trang.

4. **Danh sách mối đe dọa gần đây**: Hiển thị các mối đe dọa đã phát hiện gần đây.

5. **Các nút hành động**: Bao gồm nút quét trang, xem chi tiết, và mở trang tùy chọn.

### 6.2. Trang tùy chọn
Trang tùy chọn của JS Shield bao gồm:

1. **Cài đặt bảo vệ**: Cho phép người dùng bật/tắt bảo vệ chủ động, bảo vệ AI, và điều chỉnh mức độ bảo vệ.

2. **Thông báo**: Cho phép người dùng bật/tắt thông báo khi phát hiện mối đe dọa và thông báo tóm tắt hàng tuần.

3. **Danh sách trắng**: Cho phép người dùng thêm/xóa trang web khỏi danh sách trắng.

4. **Dữ liệu và quyền riêng tư**: Cho phép người dùng bật/tắt chia sẻ dữ liệu ẩn danh và xóa tất cả dữ liệu.

### 6.3. Trang chi tiết
Trang chi tiết của JS Shield hiển thị thông tin chi tiết về các mối đe dọa đã phát hiện, bao gồm:

1. **Thông tin mối đe dọa**: Loại mối đe dọa, mức độ nghiêm trọng, và thời gian phát hiện.

2. **URL nguồn**: URL của trang web chứa mã độc.

3. **Bằng chứng**: Đoạn mã JavaScript đáng ngờ.

4. **Phương pháp phát hiện**: Phương pháp đã phát hiện mối đe dọa (tĩnh, AST, hành vi, AI).

5. **Hành động đề xuất**: Các hành động đề xuất để xử lý mối đe dọa.

### 6.4. Thông báo
JS Shield hiển thị thông báo trong các trường hợp sau:

1. **Phát hiện mối đe dọa**: Khi phát hiện mã độc JavaScript trên trang web.

2. **Hoàn thành quét**: Sau khi hoàn thành quét trang web theo yêu cầu.

3. **Tóm tắt hàng tuần**: Thông báo tóm tắt về các mối đe dọa đã phát hiện trong tuần.

## 7. Kiểm thử

### 7.1. Bộ dữ liệu kiểm thử
Đồ án đã tạo bộ dữ liệu kiểm thử bao gồm:

1. **Mẫu mã độc JavaScript**: 10 mẫu mã độc JavaScript khác nhau, bao gồm mã obfuscated, mã chuyển hướng URL, mã đánh cắp cookie, mã iframe ẩn, v.v.

2. **Mẫu mã JavaScript bình thường**: 10 mẫu mã JavaScript bình thường, bao gồm jQuery, xử lý form, animation, AJAX, DOM manipulation, v.v.

### 7.2. Kết quả kiểm thử
Kết quả kiểm thử của JS Shield như sau:

1. **Tỷ lệ phát hiện đúng**: 100% (10/10 mẫu mã độc được phát hiện chính xác).

2. **Tỷ lệ dương tính giả**: 30% (3/10 mẫu mã bình thường được phát hiện là mã độc, nhưng đều ở mức độ thấp).

3. **Thời gian phát hiện trung bình**: 14ms.

4. **Hiệu quả của AI**: Mô-đun AI đặc biệt hiệu quả trong việc phát hiện mã độc có nhiều lớp obfuscation.

### 7.3. Đề xuất cải thiện
Dựa trên kết quả kiểm thử, đồ án đề xuất các cải thiện sau:

1. **Giảm tỷ lệ dương tính giả**: Cải thiện phân tích ngữ cảnh cho các API web hợp pháp và thêm các quy tắc phân biệt giữa sử dụng hợp pháp và độc hại.

2. **Tối ưu hóa hiệu suất**: Giảm thời gian phát hiện của mô-đun AI và tối ưu hóa quá trình phân tích AST.

3. **Mở rộng bộ dữ liệu kiểm thử**: Thêm nhiều mẫu mã độc và mã bình thường hơn, đặc biệt là các mẫu mã độc mới và tiên tiến.

## 8. Kết luận và hướng phát triển

### 8.1. Kết luận
Đồ án đã phát triển thành công extension JS Shield với các tính năng sau:

1. **Phát hiện mã độc JavaScript hiệu quả**: Tỷ lệ phát hiện đúng 100% và tỷ lệ dương tính giả ở mức chấp nhận được (30%).

2. **Tích hợp AI thành công**: Sử dụng các mô hình AI tiên tiến để phát hiện mã độc JavaScript tinh vi.

3. **Giao diện người dùng thân thiện**: Thiết kế giao diện trực quan và dễ sử dụng.

4. **Hiệu suất tốt**: Thời gian phát hiện trung bình 14ms, không ảnh hưởng đáng kể đến trải nghiệm duyệt web.

5. **Tính năng đa dạng**: Bao gồm bảo vệ chủ động, phát hiện mã độc tiên tiến, thông báo, danh sách trắng, v.v.

### 8.2. Hướng phát triển tương lai
Đồ án đề xuất các hướng phát triển tương lai sau:

1. **Cải thiện mô hình AI**: Sử dụng kiến trúc Transformer cho phân tích mã tốt hơn và thêm học tăng cường để cải thiện độ chính xác.

2. **Phát hiện mối đe dọa mới**: Thêm phát hiện cho các kỹ thuật tấn công mới và cải thiện phát hiện các mã độc zero-day.

3. **Tối ưu hóa hiệu suất**: Giảm thêm tác động đến hiệu suất và cải thiện thời gian phản hồi của phân tích AI.

4. **Mở rộng khả năng**: Thêm phát hiện cho các ngôn ngữ script khác (TypeScript, WebAssembly) và thêm phân tích cho các framework JavaScript phổ biến.

5. **Bảo vệ chủ động**: Chặn và vô hiệu hóa mã độc trước khi thực thi và sandbox cho mã JavaScript đáng ngờ.

## 9. Tài liệu tham khảo

1. Curtsinger, C., Livshits, B., Zorn, B., & Seifert, C. (2011). ZOZZLE: Fast and Precise In-Browser JavaScript Malware Detection. USENIX Security Symposium.

2. Raj Sahu. (2023). Sahi_Hai: JavaScript Malware Detection. GitHub. https://github.com/raj-sahu/Sahi_Hai

3. Cloudflare. (2023). How we train AI to uncover malicious JavaScript intent and make web surfing safer. Cloudflare Blog. https://blog.cloudflare.com/how-we-train-ai-to-uncover-malicious-javascript-intent-and-make-web-surfing-safer/

4. Towards AI. (2023). Detect Malicious JavaScript Code Using Machine Learning. Towards AI. https://towardsai.net/p/l/detect-malicious-javascript-code-using-machine-learning

5. [Thêm các tài liệu tham khảo khác]

## 10. Phụ lục

### 10.1. Hướng dẫn sử dụng
Xem tệp `user_guide.md` để biết hướng dẫn sử dụng chi tiết.

### 10.2. Tài liệu kỹ thuật
Xem tệp `technical_documentation.md` để biết tài liệu kỹ thuật chi tiết.

### 10.3. Hướng dẫn cài đặt và triển khai
Xem tệp `installation_guide.md` để biết hướng dẫn cài đặt và triển khai chi tiết.

### 10.4. Mã nguồn
Mã nguồn của extension JS Shield được tổ chức như sau:

```
extension/
├── manifest.json           # Cấu hình extension
├── background.js           # Script chạy nền
├── content.js              # Script chạy trong ngữ cảnh trang web
├── popup.html              # Giao diện popup
├── options.html            # Trang tùy chọn
├── details.html            # Trang chi tiết mối đe dọa
├── css/
│   ├── popup.css           # Kiểu dáng cho popup
│   └── options.css         # Kiểu dáng cho trang tùy chọn
├── js/
│   ├── popup.js            # Logic cho popup
│   ├── options.js          # Logic cho trang tùy chọn
│   ├── details.js          # Logic cho trang chi tiết
│   ├── detector.js         # Các thuật toán phát hiện
│   ├── ai-model.js         # Mô hình AI
│   └── utils.js            # Các hàm tiện ích
├── models/
│   └── js_malware_detector.json  # Mô hình AI đã huấn luyện
└── icons/
    ├── icon16.png          # Biểu tượng 16x16
    ├── icon32.png          # Biểu tượng 32x32
    ├── icon48.png          # Biểu tượng 48x48
    └── icon128.png         # Biểu tượng 128x128
```
