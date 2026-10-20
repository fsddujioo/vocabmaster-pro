# Hoàn thiện lộ trình — 5.6

Đã cập nhật trực tiếp bản cài VocabMaster-Pro.

- Mock A: raw L/R chỉ ghi nhận; nhập band + nguồn quy đổi đúng đề. Buổi 30 ghép bốn band A, cần overall ≥6.5 và mọi kỹ năng ≥6.0. Mock B dùng cùng điều kiện và kiểm tra lại trạng thái A. L/R 7.0 là đệm, không khóa riêng ≥30/40. Bản cũ chỉ có raw cần bổ sung band/nguồn, lịch sử giữ nguyên.
- Tám lượt đầu có bài chính/dự phòng, tên và part đã đối chiếu; bỏ Test 1 Recording 1 khỏi đo đầu vào vì đã biết đáp án. Lựa chọn trong trang Study4 vẫn do người học thực hiện. Lịch gợi ý 4 lượt/tuần, có thể dời theo ngày rảnh; không tự chốt lịch học.
- Buổi 13/15/17/19/21/23/25 chia A/B, mỗi 90 phút học. Các buổi thông thường 110 phút đã tính 5 phút nghe chép và khoảng 20 phút cụm/ngữ pháp. Buổi 26/27 tổng 120 phút; mock có cách chia riêng. Không cộng nền ngoài giờ hay bắt làm cả Reading+full Writing trong 30 phút.
- Tab Người chấm: chọn ngày dự kiến đầu; ghi ngày/người/file nhận xét, bốn tiêu chí Speaking/Writing, hai lỗi và việc luyện lại, band tùy chọn. Nhật ký nối thêm, lượt kế sau 14 ngày từ lượt đã nhận chữa đủ hai kỹ năng. Bản nháp còn khi DB lỗi, có lưu lại/xuất JSON. Không gửi bài hay đặt giáo viên.

## Mở

Lưu form đang làm rồi tải lại app hoặc đóng/mở Kho & ôn tập trong Study4. Lộ trình 6.5 → 8 lượt đầu để bắt đầu; Người chấm để đặt mốc riêng. Không cần tải lại extension.

## Giới hạn rõ

App đối chiếu số liệu người học nhập và ghi chú tự kiểm tra; không tự xác thực bảng raw-band hay chất lượng nhận xét, không chấm ngữ nghĩa tự do, không xác nhận band thi thật. Mock chia phiên không đo đầy đủ sức bền của thi liên tục. Nguồn đề B chỉ chống trùng đúng chuỗi mã nguồn; người học vẫn phải chọn đề chưa biết đáp án. Không đọc toàn bộ lịch sử mọi bài Study4.

## Kiểm tra

103 kiểm tra mới về ngưỡng Mock A/B, trạng thái phụ thuộc, tải từng phiên, hàng chờ, chu kỳ 14 ngày, tính hợp lệ/ghi nối tiếp và lưu lỗi DB của phản hồi; 91 kiểm tra foundation và 169 kiểm tra roadmap tiếp tục qua. Đây là kiểm tra phần mềm, không phải bằng chứng tăng band. QA trên origin 8089 riêng; không ghi kết quả giả vào origin thật 8080.

UI đã xác minh: nhật ký QA còn sau reload và mốc 20/10 → 03/11; khung nhúng 420px không tràn ngang (clientWidth=scrollWidth=403); bản thật 8080 hiện tab 8 lượt đầu, 0/32, không có lỗi console trong lượt kiểm. Ảnh: outputs/ielts-finished/live-starter.png. Server QA 8089 đã dừng; server thật 8080 còn hoạt động.
